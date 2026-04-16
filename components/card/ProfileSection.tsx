import Image from 'next/image';
import CardScrollReveal from './CardScrollReveal';

export default function ProfileSection() {
  return (
    <>
      <div className="profile-section">
        <Image
          src="/assets/PP-RA_Advocate.jpg"
          alt="Rakesh Agarwal"
          width={112}
          height={112}
          className="card-avatar"
          priority
        />
      </div>

      <CardScrollReveal>
        <div className="identity">
          <h1 className="identity__name">
            Rakesh Agarwal, <em>IRS</em>
          </h1>
          <p className="identity__title">Advocate &amp; Advisor</p>
          <p className="identity__dept">Customs &amp; Indirect Tax</p>
          <p className="identity__credential">Joint Commissioner (Rtd.)</p>
        </div>
      </CardScrollReveal>
    </>
  );
}
