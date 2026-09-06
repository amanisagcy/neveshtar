import { CrumbBar } from "../components/PageHeader";
import { Faq } from "../components/FaqFooter";

export default function FaqPage() {
  return (
    <>
      <CrumbBar crumb="پرسش‌های پرتکرار" note="پاسخ سوال‌های شما" />
      <Faq />
    </>
  );
}
