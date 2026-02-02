import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            <div
                className="relative backdrop-blur-[45px] bg-white/65 rounded-3xl border border-white/80 overflow-hidden transition-all duration-500"
                style={{
                    boxShadow: isHovered
                        ? `
                          0 30px 80px rgba(0,0,0,0.30),
                          0 0 40px rgba(255,255,255,0.45),
                          inset 0 1px 0 rgba(255,255,255,0.9)
                        `
                        : `
                          0 14px 45px rgba(0,0,0,0.18),
                          inset 0 1px 0 rgba(255,255,255,0.85)
                        `
                }}
            >
                {/* Inner glass reflection */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-white/10 to-transparent" />

                {/* Edge glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/50" />

                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-white/40">
                    <img
                        src={`http://127.0.0.1:8000/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform"
                    />

                    {/* Frosted image overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                    />

                    {/* Stock badge */}
                    <div className="absolute top-4 right-4 z-20 bg-white/85 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/90 shadow-md">
                        <span className="text-xs font-semibold text-gray-900">
                            {product.stock} in stock
                        </span>
                    </div>

                    {/* Favorite */}
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="absolute top-4 left-4 z-20 bg-white/85 backdrop-blur-xl p-2.5 rounded-full border border-white/90 shadow-md"
                    >
                        <Heart
                            size={18}
                            className={`transition-colors ${isFavorite
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-800'
                                }`}
                        />
                    </motion.button>

                    {/* Quick view */}
                    <motion.button
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{
                            scale: isHovered ? 1 : 0.85,
                            opacity: isHovered ? 1 : 0
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute inset-0 m-auto h-fit w-fit z-30 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full border border-white shadow-xl flex items-center gap-2"
                    >
                        <Eye size={18} className="text-gray-900" />
                        <span className="text-sm font-semibold text-gray-900">
                            Quick View
                        </span>
                    </motion.button>
                </div>

                {/* Content */}
                <div className="relative p-6">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                        {product.category}
                    </span>

                    <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2 line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {product.desc}
                    </p>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                ${product.price}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2"
                        >
                            <ShoppingCart size={16} />
                            <span className="text-sm font-semibold">Add</span>
                        </motion.button>
                    </div>
                </div>

                {/* Glass sheen sweep */}
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: isHovered ? '100%' : '-100%' }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
            </div>
        </motion.div>
    );
};

export default ProductCard;
