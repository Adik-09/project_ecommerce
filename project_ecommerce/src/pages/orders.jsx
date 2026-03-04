import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, ShoppingBag, Clock, XCircle, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import axiosInstance from '../components/axiosInstance';

const statusConfig = {
    pending: { color: 'bg-amber-500/20 text-amber-800 border-amber-500/40', icon: Clock, glow: 'rgba(245,158,11,0.15)' },
    confirmed: { color: 'bg-blue-500/20 text-blue-800 border-blue-500/40', icon: CheckCircle, glow: 'rgba(59,130,246,0.15)' },
    shipped: { color: 'bg-purple-500/20 text-purple-800 border-purple-500/40', icon: Truck, glow: 'rgba(147,51,234,0.15)' },
    delivered: { color: 'bg-emerald-500/20 text-emerald-800 border-emerald-500/40', icon: CheckCircle, glow: 'rgba(16,185,129,0.15)' },
    cancelled: { color: 'bg-red-500/15 text-red-700 border-red-500/30', icon: XCircle, glow: 'rgba(239,68,68,0.1)' },
};

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('snapmart/orders/');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const cancelOrder = async (orderId) => {
        setCancellingId(orderId);
        try {
            const response = await axiosInstance.patch(`snapmart/orders/${orderId}/`);
            setOrders(prev =>
                prev.map(order => order.id === orderId ? response.data : order)
            );
        } catch (error) {
            console.error('Error cancelling order:', error);
        } finally {
            setCancellingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-14 h-14 border-4 border-white/30 border-t-gray-800 rounded-full"
                    style={{ boxShadow: '0 0 30px rgba(0,0,0,0.1)' }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="inline-block backdrop-blur-xl bg-white/50 rounded-3xl px-8 py-6 border border-white/60 shadow-xl"
                        style={{
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                        }}
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <motion.div
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Package size={28} className="text-gray-800" />
                            </motion.div>
                            <motion.h1
                                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                                initial={{ letterSpacing: "0.1em", opacity: 0 }}
                                animate={{ letterSpacing: "0em", opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                My Orders
                            </motion.h1>
                        </div>
                        <motion.p
                            className="text-gray-700 mt-2 font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
                        </motion.p>
                    </motion.div>
                </motion.div>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div
                            className="backdrop-blur-3xl bg-white/40 rounded-[2.5rem] p-16 border-2 border-white/70 shadow-xl inline-block"
                            style={{
                                boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,1)'
                            }}
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ShoppingBag size={64} className="text-gray-400 mx-auto mb-6" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
                            <p className="text-gray-600 mb-6 font-medium">Start shopping to see your orders here</p>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = '/snapMart/home/'}
                                className="bg-gradient-to-r from-gray-800 to-black text-white px-8 py-3.5 rounded-full font-bold shadow-xl border border-white/20"
                                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
                            >
                                Start Shopping
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="space-y-5">
                        {orders.map((order, index) => {
                            const config = statusConfig[order.status] || statusConfig.pending;
                            const StatusIcon = config.icon;
                            const isExpanded = expandedOrder === order.id;

                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    whileHover={{ y: -3 }}
                                    className="backdrop-blur-xl bg-white/45 rounded-2xl border-2 border-white/60 overflow-hidden"
                                    style={{
                                        boxShadow: `0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1px ${config.glow}`
                                    }}
                                >
                                    {/* Glass reflection */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />

                                    {/* Order Header */}
                                    <div
                                        className="relative p-5 cursor-pointer hover:bg-white/10 transition-all"
                                        onClick={() => toggleExpand(order.id)}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                            <div className="flex items-center gap-4">
                                                <motion.div
                                                    whileHover={{ rotate: 10 }}
                                                    className="backdrop-blur-md bg-white/60 p-3 rounded-xl border border-white/70 shadow-sm"
                                                >
                                                    <Package size={22} className="text-gray-800" />
                                                </motion.div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg">Order #{order.id}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-0.5">
                                                        <Clock size={13} />
                                                        <span>{new Date(order.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border capitalize flex items-center gap-1.5 ${config.color}`}>
                                                    <StatusIcon size={13} />
                                                    {order.status}
                                                </span>
                                                <p className="text-xl font-bold text-gray-900">
                                                    ${Number(order.total_price).toFixed(2)}
                                                </p>
                                                <motion.div
                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-gray-500"
                                                >
                                                    <ChevronDown size={20} />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Items */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="border-t border-white/30 px-5 pb-5">
                                                    <div className="mt-4 space-y-3">
                                                        {order.items?.map((item, i) => (
                                                            <motion.div
                                                                key={item.id}
                                                                initial={{ opacity: 0, x: -15 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.05 }}
                                                                className="flex items-center gap-4 backdrop-blur-md bg-white/35 rounded-xl p-3 border border-white/50"
                                                            >
                                                                <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/50 shadow-sm flex-shrink-0">
                                                                    <img
                                                                        src={`http://127.0.0.1:8000${item.productDetails?.image || ''}`}
                                                                        alt={item.productDetails?.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-bold text-gray-900 truncate">
                                                                        {item.productDetails?.name}
                                                                    </p>
                                                                    <p className="text-sm text-gray-600">
                                                                        Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                                                                    </p>
                                                                </div>
                                                                <p className="font-bold text-gray-900 text-lg">
                                                                    ${(item.quantity * Number(item.price)).toFixed(2)}
                                                                </p>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {/* Order Footer */}
                                                    <div className="mt-4 backdrop-blur-md bg-white/35 rounded-xl p-4 border border-white/50">
                                                        <div className="flex justify-between items-center text-gray-700">
                                                            <span className="font-medium">{order.items?.length || 0} items</span>
                                                            <span className="text-lg font-bold text-gray-900">${Number(order.total_price).toFixed(2)}</span>
                                                        </div>

                                                        {(order.status === 'pending' || order.status === 'confirmed') && (
                                                            <motion.button
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={(e) => { e.stopPropagation(); cancelOrder(order.id); }}
                                                                disabled={cancellingId === order.id}
                                                                className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl backdrop-blur-md bg-red-500/10 border border-red-500/25 text-red-700 font-bold text-sm hover:bg-red-500/20 transition-all disabled:opacity-50"
                                                            >
                                                                {cancellingId === order.id ? (
                                                                    <>
                                                                        <motion.div
                                                                            animate={{ rotate: 360 }}
                                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                            className="w-4 h-4 border-2 border-red-300 border-t-red-700 rounded-full"
                                                                        />
                                                                        Cancelling...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <XCircle size={16} />
                                                                        Cancel Order
                                                                    </>
                                                                )}
                                                            </motion.button>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
