import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { SignalDome } from '../components/visuals';
import {
    Accent,
    Backdrop,
    Container,
    Display,
    Eyebrow,
    LinkButton,
    Reveal,
} from '../components/ui';

interface Metric {
    value: string;
    label: string;
}

interface FeaturedProject {
    id: number;
    title: string;
    kicker: string;
    description: string;
    metrics: Metric[];
    stack: string[];
    link?: string;
    linkLabel?: string;
    confidential?: boolean;
}

const featured: FeaturedProject[] = [
    {
        id: 1,
        title: 'Agents for Real Estate',
        kicker: 'In production · Under NDA',
        description:
            'Two agents live in production with a traced search harness underneath and a builder portal on top. We architected the WhatsApp lead-nurture agent across three phases: inbound qualification through the product site, approved outbound templates with live conversation, and handoff of qualified leads to a salesperson.',
        metrics: [
            { value: '250+', label: 'Leads cold to warm' },
            { value: '3', label: 'Phases shipped' },
            { value: '8', label: 'Fields extracted per project' },
        ],
        stack: ['LangGraph', 'WhatsApp API', 'FastAPI', 'OpenTelemetry', 'Langfuse', 'Next.js'],
        confidential: true,
    },
    {
        id: 2,
        title: 'DocMind',
        kicker: 'Multi-document RAG assistant',
        description:
            'Ask a question across a pile of PDFs and get one grounded answer. A retrieval stack tuned end to end through chunking, reranking and query rewriting, then measured against a baseline instead of assumed to be better.',
        metrics: [
            { value: '-40%', label: 'Hallucination rate' },
            { value: '+28%', label: 'Relevance vs BM25' },
            { value: '<2s', label: 'End-to-end latency' },
        ],
        stack: ['LangGraph', 'ChromaDB', 'Cross-Encoder', 'HuggingFace', 'Groq', 'Streamlit'],
        link: 'https://github.com/yash-flix/DocMind',
        linkLabel: 'View on GitHub',
    },
    {
        id: 3,
        title: 'Customer Care Agent',
        kicker: 'Agentic RAG on AWS Bedrock',
        description:
            'Support that remembers the conversation and calls tools when it needs to. A production support agent on AWS Bedrock holding retrieval, memory and tools behind a single conversation.',
        metrics: [
            { value: '92%', label: 'Retrieval accuracy' },
            { value: '-35%', label: 'Resolution time' },
            { value: '500+', label: 'FAQ entries indexed' },
        ],
        stack: ['AWS Bedrock AgentCore', 'LangChain', 'FAISS', 'Titan Embeddings v2', 'CloudWatch'],
        link: 'https://github.com/yash-flix/Customer_Care_agent',
        linkLabel: 'View on GitHub',
    },
    {
        id: 4,
        title: 'ResearchOps-AI',
        kicker: 'Multi-agent research orchestration',
        description:
            'A research team made of agents, with a judge in the room. Work is split across specialised agents, run in parallel, and graded before any of it is trusted.',
        metrics: [
            { value: 'Parallel', label: 'Agent execution' },
            { value: 'Judge', label: 'Graded before trust' },
            { value: 'Resumable', label: 'Checkpointed runs' },
        ],
        stack: ['Python', 'LangGraph', 'LLM-as-a-Judge', 'Pydantic', 'Checkpointing'],
        link: 'https://github.com/yash-flix/ResearchOps-Ai',
        linkLabel: 'View on GitHub',
    },
];

interface SmallProject {
    title: string;
    description: string;
    tags: string[];
    link: string;
}

const workshop: SmallProject[] = [
    {
        title: 'VeriDocs AI',
        description:
            'Detects forged documents, manipulated images and deepfakes with 94%+ accuracy, behind JWT and role-based access with a 50MB media pipeline.',
        tags: ['MERN', 'HuggingFace', 'Multimodal'],
        link: 'https://github.com/yash-flix/VeriDoc-Ai',
    },
    {
        title: 'Clarix',
        description:
            'AI ticket management that classifies, routes and drafts replies for support queues.',
        tags: ['JavaScript', 'LLM'],
        link: 'https://github.com/yash-flix/Clarix',
    },
    {
        title: 'Mail-Chan',
        description:
            'A personal email agent that triages, summarises and drafts replies for inbox work.',
        tags: ['Python', 'Agents'],
        link: 'https://github.com/yash-flix/Yash-s-Mail-Chan',
    },
    {
        title: 'Lead Qualifier',
        description:
            'Scores inbound leads from conversation signals into hot, warm and cold categories.',
        tags: ['Python', 'LLM'],
        link: 'https://github.com/yash-flix/Lead-Qualifer-',
    },
    {
        title: 'Productivity Agent',
        description: 'An agent that plans the day, chases tasks and reports back.',
        tags: ['Python', 'Agents'],
        link: 'https://github.com/yash-flix/Productivity-Agent',
    },
    {
        title: 'A-mail',
        description: 'An email phishing detector trained on message features.',
        tags: ['Python', 'ML'],
        link: 'https://github.com/yash-flix/A-mail',
    },
    {
        title: 'CodeEdit',
        description:
            'A collaborative code editor with CRDT state and sub-100ms sync, deployed on AWS with Docker.',
        tags: ['CRDT', 'WebSockets', 'AWS'],
        link: 'https://github.com/yash-flix/CodeEdit',
    },
    {
        title: 'Banking Ledger',
        description:
            'A double-entry banking backend with idempotent transfers and full audit trails.',
        tags: ['Node.js', 'Express', 'System design'],
        link: 'https://github.com/yash-flix/Banking-ledger',
    },
    {
        title: 'FinanceQ',
        description: 'Gamified finance literacy for young people, plus an AI budget planner.',
        tags: ['TypeScript', 'Python'],
        link: 'https://github.com/yash-flix/FiinanceQ',
    },
];

/* --- Featured row ------------------------------------------------------- */

function FeaturedRow({ project, index }: { project: FeaturedProject; index: number }) {
    return (
        <Reveal delay={0.05}>
            <article className="grid gap-10 border-b hairline py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
                {/* Left: index + meta */}
                <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs tracking-[0.2em] text-ice-300/70">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="h-px flex-1 bg-[color:var(--line)]" />
                    </div>

                    <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-mist-50 sm:text-[2.75rem]">
                        {project.title}
                    </h2>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-700">
                        {project.kicker}
                    </p>

                    <div className="mt-8">
                        {project.link && !project.confidential ? (
                            <LinkButton
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                size="sm"
                            >
                                {project.linkLabel ?? 'View project'}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </LinkButton>
                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mist-700">
                                <Lock className="h-3 w-3" />
                                Client confidential
                            </span>
                        )}
                    </div>
                </div>

                {/* Right: narrative, metrics, stack */}
                <div className="lg:col-span-8">
                    <p className="max-w-2xl text-lg leading-relaxed text-mist-300/75">
                        {project.description}
                    </p>

                    <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border hairline bg-[color:var(--line)] sm:grid-cols-3">
                        {project.metrics.map((metric) => (
                            <div key={metric.label} className="bg-ink-900 px-6 py-7">
                                <dt className="text-3xl font-medium tracking-[-0.02em] text-mist-50">
                                    {metric.value}
                                </dt>
                                <dd className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-mist-700">
                                    {metric.label}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                        {project.stack.map((tech) => (
                            <li
                                key={tech}
                                className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist-700"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </Reveal>
    );
}

/* --- Page --------------------------------------------------------------- */

const Work = () => {
    useAutoScroll();

    return (
        <main className="bg-ink-950 text-mist-100">
            {/* Header */}
            <section className="relative overflow-hidden border-b hairline pt-40 pb-24">
                <Backdrop />
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/4 top-0 h-[26rem] w-[26rem] -translate-y-1/3 rounded-full bg-ice-500/[0.12] blur-[120px]"
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
                        <Eyebrow className="mb-8">Selected work</Eyebrow>
                        <Display as="h1" className="text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
                            Systems that are <Accent>running,</Accent> not slides.
                        </Display>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist-300/80">
                            Agents, retrieval stacks and evaluation harnesses built end to end.
                            Where the numbers are ours to share, they are printed next to the
                            work.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Featured */}
            <section className="py-8">
                <Container>
                    {featured.map((project, i) => (
                        <FeaturedRow key={project.id} project={project} index={i} />
                    ))}
                </Container>
            </section>

            {/* Workshop grid */}
            <section className="border-b hairline py-24 sm:py-32">
                <Container>
                    <Reveal className="mb-14 max-w-2xl">
                        <Eyebrow index="05" className="mb-7">
                            From the workshop
                        </Eyebrow>
                        <Display className="text-4xl sm:text-5xl">
                            Smaller builds, <Accent>open source.</Accent>
                        </Display>
                    </Reveal>

                    <div className="grid border-t border-l hairline sm:grid-cols-2 lg:grid-cols-3">
                        {workshop.map((project, i) => (
                            <Reveal key={project.title} delay={0.04 * i}>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-full flex-col border-b border-r hairline p-8 transition-colors duration-500 hover:bg-ice-300/[0.03]"
                                >
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <h3 className="text-xl font-medium tracking-[-0.01em] text-mist-50">
                                            {project.title}
                                        </h3>
                                        <ArrowUpRight
                                            className="h-4 w-4 shrink-0 text-mist-700 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ice-300"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <p className="mb-8 flex-1 text-[15px] leading-relaxed text-mist-500">
                                        {project.description}
                                    </p>
                                    <ul className="flex flex-wrap gap-x-4 gap-y-2">
                                        {project.tags.map((tag) => (
                                            <li
                                                key={tag}
                                                className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-700"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden py-28 sm:py-36">
                <Backdrop />
                <Container className="relative text-center">
                    <Reveal>
                        <Display className="mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-[3.5rem]">
                            Have something like this in <Accent>mind?</Accent>
                        </Display>
                        <div className="mt-10 flex justify-center">
                            <LinkButton href="/contact" size="lg" variant="primary">
                                Let's talk
                                <ArrowUpRight className="h-4 w-4" />
                            </LinkButton>
                        </div>
                    </Reveal>
                </Container>
            </section>
        </main>
    );
};

export default Work;
