import { CrumbBar } from "../components/PageHeader";
import Experience from "../components/Experience";
import { Stats, Testimonials } from "../components/Offers";

export default function AboutPage() {
  return (
    <>
      <CrumbBar crumb="درباره ما" note="داستان، ارزش‌ها و تیم نوشتار" />
      <Experience />
      <Testimonials />
      <Stats />
    </>
  );
}
