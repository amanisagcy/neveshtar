import { CrumbBar } from "../components/PageHeader";
import Journal from "../components/Journal";

export default function JournalPage() {
  return (
    <>
      <CrumbBar crumb="مجله" note="الهام، راهنما و ایده" />
      <Journal />
    </>
  );
}
