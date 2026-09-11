import { Activity, Boxes, CircleCheck, Loader, Search, Sparkles } from 'lucide-react';

/* A sparkline drawn from a fixed series, with the area under it faded out. */
function Sparkline({ points, id }: { points: number[]; id: string }) {
    const w = 220;
    const h = 56;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const span = max - min || 1;

    const coords = points.map((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p - min) / span) * (h - 8) - 4;
        return [x, y] as const;
    });

    const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
    const area = `${line} L${w} ${h} L0 ${h} Z`;

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-14 w-full" preserveAspectRatio="none" fill="none">
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a6daff" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#a6daff" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={area} fill={`url(#${id})`} />
            <path d={line} stroke="#d5dbe6" strokeOpacity="0.75" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function MetricTile({
    label,
    value,
    delta,
    points,
    id,
}: {
    label: string;
    value: string;
    delta: string;
    points: number[];
    id: string;
}) {
    return (
        <div className="rounded-2xl border hairline bg-ink-900/60 p-5">
            <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist-700">
                    {label}
                </span>
                <span className="rounded-full border hairline px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-mist-500">
                    {delta}
                </span>
            </div>
            <div className="mt-4 text-3xl font-medium tracking-[-0.02em] text-mist-50">{value}</div>
            <Sparkline points={points} id={id} />
        </div>
    );
}

const TRACE = [
    { icon: Search, label: 'retrieve.documents', meta: '412ms', done: true },
    { icon: Boxes, label: 'rerank.cross_encoder', meta: '188ms', done: true },
    { icon: Sparkles, label: 'generate.answer', meta: '740ms', done: true },
    { icon: Activity, label: 'judge.grade_output', meta: 'running', done: false },
];

const SCORES = [
    { label: 'Groundedness', score: 94 },
    { label: 'Answer relevance', score: 91 },
    { label: 'Context precision', score: 88 },
];

/**
 * Layered console mock-up anchoring the hero: a metrics panel with an agent
 * trace panel overlapping it. Stacks rather than overlaps on small screens.
 */
export default function ConsoleMock() {
    return (
        <div className="relative mx-auto w-full max-w-5xl">
            {/* Two panels offset into each other, so the layering holds at any content height */}
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-0">
            {/* Back panel: run metrics */}
            <div className="panel p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-ice-300 shadow-[0_0_10px_2px_rgba(166,218,255,0.55)]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-300">
                            Support agent · production
                        </span>
                    </div>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-mist-700 sm:block">
                        last 30 days
                    </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <MetricTile
                        label="Retrieval accuracy"
                        value="92.4%"
                        delta="+6.1"
                        id="spark-a"
                        points={[38, 41, 40, 47, 52, 49, 58, 61, 60, 68, 72, 78]}
                    />
                    <MetricTile
                        label="Resolution time"
                        value="1.8s"
                        delta="-35%"
                        id="spark-b"
                        points={[80, 74, 76, 66, 61, 63, 54, 48, 50, 41, 36, 30]}
                    />
                </div>

            </div>

            {/* Front panel: agent trace and eval scores */}
            <div className="panel z-10 p-5 sm:p-7 lg:-ml-14 lg:mt-20">
                <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">
                    Run trace
                </div>

                <ul className="space-y-2.5">
                    {TRACE.map((step) => {
                        const Icon = step.icon;
                        return (
                            <li
                                key={step.label}
                                className="flex items-center gap-3 rounded-xl border hairline bg-ink-900/60 px-3.5 py-2.5"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border hairline text-ice-300/80">
                                    <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                                </span>
                                <span className="flex-1 truncate font-mono text-[11px] text-mist-300">
                                    {step.label}
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist-700">
                                    {step.meta}
                                </span>
                                {step.done ? (
                                    <CircleCheck className="h-3.5 w-3.5 shrink-0 text-ice-300" strokeWidth={1.5} />
                                ) : (
                                    <Loader className="h-3.5 w-3.5 shrink-0 animate-spin text-mist-700" strokeWidth={1.5} />
                                )}
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-6 space-y-3.5 border-t hairline pt-5">
                    {SCORES.map((row) => (
                        <div key={row.label} className="flex items-center gap-4">
                            <span className="w-32 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-mist-500">
                                {row.label}
                            </span>
                            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                                <span
                                    className="block h-full rounded-full bg-ice-300/80"
                                    style={{ width: `${row.score}%` }}
                                />
                            </span>
                            <span className="w-9 shrink-0 text-right font-mono text-[11px] text-mist-100">
                                {row.score}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}
