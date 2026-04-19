/* ──────────────────────────────────────────────────────
   Site-wide constants — single source of truth for copy,
   section headers, nav links, stats, and quotes.
   ────────────────────────────────────────────────────── */

export const SITE = {
  name: 'Rakesh Agarwal',
  suffix: 'IRS',
  tagline: 'Advocate & Advisor',
  subtitle: 'Customs & Indirect Tax — Joint Commissioner (Retd.)',
  copyright: '© MMXXVI Rakesh Agarwal, Advocates',
} as const;

export const HERO_INTRO =
  'A practice rooted in three decades of service inside the Indian Revenue Service, and continued advocacy before the Appellate Tribunal - GSTAT, CESTAT, the High Courts, and the Supreme Court of India.';

export interface RolePill {
  label: string;
  emphasis: string;
  emphasisFirst?: boolean;
}

export const HERO_ROLES: RolePill[] = [
  { label: 'Tax', emphasis: 'Practitioner' },
  { label: 'Appellate', emphasis: 'Practitioner', emphasisFirst: true },
  { label: 'Policy', emphasis: 'Expert' },
];

export interface StatPill {
  value: string;
  label: string;
  accent?: boolean;
}

export const HERO_STATS: StatPill[] = [
  { value: '30+', label: 'Years of Service' },
  { value: '45', label: 'Cases Argued' },
  { value: '3', label: 'Offices' },
];

export const BAR_ENROLMENT = {
  number: 'D/20542/2025',
  council: 'Delhi Bar Council',
} as const;

export const PORTRAIT = {
  label: 'The Advocate',
  quote: 'I take a small number of matters, read them deeply, and argue them',
  quoteEmphasis: 'myself.',
  byline: 'Rakesh Agarwal',
  bylineSub: 'Advocate · Delhi Bar Council (D/20542/2025)',
} as const;

export interface SectionMeta {
  num: string;
  tag: string;
  title?: string;
  titleEmphasis?: string;
}

export const SECTIONS: Record<string, SectionMeta> = {
  about: { num: '01', tag: 'Biography', title: 'Think, Argue,', titleEmphasis: 'Deliver.' },
  education: { num: '02', tag: 'Education' },
  training: { num: '05', tag: 'Capacity Building', title: 'Training &', titleEmphasis: 'credentials.' },
  awards: { num: '03', tag: 'Awards & Honours', title: 'Distinguished', titleEmphasis: 'service.' },
  cases: { num: '07', tag: 'Case Ledger', title: '45 matters, argued', titleEmphasis: 'in person.' },
  offices: { num: '08', tag: 'Offices', title: 'Three chambers, one', titleEmphasis: 'practice.' },
  contact: { num: '09', tag: 'Contact', title: 'Briefs are read', titleEmphasis: 'in person.' },
} as const;

export const QUOTES = {
  brief: 'A well-drafted brief is half the argument won.',
  caseHighlight: {
    text: 'Successfully argued the',
    emphasis: 'Education Cess refund',
    suffix: 'before the Larger Bench — all-India ramification, decided in favour.',
    attribution: 'KEI Industries vs Commissioner Alwar',
    court: 'Larger Bench, CESTAT Delhi',
    orderRef: 'LB Order 08/2025',
  },
} as const;

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#cases', label: 'Cases' },
  { href: '/publications', label: 'Publications' },
  { href: '#contact', label: 'Contact' },
] as const;

export const ABOUT_BIO = [
  'Rakesh Agarwal joined the Indian Revenue Service (IRS) on recommendation by the UPSC as a Direct Recruit Superintendent (Technical) and retired as Joint Commissioner Group A, IRS (C&IT), 2012 Batch. His final posting was as Authorised Representative (Department Counsel) in CESTAT, arguing landmark matters involving high stakes of revenue.',
  'His career spans field experience in Belgaum and Bangalore, EOU, SEZ & Foreign Trade Policy at DGEP, intelligence and investigation at DRI New Delhi, EOU & SEZ operations at NSEZ, GST policy wing at CBIC & the GST Council Secretariat; and five years of litigation before CESTAT.',
  'Enrolled as an Advocate with the Delhi Bar Council after passing the All India Bar Examination & practicing as a tax advocate.',
] as const;
