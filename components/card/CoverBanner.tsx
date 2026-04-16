import Image from 'next/image';

export default function CoverBanner() {
  return (
    <div className="cover">
      <div className="cover-logo">
        <Image
          src="/og-card.png"
          alt="RAA Logo"
          width={1200}
          height={630}
          priority
        />
      </div>
    </div>
  );
}
