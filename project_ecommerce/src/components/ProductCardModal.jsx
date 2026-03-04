import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Heart, Package, Truck, Shield, Check, Star } from 'lucide-react';
import axiosInstance from "../components/axiosInstance";

const ProductDetailModal = ({ product, isOpen, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [addedSuccess, setAddedSuccess] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleConfirmAddToCart = async () => {
        setIsAdding(true);
        try {
            await axiosInstance.post("/snapmart/myCart/", {
                'product': product.id,
                'quantity': quantity
            });
            setAddedSuccess(true);
            setTimeout(() => {
                setAddedSuccess(false);
                onClose();
                setQuantity(1);
            }, 1200);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setIsAdding(false);
        }
    };

    const incrementQuantity = () => {
        if (quantity < product.stock) setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleQuantityInputChange = (e) => {
        const value = e.target.value;
        if (value === '') { setQuantity(''); return; }
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue >= 1 && numValue <= product.stock) {
            setQuantity(numValue);
        } else if (numValue > product.stock) {
            setQuantity(product.stock);
        } else if (numValue < 1) {
            setQuantity(1);
        }
    };

    const handleQuantityBlur = () => {
        if (quantity === '' || quantity < 1) setQuantity(1);
    };

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50"
                        style={{
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(12px) saturate(0.8)',
                        }}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 30 }}
                            transition={{ type: 'spring', bounce: 0.15 }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden"
                        >
                            <div
                                className="overflow-y-auto max-h-[90vh] hide-scrollbar"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 100%)',
                                    backdropFilter: 'blur(60px) saturate(1.5)',
                                    WebkitBackdropFilter: 'blur(60px) saturate(1.5)',
                                    borderRadius: '2.5rem',
                                    border: '2px solid rgba(255,255,255,0.7)',
                                    boxShadow: '0 25px 80px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,1), inset 0 0 80px rgba(255,255,255,0.3)',
                                }}
                            >
                                {/* Top glass highlight */}
                                <div
                                    className="pointer-events-none absolute top-0 left-0 right-0 h-32 rounded-t-[2.5rem]"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                                    }}
                                />

                                {/* Close Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="absolute top-5 right-5 z-10 p-2.5 rounded-full transition-all"
                                    style={{
                                        background: 'rgba(255,255,255,0.7)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1.5px solid rgba(255,255,255,0.8)',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <X size={20} className="text-gray-800" />
                                </motion.button>

                                {/* Modal Content */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

                                    {/* Left — Image */}
                                    <div className="relative p-6 md:p-8">
                                        <div
                                            className="relative rounded-[2rem] overflow-hidden"
                                            style={{
                                                border: '2px solid rgba(255,255,255,0.6)',
                                                boxShadow: '0 15px 50px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
                                            }}
                                        >
                                            <img
                                                src={`http://127.0.0.1:8000/${product.image}`}
                                                alt={product.name}
                                                className="w-full h-auto object-cover"
                                            />

                                            {/* Top gradient for badges */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />

                                            {/* Favorite */}
                                            <motion.button
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.85 }}
                                                onClick={() => setIsFavorite(!isFavorite)}
                                                className="absolute top-4 right-4 p-3 rounded-full transition-all"
                                                style={{
                                                    background: isFavorite ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.8)',
                                                    backdropFilter: 'blur(20px)',
                                                    border: isFavorite ? '1.5px solid rgba(239,68,68,0.3)' : '1.5px solid rgba(255,255,255,0.9)',
                                                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                                                }}
                                            >
                                                <Heart
                                                    size={22}
                                                    className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-800'}`}
                                                />
                                            </motion.button>

                                            {/* Category */}
                                            <div className="absolute bottom-4 left-4">
                                                <span
                                                    className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                                                    style={{
                                                        background: 'rgba(0,0,0,0.4)',
                                                        backdropFilter: 'blur(20px)',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                    }}
                                                >
                                                    {product.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Feature badges */}
                                        <div className="grid grid-cols-3 gap-3 mt-5">
                                            {[
                                                { icon: Package, text: 'Free Delivery', sub: 'Orders $50+' },
                                                { icon: Truck, text: 'Fast Shipping', sub: '2-3 Days' },
                                                { icon: Shield, text: 'Secure Pay', sub: '100% Safe' }
                                            ].map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ y: -2 }}
                                                    className="text-center p-3 rounded-2xl"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.45)',
                                                        backdropFilter: 'blur(20px)',
                                                        border: '1px solid rgba(255,255,255,0.6)',
                                                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                                    }}
                                                >
                                                    <feature.icon size={18} className="text-gray-800 mx-auto mb-1" />
                                                    <p className="text-xs font-bold text-gray-900">{feature.text}</p>
                                                    <p className="text-[10px] text-gray-500 mt-0.5">{feature.sub}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right — Details */}
                                    <div className="p-6 md:p-8 md:pl-2 space-y-5">

                                        {/* Title */}
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                                                {product.name}
                                            </h2>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                                ${Number(product.price).toFixed(2)}
                                            </span>
                                            <span
                                                className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                                                style={{
                                                    background: product.stock > 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                                                    color: product.stock > 0 ? '#065f46' : '#b91c1c',
                                                    border: product.stock > 0 ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(239,68,68,0.25)',
                                                }}
                                            >
                                                {product.stock > 0 ? `${product.stock} In Stock` : 'Sold Out'}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <div
                                            className="p-5 rounded-2xl"
                                            style={{
                                                background: 'rgba(255,255,255,0.4)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255,255,255,0.6)',
                                            }}
                                        >
                                            <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Description</h3>
                                            <p className="text-gray-700 leading-relaxed text-[15px]">
                                                {product.desc}
                                            </p>
                                        </div>

                                        {/* Quantity */}
                                        <div>
                                            <label className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3 block">Quantity</label>
                                            <div className="flex items-center gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={decrementQuantity}
                                                    disabled={quantity <= 1}
                                                    className="p-3 rounded-xl disabled:opacity-40 transition-all"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.6)',
                                                        backdropFilter: 'blur(20px)',
                                                        border: '1.5px solid rgba(255,255,255,0.7)',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                    }}
                                                >
                                                    <Minus size={18} className="text-gray-900" />
                                                </motion.button>

                                                <div
                                                    className="px-5 py-2.5 rounded-xl"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.6)',
                                                        backdropFilter: 'blur(20px)',
                                                        border: '1.5px solid rgba(255,255,255,0.7)',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                    }}
                                                >
                                                    <input
                                                        type="number"
                                                        value={quantity}
                                                        onChange={handleQuantityInputChange}
                                                        onBlur={handleQuantityBlur}
                                                        min="1"
                                                        max={product.stock}
                                                        className="w-14 text-xl font-bold text-gray-900 text-center bg-transparent focus:outline-none appearance-none"
                                                        style={{ MozAppearance: 'textfield' }}
                                                    />
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={incrementQuantity}
                                                    disabled={quantity >= product.stock}
                                                    className="p-3 rounded-xl disabled:opacity-40 transition-all"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.6)',
                                                        backdropFilter: 'blur(20px)',
                                                        border: '1.5px solid rgba(255,255,255,0.7)',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                    }}
                                                >
                                                    <Plus size={18} className="text-gray-900" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div
                                            className="flex justify-between items-center p-5 rounded-2xl"
                                            style={{
                                                background: 'rgba(255,255,255,0.5)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1.5px solid rgba(255,255,255,0.7)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                                            }}
                                        >
                                            <span className="text-lg font-bold text-gray-800">Total</span>
                                            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                                ${(product.price * (quantity || 1)).toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Add to Cart */}
                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleConfirmAddToCart}
                                            disabled={isAdding || addedSuccess || product.stock === 0}
                                            className="w-full py-4.5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 disabled:cursor-not-allowed transition-all"
                                            style={{
                                                background: addedSuccess
                                                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                                                    : 'linear-gradient(135deg, #1f2937 0%, #000 100%)',
                                                color: '#fff',
                                                border: '2px solid rgba(255,255,255,0.2)',
                                                boxShadow: addedSuccess
                                                    ? '0 8px 30px rgba(5,150,105,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                    : '0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                                                opacity: (isAdding || product.stock === 0) && !addedSuccess ? 0.6 : 1,
                                                padding: '1.15rem 0',
                                            }}
                                        >
                                            {addedSuccess ? (
                                                <>
                                                    <Check size={22} />
                                                    <span>Added to Cart!</span>
                                                </>
                                            ) : isAdding ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    <span>Adding...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart size={22} />
                                                    <span>Add to Cart</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductDetailModal;