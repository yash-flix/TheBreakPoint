import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const testimonials = [
    {
        text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Briana Patton",
        role: "Operations Manager",
    },
    {
        text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Bilal Ahmed",
        role: "IT Manager",
    },
    {
        text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Saman Malik",
        role: "Customer Support Lead",
    },
    {
        text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Omar Raza",
        role: "CEO",
    },
    {
        text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Zainab Hussain",
        role: "Project Manager",
    },
    {
        text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Aliza Khan",
        role: "Business Analyst",
    },
    {
        text: "Our business functions improved with a user-friendly design and positive customer feedback.",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Farhan Siddiqui",
        role: "Marketing Director",
    },
    {
        text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Sana Sheikh",
        role: "Sales Manager",
    },
    {
        text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Hassan Ali",
        role: "E-commerce Manager",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
    className?: string;
    testimonials: typeof testimonials;
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-10 rounded-3xl border border-neutral-800 shadow-lg bg-neutral-900 max-w-xs w-full" key={i}>
                                    <div className="text-neutral-300">{text}</div>
                                    <div className="flex items-center gap-2 mt-5">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={name}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                                            <div className="leading-5 text-neutral-400 tracking-tight">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
                            <svg
                className="w-full h-full text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
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
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export default function BreakpointLanding() {
    const title = "THE BREAKPOINT";
    const words = title.split(" ");

    return (
        <div className="bg-neutral-950">
            {/* Hero Section with Animated Background */}
            <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>

                <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                            {words.map((word, wordIndex) => (
                                <span
                                    key={wordIndex}
                                    className="inline-block mr-4 last:mr-0"
                                >
                                    {word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay:
                                                    wordIndex * 0.1 +
                                                    letterIndex * 0.03,
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                            }}
                                            className="inline-block text-transparent bg-clip-text 
                                            bg-gradient-to-r from-white to-white/80"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto"
                        >
                            Where innovation meets execution. Breaking through boundaries to create exceptional solutions.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.8 }}
                        >
                            <div
                                className="inline-block group relative bg-gradient-to-b from-white/10 to-black/10 
                                p-px rounded-2xl backdrop-blur-lg 
                                overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <Button
                                    variant="ghost"
                                    className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                                    bg-black/95 hover:bg-black/100 
                                    text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-white/10
                                    hover:shadow-md hover:shadow-neutral-800/50"
                                >
                                    <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                        Explore
                                    </span>
                                    <span
                                        className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                        transition-all duration-300"
                                    >
                                        →
                                    </span>
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* About Section */}
            <section className="py-24 px-4 md:px-6 bg-neutral-900/50">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Who We Are
                        </h2>
                        <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl">
                            The Breakpoint is a forward-thinking company dedicated to pushing the boundaries of what's possible. 
                            We specialize in creating innovative solutions that transform industries and empower businesses to reach 
                            new heights. Our team of experts combines cutting-edge technology with creative vision to deliver 
                            exceptional results that exceed expectations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 px-4 md:px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-16 text-white text-center"
                    >
                        What We Do
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Strategy & Consulting",
                                description: "Expert guidance to help you navigate complex challenges and identify opportunities for growth and innovation."
                            },
                            {
                                title: "Technology Solutions",
                                description: "Cutting-edge development and implementation of scalable solutions tailored to your unique business needs."
                            },
                            {
                                title: "Digital Transformation",
                                description: "End-to-end support in modernizing your operations and embracing digital-first strategies for success."
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 
                                hover:border-neutral-700 
                                transition-colors duration-300"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-white">
                                    {service.title}
                                </h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 px-4 md:px-6 bg-neutral-900/50">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-16 text-white text-center"
                    >
                        Our Values
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            {
                                title: "Innovation First",
                                description: "We constantly push boundaries and challenge the status quo to deliver breakthrough solutions that make a real difference."
                            },
                            {
                                title: "Client Success",
                                description: "Your success is our success. We're committed to understanding your goals and delivering results that exceed your expectations."
                            },
                            {
                                title: "Excellence in Execution",
                                description: "We maintain the highest standards in everything we do, from initial strategy to final implementation and beyond."
                            },
                            {
                                title: "Collaborative Partnership",
                                description: "We believe in building lasting relationships based on trust, transparency, and mutual growth with our clients and partners."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="flex gap-4"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white 
                                flex items-center justify-center text-neutral-900 font-bold text-xl">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-white">
                                        {value.title}
                                    </h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 px-4 md:px-6 bg-neutral-900/50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
                    >
                        <div className="flex justify-center">
                            <div className="border border-neutral-700 py-1 px-4 rounded-lg text-neutral-300">
                                Testimonials
                            </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white">
                            What our clients say
                        </h2>
                        <p className="text-center mt-5 text-neutral-400">
                            See what our customers have to say about us.
                        </p>
                    </motion.div>

                    <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                        <TestimonialsColumn testimonials={firstColumn} duration={15} />
                        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 md:px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Ready to Break Through?
                        </h2>
                        <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
                            Let's discuss how we can help you achieve your goals and take your business to the next level.
                        </p>
                        <div className="inline-block group relative bg-gradient-to-b from-white/10 to-black/10 
                        p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Button
                                variant="ghost"
                                className="rounded-[1.15rem] px-10 py-6 text-lg font-semibold backdrop-blur-md 
                                bg-black/95 hover:bg-black/100 
                                text-white transition-all duration-300 
                                group-hover:-translate-y-0.5 border border-white/10
                                hover:shadow-md hover:shadow-neutral-800/50"
                            >
                                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                    Get in Touch
                                </span>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}