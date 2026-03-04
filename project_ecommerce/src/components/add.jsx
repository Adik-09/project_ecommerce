import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle } from 'lucide-react';

const AdvertisementBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Advertisement data
    const ads = [
        {
            id: 1,
            title: "Summer Sale",
            subtitle: "Up to 50% Off",
            description: "Shop the hottest deals on electronics, fashion & more",
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
            buttonText: "Shop Now",
            gradient: "from-orange-500/20 to-red-500/20"
        },
        {
            id: 2,
            title: "New Arrivals",
            subtitle: "Latest Collection 2024",
            description: "Discover trending products just added to our store",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
            buttonText: "Explore",
            gradient: "from-blue-500/20 to-purple-500/20"
        },
        {
            id: 3,
            title: "Premium Quality",
            subtitle: "Luxury for Less",
            description: "High-end products at unbeatable prices",
            image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80",
            buttonText: "View Collection",
            gradient: "from-purple-500/20 to-pink-500/20"
        }
    ];

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % ads.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [ads.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 mb-12 mt-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-[280px] md:h-[350px] rounded-[2rem] overflow-hidden"
            >
                {/* Carousel Container */}
                <div className="relative w-full h-full">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="relative w-full h-full backdrop-blur-xl bg-white/30 border-2 border-white/60 rounded-[2.5rem] overflow-hidden"
                                style={{
                                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.9)'
                                }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={ads[currentSlide].image}
                                        alt={ads[currentSlide].title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${ads[currentSlide].gradient}`} />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex items-center px-6 md:px-12">
                                    <div className="max-w-xl">
                                        {/* Subtitle */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="inline-block mb-3"
                                        >
                                            <span className="backdrop-blur-xl bg-white/40 px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 border border-white/60">
                                                {ads[currentSlide].subtitle}
                                            </span>
                                        </motion.div>

                                        {/* Title */}
                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-2xl"
                                        >
                                            {ads[currentSlide].title}
                                        </motion.h2>

                                        {/* Description */}
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-sm md:text-base text-white/90 mb-5 drop-shadow-lg"
                                        >
                                            {ads[currentSlide].description}
                                        </motion.p>

                                        {/* CTA Button */}
                                        <motion.button
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative backdrop-blur-xl bg-white/90 hover:bg-white text-gray-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-2xl border border-white overflow-hidden group"
                                        >
                                            {/* Button shine effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '100%' }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            <span className="relative z-10">{ads[currentSlide].buttonText}</span>
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {ads.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => goToSlide(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative"
                        >
                            <Circle
                                size={10}
                                className={`transition-all duration-300 ${index === currentSlide
                                        ? 'fill-white text-white drop-shadow-lg'
                                        : 'fill-white/40 text-white/40'
                                    }`}
                            />
                            {index === currentSlide && (
                                <motion.div
                                    layoutId="activeDot"
                                    className="absolute inset-0 rounded-full bg-white/30 blur-sm"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        key={currentSlide}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default AdvertisementBanner;