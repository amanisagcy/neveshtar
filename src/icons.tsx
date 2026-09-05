import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (props: P): P => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const IconNib = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" {...p}>
    <path d="M16 2.5 25.5 12 16 29.5 6.5 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="16" cy="13" r="2.6" fill="currentColor" />
    <path d="M16 15.6V24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);

export const IconCart = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5h2l2.4 11.2a1.6 1.6 0 0 0 1.56 1.3h7.9a1.6 1.6 0 0 0 1.56-1.24L21.5 9H7" />
    <circle cx="10.4" cy="20.4" r="1.4" />
    <circle cx="17.6" cy="20.4" r="1.4" />
  </svg>
);

export const IconUser = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20c1.3-3.2 3.9-4.8 7-4.8s5.7 1.6 7 4.8" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h10M4 17h16" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8Z" />
  </svg>
);

export const IconHeart = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20.2S3.5 15 3.5 9.3a4.6 4.6 0 0 1 8.5-2.5A4.6 4.6 0 0 1 20.5 9.3c0 5.7-8.5 10.9-8.5 10.9Z" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconTrash = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M9 7V5h6v2m-9.5 0 .8 12a1.8 1.8 0 0 0 1.8 1.7h5.8a1.8 1.8 0 0 0 1.8-1.7l.8-12" />
    <path d="M10 11v6m4-6v6" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconFilter = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 6h16M7 12h10m-7 6h4" />
  </svg>
);

export const IconSort = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4v13m0 0-3-3m3 3 3-3M17 20V7m0 0-3 3m3-3 3 3" />
  </svg>
);

export const IconChevron = (p: P) => (
  <svg {...base(p)}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const IconTruck = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.5 6.5h11.5v10H2.5zM14 10h4l3 3.2v3.3h-3" />
    <circle cx="6.6" cy="17.6" r="1.9" />
    <circle cx="16.8" cy="17.6" r="1.9" />
    <path d="M8.5 16.5H14" />
  </svg>
);

export const IconShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 5 5.8v5.4c0 4.4 3 8 7 9.8 4-1.8 7-5.4 7-9.8V5.8Z" />
    <path d="m9 11.6 2.2 2.2L15.4 9.6" />
  </svg>
);

export const IconSeal = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 2.8 2 1.5 2.5-.3.9 2.3 2.3.9-.3 2.5 1.5 2-1.5 2 .3 2.5-2.3.9-.9 2.3-2.5-.3-2 1.5-2-1.5-2.5.3-.9-2.3-2.3-.9.3-2.5-1.5-2 1.5-2-.3-2.5 2.3-.9.9-2.3 2.5.3Z" />
    <path d="m9.2 12.1 2 2 3.8-3.9" />
  </svg>
);

export const IconChat = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.4 3.6c-.5.4-1.1.1-1.1-.5Z" />
    <path d="M8.5 9h7m-7 3h4.5" />
  </svg>
);

export const IconGift = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 11h15v9h-15zM12 7.5V20m-7.5-5h15" transform="translate(0 -1)" />
    <path d="M12 7.5c-1.8 0-4.5-.6-4.5-2.5S10 2.6 12 7.5c2-4.9 4.5-4.4 4.5-2.5S13.8 7.5 12 7.5Z" />
  </svg>
);

export const IconLayers = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8Z" />
    <path d="m4.5 12 7.5 4 7.5-4M4.5 16l7.5 4 7.5-4" />
  </svg>
);

export const IconQuote = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M9.5 6.5c-3 1.4-4.8 3.9-4.8 7.2 0 2.4 1.5 4 3.6 4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.1-3-3.1h-.5c.4-1.5 1.5-2.7 3.2-3.5Zm9 0c-3 1.4-4.8 3.9-4.8 7.2 0 2.4 1.5 4 3.6 4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.1-3-3.1h-.5c.4-1.5 1.5-2.7 3.2-3.5Z" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconTelegram = (p: P) => (
  <svg {...base(p)}>
    <path d="m20.5 4.5-17 6.8c-.7.3-.7 1.3.1 1.5l4.3 1.3 1.7 5.2c.2.7 1.1.9 1.6.3l2.4-2.9 4.5 3.3c.6.4 1.4.1 1.5-.6l2.3-13.6c.1-.8-.6-1.4-1.4-1.3Z" />
    <path d="m8 14.1 9.5-7.6" />
  </svg>
);

export const IconX = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 4.5 15 15M19.5 4.5l-15 15" />
  </svg>
);

export const IconLinkedin = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8.3 10.5v6M8.3 7.6v.1m3.8 8.8v-3.6c0-1.4.9-2.3 2.2-2.3s2 .9 2 2.3v3.6" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.8 4.5h2.5l1.2 3.8-1.9 1.4a12.4 12.4 0 0 0 5.7 5.7l1.4-1.9 3.8 1.2v2.5c0 1-.8 1.9-1.9 1.8C10.4 18.6 5.4 13.6 5 6.4c-.1-1 .8-1.9 1.8-1.9Z" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.5-6.5-10.3A6.4 6.4 0 0 1 12 4.2a6.4 6.4 0 0 1 6.5 6.5C18.5 15.5 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.3" />
  </svg>
);

export const IconSpark = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5c.5 4.6 2 6.6 6.9 7.4-4.9 1-6.3 2.9-6.9 7.6-.6-4.7-2-6.6-6.9-7.6 4.9-.8 6.4-2.8 6.9-7.4Z" />
    <path d="M19 14.5c.3 2.4 1 3.4 3.5 3.9-2.5.5-3.2 1.5-3.5 3.9-.3-2.4-1-3.4-3.5-3.9 2.5-.5 3.2-1.5 3.5-3.9Z" opacity=".7" />
  </svg>
);
