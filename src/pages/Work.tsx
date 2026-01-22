import { motion } from 'framer-motion';

interface Project {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    tags: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "Neon Horizon",
        description: "A futuristic cyberpunk city visualization for a major gaming studio. Features real-time rendering and dynamic lighting effects.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        tags: ["3D Animation", "Unreal Engine", "VFX"]
    },
    {
        id: 2,
        title: "EcoSense Mobile App",
        description: "Complete UX/UI design and development for a sustainable living application. Smooth transitions and intuitive interactions.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        tags: ["Mobile App", "React Native", "UX Design"]
    },
    {
        id: 3,
        title: "Quantum Finance",
        description: "Data visualization dashboard for a fintech startup. Processing millions of data points with high-performance WebGL rendering.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        tags: ["Web App", "WebGL", "Fintech"]
    },
    {
        id: 4,
        title: "Nebula Brand Identity",
        description: "Dynamic brand motion system for a tech conglomerate. created a cohesive visual language across all digital touchpoints.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        tags: ["Branding", "Motion Graphics", "Strategy"]
    },
    
];

const Work = () => {
    return (
        <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-16">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">Work</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
                        Explore a selection of our recent projects. We combine creativity with technical excellence to verify results.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors"
                        >
                            <div className="aspect-video w-full bg-neutral-800 relative overflow-hidden">
                                <video
                                    src={project.videoUrl}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    loop
                                    muted
                                    playsInline
                                    onMouseOver={e => (e.target as HTMLVideoElement).play()}
                                    onMouseOut={e => {
                                        const video = e.target as HTMLVideoElement;
                                        video.pause();
                                        video.currentTime = 0;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Call to action */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-24 text-center"
            >
                <p className="text-neutral-400 mb-6">Have a project in mind?</p>
                <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-white rounded-xl hover:bg-neutral-200 transition-all duration-300 hover:scale-105"
                >
                    Let's Talk
                </a>
            </motion.div>
        </div>
    );
};

export default Work;
