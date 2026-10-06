import type React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    BellRing,
    CalendarCheck,
    FileText,
    Globe,
    Hand,
    Inbox,
    Mail,
    Megaphone,
    MessageCircle,
    Mic,
    PenLine,
    Phone,
    RefreshCw,
    SlidersHorizontal,
    Target,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import { useAutoScroll } from '../hooks/useAutoScroll';
import {
    Accent,
    Backdrop,
    Container,
    Display,
    Eyebrow,
    LinkButton,
    Reveal,
} from '../components/ui';

const CONNECT_URL = 'https://connect-3ysvii2l4-yash-flixs-projects.vercel.app/';

interface Item {
    icon: LucideIcon;
    title: string;
    body?: string;
}

const channels: Item[] = [
    { icon: MessageCircle, title: 'WhatsApp' },
    { icon: Phone, title: 'Calls' },
    { icon: Globe, title: 'Web forms' },
    { icon: Mail, title: 'Email' },
];

const features: Item[] = [
    {
        icon: Zap,
        title: 'Replies in seconds',
        body: 'Every enquiry gets an answer while it is still warm, on whichever channel it came in.',
    },
    {
        icon: CalendarCheck,
        title: 'Books from your calendar',
        body: 'Appointments land straight in your real availability. No back and forth.',
    },
    {
        icon: BellRing,
        title: 'Sends reminders',
        body: 'Customers get nudged before they are due, so fewer slots go empty.',
    },
    {
        icon: RefreshCw,
        title: 'Follows up on quiet leads',
        body: 'Leads that stop replying get a timely follow-up instead of being forgotten.',
    },
    {
        icon: Inbox,
        title: 'One shared inbox',
        body: 'Every conversation, from every channel, visible in one place.',
    },
    {
        icon: Hand,
        title: 'Take over any time',
        body: 'Step into a conversation mid-thread. Your rules decide what the agents may do.',
    },
];

const agents: Item[] = [
    { icon: CalendarCheck, title: 'Booking' },
    { icon: Mic, title: 'Voice' },
    { icon: MessageCircle, title: 'WhatsApp' },
    { icon: RefreshCw, title: 'Follow-up' },
    { icon: PenLine, title: 'Content' },
    { icon: Megaphone, title: 'Marketing' },
    { icon: Target, title: 'Lead Generation' },
    { icon: FileText, title: 'Proposals' },
];

/** Opens Connect in its own browser window so this site stays open alongside it. */
function openConnect(e: React.MouseEvent<HTMLAnchorElement>) {
    const width = Math.min(1280, window.screen.availWidth);
    const height = Math.min(860, window.screen.availHeight);
    const left = Math.max(0, (window.screen.availWidth - width) / 2);
    const top = Math.max(0, (window.screen.availHeight - height) / 2);
    const win = window.open(
        CONNECT_URL,
        'connect',
        `width=${width},height=${height},left=${left},top=${top}`
    );
    if (win) {
        win.opener = null;
        e.preventDefault();
    }
    // If the window was blocked, the link's target="_blank" opens a new tab instead
}

/* --- Page --------------------------------------------------------------- */

const Products = () => {
    useAutoScroll();

    return (
        <main className="bg-ink-950 text-mist-100">
            {/* Hero */}
            <section className="relative overflow-hidden pt-40 pb-24 sm:pb-32">
                <Backdrop />
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[40rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-ice-500/[0.14] blur-[130px]"
                />
                <Container className="relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto max-w-3xl"
                    >
                        <Display
                            as="h1"
                            fill="radial"
                            className="text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.5rem]"
                        >
                            The front desk for businesses that <Accent>don't have one.</Accent>
                        </Display>
                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-mist-300/80">
                            Never lose a customer because you were busy. Connect answers messages
                            and calls, books appointments and follows up with leads, so you can
                            stay with the client in front of you.
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <LinkButton
                                href={CONNECT_URL}
                                onClick={openConnect}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="lg"
                                variant="primary"
                            >
                                Try Connect
                                <ArrowUpRight className="h-4 w-4" />
                            </LinkButton>
                            <LinkButton href="/contact" size="lg" variant="outline">
                                Request early access
                            </LinkButton>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Channels strip */}
            <section className="border-y hairline">
                <Container>
                    <div className="grid grid-cols-2 sm:grid-cols-4">
                        {channels.map(({ icon: Icon, title }, i) => (
                            <div
                                key={title}
                                className={`flex items-center justify-center gap-3 py-8 ${i > 0 ? 'sm:border-l hairline' : ''
                                    } ${i % 2 === 1 ? 'border-l hairline' : ''} ${i > 1 ? 'border-t sm:border-t-0 hairline' : ''}`}
                            >
                                <Icon className="h-4 w-4 text-ice-300" strokeWidth={1.5} />
                                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-300">
                                    {title}
                                </span>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Features */}
            <section className="py-24 sm:py-32">
                <Container>
                    <Reveal className="mb-14 max-w-2xl">
                        <Eyebrow index="01" className="mb-7">
                            What it does
                        </Eyebrow>
                        <Display className="text-4xl sm:text-5xl">
                            Every enquiry answered, <Accent>even when you can't.</Accent>
                        </Display>
                    </Reveal>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map(({ icon: Icon, title, body }, i) => (
                            <Reveal key={title} delay={0.05 * i}>
                                <div className="surface surface-hi group h-full p-7 transition-colors duration-500 hover:bg-ink-850">
                                    <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border hairline bg-ice-300/[0.06]">
                                        <Icon className="h-[18px] w-[18px] text-ice-300" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-medium tracking-[-0.01em] text-mist-50">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-mist-500">{body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Agents */}
            <section className="border-t hairline py-24 sm:py-32">
                <Container>
                    <div className="grid gap-14 lg:grid-cols-12">
                        <Reveal className="lg:col-span-5">
                            <Eyebrow index="02" className="mb-7">
                                Modular agents
                            </Eyebrow>
                            <Display className="text-4xl sm:text-5xl">
                                Install only the agents <Accent>you need.</Accent>
                            </Display>
                            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist-500">
                                Eight agents, each with one job. Switch them on as the business
                                grows, and set the rules each one works within.
                            </p>
                            <div className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-700">
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                You stay in control
                            </div>
                        </Reveal>

                        <Reveal className="self-start lg:col-span-7">
                            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border hairline bg-[color:var(--line)] sm:grid-cols-4">
                                {agents.map(({ icon: Icon, title }, i) => (
                                    <div key={title} className="group flex h-full flex-col justify-between gap-10 bg-ink-900 p-5 transition-colors duration-500 hover:bg-ink-850">
                                        <div className="flex items-center justify-between">
                                            <Icon
                                                className="h-5 w-5 text-mist-500 transition-colors duration-500 group-hover:text-ice-300"
                                                strokeWidth={1.5}
                                            />
                                            <span className="font-mono text-[10px] tracking-[0.2em] text-mist-700">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <span className="text-[15px] font-medium text-mist-100">
                                            {title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden border-t hairline py-28 sm:py-36">
                <Backdrop />
                <Container className="relative text-center">
                    <Reveal>
                        <Display fill="radial" className="mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-[3.5rem]">
                            Want Connect for your <Accent>business?</Accent>
                        </Display>
                        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <LinkButton href="/contact" size="lg" variant="primary">
                                Request early access
                                <ArrowUpRight className="h-4 w-4" />
                            </LinkButton>
                            <LinkButton
                                href={CONNECT_URL}
                                onClick={openConnect}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="lg"
                                variant="outline"
                            >
                                Visit the site
                            </LinkButton>
                        </div>
                    </Reveal>
                </Container>
            </section>
        </main>
    );
};

export default Products;
