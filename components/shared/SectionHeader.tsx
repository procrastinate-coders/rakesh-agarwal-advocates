import ScrollReveal from './ScrollReveal';

interface SectionHeaderProps {
  num: string;
  label: string;
  title: string;
  titleItalic: string;
  kicker?: string;
}

export default function SectionHeader({
  num,
  label,
  title,
  titleItalic,
  kicker,
}: SectionHeaderProps) {
  return (
    <ScrollReveal className="flex items-start justify-between mb-20 max-lg:mb-14 max-md:flex-col max-md:gap-2 max-md:mb-10">
      <div className="max-w-[600px]">
        <div className="font-[family-name:var(--font-sans)] text-[10px] tracking-[.22em] uppercase text-ink/30 font-medium mb-4">
          {num} &mdash; {label}
        </div>
        <h2 className="font-[family-name:var(--font-display)] font-normal text-[clamp(40px,5.5vw,76px)] leading-[.95] tracking-[-0.025em]">
          {title}
          <br />
          <em className="italic">{titleItalic}</em>
        </h2>
      </div>
      {kicker && (
        <div className="font-[family-name:var(--font-display)] italic text-base text-ink/50 pt-4 max-md:pt-0">
          {kicker}
        </div>
      )}
    </ScrollReveal>
  );
}
