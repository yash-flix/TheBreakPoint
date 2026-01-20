import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layout, Smartphone, Globe, PenTool, Server, CheckCircle2 } from 'lucide-react';
import ContactForm from '../components/ContactForm';

// --- Reusable Components ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'ghost' | 'outline' | 'white';
    size?: 'default' | 'lg' | 'icon';
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            default: "bg-white text-black hover:bg-neutral-200 border border-transparent",
            ghost: "hover:bg-neutral-800 hover:text-white text-neutral-300",
            outline: "border border-neutral-700 hover:bg-neutral-800 text-white hover:border-white/50",
            white: "bg-white text-black hover:bg-neutral-100 border border-white shadow-lg shadow-white/10"
        };

        const sizes = {
            default: "h-11 px-6 py-2",
            lg: "h-14 px-8 py-4 text-base",
            icon: "h-10 w-10"
        };

        return (
            <button
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

function AnimatedContainer({ className = '', delay = 0.1, children }: { className?: string; delay?: number; children: React.ReactNode }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// FloatPaths Background (Kept from previous version)
function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-white" viewBox="0 0 696 316" fill="none">
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

// --- Sections ---

function HeroSection({ onOpenContactForm }: { onOpenContactForm: () => void }) {
    return (
        <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-neutral-950 pt-20">
            <div className="absolute inset-0 opacity-20">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-neutral-500">
                        THE BREAKPOINT
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg md:text-xl lg:text-2xl text-neutral-400 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        Breakpoint builds refined, high-performing websites for businesses that value design, clarity, and credibility.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button size="lg" onClick={onOpenContactForm} variant="white">
                            Lets break into your idea
                        </Button>
                        <Button size="lg" variant="outline" onClick={onOpenContactForm}>
                            Book a consultation
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

function PositioningSection() {
    return (
        <section className="py-24 bg-neutral-950 border-t border-neutral-900">
            <div className="container mx-auto px-4">
                <AnimatedContainer className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-neutral-200">
                        A strong online presence isn’t optional anymore.
                    </h2>
                    <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light">
                        At Breakpoint, we craft websites that look exceptional, communicate with precision, and convert more of the right customers.
                    </p>
                </AnimatedContainer>
            </div>
        </section>
    );
}

function ServicesSection() {
    const services = [
        { icon: <Layout className="w-6 h-6" />, label: "Business website development" },
        { icon: <PenTool className="w-6 h-6" />, label: "Portfolio & personal brand sites" },
        { icon: <Globe className="w-6 h-6" />, label: "E-commerce setup" },
        { icon: <Smartphone className="w-6 h-6" />, label: "UI/UX design" },
        { icon: <CheckCircle2 className="w-6 h-6" />, label: "Content & brand messaging support" },
        { icon: <Server className="w-6 h-6" />, label: "Hosting & technical maintenance" },
    ];

    return (
        <section className="py-24 bg-neutral-900/50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <AnimatedContainer>
                        <h2 className="text-sm font-semibold tracking-wider text-blue-400 uppercase mb-4">What we offer</h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-6">Premium website development for growing brands.</h3>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            Our work blends design, strategy, and technology to create digital experiences that feel effortless and work beautifully.
                        </p>
                    </AnimatedContainer>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {services.map((service, idx) => (
                            <AnimatedContainer key={idx} delay={0.2 + idx * 0.1}>
                                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors group">
                                    <div className="mb-4 text-neutral-400 group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                    <h4 className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors">{service.label}</h4>
                                </div>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TargetAudienceSection() {
    return (
        <section className="py-24 bg-neutral-950">
            <div className="container mx-auto px-4 text-center">
                <AnimatedContainer className="max-w-3xl mx-auto">
                    <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase mb-4">Who we work with</h2>
                    <p className="text-3xl md:text-4xl font-medium leading-tight mb-8">
                        We partner with businesses that understand the value of thoughtful presentation and customer experience.
                    </p>
                    <div className="h-px w-24 bg-neutral-800 mx-auto mb-8" />
                    <p className="text-xl text-neutral-400">
                        From restaurants to real estate firms, studios to consultants, Breakpoint elevates brands ready to be taken seriously online.
                    </p>
                </AnimatedContainer>
            </div>
        </section>
    );
}

function WhyChooseUsSection() {
    const reasons = [
        "visually refined",
        "mobile-first & performance focused",
        "intuitive for customers",
        "optimized to convert",
        "easy to manage long-term"
    ];

    return (
        <section className="py-24 bg-neutral-900 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4">
                <AnimatedContainer className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Why brands choose Breakpoint</h2>
                    <p className="text-2xl md:text-3xl font-light text-neutral-300">
                        Clarity in communication. Elegance in design. Intelligence in execution.
                    </p>
                </AnimatedContainer>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                    <AnimatedContainer delay={0.2} className="relative">
                        <div className="relative z-10 p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl">
                            <h3 className="text-xl font-semibold mb-6">Websites we build are:</h3>
                            <ul className="space-y-4">
                                {reasons.map((reason, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-neutral-300">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        {reason}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Decorative background element behind the card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 transform md:translate-x-4 md:translate-y-4 rounded-3xl -z-10 blur-sm" />
                    </AnimatedContainer>

                    <AnimatedContainer delay={0.4} className="text-center md:text-left">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold tracking-tight">Great design doesn’t shout;<br /> <span className="text-neutral-500">it convinces.</span></h3>
                            <p className="text-neutral-400 text-lg">
                                We don't just put pixels on a screen. We build systems that work for your business day and night.
                            </p>
                        </div>
                    </AnimatedContainer>
                </div>
            </div>
        </section>
    );
}

function ProcessSection() {
    const steps = [
        "Discover your brand, audience, and goals",
        "Craft a clean structure and message",
        "Design with precision and personality",
        "Develop for performance and usability",
        "Launch, support, and refine as needed"
    ];

    return (
        <section className="py-24 bg-neutral-950">
            <div className="container mx-auto px-4">
                <AnimatedContainer className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase mb-4">Our process</h2>
                    <h3 className="text-4xl font-bold mb-4">Collaborative and straightforward.</h3>
                    <p className="text-neutral-400">No clutter. No confusion. Just thoughtful digital craftsmanship.</p>
                </AnimatedContainer>

                <div className="max-w-4xl mx-auto">
                    {steps.map((step, idx) => (
                        <AnimatedContainer key={idx} delay={idx * 0.1}>
                            <div className="flex gap-6 md:gap-10 pb-12 group last:pb-0 relative">
                                {/* Line connector */}
                                {idx !== steps.length - 1 && (
                                    <div className="absolute left-[19px] top-10 bottom-0 w-px bg-neutral-800 group-hover:bg-neutral-700 transition-colors" />
                                )}

                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 font-semibold group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    {idx + 1}
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-xl md:text-2xl font-medium text-neutral-200 group-hover:text-white transition-colors">{step}</h4>
                                </div>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CallToActionSection({ onOpenContactForm }: { onOpenContactForm: () => void }) {
    return (
        <section className="py-32 bg-neutral-950">
            <div className="container mx-auto px-4 text-center">
                <AnimatedContainer className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                        If your business deserves a website that elevates how the world sees you, we’d love to talk.
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                        <Button size="lg" onClick={onOpenContactForm} className="min-w-[180px]">
                            Request pricing
                        </Button>
                        <Button size="lg" variant="outline" onClick={onOpenContactForm} className="min-w-[180px]">
                            Book a consultation
                        </Button>
                    </div>
                </AnimatedContainer>
            </div>
        </section>
    );
}

// --- Main Page Component ---

export default function Home() {
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    const toggleContactForm = () => setIsContactFormOpen(true);

    return (
        <main className="bg-neutral-950 min-h-screen text-white selection:bg-white/20">
            <HeroSection onOpenContactForm={toggleContactForm} />
            <PositioningSection />
            <ServicesSection />
            <TargetAudienceSection />
            <WhyChooseUsSection />
            {/* <ProcessSection /> */}
            <CallToActionSection onOpenContactForm={toggleContactForm} />

            <ContactForm
                isOpen={isContactFormOpen}
                onClose={() => setIsContactFormOpen(false)}
            />
        </main>
    )
}
