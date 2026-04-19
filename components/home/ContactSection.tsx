import { SECTIONS } from '@/lib/constants';
import { contact } from '@/lib/data/contact';

export default function ContactSection() {
  return (
    <section id="contact" className="gm-contact">
      <div className="gm-contact__inner">
        <div>
          <div className="gm-section-tag gm-section-tag--gold">
            {SECTIONS.contact.num} &mdash; {SECTIONS.contact.tag}
          </div>
          <h2 className="gm-contact__title">
            {SECTIONS.contact.title} <em>{SECTIONS.contact.titleEmphasis}</em>
          </h2>
        </div>
        <div className="gm-contact__links">
          <a href={`tel:${contact.mobile}`}>
            <span className="gm-contact__lbl">Mobile</span>
            {contact.mobileFormatted}
          </a>
          <a href={`tel:${contact.office}`}>
            <span className="gm-contact__lbl">Chambers</span>
            {contact.officeFormatted}
          </a>
          <a href={`mailto:${contact.email}`}>
            <span className="gm-contact__lbl">Email</span>
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
