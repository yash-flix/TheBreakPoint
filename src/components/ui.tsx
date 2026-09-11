import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* --- Button ---------------------------------------------------------- */

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const buttonBase =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium ' +
    'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-ice-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ' +
    'disabled:pointer-events-none disabled:opacity-50';

const buttonVariants: Record<ButtonVariant, string> = {
    primary:
        'bg-ice-300 text-ink-950 hover:bg-ice-200 shadow-[0_0_40px_-12px_rgba(166,218,255,0.7)]',
    outline:
        'border border-[color:var(--line-strong)] text-mist-100 hover:border-ice-300/50 hover:bg-ice-300/[0.06] hover:text-white',
    ghost: 'text-mist-300 hover:text-white hover:bg-white/[0.04]',
};

const buttonSizes: Record<ButtonSize, string> = {
    sm: 'h-9 px-4 text-[13px]',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-[15px]',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => (
        <button
            ref={ref}
            className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
);
Button.displayName = 'Button';

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
}

/** Anchor styled as a Button, for real navigation targets. */
export const LinkButton = ({
    className = '',
    variant = 'primary',
    size = 'md',
    children,
    ...props
}: LinkButtonProps) => (
    <a
        className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
        {...props}
    >
        {children}
    </a>
);

/* --- Motion ---------------------------------------------------------- */

/** Scroll-triggered fade-and-rise that collapses to a plain div when motion is reduced. */
export function Reveal({
    className = '',
    delay = 0,
    children,
}: {
    className?: string;
    delay?: number;
    children: React.ReactNode;
}) {
    const reduce = useReducedMotion();

    if (reduce) return <div className={className}>{children}</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* --- Atmosphere ------------------------------------------------------- */

/**
 * Layered backdrop blur that ramps rather than switching on. Eight bands, each
 * blurring twice as hard as the last and masked to its own slice, so content
 * dissolves gradually into the bar instead of hitting a hard glass edge.
 */
export function ProgressiveBlur({
    direction = 'top',
    className = '',
}: {
    direction?: 'top' | 'bottom';
    className?: string;
}) {
    const steps = [0.0546875, 0.109375, 0.21875, 0.4375, 0.875, 1.75, 3.5, 7];
    const band = 100 / steps.length;

    return (
        <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
            {steps.map((blur, i) => {
                // Each band is opaque across two slices and feathered on both sides.
                const start = i * band;
                const stops = `transparent ${start}%, black ${start + band}%, black ${start + band * 2}%, transparent ${start + band * 3}%`;
                const mask =
                    direction === 'top'
                        ? `linear-gradient(to top, ${stops})`
                        : `linear-gradient(to bottom, ${stops})`;
                return (
                    <div
                        key={blur}
                        className="absolute inset-0"
                        style={{
                            backdropFilter: `blur(${blur}px)`,
                            WebkitBackdropFilter: `blur(${blur}px)`,
                            maskImage: mask,
                            WebkitMaskImage: mask,
                        }}
                    />
                );
            })}
        </div>
    );
}

/** Radial light source. The reference anchors one to the bottom of the hero. */
export function Bloom({
    className = '',
    intensity = 0.16,
}: {
    className?: string;
    intensity?: number;
}) {
    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute rounded-full blur-[130px] ${className}`}
            style={{ backgroundColor: `rgba(78, 166, 230, ${intensity})` }}
        />
    );
}

/**
 * Reveals a sentence one word at a time as it scrolls into view. Used once, on
 * the single statement the page most wants read.
 */
export function WordReveal({
    text,
    className = '',
    accentFrom,
}: {
    text: string;
    className?: string;
    accentFrom?: number;
}) {
    const reduce = useReducedMotion();
    const words = text.split(' ');

    if (reduce) return <p className={className}>{text}</p>;

    return (
        <p className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    initial={{ opacity: 0.12 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-15% 0px -25% 0px' }}
                    transition={{ delay: i * 0.045, duration: 0.5, ease: 'easeOut' }}
                    className={
                        accentFrom !== undefined && i >= accentFrom
                            ? 'font-display italic text-ice-300'
                            : undefined
                    }
                >
                    {word}
                    {i < words.length - 1 ? ' ' : ''}
                </motion.span>
            ))}
        </p>
    );
}

/* --- Type -------------------------------------------------------------- */

/** Mono micro-label, optionally numbered like an index entry. */
export function Eyebrow({
    index,
    children,
    className = '',
}: {
    index?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`eyebrow flex items-center gap-3 ${className}`}>
            {index ? (
                <>
                    <span className="text-ice-300/70">{index}</span>
                    <span className="h-px w-6 bg-[color:var(--line-strong)]" />
                </>
            ) : (
                <span className="h-1 w-1 rounded-full bg-ice-300/80" />
            )}
            <span>{children}</span>
        </div>
    );
}

/**
 * Section heading. Inter Medium at tight tracking, painted with a gradient that
 * falls off to the page background so the type dissolves at its edges.
 * `fill="radial"` suits centred headings, `"linear"` suits left-aligned ones.
 */
export function Display({
    as: Tag = 'h2',
    fill = 'linear',
    className = '',
    children,
}: {
    as?: 'h1' | 'h2' | 'h3';
    fill?: 'radial' | 'linear' | 'none';
    className?: string;
    children: React.ReactNode;
}) {
    const fillClass =
        fill === 'radial' ? 'text-fill-radial' : fill === 'linear' ? 'text-fill-linear' : 'text-mist-50';

    return (
        <Tag
            className={`font-sans font-medium leading-[1.08] tracking-[-0.02em] ${fillClass} ${className}`}
        >
            {children}
        </Tag>
    );
}

/**
 * Instrument Serif italic accent inside a Display heading. The reference uses
 * the serif only here, which is what keeps it feeling like a mark rather than
 * a body face.
 */
export function Accent({ children }: { children: React.ReactNode }) {
    return (
        <em className="font-display italic tracking-normal text-ice-300 [-webkit-text-fill-color:#a6daff]">
            {children}
        </em>
    );
}

/* --- Layout ----------------------------------------------------------- */

/** Standard page gutter and max width. */
export function Container({
    className = '',
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
    );
}

/** Faint blueprint grid + grain, sized to its nearest positioned ancestor. */
export function Backdrop({ className = '' }: { className?: string }) {
    return (
        <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            <div className="absolute inset-0 grid-veil mask-fade-b opacity-60" />
            <div className="absolute inset-0 noise-veil opacity-[0.035] mix-blend-overlay" />
        </div>
    );
}
