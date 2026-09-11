import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MessageCircle, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { Accent, Backdrop, Button, Container, Display, Eyebrow } from '../components/ui';
import { SignalDome } from '../components/visuals';

const API_BASE_URL = "https://thebreakpoint-backend.onrender.com";

const inputClass =
    'w-full rounded-xl border hairline bg-ink-900/70 px-4 py-3.5 text-[15px] text-mist-50 ' +
    'outline-none transition-all duration-300 placeholder:text-mist-700 ' +
    'focus:border-ice-300/50 focus:ring-2 focus:ring-ice-300/15';

const labelClass = 'font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500';

const Contact = () => {
    useAutoScroll();
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
            // const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
            console.log('Form data:', {
                name: formData.name,
                email: formData.email,
                contact: formData.phone,
                subject: formData.subject,
                message: formData.message
            });

            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                    subject: formData.subject,

                    message: formData.message
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Contact form successfully stored in backend:', result);
                setIsSuccess(true);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                const errorText = await response.text();
                console.error('❌ Failed to submit contact form:', response.status, errorText);
                let errorMessage = 'There was a problem submitting your message.';
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.msg || errorMessage;
                } catch (e) {
                    // If errorText is not JSON, use it as is
                    errorMessage = errorText || errorMessage;
                }
                alert(`Error: ${errorMessage}`);
            }
        } catch (error: any) {
            console.error('❌ Network error:', error);
            const errorMessage = error.message || 'Unable to reach the server.';
            alert(`Connection Error: ${errorMessage}\n\nPlease make sure the backend server is running on port 5001.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent("Hi, I'd like to discuss a project.");
        window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`, '_blank');
    };

    return (
        <main className="bg-ink-950 text-mist-100">
            {/* Header */}
            <section className="relative overflow-hidden border-b hairline pt-40 pb-20">
                <Backdrop />
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/3 top-0 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-ice-500/[0.12] blur-[120px]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[24rem] opacity-70 sm:h-[28rem]"
                >
                    <SignalDome />
                </div>
                <Container className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-3xl"
                    >
                        <Eyebrow className="mb-8">Get in touch</Eyebrow>
                        <Display as="h1" className="text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
                            Let's find the first thing worth <Accent>automating.</Accent>
                        </Display>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist-300/80">
                            Tell us what the workflow looks like today. We'll come back with a
                            straight answer on whether AI is the right tool, and what a first
                            slice would cost to prove.
                        </p>
                    </motion.div>
                </Container>
            </section>

            <Container className="py-20 sm:py-24">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
                    {/* Left column: form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-7"
                    >
                        <Eyebrow index="01" className="mb-8">
                            Send a message
                        </Eyebrow>

                        {isSuccess ? (
                            <div className="surface surface-hi px-8 py-20 text-center">
                                <div className="mb-6 inline-flex rounded-full bg-ice-300/10 p-4 text-ice-300">
                                    <CheckCircle size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-3xl font-medium tracking-[-0.02em] text-mist-50">Message sent</h3>
                                <p className="mt-3 text-[15px] text-mist-500">
                                    We'll get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-700 underline underline-offset-4 transition-colors hover:text-ice-300"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2.5">
                                        <label htmlFor="name" className={labelClass}>Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label htmlFor="email" className={labelClass}>Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2.5">
                                        <label htmlFor="phone" className={labelClass}>Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label htmlFor="subject" className={labelClass}>Subject *</label>
                                        <div className="relative">
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className={`${inputClass} appearance-none pr-11`}
                                            >
                                                <option value="" disabled>Select a subject</option>
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Project Proposal">Project Proposal</option>
                                                {/* <option value="Bulk Order">Bulk Order</option> */}
                                                <option value="Support">Support</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-mist-700">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <label htmlFor="message" className={labelClass}>Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`${inputClass} resize-none`}
                                        placeholder="What are you trying to build or automate?"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="group w-full"
                                >
                                    {isSubmitting ? 'Sending…' : 'Send message'}
                                    {!isSubmitting && (
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    )}
                                </Button>
                            </form>
                        )}
                    </motion.div>

                    {/* Right column: direct channels */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5"
                    >
                        <Eyebrow index="02" className="mb-8">
                            Or reach us directly
                        </Eyebrow>

                        <div className="space-y-3">
                            <button
                                onClick={handleWhatsAppClick}
                                className="flex w-full items-center justify-center gap-3 rounded-full border hairline bg-ink-900/70 py-4 text-sm font-medium text-mist-50 transition-all duration-300 hover:border-ice-300/40 hover:bg-ice-300/[0.06]"
                            >
                                <MessageCircle size={17} strokeWidth={1.5} />
                                Chat on WhatsApp
                            </button>
                            <a
                                href={`tel:${contactNumber}`}
                                className="flex w-full items-center justify-center gap-3 rounded-full border hairline bg-ink-900/70 py-4 text-sm font-medium text-mist-50 transition-all duration-300 hover:border-ice-300/40 hover:bg-ice-300/[0.06]"
                            >
                                <Phone size={17} strokeWidth={1.5} />
                                {contactNumber}
                            </a>
                        </div>

                        <div className="surface mt-10 overflow-hidden">
                            <div className="flex items-start gap-5 p-7">
                                <Mail size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-ice-300/80" />
                                <div>
                                    <h3 className={labelClass}>Email</h3>
                                    <p className="mt-2 break-all text-[15px] text-mist-300/85">
                                        {emailAddress}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5 border-t hairline p-7">
                                <Clock size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-ice-300/80" />
                                <div>
                                    <h3 className={labelClass}>Business hours</h3>
                                    <p className="mt-2 text-[15px] text-mist-300/85">
                                        Mon – Sat: 10:00 AM – 7:00 PM
                                    </p>
                                    <p className="text-[15px] text-mist-500">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-10 text-[15px] leading-relaxed text-mist-500">
                            Prefer to come with a spec? Send it over. Prefer to think out loud?
                            That works too. Either way you'll hear back from the person who would
                            build it.
                        </p>
                    </motion.div>
                </div>
            </Container>
        </main>
    );
};

export default Contact;
