import type { Office } from '@/lib/data/offices';
import ScrollReveal from './ScrollReveal';

export default function OfficeCard({ office }: { office: Office }) {
  return (
    <ScrollReveal className="bg-bg-card border border-ink/[.08] rounded-2xl px-8 py-10 transition-transform duration-[400ms] ease-[var(--ease-out-expo)] hover:-translate-y-1 max-md:px-6 max-md:py-7">
      <div className="font-[family-name:var(--font-sans)] text-[9px] tracking-[.2em] uppercase text-accent font-semibold mb-5">
        {office.badge}
      </div>
      <div className="font-[family-name:var(--font-display)] text-[40px] font-medium leading-none tracking-[-0.02em] max-md:text-[32px]">
        {office.city}
      </div>
      <div className="font-[family-name:var(--font-display)] italic text-base text-ink/50 mt-1 mb-6">
        {office.region}
      </div>
      <div className="w-8 h-[1.5px] bg-accent mb-6" />
      <div className="font-[family-name:var(--font-body)] text-sm leading-[1.7] text-ink/50 whitespace-pre-line">
        {office.address}
      </div>
    </ScrollReveal>
  );
}
