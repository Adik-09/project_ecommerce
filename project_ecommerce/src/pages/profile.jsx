import { useState, useEffect } from "react";
import axiosInstance from "../components/axiosInstance";
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Save, X, User, Mail, Phone, Camera, ShoppingBag, Heart, Package } from 'lucide-react';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80'
    );

    const [formData, setFormData] = useState({});
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("snapMart/user/me/");
                setFormData(response.data);
                setOriginalData(response.data);
                setAvatarPreview(response.data.avatar || avatarPreview);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                setFormData(prev => ({
                    ...prev,
                    avatar: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = () => {
        setOriginalData({ ...formData });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData({ ...originalData });
        setAvatarPreview(originalData.avatar || avatarPreview);
        setIsEditing(false);
    };

    const handleSave = async () => {
        setIsSaving(true);

        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, value);
            });

            await axiosInstance.patch("snapMart/user/me/", payload, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setOriginalData({ ...formData });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving profile:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const inputFields = [
        { name: 'username', label: 'Username', icon: User, type: 'text' },
        { name: 'first_name', label: 'First Name', icon: User, type: 'text' },
        { name: 'last_name', label: 'Last Name', icon: User, type: 'text' },
        { name: 'email', label: 'Email', icon: Mail, type: 'email' },
        { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' }
    ];

    const stats = [
        { icon: ShoppingBag, label: 'Orders', value: '12', color: 'from-blue-500 to-blue-600' },
        { icon: Heart, label: 'Wishlist', value: '8', color: 'from-red-500 to-red-600' },
        { icon: Package, label: 'Delivered', value: '10', color: 'from-green-500 to-green-600' }
    ];

    // Floating animation variants
    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image with Blur */}
            <div className="fixed inset-0 z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        filter: 'blur(8px)',
                        transform: 'scale(1.1)'
                    }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20" />
            </div>

            {/* Animated overlay effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Floating shapes */}
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-20 left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 1 }}
                    className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 2 }}
                    className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl"
                />
            </div>

            {/* Decorative shopping icons */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        rotate: 360,
                        x: [0, 100, 0],
                        y: [0, -100, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 right-20 opacity-10"
                >
                    <ShoppingBag size={120} className="text-gray-600" />
                </motion.div>
                <motion.div
                    animate={{
                        rotate: -360,
                        x: [0, -80, 0],
                        y: [0, 80, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-32 left-20 opacity-10"
                >
                    <Package size={100} className="text-gray-600" />
                </motion.div>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 right-32 opacity-10"
                >
                    <Heart size={90} className="text-gray-600" />
                </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 py-12 px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
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
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                            }}
                        >
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent drop-shadow-lg"
                                initial={{ letterSpacing: "0.1em", opacity: 0 }}
                                animate={{ letterSpacing: "0em", opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                My Profile
                            </motion.h1>
                            <motion.p
                                className="text-gray-700 mt-2 font-medium drop-shadow-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Manage your personal information
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="backdrop-blur-lg bg-white/50 rounded-2xl p-6 border border-white/60 shadow-lg"
                                style={{
                                    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.08)'
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <stat.icon size={24} className="text-white" />
                                    </motion.div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="backdrop-blur-xl bg-white/50 rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden"
                        style={{
                            boxShadow: '0 6px 30px rgba(0, 0, 0, 0.12)'
                        }}
                    >
                        <div className="p-8 md:p-12">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center mb-10">
                                <motion.div
                                    className="relative group"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                        className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/80 shadow-xl backdrop-blur-sm relative"
                                        style={{
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                                        }}
                                    >
                                        <img
                                            src={avatarPreview}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Animated ring */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full border-4 border-blue-500"
                                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </motion.div>

                                    {isEditing && (
                                        <motion.label
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ scale: 1.2, rotate: 15 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute bottom-0 right-0 backdrop-blur-lg bg-white/70 p-3 rounded-full border border-white/80 shadow-lg cursor-pointer"
                                            style={{
                                                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)'
                                            }}
                                        >
                                            <Camera size={20} className="text-gray-800" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                            />
                                        </motion.label>
                                    )}
                                </motion.div>
                                <motion.h2
                                    className="mt-6 text-2xl md:text-3xl font-bold text-gray-900 drop-shadow-sm"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {formData.first_name} {formData.last_name}
                                </motion.h2>
                                <motion.p
                                    className="text-gray-700 font-medium mt-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    @{formData.username}
                                </motion.p>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-6">
                                {inputFields.map((field, index) => {
                                    const Icon = field.icon;
                                    return (
                                        <motion.div
                                            key={field.name}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + index * 0.1 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <label className="block text-sm font-semibold text-gray-800 mb-2 drop-shadow-sm">
                                                {field.label}
                                            </label>
                                            <div className="relative">
                                                <motion.div
                                                    className="absolute left-4 top-1/2 -translate-y-1/2"
                                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                                >
                                                    <Icon size={20} className="text-gray-600" />
                                                </motion.div>
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name] || ''}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl backdrop-blur-md border transition-all text-gray-900 font-medium ${isEditing
                                                        ? 'bg-white/60 border-white/70 focus:border-white focus:bg-white/70'
                                                        : 'bg-white/40 border-white/50 cursor-not-allowed'
                                                        }`}
                                                    style={{
                                                        boxShadow: isEditing
                                                            ? '0 2px 12px rgba(0, 0, 0, 0.08)'
                                                            : '0 1px 6px rgba(0, 0, 0, 0.05)'
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-10 flex gap-4 justify-center">
                                <AnimatePresence mode="wait">
                                    {!isEditing ? (
                                        <motion.button
                                            key="edit"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{ scale: 1.05, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleEdit}
                                            className="backdrop-blur-md bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-3.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2 font-semibold"
                                            style={{
                                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                                            }}
                                        >
                                            <Edit2 size={20} />
                                            <span>Edit Profile</span>
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            key="save-cancel"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex gap-4"
                                        >
                                            <motion.button
                                                whileHover={{ scale: 1.05, y: -3 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleCancel}
                                                className="backdrop-blur-md bg-white/60 text-gray-800 px-8 py-3.5 rounded-full shadow-lg border border-white/60 flex items-center gap-2 font-semibold hover:bg-white/70 transition-all"
                                                style={{
                                                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
                                                }}
                                            >
                                                <X size={20} />
                                                <span>Cancel</span>
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.05, y: -3 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleSave}
                                                disabled={isSaving}
                                                className="backdrop-blur-md bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                                                style={{
                                                    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
                                                }}
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                        />
                                                        <span>Saving...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save size={20} />
                                                        <span>Save Changes</span>
                                                    </>
                                                )}
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;