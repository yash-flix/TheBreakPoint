import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
    const whatsappNumber = "918329761217"; // Placeholder
    const whatsappMessage = encodeURIComponent("Hi Breakpoint, I have an idea to work on and would like to discuss it.");

    // Function to open WhatsApp (handles both desktop and mobile)
    const handleWhatsAppClick = () => {
        window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`, '_blank');
    };

    const handleEmailClick = () => {
        window.location.href = "mailto:contact@breakpoint.digital?subject=Project%20Inquiry&body=Hi%20Breakpoint%2C%20I'd%20like%20to%20discuss%20a%20project.";
    };



    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-0">
            {/* Background Gradients - Subtle and Premium */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full text-center z-10"
            >
                {/* Hero Text */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Let’s talk about your next project
                </h1>
                <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    We’re here to listen, plan, and build. Tell us what you’re envisioning.
                </p>

                {/* Contact Actions */}
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-2xl mx-auto">
                    {/* WhatsApp Button */}
                    <button
                        onClick={handleWhatsAppClick}
                        className="group relative flex items-center justify-center gap-3 w-full md:w-auto min-w-[280px] px-8 py-5 bg-[#25D366] hover:bg-[#1faa53] text-white rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/20"
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span className="text-lg font-semibold">Chat on WhatsApp</span>
                    </button>

                    {/* Email Button */}

                    <button
                        // onClick={handleEmailClick}
                        className="group relative flex items-center justify-center gap-3 w-full md:w-auto min-w-[280px] px-8 py-5 bg-white hover:bg-neutral-100 text-neutral-950 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-white/10"
                    >
                        <Mail className="w-6 h-6" />
                        <span className="text-lg font-semibold"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=thebreakpoint.inc@gmail.com&su=Project%20Inquiry&body=Hi%20Breakpoint%2C%20I%20have%20a%20project%20idea%20to%20discuss." target="_blank" rel="noopener noreferrer" className="email-btn">
                            Email Us
                        </a></span>
                    </button>
                </div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-12 text-sm text-neutral-500"
                >
                    We respond within 24 hours
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Contact;
