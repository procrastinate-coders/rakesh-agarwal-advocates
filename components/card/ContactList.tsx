import CardScrollReveal from './CardScrollReveal';

const rows = [
  {
    icon: 'smartphone',
    label: 'Mobile',
    value: '+91-9818830557',
    href: 'tel:+919818830557',
  },
  {
    icon: 'call',
    label: 'Office',
    value: '011-40571716',
    href: 'tel:01140571716',
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'rakeshagarwal.irs@gmail.com',
    href: 'mailto:rakeshagarwal.irs@gmail.com',
  },
];

export default function ContactList() {
  return (
    <>
      <CardScrollReveal>
        <p className="section-label">Contact</p>
      </CardScrollReveal>
      <div className="contact-list">
        {rows.map((r) => (
          <CardScrollReveal key={r.label}>
            <a className="contact-row" href={r.href}>
              <div className="contact-icon">
                <span className="material-symbols-outlined">{r.icon}</span>
              </div>
              <div className="contact-text">
                <div className="label">{r.label}</div>
                <div className="value">{r.value}</div>
              </div>
              <span className="material-symbols-outlined contact-arrow">chevron_right</span>
            </a>
          </CardScrollReveal>
        ))}
      </div>
    </>
  );
}
