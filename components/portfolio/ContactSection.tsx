import { contact } from '@/lib/data/contact';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="wrap">
        <ScrollReveal>
          <div className="sec-num" style={{ color: 'rgba(255,253,249,.3)' }}>09 &mdash; Contact</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="contact__title">
            Briefs are read<br /><em>in person.</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="contact__grid">
          <div>
            <div className="contact__label">By Mobile</div>
            <div className="contact__val">
              <a href="tel:+919818830557" data-hover>{contact.mobileFormatted}</a>
            </div>
          </div>
          <div>
            <div className="contact__label">Chambers</div>
            <div className="contact__val">
              <a href="tel:+911140571716" data-hover>{contact.officeFormatted}</a>
            </div>
          </div>
          <div>
            <div className="contact__label">Email</div>
            <div className="contact__val">
              <a href={`mailto:${contact.email}`} data-hover>{contact.email}</a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
