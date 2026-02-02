import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShoppingBag,
    ArrowRight,
    User
} from "lucide-react";
import axios from "axios";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        phone: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                const response = await axios.post(
                    "http://127.0.0.1:8000/login/",
                    {
                        username: formData.username,
                        password: formData.password
                    }
                );

                const { access, refresh } = response.data;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);

                // Optional: set default auth header
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${access}`;


                window.location.href = "/home";
            } else {

                const response = await axios.post(
                    "http://127.0.0.1:8000/register/",
                    {
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                        phone: formData.phone
                    }
                );

                console.log("Register success:", response.status);

                setIsLogin(true);
            }
        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
            alert("Authentication failed");
        }
    };


    const toggleMode = () => {
        setIsLogin((prev) => !prev);

        requestAnimationFrame(() => {
            document.querySelector(".glass-scroll")?.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        setFormData({
            email: "",
            password: "",
            username: "",
            phone: ""
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
            {/* Background */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(10px)",
                    transform: "scale(1.12)"
                }}
            />
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-white/30 via-white/20 to-white/10" />

            {/* Card Wrapper */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-lg md:max-w-xl"
            >
                {/* Card */}
                <motion.div
                    layout
                    dir="ltr"
                    className="relative backdrop-blur-3xl bg-white/25 rounded-[2.75rem] border-2 border-white/70 shadow-2xl overflow-hidden"
                    transition={{
                        layout: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1]
                        }
                    }}
                    style={{
                        boxShadow:
                            "0 25px 80px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,1), inset 0 0 80px rgba(255,255,255,0.45)"
                    }}
                >
                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-[2.75rem] pointer-events-none border border-white/40" />

                    {/* Header */}
                    <div className="text-center pt-12 pb-8 px-10">
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-700 via-gray-600 to-gray-900 flex items-center justify-center shadow-2xl"
                        >
                            <ShoppingBag size={36} className="text-white" />
                        </motion.div>

                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                            Welcome to SnapMart
                        </h1>

                        <p className="text-gray-700 font-medium">
                            {isLogin
                                ? "Sign in to continue shopping"
                                : "Create your account today"}
                        </p>
                    </div>

                    {/* Form */}
                    <motion.form
                        layout
                        onSubmit={handleSubmit}
                        className="px-10 pb-10 space-y-5"
                    >
                        <label className="label">Username</label>
                        <Input
                            icon={<User size={20} />}
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                        />

                        <AnimatePresence mode="popLayout">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="label">Email</label>
                                    <Input
                                        icon={<Mail size={20} />}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@example.com"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <label className="label">Password</label>
                        <div className="relative">
                            <Input
                                icon={<Lock size={20} />}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                right
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="label">Phone Number</label>
                                    <Input
                                        icon={<Lock size={20} />}
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 XXXX-XXXX-XX"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-4 rounded-2xl shadow-2xl font-bold text-lg flex items-center justify-center gap-2"
                        >
                            {isLogin ? "Sign In" : "Create Account"}

                        </motion.button>

                        <p className="text-center text-gray-700 font-medium">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="font-bold underline"
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </motion.form>
                </motion.div>
            </motion.div>

        </div>
    );
};

const Input = ({ icon, right, ...props }) => (
    <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
            {icon}
        </div>
        <input
            {...props}
            className={`w-full ${right ? "pr-12" : "pr-4"
                } pl-12 py-3.5 rounded-2xl backdrop-blur-2xl bg-white/40 border-2 border-white/80 text-gray-900 font-medium placeholder:text-gray-500 focus:bg-white/60 transition-all`}
        />
    </div>
);

export default LoginPage;
