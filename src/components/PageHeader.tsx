import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { IconChevron } from "../icons";
import { Reveal } from "../ui";

/* slim breadcrumb strip for pages whose sections carry their own headers */
export function CrumbBar({ crumb, note }: { crumb: string; note?: string }) {
  return (
    <div className="border-b border-sand/70 bg-cream/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-xs font-semibold text-mist">
          <Link to="/" className="transition-colors hover:text-coraldeep">
            خانه
          </Link>
          <IconChevron className="size-3 text-mistlight" />
          <span className="text-inkdeep">{crumb}</span>
        </nav>
        {note && <span className="hidden text-xs font-semibold text-mistlight sm:block">{note}</span>}
      </div>
    </div>
  );
}

interface Props {
  eyebrow: string;
  title: string;
  callig?: string;
  text?: string;
  crumb: string;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, callig, text, crumb, children }: Props) {
  return (
    <section className="paper-grain relative overflow-hidden border-b border-sand/70">
      <span
        className="font-callig pointer-events-none absolute -top-10 left-0 select-none text-[11rem] leading-none text-ink/[0.045] md:text-[16rem]"
        aria-hidden
      >
        {callig ?? title}
      </span>

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
        <Reveal>
          <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-xs font-semibold text-mist">
            <Link to="/" className="transition-colors hover:text-coraldeep">
              خانه
            </Link>
            <IconChevron className="size-3 text-mistlight" />
            <span className="text-inkdeep">{crumb}</span>
          </nav>
        </Reveal>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal delay={80}>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-sm font-semibold tracking-[0.25em] text-gold">{eyebrow}</span>
                {callig && (
                  <span className="font-callig text-lg leading-none text-coral">{callig}</span>
                )}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="mt-4 text-3xl font-black leading-[1.3] text-inkdeep md:text-5xl md:leading-[1.25]">
                {title}
              </h1>
            </Reveal>
            {text && (
              <Reveal delay={220}>
                <p className="mt-4 max-w-xl text-base leading-8 text-mist md:text-lg">{text}</p>
              </Reveal>
            )}
          </div>
          {children && <Reveal delay={260}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
