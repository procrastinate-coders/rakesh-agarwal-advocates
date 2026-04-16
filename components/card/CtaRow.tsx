import { contact } from '@/lib/data/contact';
import CardScrollReveal from './CardScrollReveal';

export default function CtaRow() {
  return (
    <CardScrollReveal>
      <div className="cta-row">
        <a className="cta cta-primary" href={contact.vcfPath} download="Rakesh Agarwal.vcf">
          <span className="material-symbols-outlined">person_add</span>
          Save Contact
        </a>
        <a className="cta cta-secondary" href="tel:+919818830557">
          <span className="material-symbols-outlined">call</span>
          Call
        </a>
        <a className="cta cta-secondary" href={`mailto:${contact.email}`}>
          <span className="material-symbols-outlined">mail</span>
          Email
        </a>
      </div>
    </CardScrollReveal>
  );
}
