/* ---------- helpers ---------- */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const faDigits = (v: string | number): string =>
  String(v).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

export const faNumber = (n: number): string =>
  faDigits(n.toLocaleString("en-US"));

export const faPrice = (n: number): string => `${faNumber(n)} تومان`;

export const discountOf = (price: number, oldPrice?: number): number =>
  oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

/* ---------- images ---------- */
export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/0623c1fb-100d-4ec8-a7a0-78c22143bd2c/_result.png",
  notebooks:
    "https://image.qwenlm.ai/generated-images/21e18b88-b4ec-415f-a402-47f8a73b8dd1/_result.png",
  pens: "https://image.qwenlm.ai/generated-images/0aaab7d2-34bc-485a-860d-2208883c268f/_result.png",
  design:
    "https://image.qwenlm.ai/generated-images/bea93797-d983-49a8-a13c-71816845e635/_result.png",
  school:
    "https://image.qwenlm.ai/generated-images/1ec09534-86ca-457f-a0e0-a301da6a0c1c/_result.png",
  office:
    "https://image.qwenlm.ai/generated-images/08a91962-4003-4fd0-93ee-3ebd37cfe685/_result.png",
  desk: "https://image.qwenlm.ai/generated-images/60adb46c-b49d-44fd-b77e-67ba69e2656e/_result.png",
  editorial:
    "https://image.qwenlm.ai/generated-images/297df879-fce9-4717-851b-e34be89a1034/_result.png",
  blogDesign:
    "https://image.qwenlm.ai/generated-images/5410712c-0610-4de3-a020-043f8ba139dd/_result.png",
  blogDesk:
    "https://image.qwenlm.ai/generated-images/334bd466-37ee-4308-8cab-de79b332fded/_result.png",
};

/* ---------- types ---------- */
export interface Product {
  id: number;
  name: string;
  brand: string;
  brandFa: string;
  catId: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  img: string;
  badge?: string;
}

export interface Filters {
  q: string;
  cat: string;
  brand: string;
  price: string;
  sort: string;
}

export const EMPTY_FILTERS: Filters = {
  q: "",
  cat: "all",
  brand: "all",
  price: "all",
  sort: "featured",
};

/* ---------- products ---------- */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "دفتر چرمی کلاسیک",
    brand: "Moleskine",
    brandFa: "مولسکین",
    catId: "notebooks",
    price: 840000,
    oldPrice: 980000,
    rating: 4.9,
    reviews: 214,
    sold: 1240,
    img: IMG.notebooks,
    badge: "پرفروش",
  },
  {
    id: 2,
    name: "خودکار لوکس فلزی",
    brand: "Parker",
    brandFa: "پارکر",
    catId: "pens",
    price: 1250000,
    oldPrice: 1560000,
    rating: 4.8,
    reviews: 187,
    sold: 986,
    img: IMG.pens,
    badge: "٪۲۰ تخفیف",
  },
  {
    id: 3,
    name: "ست طراحی حرفه‌ای",
    brand: "Faber-Castell",
    brandFa: "فابرکاستل",
    catId: "design",
    price: 2180000,
    rating: 5,
    reviews: 156,
    sold: 743,
    img: IMG.design,
    badge: "ویژه هنرمندان",
  },
  {
    id: 4,
    name: "پلنر روزانه مینیمال",
    brand: "Neveshtar",
    brandFa: "نوشتار",
    catId: "notebooks",
    price: 460000,
    oldPrice: 540000,
    rating: 4.7,
    reviews: 321,
    sold: 2115,
    img: IMG.editorial,
    badge: "پرفروش",
  },
  {
    id: 5,
    name: "ست رومیزی مدیریتی",
    brand: "Staedtler",
    brandFa: "اِستدلر",
    catId: "office",
    price: 3940000,
    rating: 4.9,
    reviews: 98,
    sold: 412,
    img: IMG.office,
  },
  {
    id: 6,
    name: "ارگانایزر چوبی میز کار",
    brand: "Neveshtar",
    brandFa: "نوشتار",
    catId: "desk",
    price: 1120000,
    rating: 4.6,
    reviews: 143,
    sold: 830,
    img: IMG.desk,
  },
  {
    id: 7,
    name: "جامدادی چرمی دست‌دوز",
    brand: "Neveshtar",
    brandFa: "نوشتار",
    catId: "school",
    price: 680000,
    oldPrice: 750000,
    rating: 4.8,
    reviews: 264,
    sold: 1671,
    img: IMG.school,
  },
  {
    id: 8,
    name: "پک دانش‌آموز خلاق",
    brand: "Neveshtar",
    brandFa: "نوشتار",
    catId: "school",
    price: 990000,
    oldPrice: 1240000,
    rating: 4.9,
    reviews: 411,
    sold: 2870,
    img: IMG.school,
    badge: "پیشنهاد ویژه",
  },
];

/* ---------- categories ---------- */
export interface Category {
  id: string;
  name: string;
  count: number;
  img: string;
  span: string;
  height: string;
}

export const CATEGORIES: Category[] = [
  { id: "notebooks", name: "دفتر و سررسید", count: 124, img: IMG.notebooks, span: "md:col-span-3", height: "h-80 md:h-96" },
  { id: "pens", name: "خودکار و روان‌نویس", count: 98, img: IMG.pens, span: "md:col-span-3", height: "h-80 md:h-96" },
  { id: "design", name: "مداد و ابزار طراحی", count: 86, img: IMG.design, span: "md:col-span-2", height: "h-72 md:h-80" },
  { id: "school", name: "لوازم مدرسه", count: 143, img: IMG.school, span: "md:col-span-2", height: "h-72 md:h-80" },
  { id: "office", name: "لوازم اداری", count: 75, img: IMG.office, span: "md:col-span-2", height: "h-72 md:h-80" },
  { id: "desk", name: "اکسسوری میز کار", count: 62, img: IMG.desk, span: "md:col-span-6", height: "h-64 md:h-72" },
];

/* ---------- brands ---------- */
export const BRANDS = [
  { en: "PARKER", fa: "پارکر" },
  { en: "Faber-Castell", fa: "فابرکاستل" },
  { en: "STAEDTLER", fa: "اِستدلر" },
  { en: "MOLESKINE", fa: "مولسکین" },
  { en: "PILOT", fa: "پایلوت" },
  { en: "LAMY", fa: "لامی" },
];

/* ---------- offers ---------- */
export interface Offer {
  id: number;
  title: string;
  items: string[];
  price: number;
  oldPrice: number;
  img: string;
  tag: string;
}

export const OFFERS: Offer[] = [
  {
    id: 1,
    title: "پک دانش‌آموز خلاق",
    items: ["دفتر ۱۰۰ برگ کلاسیک", "مداد طراحی ۶ تکه", "پاک‌کن و تراش فلزی", "جامدادی برزنتی"],
    price: 990000,
    oldPrice: 1240000,
    img: IMG.school,
    tag: "محبوب‌ترین پک",
  },
  {
    id: 2,
    title: "ست هدیه نویسنده",
    items: ["خودکار فلزی پارکر", "دفتر چرمی جیبی", "جوهر آبی ۵۰ میلی‌لیتر", "جعبه هدیه اختصاصی نوشتار"],
    price: 2450000,
    oldPrice: 2890000,
    img: IMG.editorial,
    tag: "پیشنهاد سردبیر",
  },
  {
    id: 3,
    title: "پک شروع طراحی",
    items: ["ست مداد فابرکاستل", "دفتر اسکچ ۱۲۰ برگ", "محوکن و پاک‌کن خمیری", "مداد کنته حرفه‌ای"],
    price: 1680000,
    oldPrice: 1980000,
    img: IMG.design,
    tag: "ویژه هنرمندان",
  },
];

/* ---------- testimonials ---------- */
export interface Testimonial {
  name: string;
  role: string;
  product: string;
  rating: number;
  text: string;
  initial: string;
  tone: "ink" | "gold" | "coral";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "سارا محمدی",
    role: "طراح گرافیک",
    product: "پلنر روزانه مینیمال",
    rating: 5,
    text: "کیفیت کاغذ فوق‌العاده است؛ جوهر اصلاً پخش نمی‌شود. از وقتی این پلنر را دارم، برنامه‌ریزی روزانه‌ام جدی‌تر و لذت‌بخش‌تر شده.",
    initial: "س",
    tone: "gold",
  },
  {
    name: "امیر رضایی",
    role: "نویسنده",
    product: "خودکار لوکس فلزی",
    rating: 5,
    text: "وزن و تعادل قلم موقع نوشتن، واقعاً حس لوکس بودن می‌دهد. بسته‌بندی آن‌قدر شیک بود که دلم نیامد بازش کنم!",
    initial: "ا",
    tone: "ink",
  },
  {
    name: "نگار کریمی",
    role: "دانشجوی معماری",
    product: "ست طراحی حرفه‌ای",
    rating: 5,
    text: "به‌عنوان دانشجوی معماری، نرمی مدادها و بافت کاغذ اسکچ برایم حیاتی است. این ست دقیقاً همان چیزی بود که دنبال‌اش بودم.",
    initial: "ن",
    tone: "coral",
  },
  {
    name: "محمد احمدی",
    role: "مدیر محصول",
    product: "دفتر چرمی کلاسیک",
    rating: 4,
    text: "جلسه‌هایم را دیگر در اپلیکیشن نمی‌نویسم؛ حس نوشتن روی کاغذ مولسکین چیز دیگری است. ارسال هم در کمتر از دو روز انجام شد.",
    initial: "م",
    tone: "ink",
  },
];

/* ---------- blog ---------- */
export interface Post {
  id: number;
  title: string;
  cat: string;
  date: string;
  read: string;
  img: string;
  excerpt: string;
}

export const POSTS: Post[] = [
  {
    id: 1,
    title: "بهترین ابزار طراحی برای شروع",
    cat: "خلاقیت",
    date: "۸ آذر ۱۴۰۴",
    read: "۸ دقیقه مطالعه",
    img: IMG.blogDesign,
    excerpt:
      "برای شروع طراحی لازم نیست گران‌ترین ابزارها را بخرید؛ لازم است درست‌ترین‌ها را بشناسید. از انتخاب مداد تا کاغذ مناسب، همه چیز را قدم‌به‌قدم بررسی می‌کنیم.",
  },
  {
    id: 2,
    title: "چگونه دفتر مناسب انتخاب کنیم؟",
    cat: "راهنمای خرید",
    date: "۱۲ آذر ۱۴۰۴",
    read: "۶ دقیقه مطالعه",
    img: IMG.notebooks,
    excerpt: "گرماژ کاغذ، نوع صحافی و خط‌کشی؛ سه معیاری که یک دفتر معمولی را به دفتر محبوب‌تان تبدیل می‌کند.",
  },
  {
    id: 3,
    title: "راهنمای انتخاب خودکار حرفه‌ای",
    cat: "راهنمای خرید",
    date: "۳ آذر ۱۴۰۴",
    read: "۵ دقیقه مطالعه",
    img: IMG.pens,
    excerpt: "روان‌نویس، ساچمه‌ای یا فونتین؟ هر کدام برای چه سبک نوشتنی ساخته شده‌اند و کدام برای دست‌خط شما مناسب‌تر است؟",
  },
  {
    id: 4,
    title: "ایده‌های جذاب برای میز کار",
    cat: "سبک زندگی",
    date: "۲۸ آبان ۱۴۰۴",
    read: "۷ دقیقه مطالعه",
    img: IMG.blogDesk,
    excerpt: "یک میز مرتب، ذهن مرتب می‌سازد. ده ایده ساده و کم‌هزینه برای اینکه میز کارتان به الهام‌بخش‌ترین نقطه خانه تبدیل شود.",
  },
];

/* ---------- FAQ ---------- */
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "چگونه سفارش ثبت کنم؟",
    a: "کافی است محصول موردنظر را انتخاب و روی دکمه «افزودن به سبد خرید» بزنید. سپس از سبد خرید، گزینه «تکمیل خرید» را انتخاب کنید، آدرس را وارد کنید و پرداخت را انجام دهید. در کمتر از یک دقیقه سفارش شما ثبت می‌شود.",
  },
  {
    q: "روش‌های پرداخت چیست؟",
    a: "پرداخت آنلاین با تمام کارت‌های عضو شتاب، کیف پول نوشتار و پرداخت در محل (برای تهران) فعال است. برای سازمان‌ها نیز امکان صدور پیش‌فاکتور و پرداخت بانکی وجود دارد.",
  },
  {
    q: "زمان ارسال سفارش چقدر است؟",
    a: "سفارش‌های تهران همان روز یا حداکثر تا ۲۴ ساعت کاری و سفارش‌های سایر شهرها طی ۲ تا ۴ روز کاری با پست پیشتاز یا تیپاکس ارسال می‌شوند. سفارش‌های بالای ۱ میلیون تومان، ارسال رایگان دارند.",
  },
  {
    q: "آیا امکان تعویض کالا وجود دارد؟",
    a: "بله؛ تا ۷ روز پس از دریافت، در صورتی که کالا استفاده نشده و بسته‌بندی اصلی آن سالم باشد، امکان تعویض یا مرجوع کردن بدون قیدوشرط وجود دارد.",
  },
  {
    q: "چگونه محصول مناسب انتخاب کنم؟",
    a: "در صفحه هر محصول، راهنمای خرید، مشخصات کامل و نظر خریداران قبلی را قرار داده‌ایم. اگر هنوز مردد هستید، تیم پشتیبانی ما با کمال میل در انتخاب بهترین گزینه همراه شماست.",
  },
  {
    q: "چطور با پشتیبانی تماس بگیرم؟",
    a: "از طریق تلفن ۰۲۱-۹۱۰۰۸۸۴۴، واتس‌اپ و تلگرام یا فرم تماس در پایین همین صفحه، ۷ روز هفته از ساعت ۹ تا ۲۱ پاسخ‌گوی شما هستیم.",
  },
];

/* ---------- features ---------- */
export interface Feature {
  icon: "truck" | "shield" | "seal" | "chat" | "gift" | "layers";
  title: string;
  text: string;
}

export const FEATURES: Feature[] = [
  { icon: "truck", title: "ارسال سریع", text: "تحویل اکسپرس در تهران و ارسال به سراسر کشور در کمتر از ۴۸ ساعت." },
  { icon: "shield", title: "تضمین کیفیت محصولات", text: "هر محصول پیش از ارسال، توسط تیم کنترل کیفیت بررسی می‌شود." },
  { icon: "seal", title: "ضمانت اصالت کالا", text: "تمام محصولات مستقیم از نمایندگی رسمی برندها تأمین می‌شوند." },
  { icon: "chat", title: "پشتیبانی حرفه‌ای", text: "۷ روز هفته، از انتخاب محصول تا پس از خرید، کنار شما هستیم." },
  { icon: "gift", title: "بسته‌بندی اختصاصی", text: "بسته‌بندی دست‌ساز نوشتار؛ هدیه‌ای که قبل از باز کردن هم زیباست." },
  { icon: "layers", title: "تنوع برندها", text: "بیش از ۱۰۰ برند معتبر جهانی و ایرانی در یک‌جا گرد آمده‌اند." },
];

/* ---------- stats ---------- */
export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export const STATS: Stat[] = [
  { value: 50000, label: "مشتری فعال" },
  { value: 2000, label: "محصول" },
  { value: 100, label: "برند معتبر" },
  { value: 5, label: "سال تجربه" },
];

export const PRICE_RANGES = [
  { id: "all", label: "همه قیمت‌ها", min: 0, max: Infinity },
  { id: "lt500", label: "تا ۵۰۰ هزار تومان", min: 0, max: 500000 },
  { id: "500-1", label: "۵۰۰ هزار تا ۱ میلیون", min: 500000, max: 1000000 },
  { id: "1-2", label: "۱ تا ۲ میلیون تومان", min: 1000000, max: 2000000 },
  { id: "gt2", label: "بالای ۲ میلیون تومان", min: 2000000, max: Infinity },
];

export const NAV_LINKS = [
  { label: "صفحه اصلی", to: "/" },
  { label: "فروشگاه", to: "/shop" },
  { label: "دسته‌بندی محصولات", to: "/categories" },
  { label: "پرفروش‌ترین‌ها", to: "/bestsellers" },
  { label: "تخفیف‌ها", to: "/offers" },
  { label: "مجله", to: "/journal" },
  { label: "درباره ما", to: "/about" },
];
