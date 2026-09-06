import { Link } from "react-router-dom";
import { CATEGORIES, faDigits } from "../data";
import { IconArrow } from "../icons";
import { Reveal, SectionHead } from "../ui";

export default function Categories({ onPick }: { onPick: (catId: string) => void }) {
  return (
    <section id="categories" className="paper-grain relative pt-14 pb-24 md:pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="دسته‌بندی‌ها"
            callig="هر آنچه لازم دارید"
            title="هر چیزی برای خلق کردن"
            text="محصولات مورد نیاز شما برای نوشتن، طراحی، یادگیری و خلاقیت — در شش دنیای متفاوت."
          />
          <Reveal delay={200} className="mb-2">
            <Link
              to="/shop"
              className="group flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-bold text-ink transition-colors hover:text-coraldeep"
            >
              مشاهده همه محصولات
              <IconArrow className="size-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 110} className={c.span}>
              <button
                onClick={() => onPick(c.id)}
                className={`group relative block w-full overflow-hidden rounded-xl text-start shadow-card transition-shadow duration-500 hover:shadow-lift ${c.height}`}
              >
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <span className="img-veil absolute inset-0" aria-hidden />
                <span className="absolute inset-0 bg-gradient-to-t from-inkdeep/85 via-inkdeep/20 to-transparent" aria-hidden />

                <span className="absolute top-5 end-5 z-10 rounded-full border border-cream/30 bg-white/15 px-3 py-1 text-xs font-semibold text-cream backdrop-blur-md">
                  {faDigits(c.count)} محصول
                </span>
                <span className="font-latin absolute top-5 start-5 z-10 text-xs tracking-[0.3em] text-cream/50">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6">
                  <span>
                    <span className="block text-xl font-black text-cream md:text-2xl">{c.name}</span>
                    <span
                      className={`mt-2 block text-sm font-semibold text-goldsoft transition-all duration-500 ${
                        c.id === "desk" ? "md:opacity-100" : "opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      مشاهده مجموعه ←
                    </span>
                  </span>
                  <span className="grid size-11 shrink-0 translate-y-3 place-items-center rounded-full bg-coral text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <IconArrow className="size-5" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
