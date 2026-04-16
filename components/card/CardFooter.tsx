import Image from 'next/image';
import CardScrollReveal from './CardScrollReveal';

export default function CardFooter() {
  return (
    <CardScrollReveal>
      <div className="card-footer">
        <div className="card-footer__logo">
          <Image src="/og-card.png" alt="RAA Logo" width={1200} height={630} />
        </div>
        <p className="card-footer__text">Rakesh Agarwal Advocates</p>
      </div>
    </CardScrollReveal>
  );
}
