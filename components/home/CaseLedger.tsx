import CaseLedgerTable from '@/components/shared/CaseLedgerTable';
import SectionHeader from './SectionHeader';
import { SECTIONS } from '@/lib/constants';
import { cases, caseYears } from '@/lib/data/cases';
import CaseHighlight from './CaseHighlight';

export default function CaseLedger() {
  return (
    <section id="cases" className="gm-cases-section">
      <SectionHeader section={SECTIONS.cases} center />
      <CaseHighlight />

      <div className="gm-cases-wrap">
        <CaseLedgerTable cases={cases} years={[...caseYears]} prefix="gm" />
      </div>
    </section>
  );
}
