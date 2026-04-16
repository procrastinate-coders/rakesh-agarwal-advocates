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

export default function NeoBrutalism() {
  return (
    <div className="nb-page">
      {/* ── Navbar ── */}
      <nav className="nb-nav">
        <div className="nb-nav__inner">
          <a href="/neo-brutalism" aria-label="Home"><LogoLockup /></a>
          <div className="nb-nav__links">
            <a href="#about">ABOUT</a>
            <a href="#expertise">EXPERTISE</a>
            <a href="#cases">CASES</a>
            <a href="#contact">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO — Full-bleed black bar, oversized name + hard-crop photo
      ═══════════════════════════════════════════ */}
      <section className="nb-hero">
        <div className="nb-hero__inner">
          <div className="nb-hero__text">
            <div className="nb-hero__tag">ADVOCATE &amp; ADVISOR</div>
            <h1 className="nb-hero__name">RAKESH<br />AGARWAL</h1>
            <div className="nb-hero__irs"><em>IRS</em></div>
            <p className="nb-hero__sub">CUSTOMS &amp; INDIRECT TAX<br />JOINT COMMISSIONER (RETD.)</p>
          </div>
          <div className="nb-hero__photo">
            <Image src="/assets/PP-RA_Advocate.jpg" alt="Rakesh Agarwal" width={413} height={532} className="nb-hero__img" sizes="(max-width: 768px) 100vw, 420px" priority />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS — Single row strip, alternating colors
      ═══════════════════════════════════════════ */}
      <section className="nb-stats">
        <div className="nb-stats__item nb-stats__item--yellow">
          <div className="nb-stats__num">30+</div>
          <div className="nb-stats__label">YEARS</div>
        </div>
        <div className="nb-stats__item nb-stats__item--white">
          <div className="nb-stats__num">45</div>
          <div className="nb-stats__label">CASES</div>
        </div>
        <div className="nb-stats__item nb-stats__item--dark">
          <div className="nb-stats__num">3</div>
          <div className="nb-stats__label">OFFICES</div>
        </div>
        <div className="nb-stats__item nb-stats__item--yellow">
          <div className="nb-stats__enrol">D/20542/2025</div>
          <div className="nb-stats__label">DELHI BAR COUNCIL</div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — Two-column: wide body + narrow pull-quote
      ═══════════════════════════════════════════ */}
      <section id="about" className="nb-about">
        <div className="nb-about__body">
          <div className="nb-section-tag">01 &mdash; BIOGRAPHY</div>
          <p>Rakesh Agarwal joined the Indian Revenue Service on recommendation by the UPSC as a Direct Recruit Superintendent (Technical) and retired as Joint Commissioner Group A, IRS (C&amp;IT), 2012 Batch. His final posting was as Department Representative (Counsel) in CESTAT, arguing landmark matters involving high stakes of revenue.</p>
          <p>His career spans field experience in Belgaum and Bangalore, foreign trade policy at DGEP, intelligence and investigation at DRI New Delhi, GST policy coordination at CBIC and the GST Council Secretariat, and five years of litigation before CESTAT.</p>
          <p>Now enrolled as an Advocate with the Delhi Bar Council after passing the All India Bar Examination, he brings three decades of institutional knowledge to a practice built on a simple view: a well-drafted brief and a Tribunal that trusts the counsel in front of it.</p>
        </div>
        <div className="nb-about__quote">
          <div className="nb-about__mark">&ldquo;</div>
          <blockquote>A well-drafted brief is half the argument won.</blockquote>
          <cite>Rakesh Agarwal<br />Former Joint Commissioner, IRS (C&amp;IT)</cite>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EDITORIAL — Full-bleed photo band
      ═══════════════════════════════════════════ */}
      <section className="nb-editorial">
        <div className="nb-editorial__photo">
          <Image src="/assets/Full Advocate Dress Photo_RA.jpg" alt="Rakesh Agarwal in Advocate attire" width={4000} height={6000} className="nb-editorial__img" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="nb-editorial__text">
          <div className="nb-editorial__big">THINK.<br />ARGUE.<br />DELIVER.</div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRACTICE AREAS — Three-column newspaper with hairline dividers
      ═══════════════════════════════════════════ */}
      <section className="nb-practice">
        <div className="nb-section-tag">PRACTICE AREAS</div>
        <div className="nb-practice__cols">
          {practiceAreas.map((a) => (
            <div key={a} className="nb-practice__item">{a}</div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EDUCATION — Dense ruled list (broadsheet classifieds)
      ═══════════════════════════════════════════ */}
      <section className="nb-ruled-section">
        <div className="nb-section-tag">02 &mdash; EDUCATION</div>
        <div className="nb-ruled">
          {education.map((e) => (
            <div key={e.degree} className="nb-ruled__row">
              <span className="nb-ruled__year">{e.year}</span>
              <span className="nb-ruled__title">{e.degree}</span>
              <span className="nb-ruled__sub">{e.institution}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          AWARDS — Dense ruled list
      ═══════════════════════════════════════════ */}
      <section className="nb-ruled-section">
        <div className="nb-section-tag">03 &mdash; AWARDS</div>
        <div className="nb-ruled">
          {awards.map((a, i) => (
            <div key={i} className="nb-ruled__row">
              <span className="nb-ruled__year">{a.year}</span>
              <span className="nb-ruled__title">{a.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EXPERTISE — Asymmetric two-column blocks
      ═══════════════════════════════════════════ */}
      <section id="expertise" className="nb-expertise">
        <div className="nb-section-tag">04 &mdash; EXPERTISE</div>
        <div className="nb-expertise__grid">
          {expertise.map((e) => (
            <div key={e.num} className="nb-expertise__block">
              <div className="nb-expertise__num">{e.num}</div>
              <h3 className="nb-expertise__name">{e.name} <em>{e.nameItalic}</em></h3>
              <p className="nb-expertise__desc">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRAINING — Dense ruled list
      ═══════════════════════════════════════════ */}
      <section className="nb-ruled-section">
        <div className="nb-section-tag">05 &mdash; TRAINING</div>
        <div className="nb-ruled">
          {training.map((t, i) => (
            <div key={i} className="nb-ruled__row">
              <span className="nb-ruled__title">{t.title}</span>
              <span className="nb-ruled__sub">{t.org}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LANDMARKS — Dense ruled list
      ═══════════════════════════════════════════ */}
      <section className="nb-ruled-section">
        <div className="nb-section-tag">06 &mdash; LANDMARKS</div>
        <div className="nb-ruled">
          {landmarks.map((l, i) => (
            <div key={i} className="nb-ruled__row">
              <span className="nb-ruled__year">{l.tag}</span>
              <span className="nb-ruled__title">{l.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CASE LEDGER — Raw table, thick borders
      ═══════════════════════════════════════════ */}
      <section id="cases" className="nb-cases-section">
        <div className="nb-section-tag">07 &mdash; CASE LEDGER</div>
        <div className="nb-cases-wrap">
          <CaseLedgerTable cases={cases} years={[...caseYears]} prefix="nb" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OFFICES + CONTACT — Full-bleed colored band
      ═══════════════════════════════════════════ */}
      <section className="nb-bottom">
        <div className="nb-bottom__offices">
          <div className="nb-section-tag">08 &mdash; OFFICES</div>
          <div className="nb-bottom__office-grid">
            {offices.map((o) => (
              <div key={o.city} className="nb-office-block">
                <div className="nb-office-block__badge">{o.badge}</div>
                <div className="nb-office-block__city">{o.city}</div>
                <div className="nb-office-block__region">{o.region}</div>
                <div className="nb-office-block__addr">{o.address}</div>
              </div>
            ))}
          </div>
        </div>
        <div id="contact" className="nb-bottom__contact">
          <div className="nb-section-tag nb-section-tag--light">09 &mdash; CONTACT</div>
          <h2 className="nb-bottom__title">BRIEFS ARE READ<br /><em>IN PERSON.</em></h2>
          <div className="nb-bottom__links">
            <a href="tel:+919818830557">{contact.mobileFormatted}</a>
            <a href="tel:+911140571716">{contact.officeFormatted}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="nb-footer">
        <LogoLockup />
        <p>&copy; MMXXVI RAKESH AGARWAL, ADVOCATES</p>
      </footer>
    </div>
  );
}
