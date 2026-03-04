import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Base = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: "Home", path: "/snapMart/home/" },
        { name: "Orders", path: "/snapMart/orders/" },
        { name: "Cart", path: "/snapMart/myCart/" },
        { name: "About Us", path: "/snapMart/about/" }
    ];

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div className="min-h-screen relative overflow-hidden">

            {/* Background Image */}
            <div
                className="fixed inset-0 z-0 scale-100"
                style={{
                    backgroundImage: "url('/images/bg.jpeg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(4px)'
                }}
            />

            {/* Global soft overlay */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-white/30 via-white/20 to-white/10" />

            {/* Navbar contrast layer */}
            <div className="fixed top-0 left-0 w-full h-36 z-[1] bg-gradient-to-b from-black/55 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10">

                {/* Header */}
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'w-[92%] md:w-[90%]' : 'w-[96%] md:w-[94%]'
                        }`}
                >
                    <div
                        className={`backdrop-blur-[40px] rounded-[2.5rem] border border-white/90 transition-all duration-500 ${scrolled ? 'py-2.5 px-6 bg-white/85' : 'py-4 px-8 bg-white/70'
                            }`}
                        style={{
                            boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
                        }}
                    >
                        <div className="flex items-center justify-between">

                            {/* Logo */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate('/snapMart/home/')}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg">
                                    <ShoppingCart size={18} className="text-white" />
                                </div>
                                <span className="font-bold text-xl md:text-2xl text-black drop-shadow-sm">
                                    SnapMart
                                </span>
                            </motion.div>

                            {/* Nav Links */}
                            <nav className="flex gap-3">
                                {navItems.map((item) => (
                                    <motion.button
                                        key={item.name}
                                        onClick={() => navigate(item.path)}
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.94 }}
                                        className="relative px-8 md:px-9 py-3 text-lg md:text-xl font-semibold"
                                    >
                                        {/* Active Glass Pill */}
                                        {isActive(item.path) && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 rounded-full backdrop-blur-3xl bg-white/90 border border-white/80"
                                                style={{
                                                    boxShadow:
                                                        '0 14px 45px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,1)'
                                                }}
                                                transition={{
                                                    type: 'spring',
                                                    bounce: 0.25,
                                                    duration: 0.55
                                                }}
                                            />
                                        )}

                                        {/* Label */}
                                        <span
                                            className={`relative z-10 tracking-wide transition-colors drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] ${isActive(item.path)
                                                ? 'text-black'
                                                : 'text-gray-800 hover:text-black'
                                                }`}
                                        >
                                            {item.name}
                                        </span>

                                        {/* Hover underline */}
                                        {!isActive(item.path) && (
                                            <motion.div
                                                className="absolute bottom-1 left-1/2 h-[2px] rounded-full bg-gradient-to-r from-gray-400 to-gray-700"
                                                initial={{ width: 0, x: '-50%' }}
                                                whileHover={{ width: '70%' }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </nav>

                            {/* Profile */}
                            <motion.button
                                whileHover={{ scale: 1.08, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/snapMart/profile/')}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-2xl border border-white/90 shadow-lg"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-900 flex items-center justify-center text-white text-sm font-bold">
                                    JD
                                </div>
                                <span className="hidden md:block text-sm font-semibold text-black">
                                    Profile
                                </span>
                            </motion.button>

                        </div>
                    </div>
                </motion.header>

                {/* Page Content */}
                <div className="pt-28">
                    <Outlet />
                </div>

                {/* Footer */}
                <footer className="mt-20 rounded-t-[3rem] bg-gray-900/90 backdrop-blur-3xl border-t border-white/20">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-300 text-sm">
                        <p>© 2026 SnapMart. All rights reserved.</p>

                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -4, scale: 1.15 }}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
                                >
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
};

export default Base;