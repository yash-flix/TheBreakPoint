import { motion, useReducedMotion } from 'framer-motion';
import {
    Bot,
    Library,
    Workflow,
    MessagesSquare,
    Gauge,
    Boxes,
    ArrowUpRight,
    TrendingUp,
    ShieldCheck,
    Zap,
} from 'lucide-react';
import { useAutoScroll } from '../hooks/useAutoScroll';
import ConsoleMock from '../components/ConsoleMock';
import { Horizon, NodeMesh, OrbitRings } from '../components/visuals';
import {
    Accent,
    Backdrop,
    Bloom,
    Container,
    Display,
    Eyebrow,
    LinkButton,
    Reveal,
    WordReveal,
} from '../components/ui';

/* --- Hero --------------------------------------------------------------- */

function HeroSection() {
    const reduce = useReducedMotion();
    const appear = (delay: number) =>
        reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.72 },
                animate: { opacity: 1, scale: 1 },
                transition: { delay, duration: 1, ease: [0.16, 1, 0.3, 1] as const },
            };

    return (
        <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
            <Backdrop />

            <Container className="relative z-10 text-center">
                <motion.div {...appear(0.1)}>
                    <Display
                        as="h1"
                        fill="radial"
                        className="mx-auto max-w-4xl text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5rem]"
                    >
                        The Intelligence Layer for Serious Operations.
                    </Display>
                </motion.div>

                <motion.p
                    {...appear(0.25)}
                    className="mx-auto mt-8 max-w-2xl text-base leading-[1.7] text-mist-300/70 sm:text-lg"
                >
                    We design, build and evaluate AI systems that hold up in production. Agents
                    that call your tools, retrieval that cites its sources, and a number proving
                    it works before a customer ever sees it.
                </motion.p>

                <motion.div
                    {...appear(0.4)}
                    className="mt-11 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
                >
                    <LinkButton href="/contact" size="lg" variant="primary">
                        Start a conversation
                        <ArrowUpRight className="h-4 w-4" />
                    </LinkButton>
                    <LinkButton href="/work" size="lg" variant="outline">
                        See what we've built
                    </LinkButton>
                </motion.div>
            </Container>

            {/*
              * Horizon and product mock-up. The artwork is anchored to the
              * mock-up rather than the section top, so the rim always lands
              * just under the buttons however the headline wraps.
              */}
            <div className="relative mt-24 lg:mb-16">
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 -top-[4.5rem] z-0 w-[max(100%,64rem)] -translate-x-1/2"
                >
                    <Bloom className="left-1/2 top-0 -ml-[32rem] -mt-[10rem] h-[20rem] w-[64rem]" intensity={0.14} />
                    <motion.div
                        {...(reduce
                            ? {}
                            : {
                                initial: { opacity: 0 },
                                animate: { opacity: 1 },
                                transition: { delay: 0.45, duration: 1.8, ease: 'easeOut' as const },
                            })}
                    >
                        <Horizon />
                    </motion.div>
                </div>

                <motion.div
                    {...(reduce
                        ? {}
                        : {
                            initial: { opacity: 0, y: 40, scale: 0.94 },
                            animate: { opacity: 1, y: 0, scale: 1 },
                            transition: { delay: 0.55, duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
                        })}
                    className="relative z-10"
                >
                    <Container>
                        <ConsoleMock />
                    </Container>
                </motion.div>
            </div>
        </section>
    );
}

/* --- Capability ticker -------------------------------------------------- */

const TICKER = [
    'LangGraph',
    'AWS Bedrock',
    'Retrieval-Augmented Generation',
    'Multi-agent orchestration',
    'Evaluation harnesses',
    'WhatsApp Business API',
    'Vector search',
    'LLM observability',
    'FastAPI',
    'Human-in-the-loop',
];

function TickerSection() {
    return (
        <section className="border-y hairline py-7">
            <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-mist-700">
                Built on
            </p>
            <div className="mask-fade-x flex overflow-hidden">
                <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
                    {[...TICKER, ...TICKER].map((item, i) => (
                        <span
                            key={i}
                            className="flex shrink-0 items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500"
                        >
                            {item}
                            <span className="h-1 w-1 rounded-full bg-ice-300/40" />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* --- Three pillars ------------------------------------------------------ */

const PILLARS = [
    {
        icon: Zap,
        title: 'Drive performance',
        body: 'Cut the hours your team spends on triage, lookup and drafting. Measured against how long the work takes today.',
    },
    {
        icon: TrendingUp,
        title: 'Accelerate growth',
        body: 'Qualify every inbound lead, answer every question at once, and let the pipeline scale past what headcount allows.',
    },
    {
        icon: ShieldCheck,
        title: 'Mitigate risk',
        body: 'Grounded answers, traced runs and a graded eval set, so a regression surfaces on a dashboard and not in a complaint.',
    },
];

function PillarsSection() {
    return (
        <section className="relative overflow-hidden py-28 sm:py-36">
            <Bloom className="left-1/2 top-0 h-[24rem] w-[44rem] -translate-x-1/2 -translate-y-1/2" intensity={0.09} />
            <Container className="relative">
                <Reveal className="mx-auto mb-16 max-w-2xl text-center">
                    <Display className="text-3xl sm:text-4xl lg:text-[2.75rem]">
                        Make smarter decisions, faster.
                    </Display>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-mist-500">
                        Deploy from a system built to automate, measure and scale.
                    </p>
                </Reveal>

                <div className="grid gap-5 md:grid-cols-3">
                    {PILLARS.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <Reveal key={pillar.title} delay={0.08 * i}>
                                <div className="group relative h-full overflow-hidden rounded-[20px] border hairline bg-ink-900/50 p-8 transition-colors duration-500 hover:border-[color:var(--line-strong)]">
                                    {/* Glow that answers the cursor */}
                                    <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-ice-500/[0.14] opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100" />
                                    <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border hairline bg-white/[0.03] text-ice-300">
                                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                                    </span>
                                    <h3 className="relative mt-7 text-xl font-medium tracking-[-0.01em] text-mist-50">
                                        {pillar.title}
                                    </h3>
                                    <p className="relative mt-3 text-[15px] leading-[1.7] text-mist-500">
                                        {pillar.body}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

/* --- Services ----------------------------------------------------------- */

const SERVICES = [
    {
        icon: Bot,
        title: 'AI agents & orchestration',
        body: 'Multi-step agents that plan, call your tools and know when to stop. Checkpointed, so a run can be paused, inspected and resumed.',
    },
    {
        icon: Library,
        title: 'Retrieval & knowledge systems',
        body: 'Answers grounded in your documents. Chunking, reranking and query rewriting tuned end to end against a measured baseline.',
    },
    {
        icon: MessagesSquare,
        title: 'Conversational & WhatsApp AI',
        body: 'Assistants that qualify inbound interest, remember the thread, run approved outbound templates and hand a warm lead over.',
    },
    {
        icon: Workflow,
        title: 'Workflow automation',
        body: 'The repetitive middle of your operation handed to software: triage, classification, drafting, routing and reporting.',
    },
    {
        icon: Gauge,
        title: 'Evaluation & observability',
        body: 'A judge harness, traced runs and dashboards, so quality is a number you watch move rather than a feeling after a spot check.',
    },
    {
        icon: Boxes,
        title: 'Interfaces & deployment',
        body: 'The portal or dashboard your AI lives behind, designed with the same care as the model work and shipped on infrastructure that holds.',
    },
];

function ServicesSection() {
    return (
        <section className="relative border-t hairline py-28 sm:py-36">
            <Container>
                <Reveal className="mx-auto mb-16 max-w-2xl text-center">
                    <Eyebrow className="mb-6 justify-center">Solutions</Eyebrow>
                    <Display className="text-3xl sm:text-4xl lg:text-[2.75rem]">
                        Intelligence in action.
                    </Display>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-mist-500">
                        Six capabilities, each shipped as a working system rather than a pilot.
                    </p>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <Reveal key={service.title} delay={0.05 * i}>
                                <div className="group relative h-full overflow-hidden rounded-[20px] border hairline bg-ink-900/50 p-8 transition-all duration-500 hover:border-[color:var(--line-strong)] hover:bg-ink-850/70">
                                    <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-ice-300/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    <Icon
                                        className="h-5 w-5 text-mist-700 transition-colors duration-500 group-hover:text-ice-300"
                                        strokeWidth={1.5}
                                    />
                                    <h3 className="mt-7 text-lg font-medium tracking-[-0.01em] text-mist-50">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 text-[15px] leading-[1.7] text-mist-500">
                                        {service.body}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

/* --- Process: cards that stack as you scroll ---------------------------- */

const PROCESS = [
    {
        step: 'Step 1',
        index: '01',
        title: 'Unify your world',
        body: 'Bring your data, systems and workflows into a single layer the model can actually reason over. Most of the work lives here, and skipping it is why pilots stall.',
    },
    {
        step: 'Step 2',
        index: '02',
        title: 'Build the thin slice',
        body: 'One real workflow, end to end, on your own data. Narrow enough to ship in weeks, honest enough to tell you whether the idea holds.',
    },
    {
        step: 'Step 3',
        index: '03',
        title: 'Measure, then trust',
        body: 'Every slice gets a baseline and a graded test set. Retrieval quality, hallucination rate and latency are tracked before anything reaches a customer.',
    },
    {
        step: 'Step 4',
        index: '04',
        title: 'Ship, watch, widen',
        body: 'Into production with tracing and alerting attached. Once the numbers hold steady, we widen scope one workflow at a time.',
    },
];

function ProcessSection() {
    return (
        <section className="relative border-t hairline py-28 sm:py-36">
            {/* Clipped separately so the section itself never becomes a scroll container */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <Bloom className="right-0 top-1/3 h-[30rem] w-[30rem] translate-x-1/3" intensity={0.08} />
            </div>
            <Container className="relative">
                <Reveal className="mx-auto mb-16 max-w-2xl text-center">
                    <Eyebrow className="mb-6 justify-center">Process</Eyebrow>
                    <Display className="text-3xl sm:text-4xl lg:text-[2.75rem]">
                        From data to decisions.
                    </Display>
                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-mist-500">
                        A deliberately short loop. You see something working on your own data
                        early, and every widening of scope is a decision you make with evidence.
                    </p>
                </Reveal>

                {/* Sticky offsets stagger so the cards deal out into a stack */}
                <div className="mx-auto max-w-4xl">
                    {PROCESS.map((phase, i) => (
                        <div
                            key={phase.index}
                            className="sticky mb-6"
                            style={{ top: `${7 + i * 1.75}rem` }}
                        >
                            <div className="overflow-hidden rounded-[24px] border hairline bg-ink-850/90 p-8 backdrop-blur-xl sm:p-11">
                                <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
                                    <div className="shrink-0">
                                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice-300/70">
                                            {phase.step}
                                        </div>
                                        <div className="mt-3 font-display text-6xl leading-none text-mist-700/60">
                                            {phase.index}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-medium tracking-[-0.02em] text-mist-50 sm:text-3xl">
                                            {phase.title}
                                        </h3>
                                        <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-mist-500">
                                            {phase.body}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

/* --- Statement ---------------------------------------------------------- */

function StatementSection() {
    return (
        <section className="relative overflow-hidden border-t hairline py-32 sm:py-44">
            <Bloom className="left-1/2 top-1/2 h-[34rem] w-[54rem] -translate-x-1/2 -translate-y-1/2" intensity={0.08} />
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 opacity-70"
            >
                <OrbitRings />
            </div>
            <Container className="relative">
                <WordReveal
                    text="A model call is easy. What is hard is everything around it, and that gap is the whole of our practice."
                    accentFrom={16}
                    className="mx-auto max-w-4xl text-center text-[1.75rem] font-medium leading-[1.35] tracking-[-0.02em] text-mist-50 sm:text-4xl lg:text-[2.9rem]"
                />
            </Container>
        </section>
    );
}

/* --- Principles --------------------------------------------------------- */

const PRINCIPLES = [
    ['Grounded', 'Answers trace back to a source you can open and check.'],
    ['Evaluated', 'Nothing ships on vibes. There is a number, and a baseline it beat.'],
    ['Observable', 'Traced runs and dashboards, so a regression surfaces before a customer finds it.'],
    ['Recoverable', 'Checkpoints, retries and a clean handoff to a human when confidence drops.'],
    ['Owned by you', 'Your data, your keys, your repository. We hand over something you can run without us.'],
];

function PrinciplesSection() {
    return (
        <section className="border-t hairline py-28 sm:py-36">
            <Container>
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
                    <Reveal className="lg:col-span-5">
                        <Eyebrow className="mb-6">Why Breakpoint</Eyebrow>
                        <Display className="text-3xl sm:text-4xl lg:text-[2.75rem]">
                            Good AI work is mostly <Accent>engineering.</Accent>
                        </Display>
                        <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-mist-500">
                            The interesting part was never the prompt. It is the retrieval stack,
                            the state machine, the eval set and the failure path. Five commitments
                            hold on every build.
                        </p>
                        <div aria-hidden className="mt-12 hidden h-56 lg:block">
                            <NodeMesh />
                        </div>
                    </Reveal>

                    <Reveal delay={0.15} className="lg:col-span-7">
                        <div className="overflow-hidden rounded-[24px] border hairline bg-ink-900/50">
                            <ul>
                                {PRINCIPLES.map(([name, body], i) => (
                                    <li
                                        key={name}
                                        className={`group flex flex-col gap-2 p-7 transition-colors duration-500 hover:bg-white/[0.02] sm:flex-row sm:gap-8 ${i > 0 ? 'border-t hairline' : ''
                                            }`}
                                    >
                                        <span className="w-40 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ice-300/80">
                                            {name}
                                        </span>
                                        <span className="text-[15px] leading-[1.7] text-mist-300/75">
                                            {body}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}

/* --- Closing CTA -------------------------------------------------------- */

function CallToActionSection() {
    return (
        <section className="relative overflow-hidden border-t hairline py-36 sm:py-48">
            <Backdrop />
            <Bloom className="left-1/2 top-full h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 animate-drift" intensity={0.22} />

            <Container className="relative text-center">
                <Reveal>
                    <Display
                        fill="radial"
                        className="mx-auto max-w-3xl text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]"
                    >
                        Ready to integrate AI? Let's <Accent>build together.</Accent>
                    </Display>
                    <p className="mx-auto mt-8 max-w-xl text-base leading-[1.7] text-mist-300/70 sm:text-lg">
                        A short call, no deck. We'll tell you plainly whether AI is the right tool
                        for your workflow, and what the first slice would look like.
                    </p>
                    <div className="mt-11 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                        <LinkButton href="/contact" size="lg" variant="primary">
                            Book a consultation
                            <ArrowUpRight className="h-4 w-4" />
                        </LinkButton>
                        <LinkButton
                            href="https://wa.me/918329761217"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="lg"
                            variant="outline"
                        >
                            Message on WhatsApp
                        </LinkButton>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}

/* --- Page --------------------------------------------------------------- */

export default function Home() {
    useAutoScroll();

    return (
        <main className="bg-ink-950 text-mist-100">
            <HeroSection />
            <TickerSection />
            <PillarsSection />
            <ServicesSection />
            <ProcessSection />
            <StatementSection />
            <PrinciplesSection />
            <CallToActionSection />
        </main>
    );
}
