import { useNavigate } from "react-router-dom";
import { CATEGORIES, faDigits } from "../data";
import { CrumbBar } from "../components/PageHeader";
import Categories from "../components/Categories";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const total = CATEGORIES.reduce((s, c) => s + c.count, 0);

  return (
    <>
      <CrumbBar crumb="دسته‌بندی‌ها" note={`${faDigits(total)} محصول در ${faDigits(CATEGORIES.length)} دسته`} />
      <Categories onPick={(catId) => navigate(`/shop?cat=${catId}`)} />
    </>
  );
}
