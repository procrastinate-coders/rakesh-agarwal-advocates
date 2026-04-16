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
import BentoCaseLedger from '@/components/variant/BentoCaseLedger';

export const metadata: Metadata = {
  title: 'Rakesh Agarwal — Advocate & Advisor',
  description:
    'Customs & Indirect Tax | Joint Commissioner (Rtd.) | GST, Customs, CHA, Central Excise, Service Tax, EOU, SEZ, PMLA, DRT',
  openGraph: {
    title: 'Rakesh Agarwal — Advocate & Advisor',
    description:
      'Customs & Indirect Tax | Joint Commissioner (Rtd.) | CESTAT Practitioner',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

export default function Variant() {
  return (
    <div className="bento-page">
      {/* ── Navbar ── */}
      <nav className="bento-nav">
        <div className="bento-nav__inner">
          <a href="/variant" aria-label="Home">
            <LogoLockup />
          </a>
          <div className="bento-nav__links">
            <a href="#about">About</a>
            <a href="#expertise">Expertise</a>
            <a href="#cases">Cases</a>
            <a href="#offices">Offices</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* ── Bento Grid ── */}
      <main className="bento-grid">

        {/* ═══════════════════════════════════════════
            SECTION 1 — HERO
        ═══════════════════════════════════════════ */}

        {/* Name Card (2×2, navy) */}
        <div className="bento-card bento-card--2x2 bento-card--navy">
          <div className="bento-hero">
            <p className="bento-hero__tag">Advocate &amp; Advisor</p>
            <h1 className="bento-hero__name">
              Rakesh<br />Agarwal, <em>IRS</em>
            </h1>
            <p className="bento-hero__sub">
              Customs &amp; Indirect Tax<br />
              Joint Commissioner (Retd.)
            </p>
          </div>
        </div>

        {/* Portrait Photo (2×2) */}
        <div className="bento-card bento-card--2x2 bento-card--photo">
          <Image
            src="/assets/PP-RA_Advocate.jpg"
            alt="Rakesh Agarwal, IRS (Retd.)"
            width={413}
            height={532}
            className="bento-photo"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
            priority
          />
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 2 — STATS
        ═══════════════════════════════════════════ */}

        <div className="bento-card bento-stat">
          <div className="bento-stat__num">30+</div>
          <div className="bento-stat__label">Years of<br />Service</div>
        </div>
        <div className="bento-card bento-stat">
          <div className="bento-stat__num">45</div>
          <div className="bento-stat__label">Cases<br />Argued</div>
        </div>
        <div className="bento-card bento-stat">
          <div className="bento-stat__num">3</div>
          <div className="bento-stat__label">Office<br />Locations</div>
        </div>
        <div className="bento-card bento-card--navy bento-cred">
          <div className="bento-cred__enrol">D/20542/2025</div>
          <div className="bento-cred__body">Delhi Bar Council</div>
          <div className="bento-cred__sub">All India Bar Exam Qualified</div>
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 3 — ABOUT + QUOTE
        ═══════════════════════════════════════════ */}

        <div id="about" className="bento-card bento-card--3x2 bento-about">
          <div className="bento-section-label">01 &mdash; Biography</div>
          <p className="bento-about__text">
            Rakesh Agarwal joined the Indian Revenue Service on recommendation by the UPSC as a Direct Recruit Superintendent (Technical) and retired as Joint Commissioner Group A, IRS (C&amp;IT), 2012 Batch. His final posting was as Department Representative (Counsel) in CESTAT, arguing landmark matters involving high stakes of revenue.
          </p>
          <p className="bento-about__text">
            His career spans field experience in Belgaum and Bangalore, foreign trade policy at DGEP, intelligence and investigation at DRI New Delhi, GST policy coordination at CBIC and the GST Council Secretariat, and five years of litigation before CESTAT.
          </p>
          <p className="bento-about__text">
            Now enrolled as an Advocate with the Delhi Bar Council after passing the All India Bar Examination, he brings three decades of institutional knowledge to a practice built on a simple view: a well-drafted brief and a Tribunal that trusts the counsel in front of it.
          </p>
        </div>

        <div className="bento-card bento-card--1x2 bento-quote">
          <blockquote className="bento-quote__text">
            Think,<br />Argue,<br /><em>Deliver.</em>
          </blockquote>
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 4 — PORTRAIT EDITORIAL
        ═══════════════════════════════════════════ */}

        <div className="bento-card bento-card--2x2 bento-card--photo bento-card--editorial">
          <Image
            src="/assets/Full Advocate Dress Photo_RA.jpg"
            alt="Rakesh Agarwal in Advocate attire"
            width={4000}
            height={6000}
            className="bento-photo"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
          />
        </div>
        <div className="bento-card bento-card--2x2 bento-card--navy bento-editorial">
          <div className="bento-editorial__inner">
            <blockquote className="bento-editorial__quote">
              &ldquo;A well-drafted brief is half the argument won.&rdquo;
            </blockquote>
            <div className="bento-editorial__attr">
              <div className="bento-editorial__name">Rakesh Agarwal</div>
              <div className="bento-editorial__role">
                Former Joint Commissioner, IRS (C&amp;IT)<br />
                Department Representative, CESTAT
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 5 — EDUCATION
        ═══════════════════════════════════════════ */}

        <div className="bento-card bento-card--4x1 bento-section-divider">
          <div className="bento-section-label">02 &mdash; Education</div>
        </div>

        {education.map((e, i) => (
          <div
            key={e.degree}
            className={`bento-card bento-edu ${
              i === 0 ? 'bento-card--2x1' : ''
            }`}
          >
            <div className="bento-edu__year">{e.year}</div>
            <div className="bento-edu__degree">{e.degree}</div>
            <div className="bento-edu__inst">{e.institution}</div>
          </div>
        ))}

        {/* Practice Areas card to fill the row */}
        <div className="bento-card bento-card--2x1 bento-practice">
          <div className="bento-section-label">Practice Areas</div>
          <div className="bento-practice__tags">
            {practiceAreas.map((area, i) => (
              <span key={area}>
                {area}{i < practiceAreas.length - 1 && <span className="bento-practice__dot">&middot;</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 6 — AWARDS
        ═══════════════════════════════════════════ */}

        <div className="bento-card bento-card--4x1 bento-section-divider">
          <div className="bento-section-label">03 &mdash; Awards &amp; Recognition</div>
        </div>

        {awards.map((a, i) => (
          <div
            key={i}
            className={`bento-card bento-award ${
              i === 0 || i === 3 ? 'bento-card--2x1' : ''
            }`}
          >
            <div className="bento-award__year">{a.year}</div>
            <div className="bento-award__text">{a.text}</div>
          </div>
        ))}

        {/* ═══════════════════════════════════════════
            SECTION 7 — EXPERTISE
        ═══════════════════════════════════════════ */}

        <div id="expertise" className="bento-card bento-card--4x1 bento-section-divider">
          <div className="bento-section-label">04 &mdash; Expertise</div>
        </div>

        {expertise.map((e, i) => (
          <div
            key={e.num}
            className={`bento-card bento-expertise ${
              i === 2 || i === 3 ? 'bento-card--2x1' : ''
            }`}
          >
            <div className="bento-expertise__num">{e.num}</div>
            <h3 className="bento-expertise__name">
              {e.name} <em>{e.nameItalic}</em>
            </h3>
            <p className="bento-expertise__desc">{e.description}</p>
          </div>
        ))}

        {/* ═══════════════════════════════════════════
            SECTION 8 — TRAINING
        ═══════════════════════════════════════════ */}

        <div className="bento-card bento-card--4x1 bento-section-divider">
          <div className="bento-section-label">05 &mdash; Training &amp; Programmes</div>
        </div>

        {training.map((t, i) => (
          <div
            key={i}
            className={`bento-card bento-training ${
              i === 0 ? 'bento-card--2x1' : ''
            }`}
          >
            <div className="bento-training__title">{t.title}</div>
            <div className="bento-training__org">{t.org}</div>
          </div>
        ))}

        {/* ═══════════════════════════════════════════
            SECTION 9 — LANDMARKS
        ═══════════════════════════════════════════ */}

        <div className="bento-card bento-card--4x1 bento-section-divider">
          <div className="bento-section-label">06 &mdash; Landmarks</div>
        </div>

        {landmarks.map((l, i) => (
          <div
            key={i}
            className={`bento-card bento-landmark ${
              i === 0 || i === 3 ? 'bento-card--2x1' : ''
            }`}
          >
            <div className="bento-landmark__tag">{l.tag}</div>
            <div className="bento-landmark__text">{l.text}</div>
          </div>
        ))}

        {/* ═══════════════════════════════════════════
            SECTION 10 — CASE LEDGER
        ═══════════════════════════════════════════ */}

        <div id="cases" className="bento-card bento-card--4x1 bento-section-divider">
          <div className="bento-section-label">07 &mdash; Case Ledger</div>
        </div>

        <div className="bento-card bento-card--4x1 bento-cases">
          <BentoCaseLedger cases={cases} years={[...caseYears]} />
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 11 — OFFICES
        ═══════════════════════════════════════════ */}

        <div id="offices" className="bento-card bento-card--4x1 bento-section-divider">
          <div className="bento-section-label">08 &mdash; Offices</div>
        </div>

        {offices.map((o, i) => (
          <div
            key={o.city}
            className={`bento-card bento-office ${i === 0 ? 'bento-card--2x1' : ''}`}
          >
            <div className="bento-office__badge">{o.badge}</div>
            <div className="bento-office__city">{o.city}</div>
            <div className="bento-office__region">{o.region}</div>
            <div className="bento-office__addr">{o.address}</div>
          </div>
        ))}

        {/* ═══════════════════════════════════════════
            SECTION 12 — CONTACT
        ═══════════════════════════════════════════ */}

        <div id="contact" className="bento-card bento-card--4x1 bento-card--navy bento-contact">
          <div className="bento-contact__inner">
            <div>
              <div className="bento-section-label bento-section-label--gold">09 &mdash; Contact</div>
              <h2 className="bento-contact__title">
                Briefs are read <em>in person.</em>
              </h2>
            </div>
            <div className="bento-contact__links">
              <a href="tel:+919818830557">
                <span className="bento-contact__link-label">Mobile</span>
                {contact.mobileFormatted}
              </a>
              <a href="tel:+911140571716">
                <span className="bento-contact__link-label">Chambers</span>
                {contact.officeFormatted}
              </a>
              <a href={`mailto:${contact.email}`}>
                <span className="bento-contact__link-label">Email</span>
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bento-footer">
        <LogoLockup />
        <p>&copy; MMXXVI Rakesh Agarwal, Advocates &middot; New Delhi &middot; Agra &middot; Bangalore</p>
      </footer>
    </div>
  );
}
