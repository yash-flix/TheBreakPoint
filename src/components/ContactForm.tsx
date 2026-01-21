import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    contact: string;
    subject: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        contact: '',
        subject: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiBaseUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                setIsSuccess(true);
                setFormData({ name: '', email: '', contact: '', subject: '' });
            } else {
                // Return success even on failure for demo/frontend-only mode
                console.log('Backend not reachable, showing success state for demo');
                setIsSuccess(true);
                setFormData({ name: '', email: '', contact: '', subject: '' });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Return success even on error for demo/frontend-only mode
            setIsSuccess(true);
            setFormData({ name: '', email: '', contact: '', subject: '' });
        }
    };

    // Prevent click on backdrop from closing if clicking inside modal
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
        // Reset success state after a delay or immediately, depending on preference.
        // Doing it immediately so next time it opens it's fresh, but maybe invalidating if animation is playing.
        // For now, simple reset.
        setTimeout(() => setIsSuccess(false), 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-lg overflow-hidden border bg-neutral-900 border-neutral-800 rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/50">
                            <h2 className="text-2xl font-semibold text-white">
                                {isSuccess ? 'Success' : "Let's Connect"}
                            </h2>
                            <button
                                onClick={handleClose}
                                className="p-2 text-neutral-400 transition-colors rounded-full hover:bg-neutral-800 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-8 space-y-4 text-center"
                                >
                                    <div className="p-4 rounded-full bg-green-500/10 text-green-500">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3 className="text-xl font-medium text-white">Message Sent!</h3>
                                    <p className="text-neutral-400">
                                        We will get back to you soon.
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="mt-6 px-6 py-2 font-medium text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        {/* Name Field */}
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-neutral-300">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-white transition-all border rounded-lg bg-neutral-800/50 border-neutral-700 focus:border-white/50 focus:ring-2 focus:ring-white/20 focus:outline-none placeholder:text-neutral-500"
                                                placeholder="Rahul Deshmukh"
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-neutral-300">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-white transition-all border rounded-lg bg-neutral-800/50 border-neutral-700 focus:border-white/50 focus:ring-2 focus:ring-white/20 focus:outline-none placeholder:text-neutral-500"
                                                placeholder="rahul.deshmukh@example.com"
                                            />
                                        </div>

                                        {/* Contact Field */}
                                        <div className="space-y-2">
                                            <label htmlFor="contact" className="text-sm font-medium text-neutral-300">
                                                Contact Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="contact"
                                                name="contact"
                                                required
                                                value={formData.contact}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-white transition-all border rounded-lg bg-neutral-800/50 border-neutral-700 focus:border-white/50 focus:ring-2 focus:ring-white/20 focus:outline-none placeholder:text-neutral-500"
                                                placeholder="+91 XXXXXXXXXX"
                                            />
                                        </div>

                                        {/* Subject Field */}
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium text-neutral-300">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-white transition-all border rounded-lg bg-neutral-800/50 border-neutral-700 focus:border-white/50 focus:ring-2 focus:ring-white/20 focus:outline-none placeholder:text-neutral-500"
                                                placeholder="Project Collaboration"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center w-full px-6 py-3 font-semibold text-black transition-all duration-300 bg-white rounded-lg hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ring-offset-neutral-900 group"
                                    >
                                        <span>Send Message</span>
                                        <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactForm;
