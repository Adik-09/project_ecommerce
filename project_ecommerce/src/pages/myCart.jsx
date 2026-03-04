import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin, Check } from 'lucide-react';
import axiosInstance from "../components/axiosInstance";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Checkout state
    const [showCheckout, setShowCheckout] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddress, setNewAddress] = useState('');
    const [isOrdering, setIsOrdering] = useState(false);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axiosInstance.get("/snapmart/myCart/");
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAddresses = async () => {
        try {
            const response = await axiosInstance.get("/snapmart/addresses/");
            setAddresses(response.data);
            if (response.data.length > 0) {
                setSelectedAddress(response.data[0].id);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleCheckoutClick = () => {
        setShowCheckout(true);
        fetchAddresses();
    };

    const handleAddAddress = async () => {
        if (!newAddress.trim()) return;
        try {
            const response = await axiosInstance.post("/snapmart/addresses/", {
                address_line: newAddress
            });
            setAddresses(prev => [...prev, response.data]);
            setSelectedAddress(response.data.id);
            setNewAddress('');
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) return;

        setIsOrdering(true);
        try {
            await axiosInstance.post("/snapmart/orders/", {
                address: selectedAddress
            });
            window.location.href = '/snapMart/orders/';
        } catch (error) {
            console.error('Error placing order:', error);
        } finally {
            setIsOrdering(false);
        }
    };

    const updateQuantity = async (itemId, newQuantity, maxStock) => {
        if (newQuantity < 1 || newQuantity > maxStock) return;
        try {
            const response = await axiosInstance.patch(`/snapmart/myCart/${itemId}/`, {
                quantity: newQuantity
            });
            setCartItems(prev =>
                prev.map(item => item.id === itemId ? response.data : item)
            );
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await axiosInstance.delete(`/snapmart/myCart/${itemId}/`);
            setCartItems(prev => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + Number(item.total_price || 0), 0);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block backdrop-blur-xl bg-white/40 rounded-2xl px-8 py-6 border border-white/60 shadow-xl">
                        <div className="flex items-center gap-3 justify-center">
                            <ShoppingCart size={28} className="text-gray-800" />
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                Shopping Cart
                            </h1>
                        </div>
                        <p className="text-gray-700 mt-2 font-medium">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="backdrop-blur-xl bg-white/40 rounded-2xl p-12 border border-white/60 shadow-xl inline-block">
                            <ShoppingBag size={56} className="text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                            <p className="text-gray-600 mb-4">Discover amazing products</p>
                            <button
                                onClick={() => window.location.href = '/snapMart/home/'}
                                className="bg-black text-white px-8 py-3 rounded-full font-semibold"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="backdrop-blur-xl bg-white/40 rounded-2xl border border-white/60 shadow-lg p-5 flex flex-col md:flex-row gap-5"
                                >
                                    {/* Product Image */}
                                    <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden border border-white/60 shadow-md flex-shrink-0">
                                        <img
                                            src={`http://127.0.0.1:8000${item.productDetails?.image || ''}`}
                                            alt={item.productDetails?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900">{item.productDetails?.name}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-1">{item.productDetails?.desc}</p>
                                        <p className="text-xl font-bold text-gray-900 my-2">${Number(item.productDetails?.price).toFixed(2)}</p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 bg-white/50 rounded-full border border-white/60 p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.productDetails?.stock)}
                                                    disabled={item.quantity <= 1}
                                                    className="p-2 rounded-full hover:bg-white/70 transition-all disabled:opacity-40"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-4 py-1 font-bold min-w-[40px] text-center text-gray-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.productDetails?.stock)}
                                                    disabled={item.quantity >= item.productDetails?.stock}
                                                    className="p-2 rounded-full hover:bg-white/70 transition-all disabled:opacity-40"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-sm text-gray-600">Subtotal:</span>
                                            <span className="text-lg font-bold text-gray-900">${Number(item.total_price).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Delete */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="self-start p-2.5 rounded-full text-red-500 hover:bg-red-500/10 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 backdrop-blur-xl bg-white/40 rounded-2xl border border-white/60 shadow-xl p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal</span>
                                        <span className="font-bold">${calculateSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-gray-300/40 my-3" />
                                    <div className="flex justify-between text-xl">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="font-bold text-gray-900">${calculateSubtotal().toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Checkout Flow */}
                                {!showCheckout ? (
                                    <button
                                        onClick={handleCheckoutClick}
                                        className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout <ArrowRight size={18} />
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Address Selection */}
                                        <div>
                                            <label className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                                                <MapPin size={18} /> Delivery Address
                                            </label>

                                            {addresses.length > 0 && (
                                                <div className="space-y-2 mb-3">
                                                    {addresses.map((addr) => (
                                                        <button
                                                            key={addr.id}
                                                            onClick={() => setSelectedAddress(addr.id)}
                                                            className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${selectedAddress === addr.id
                                                                    ? 'bg-white/70 border-gray-800 shadow-lg'
                                                                    : 'bg-white/25 border-white/40 hover:bg-white/45'
                                                                }`}
                                                        >
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedAddress === addr.id
                                                                    ? 'border-gray-800 bg-gray-800'
                                                                    : 'border-gray-400'
                                                                }`}>
                                                                {selectedAddress === addr.id && (
                                                                    <Check size={12} className="text-white" />
                                                                )}
                                                            </div>
                                                            <span className="text-sm text-gray-800 font-medium">{addr.address_line}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* New Address */}
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newAddress}
                                                    onChange={(e) => setNewAddress(e.target.value)}
                                                    placeholder="Enter new address"
                                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/40 border border-white/50 text-sm text-gray-800 placeholder:text-gray-500 focus:bg-white/60 transition-all"
                                                />
                                                <button
                                                    onClick={handleAddAddress}
                                                    className="px-4 py-2.5 bg-white/60 border border-white/60 rounded-xl text-sm font-bold hover:bg-white/80 transition-all"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                        {/* Place Order */}
                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={isOrdering || !selectedAddress}
                                            className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isOrdering ? 'Placing Order...' : (
                                                <>
                                                    <Check size={18} />
                                                    Place Order
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => setShowCheckout(false)}
                                            className="w-full py-2 text-sm text-gray-600 font-semibold hover:text-gray-900 transition-all"
                                        >
                                            ← Back to Summary
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
