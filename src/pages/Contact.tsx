import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MessageCircle, CheckCircle } from 'lucide-react';

const Contact = () => {
    const whatsappNumber = "918329761217"; // Placeholder
    const contactNumber = "+91 83297 61217";
    const emailAddress = "thebreakpoint.inc@gmail.com";

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiBaseUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone, // Mapping phone to contact for backend consistency if needed
                    subject: formData.subject,
                    // This maps to the optional `message` field in the backend Contact model
                    message: formData.message
                }),
            });

            if (response.ok) {
                console.log('Contact form successfully stored in backend');
                setIsSuccess(true);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                const errorText = await response.text();
                console.error('Failed to submit contact form:', response.status, errorText);
                alert('There was a problem submitting your message. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Unable to reach the server. Please check your connection or try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent("Hi, I'd like to discuss a project.");
        window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200">
            {/* Header Section */}
            <section className="relative py-20 px-4 md:px-0 bg-neutral-900/50 border-b border-neutral-800">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-neutral-400 max-w-2xl mx-auto"
                    >
                        Have a question about our products or want to place a bulk order? We'd love to hear from you.
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-semibold text-white mb-8">Send us a Message</h2>

                        {isSuccess ? (
                            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center py-16">
                                <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-500 mb-4">
                                    <CheckCircle size={48} />
                                </div>
                                <h3 className="text-2xl font-medium text-white mb-2">Message Sent!</h3>
                                <p className="text-neutral-400">We will get back to you soon.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-6 text-sm text-neutral-500 hover:text-white underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-neutral-400">Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-neutral-600"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-neutral-400">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-neutral-600"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-neutral-400">Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-neutral-600"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-neutral-400">Subject *</label>
                                        <div className="relative">
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all appearance-none text-white text-sm"
                                            >
                                                <option value="" disabled>Select a subject</option>
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Project Proposal">Project Proposal</option>
                                                {/* <option value="Bulk Order">Bulk Order</option> */}
                                                <option value="Support">Support</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-neutral-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-neutral-400">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-neutral-600 resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors duration-300 flex items-center justify-center gap-2 group"
                                >
                                    {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Right Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-8">Quick Contact</h2>
                            <div className="space-y-4">
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="w-full py-4 bg-[#25D366] hover:bg-[#1faa53] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-wide"
                                >
                                    <MessageCircle size={20} />
                                    Chat on WhatsApp
                                </button>
                                <a
                                    href={`tel:${contactNumber}`}
                                    className="w-full py-4 border border-neutral-700 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-wide"
                                >
                                    <Phone size={20} />
                                    Call: {contactNumber}
                                </a>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-neutral-900 rounded-lg text-neutral-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                                    <p className="text-neutral-400">{emailAddress}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-neutral-900 rounded-lg text-neutral-400">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-1">Business Hours</h3>
                                    <p className="text-neutral-400">Mon - Sat: 10:00 AM - 7:00 PM</p>
                                    <p className="text-neutral-400">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>


                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
