import { CrumbBar } from "../components/PageHeader";
import BestSellers from "../components/BestSellers";

export default function BestsellersPage() {
  return (
    <>
      <CrumbBar crumb="پرفروش‌ترین‌ها" note="بر اساس خرید واقعی مشتریان" />
      <BestSellers />
    </>
  );
}
