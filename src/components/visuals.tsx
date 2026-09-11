/**
 * Background artwork. Every animation here runs as a native CSS animation
 * rather than per-frame JavaScript. Edge pulses use `pathLength="1"`, which
 * normalises a path so a dash can be expressed as a fraction of its length.
 * The reduced-motion rule in index.css switches all of it off.
 */

/* --- Hero horizon ------------------------------------------------------- */

const HZ_CX = 600;
const HZ_R = 840;
/** Top of the rim sits exactly on the SVG's top edge, so the container can be
 *  placed where the rim should be and the rest of the planet falls below it. */
const HZ_TOP = 0;
const HZ_CY = HZ_TOP + HZ_R;

/** Deterministic 0..1 noise so the star field is stable across renders. */
function hash(n: number) {
    const s = Math.sin(n * 12.9898) * 43758.5453;
    return s - Math.floor(s);
}

const STARS = Array.from({ length: 34 }, (_, i) => {
    const x = hash(i) * 1200;
    const y = HZ_TOP - 24 - hash(i + 50) * 260;
    return {
        id: i,
        x,
        y,
        r: 0.7 + hash(i + 100) * 1.1,
        duration: 4 + Math.round(hash(i + 150) * 5),
        delay: hash(i + 200) * 6,
    };
});

/**
 * The hero's focal artwork: a planet rising just under the call to action.
 * One rim light, brightest at the centre and fading to the sides, an
 * atmosphere haze above it, a dark body below for the product mock-up to rest
 * on, and a slow highlight sweeping along the rim. Everything is gradients;
 * no filters, so the single animation is cheap to repaint.
 */
export function Horizon({ className = '' }: { className?: string }) {
    const echoes = [
        { r: HZ_R + 48, opacity: 0.22 },
        { r: HZ_R + 112, opacity: 0.12 },
        { r: HZ_R + 200, opacity: 0.06 },
    ];

    return (
        <svg
            aria-hidden
            className={`block w-full overflow-visible ${className}`}
            style={{ aspectRatio: '1200 / 520' }}
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMin slice"
            fill="none"
        >
            <defs>
                {/* Rim light: bright at the top centre, gone at the sides */}
                <linearGradient id="hz-rim" gradientUnits="userSpaceOnUse" x1="60" x2="1140" y1="0" y2="0">
                    <stop offset="0%" stopColor="#a6daff" stopOpacity="0" />
                    <stop offset="30%" stopColor="#a6daff" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#eef3f9" stopOpacity="1" />
                    <stop offset="70%" stopColor="#a6daff" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#a6daff" stopOpacity="0" />
                </linearGradient>

                {/* Body: lit at the rim, falling to the page colour */}
                <radialGradient id="hz-body" gradientUnits="userSpaceOnUse" cx={HZ_CX} cy={HZ_TOP} r="1000">
                    <stop offset="0%" stopColor="#a6daff" stopOpacity="0.30" />
                    <stop offset="7%" stopColor="#2a5f8c" stopOpacity="0.55" />
                    <stop offset="20%" stopColor="#0b1626" stopOpacity="0.95" />
                    <stop offset="48%" stopColor="#04070d" stopOpacity="1" />
                </radialGradient>

                {/* Atmosphere: a soft band hugging the outside of the rim */}
                <radialGradient id="hz-atmo" gradientUnits="userSpaceOnUse" cx={HZ_CX} cy={HZ_CY} r={HZ_R + 220}>
                    <stop offset="78%" stopColor="#4ea6e6" stopOpacity="0" />
                    <stop offset="79.2%" stopColor="#7cc5f7" stopOpacity="0.42" />
                    <stop offset="84%" stopColor="#4ea6e6" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#4ea6e6" stopOpacity="0" />
                </radialGradient>

                {/* Confines the atmosphere to the top centre, like the rim */}
                <linearGradient id="hz-atmo-mask" gradientUnits="userSpaceOnUse" x1="0" x2="1200" y1="0" y2="0">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                    <stop offset="32%" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="68%" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <mask id="hz-mask" maskUnits="userSpaceOnUse" x="-400" y="-400" width="2000" height="2400">
                    <rect x="-400" y="-400" width="2000" height="2400" fill="url(#hz-atmo-mask)" />
                </mask>

                {/* The travelling highlight */}
                <linearGradient id="hz-sweep" gradientUnits="userSpaceOnUse" x1="200" x2="1000" y1="0" y2="0">
                    <stop offset="0%" stopColor="#eef3f9" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#eef3f9" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Stars, slowly breathing */}
            {STARS.map((star) => (
                <circle
                    key={star.id}
                    cx={star.x}
                    cy={star.y}
                    r={star.r}
                    fill="#d5dbe6"
                    style={{
                        animation: `mesh-pulse ${star.duration}s ease-in-out ${star.delay}s infinite`,
                    }}
                />
            ))}

            {/* Echo arcs above the rim */}
            {echoes.map((echo) => (
                <circle
                    key={echo.r}
                    cx={HZ_CX}
                    cy={HZ_CY}
                    r={echo.r}
                    stroke="url(#hz-rim)"
                    strokeOpacity={echo.opacity}
                    strokeWidth="1"
                />
            ))}

            {/* Atmosphere haze, then the body over it */}
            <circle cx={HZ_CX} cy={HZ_CY} r={HZ_R + 220} fill="url(#hz-atmo)" mask="url(#hz-mask)" />
            <circle cx={HZ_CX} cy={HZ_CY} r={HZ_R} fill="url(#hz-body)" />

            {/* Rim light: a soft halo under a crisp edge */}
            <circle cx={HZ_CX} cy={HZ_CY} r={HZ_R} stroke="url(#hz-rim)" strokeOpacity="0.35" strokeWidth="6" />
            <circle cx={HZ_CX} cy={HZ_CY} r={HZ_R} stroke="url(#hz-rim)" strokeWidth="1.5" />

            {/* Highlight sweeping along the rim, left to right */}
            <circle
                cx={HZ_CX}
                cy={HZ_CY}
                r={HZ_R}
                pathLength={1}
                stroke="url(#hz-sweep)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="0.05 0.95"
                style={{ animation: 'mesh-dash 14s cubic-bezier(0.45, 0, 0.55, 1) infinite' }}
            />
        </svg>
    );
}

/* --- Signal dome (Work and Contact headers) ----------------------------- */

const DOME_CX = 600;
const DOME_CY = 640;

/** Upper semicircle of the given radius, centred on the dome origin. */
function arc(r: number) {
    return `M ${DOME_CX - r} ${DOME_CY} A ${r} ${r} 0 0 1 ${DOME_CX + r} ${DOME_CY}`;
}

/**
 * A dome of concentric arcs and radiating spokes rising from a point below
 * the heading, with pulses expanding through it. A single radial gradient in
 * user space strokes every element, so anything further from the origin is
 * automatically fainter.
 */
export function SignalDome({ className = '' }: { className?: string }) {
    const rings = [170, 265, 360, 455, 550, 645];
    const spokes = Array.from({ length: 17 }, (_, i) => {
        // Fan across the upper half, skipping the two horizon-hugging extremes.
        const angle = (Math.PI * (i + 1)) / 18;
        const r = 680;
        return {
            id: i,
            x: DOME_CX + Math.cos(angle) * r,
            y: DOME_CY - Math.sin(angle) * r,
        };
    });
    const pings = [0, 2.6, 5.2];

    return (
        <svg
            aria-hidden
            className={`h-full w-full ${className}`}
            viewBox="0 0 1200 640"
            preserveAspectRatio="xMidYMax meet"
            fill="none"
        >
            <defs>
                {/* Fades every stroke with distance from the dome origin */}
                <radialGradient
                    id="dome-fade"
                    gradientUnits="userSpaceOnUse"
                    cx={DOME_CX}
                    cy={DOME_CY}
                    r="700"
                >
                    <stop offset="0%" stopColor="#a6daff" stopOpacity="0.55" />
                    <stop offset="55%" stopColor="#a6daff" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#a6daff" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                    id="dome-ping-fade"
                    gradientUnits="userSpaceOnUse"
                    cx={DOME_CX}
                    cy={DOME_CY}
                    r="700"
                >
                    <stop offset="0%" stopColor="#d3ecff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d3ecff" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Spokes */}
            {spokes.map((spoke) => (
                <line
                    key={spoke.id}
                    x1={DOME_CX}
                    y1={DOME_CY}
                    x2={spoke.x}
                    y2={spoke.y}
                    stroke="url(#dome-fade)"
                    strokeWidth="1"
                />
            ))}

            {/* Static rings */}
            {rings.map((r) => (
                <path key={r} d={arc(r)} stroke="url(#dome-fade)" strokeWidth="1" />
            ))}

            {/* Pulses expanding through the rings */}
            {pings.map((delay) => (
                <path
                    key={delay}
                    d={arc(360)}
                    stroke="url(#dome-ping-fade)"
                    strokeWidth="1.6"
                    style={{
                        transformBox: 'view-box',
                        transformOrigin: `${DOME_CX}px ${DOME_CY}px`,
                        animation: `dome-ping 7.8s cubic-bezier(0.25, 0.6, 0.35, 1) ${delay}s infinite`,
                    }}
                />
            ))}

            {/* Bright core where the light originates */}
            <circle cx={DOME_CX} cy={DOME_CY} r="3" fill="#d3ecff" fillOpacity="0.9" />
        </svg>
    );
}

/* --- Node mesh ---------------------------------------------------------- */

const NODES: [number, number, number][] = [
    // x, y, radius
    [40, 120, 3.5], [120, 60, 2.5], [128, 190, 3], [210, 118, 4.5],
    [292, 52, 2.5], [300, 186, 3], [372, 122, 3.5], [452, 62, 2.5],
    [460, 194, 3], [206, 250, 2.5], [372, 246, 2.5], [40, 40, 2],
];

const EDGES: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6],
    [6, 7], [6, 8], [7, 8], [2, 9], [9, 5], [5, 10], [10, 8], [11, 1], [11, 0],
];

/**
 * A small graph with pulses travelling along its edges. Stands in for the shape
 * of the work: nodes calling nodes, with traffic moving between them.
 */
export function NodeMesh({ className = '' }: { className?: string }) {
    return (
        <svg aria-hidden className={`h-full w-full ${className}`} viewBox="0 0 500 290" fill="none">
            <defs>
                <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a6daff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#a6daff" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Edges: a short pulse chases along each connection */}
            {EDGES.map(([a, b], i) => {
                const [x1, y1] = NODES[a];
                const [x2, y2] = NODES[b];
                return (
                    <g key={`e-${i}`}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d5dbe6" strokeOpacity="0.09" strokeWidth="1" />
                        <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            pathLength={1}
                            stroke="#a6daff"
                            strokeOpacity="0.75"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeDasharray="0.14 0.86"
                            style={{
                                animation: `mesh-dash ${3.2 + (i % 5) * 0.9}s linear ${(i % 7) * 0.55}s infinite`,
                            }}
                        />
                    </g>
                );
            })}

            {/* Nodes */}
            {NODES.map(([x, y, r], i) => (
                <g key={`n-${i}`}>
                    <circle cx={x} cy={y} r={r * 6} fill="url(#node-glow)" />
                    <circle
                        cx={x}
                        cy={y}
                        r={r}
                        fill="#d5dbe6"
                        style={{
                            animation: `mesh-pulse ${3 + (i % 4)}s ease-in-out ${(i % 6) * 0.4}s infinite`,
                        }}
                    />
                </g>
            ))}
        </svg>
    );
}

/* --- Orbit -------------------------------------------------------------- */

/** Concentric rings with a dot riding each one, on native SVG motion. */
export function OrbitRings({ className = '' }: { className?: string }) {
    const rings = [
        { rx: 300, ry: 96, duration: 34 },
        { rx: 220, ry: 70, duration: 26 },
        { rx: 140, ry: 45, duration: 19 },
    ];

    return (
        <svg aria-hidden className={`h-full w-full ${className}`} viewBox="0 0 720 260" fill="none">
            {rings.map((ring, i) => {
                const orbit = `M ${360 - ring.rx} 130 a ${ring.rx} ${ring.ry} 0 1 1 ${ring.rx * 2} 0 a ${ring.rx} ${ring.ry} 0 1 1 -${ring.rx * 2} 0`;
                return (
                    <g key={ring.rx}>
                        <ellipse
                            cx="360"
                            cy="130"
                            rx={ring.rx}
                            ry={ring.ry}
                            stroke="#d5dbe6"
                            strokeOpacity={0.1 - i * 0.02}
                            strokeWidth="1"
                        />
                        <circle r="2.5" fill="#a6daff">
                            <animateMotion dur={`${ring.duration}s`} repeatCount="indefinite" path={orbit} />
                        </circle>
                    </g>
                );
            })}
        </svg>
    );
}
