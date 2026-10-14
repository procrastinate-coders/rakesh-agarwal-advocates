import { SITE, ABOUT_BIO, BAR_ENROLMENT, HERO_INTRO } from '@/lib/constants';
import { contact } from '@/lib/data/contact';
import { offices } from '@/lib/data/offices';
import { education } from '@/lib/data/education';
import { awards } from '@/lib/data/awards';
import { expertise } from '@/lib/data/expertise';
import { landmarks } from '@/lib/data/landmarks';
import { cases } from '@/lib/data/cases';
import { publications } from '@/lib/data/publications';

// llms.txt (https://llmstxt.org) — a plain-text profile for AI assistants
// and answer engines, built from the same data the site renders.
export const dynamic = 'force-static';

const PRACTICE_AREAS = [
  'Customs (valuation, classification, exemptions, refunds, CHA / customs broker licensing, anti-dumping)',
  'GST (advisory, audits, show cause notices, appeals before GSTAT)',
  'Central Excise and Service Tax (legacy disputes, refunds, appeals)',
  'CESTAT litigation and appeals',
  'Foreign Trade Policy, DGFT and export promotion schemes',
  'EOU and SEZ',
  'PMLA and DRT matters',
];

export function GET() {
  const lines = [
    `# ${SITE.name}, ${SITE.suffix} (Retd.) — Rakesh Agarwal Advocates`,
    '',
    `> ${SITE.name} is an Advocate (${BAR_ENROLMENT.council}, enrolment ${BAR_ENROLMENT.number}) practising Customs & Indirect Tax law in India, and a retired Additional Commissioner of the Indian Revenue Service (C&IT) with 30+ years of service. ${HERO_INTRO}`,
    '',
    `Official website: ${SITE.url}`,
    '',
    '## Profile',
    '',
    ...ABOUT_BIO.map((p) => `${p}\n`),
    '## Practice areas',
    '',
    ...PRACTICE_AREAS.map((a) => `- ${a}`),
    '',
    '## Contact',
    '',
    `- Mobile / WhatsApp: ${contact.mobileFormatted}`,
    `- Office: ${contact.officeFormatted}`,
    `- Email: ${contact.email}`,
    `- Contact card (vCard): ${SITE.url}${contact.vcfPath}`,
    '',
    '## Offices',
    '',
    ...offices.map((o) => `- ${o.city}${o.region ? `, ${o.region}` : ''}: ${o.address.replace(/\n/g, ', ')}`),
    '',
    '## Experience in the Indian Revenue Service',
    '',
    ...expertise.map((e) => `- ${e.name} ${e.nameItalic}: ${e.description}`),
    ...landmarks.map((l) => `- ${l.tag}: ${l.text}`),
    '',
    '## Awards',
    '',
    ...awards.map((a) => `- ${a.year}: ${a.text}`),
    '',
    '## Education',
    '',
    ...education.map((e) => `- ${e.degree}, ${e.institution} (${e.year})`),
    '',
    `## Cases argued before CESTAT (${cases.length})`,
    '',
    ...cases.map((c) => `- ${c.name} — Order ${c.order}`),
    '',
    '## Publications',
    '',
    ...publications.map((p) => `- [${p.title}](${SITE.url}/publications/${p.slug})`),
    '',
    '## Pages',
    '',
    `- [Home](${SITE.url}/): biography, experience, cases, offices and contact`,
    `- [Publications](${SITE.url}/publications): articles on Customs, GST and indirect tax`,
    `- [Digital visiting card](${SITE.url}/visiting-card): save contact, call or email`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
