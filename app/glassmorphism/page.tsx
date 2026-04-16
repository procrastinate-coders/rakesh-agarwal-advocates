import type { Metadata } from 'next';
import Image from 'next/image';
import { expertise } from '@/lib/data/expertise';
import { offices } from '@/lib/data/offices';
import { contact } from '@/lib/data/contact';
import { education } from '@/lib/data/education';
import { awards } from '@/lib/data/awards';
import { training } from '@/lib/data/training';
import { landmarks } from '@/lib/data/landmarks';
import { cases, caseYears } from '@/lib/data/cases';
import { practiceAreas } from '@/lib/data/practice-areas';
import LogoLockup from '@/components/shared/LogoLockup';
import CaseLedgerTable from '@/components/shared/CaseLedgerTable';

export const metadata: Metadata = {
  title: 'Rakesh Agarwal — Advocate & Advisor',
  description: 'Customs & Indirect Tax | Joint Commissioner (Rtd.)',
  openGraph: {
    title: 'Rakesh Agarwal — Advocate & Advisor',
    description: 'Customs & Indirect Tax | Joint Commissioner (Rtd.) | CESTAT Practitioner',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

export default function Glassmorphism() {
  return (
    <div className="gm-page">
      {/* ── Navbar ── */}
      <nav className="gm-nav">
        <div className="gm-nav__inner">
          <a href="/glassmorphism" aria-label="Home"><LogoLockup /></a>
          <div className="gm-nav__links">
            <a href="#about">About</a>
            <a href="#expertise">Expertise</a>
            <a href="#cases">Cases</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO — Full viewport, photo right, glass stats overlapping
      ═══════════════════════════════════════════ */}
      <section className="gm-hero">
        <div className="gm-hero__bg" />
        <div className="gm-hero__content">
          <div className="gm-hero__text">
            <p className="gm-hero__tag">Advocate &amp; Advisor</p>
            <h1 className="gm-hero__name">Rakesh<br />Agarwal, <em>IRS</em></h1>
            <p className="gm-hero__sub">Customs &amp; Indirect Tax &mdash; Joint Commissioner (Retd.)</p>
          </div>
          <div className="gm-hero__photo">
            <Image src="/assets/PP-RA_Advocate.jpg" alt="Rakesh Agarwal" width={413} height={532} className="gm-hero__img" sizes="(max-width: 768px) 80vw, 400px" priority />
          </div>
        </div>
        {/* Floating stat pills */}
        <div className="gm-hero__stats">
          <div className="gm-pill">
            <span className="gm-pill__num">30+</span>
            <span className="gm-pill__label">Years of Service</span>
          </div>
          <div className="gm-pill">
            <span className="gm-pill__num">45</span>
            <span className="gm-pill__label">Cases Argued</span>
          </div>
          <div className="gm-pill">
            <span className="gm-pill__num">3</span>
            <span className="gm-pill__label">Offices</span>
          </div>
          <div className="gm-pill gm-pill--accent">
            <span className="gm-pill__enrol">D/20542/2025</span>
            <span className="gm-pill__label">Delhi Bar Council</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — Offset two-column: photo bleeds left, glass bio floats
      ═══════════════════════════════════════════ */}
      <section id="about" className="gm-about">
        <div className="gm-about__photo-wrap">
          <Image src="/assets/Full Advocate Dress Photo_RA.jpg" alt="Rakesh Agarwal in Advocate attire" width={4000} height={6000} className="gm-about__photo" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="gm-about__panel">
          <div className="gm-section-tag">01 &mdash; Biography</div>
          <p>Rakesh Agarwal joined the Indian Revenue Service on recommendation by the UPSC as a Direct Recruit Superintendent (Technical) and retired as Joint Commissioner Group A, IRS (C&amp;IT), 2012 Batch. His final posting was as Department Representative (Counsel) in CESTAT, arguing landmark matters involving high stakes of revenue.</p>
          <p>His career spans field experience in Belgaum and Bangalore, foreign trade policy at DGEP, intelligence and investigation at DRI New Delhi, GST policy coordination at CBIC and the GST Council Secretariat, and five years of litigation before CESTAT.</p>
          <p>Now enrolled as an Advocate with the Delhi Bar Council after passing the All India Bar Examination, he brings three decades of institutional knowledge to a practice built on a simple view: a well-drafted brief and a Tribunal that trusts the counsel in front of it.</p>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="gm-pullquote">
        <blockquote>
          &ldquo;A well-drafted brief is half the argument won.&rdquo;
          <cite>Rakesh Agarwal &mdash; Former Joint Commissioner, IRS (C&amp;IT)</cite>
        </blockquote>
      </section>

      {/* ═══════════════════════════════════════════
          PRACTICE AREAS — Horizontal frosted ribbon
      ═══════════════════════════════════════════ */}
      <section className="gm-ribbon">
        <div className="gm-ribbon__inner">
          <div className="gm-section-tag">Practice Areas</div>
          <div className="gm-ribbon__flow">
            {practiceAreas.map((a, i) => (
              <span key={a} className="gm-ribbon__item">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EDUCATION — Staggered timeline
      ═══════════════════════════════════════════ */}
      <section className="gm-timeline-section">
        <div className="gm-section-tag gm-section-tag--center">02 &mdash; Education</div>
        <div className="gm-timeline">
          {education.map((e, i) => (
            <div key={e.degree} className={`gm-timeline__node ${i % 2 === 0 ? 'gm-timeline__node--left' : 'gm-timeline__node--right'}`}>
              <div className="gm-timeline__card">
                <div className="gm-timeline__year">{e.year}</div>
                <div className="gm-timeline__degree">{e.degree}</div>
                <div className="gm-timeline__inst">{e.institution}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          AWARDS — Staggered timeline (continued)
      ═══════════════════════════════════════════ */}
      <section className="gm-timeline-section">
        <div className="gm-section-tag gm-section-tag--center">03 &mdash; Awards</div>
        <div className="gm-timeline">
          {awards.map((a, i) => (
            <div key={i} className={`gm-timeline__node ${i % 2 === 0 ? 'gm-timeline__node--left' : 'gm-timeline__node--right'}`}>
              <div className="gm-timeline__card">
                <div className="gm-timeline__year">{a.year}</div>
                <div className="gm-timeline__degree">{a.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EXPERTISE — Centered spine, glass cards
      ═══════════════════════════════════════════ */}
      <section id="expertise" className="gm-spine-section">
        <div className="gm-section-tag gm-section-tag--center">04 &mdash; Expertise</div>
        <div className="gm-spine">
          {expertise.map((e) => (
            <div key={e.num} className="gm-spine__card">
              <div className="gm-spine__num">{e.num}</div>
              <h3 className="gm-spine__name">{e.name} <em>{e.nameItalic}</em></h3>
              <p className="gm-spine__desc">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRAINING — Inline frosted ribbon
      ═══════════════════════════════════════════ */}
      <section className="gm-spine-section">
        <div className="gm-section-tag gm-section-tag--center">05 &mdash; Training</div>
        <div className="gm-spine">
          {training.map((t, i) => (
            <div key={i} className="gm-spine__card gm-spine__card--compact">
              <div className="gm-spine__name">{t.title}</div>
              <div className="gm-spine__desc">{t.org}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LANDMARKS
      ═══════════════════════════════════════════ */}
      <section className="gm-spine-section">
        <div className="gm-section-tag gm-section-tag--center">06 &mdash; Landmarks</div>
        <div className="gm-spine">
          {landmarks.map((l, i) => (
            <div key={i} className="gm-spine__card">
              <div className="gm-spine__num">{l.tag}</div>
              <div className="gm-spine__desc">{l.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CASE LEDGER — Full-width frosted table
      ═══════════════════════════════════════════ */}
      <section id="cases" className="gm-cases-section">
        <div className="gm-section-tag gm-section-tag--center">07 &mdash; Case Ledger</div>
        <div className="gm-cases-wrap">
          <CaseLedgerTable cases={cases} years={[...caseYears]} prefix="gm" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OFFICES — Overlapping glass panels
      ═══════════════════════════════════════════ */}
      <section className="gm-offices-section">
        <div className="gm-section-tag gm-section-tag--center">08 &mdash; Offices</div>
        <div className="gm-offices">
          {offices.map((o) => (
            <div key={o.city} className="gm-office-card">
              <div className="gm-office-card__badge">{o.badge}</div>
              <div className="gm-office-card__city">{o.city}</div>
              <div className="gm-office-card__region">{o.region}</div>
              <div className="gm-office-card__addr">{o.address}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT — Full-width frosted panel
      ═══════════════════════════════════════════ */}
      <section id="contact" className="gm-contact">
        <div className="gm-contact__inner">
          <div>
            <div className="gm-section-tag gm-section-tag--gold">09 &mdash; Contact</div>
            <h2 className="gm-contact__title">Briefs are read <em>in person.</em></h2>
          </div>
          <div className="gm-contact__links">
            <a href="tel:+919818830557"><span className="gm-contact__lbl">Mobile</span>{contact.mobileFormatted}</a>
            <a href="tel:+911140571716"><span className="gm-contact__lbl">Chambers</span>{contact.officeFormatted}</a>
            <a href={`mailto:${contact.email}`}><span className="gm-contact__lbl">Email</span>{contact.email}</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="gm-footer">
        <LogoLockup />
        <p>&copy; MMXXVI Rakesh Agarwal, Advocates</p>
      </footer>
    </div>
  );
}
