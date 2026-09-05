import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./hooks";
import { IconStar } from "./icons";
import { faDigits } from "./data";

/* ---------- scroll reveal wrapper ---------- */
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
  style?: CSSProperties;
}

export function Reveal({ children, className = "", delay = 0, variant = "up", style }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v =
    variant === "left"
      ? "reveal-left"
      : variant === "right"
        ? "reveal-right"
        : variant === "scale"
          ? "reveal-scale"
          : "";
  return (
    <div
      ref={ref}
      className={`reveal ${v} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ---------- section heading ---------- */
interface SectionHeadProps {
  eyebrow: string;
  callig?: string;
  title: ReactNode;
  text?: string;
  dark?: boolean;
  center?: boolean;
}

export function SectionHead({ eyebrow, callig, title, text, dark, center }: SectionHeadProps) {
  return (
    <div className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Reveal>
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className="h-px w-10 bg-gold" />
          <span className="text-sm font-semibold tracking-[0.25em] text-gold">
            {eyebrow}
          </span>
          {callig && (
            <span
              className={`font-callig text-lg leading-none ${dark ? "text-goldsoft" : "text-coral"}`}
            >
              {callig}
            </span>
          )}
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`mt-4 text-3xl font-black leading-[1.35] md:text-[2.6rem] md:leading-[1.3] ${
            dark ? "text-cream" : "text-inkdeep"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={170}>
          <p className={`mt-4 text-base leading-8 md:text-lg ${dark ? "text-sand/80" : "text-mist"}`}>
            {text}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- rating stars ---------- */
export function Stars({ rating, className = "size-3.5" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`امتیاز ${faDigits(rating)} از ۵`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar
          key={i}
          className={`${className} ${i <= Math.round(rating) ? "text-gold" : "text-sanddeep"}`}
        />
      ))}
    </span>
  );
}

/* ---------- decorative pen divider ---------- */
export function PenDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
      <svg viewBox="0 0 24 24" className="size-4 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v13m0 0 3.5-3.5M12 16l-3.5-3.5M12 16v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
    </div>
  );
}
