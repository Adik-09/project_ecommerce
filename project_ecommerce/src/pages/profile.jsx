import { useState, useEffect } from "react";
import axiosInstance from "../components/axiosInstance";
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Save, X, Upload, User, Mail, Phone, Camera } from 'lucide-react';

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
            const token = localStorage.getItem("accessToken");
            try {
                const response = await axiosInstance.get("/user/me/");
                console.log(response.data)
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

            await axios.put("http://127.0.0.1:8000/user/API/", payload, {
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
        { name: 'firstName', label: 'First Name', icon: User, type: 'text' },
        { name: 'lastName', label: 'Last Name', icon: User, type: 'text' },
        { name: 'email', label: 'Email', icon: Mail, type: 'email' },
        { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' }
    ];

    return (
        <div className="min-h-screen py-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div
                        className="inline-block backdrop-blur-3xl bg-white/25 rounded-3xl px-8 py-6 border-2 border-white/70 shadow-2xl"
                        style={{
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 1), inset 0 0 40px rgba(255, 255, 255, 0.4)'
                        }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
                            My Profile
                        </h1>
                        <p className="text-gray-700 mt-2 font-medium drop-shadow-sm">
                            Manage your personal information
                        </p>
                    </div>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="backdrop-blur-3xl bg-white/25 rounded-[2.5rem] border-2 border-white/70 shadow-2xl overflow-hidden"
                    style={{
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 1), inset 0 0 40px rgba(255, 255, 255, 0.4)'
                    }}
                >
                    <div className="p-8 md:p-12">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="relative group">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl backdrop-blur-sm"
                                    style={{
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.8)'
                                    }}
                                >
                                    <img
                                        src={avatarPreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                {isEditing && (
                                    <motion.label
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="absolute bottom-0 right-0 backdrop-blur-2xl bg-white/50 p-3 rounded-full border-2 border-white/90 shadow-xl cursor-pointer"
                                        style={{
                                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1)'
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
                            </div>
                            <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900 drop-shadow-sm">
                                {formData.firstName} {formData.lastName}
                            </h2>
                            <p className="text-gray-700 font-medium mt-1">@{formData.username}</p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-6">
                            {inputFields.map((field, index) => {
                                const Icon = field.icon;
                                return (
                                    <motion.div
                                        key={field.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <label className="block text-sm font-semibold text-gray-800 mb-2 drop-shadow-sm">
                                            {field.label}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <Icon size={20} className="text-gray-600" />
                                            </div>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl backdrop-blur-2xl border-2 transition-all text-gray-900 font-medium ${isEditing
                                                    ? 'bg-white/40 border-white/80 focus:border-white focus:bg-white/50'
                                                    : 'bg-white/20 border-white/60 cursor-not-allowed'
                                                    }`}
                                                style={{
                                                    boxShadow: isEditing
                                                        ? '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)'
                                                        : '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
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
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleEdit}
                                        className="backdrop-blur-2xl bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-3.5 rounded-full shadow-xl border-2 border-white/30 flex items-center gap-2 font-semibold"
                                        style={{
                                            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                        }}
                                    >
                                        <Edit2 size={20} />
                                        <span>Edit Profile</span>
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        key="save-cancel"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex gap-4"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCancel}
                                            className="backdrop-blur-2xl bg-white/40 text-gray-800 px-8 py-3.5 rounded-full shadow-xl border-2 border-white/70 flex items-center gap-2 font-semibold hover:bg-white/50 transition-all"
                                            style={{
                                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)'
                                            }}
                                        >
                                            <X size={20} />
                                            <span>Cancel</span>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="backdrop-blur-2xl bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3.5 rounded-full shadow-xl border-2 border-white/30 flex items-center gap-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                                            style={{
                                                boxShadow: '0 6px 24px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
    );
};

export default ProfilePage;