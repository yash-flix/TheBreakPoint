import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

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
                onClose();
                setFormData({ name: '', email: '', contact: '', subject: '' });
                alert('Message sent successfully!');
            } else {
                console.error('Failed to submit form');
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Prevent click on backdrop from closing if clicking inside modal
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
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
                            <h2 className="text-2xl font-semibold text-white">Let's Connect</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 transition-colors rounded-full hover:bg-neutral-800 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                                        placeholder="John Doe"
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
                                        placeholder="john@example.com"
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
                                        placeholder="+1 (555) 000-0000"
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
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactForm;
