import { CrumbBar } from "../components/PageHeader";
import { Offers } from "../components/Offers";

export default function OffersPage() {
  return (
    <>
      <CrumbBar crumb="تخفیف‌ها" note="پیشنهادهای این فصل" />
      <Offers />
    </>
  );
}
