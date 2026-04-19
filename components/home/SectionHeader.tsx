import type { SectionMeta } from '@/lib/constants';

interface Props {
  section: SectionMeta;
  center?: boolean;
  gold?: boolean;
}

export default function SectionHeader({ section, center, gold }: Props) {
  const tagClass = [
    'gm-section-tag',
    center && 'gm-section-tag--center',
    gold && 'gm-section-tag--gold',
  ].filter(Boolean).join(' ');

  const titleClass = [
    'gm-section-title',
    center && 'gm-section-title--center',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={tagClass}>
        {section.num} &mdash; {section.tag}
      </div>
      <h2 className={titleClass}>
        {section.title} <em>{section.titleEmphasis}</em>
      </h2>
    </>
  );
}
