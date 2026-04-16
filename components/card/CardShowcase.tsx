import Image from 'next/image';
import CardScrollReveal from './CardScrollReveal';

export default function CardShowcase() {
  return (
    <CardScrollReveal>
      <div className="card-showcase">
        <div className="card-pair">
          <div className="card-item">
            <Image
              src="/screenshots/front.png"
              alt="Front of visiting card"
              width={800}
              height={480}
            />
            <p className="card-label">Front</p>
          </div>
          <div className="card-item">
            <Image
              src="/screenshots/back-H-accent-bars.png"
              alt="Back of visiting card"
              width={800}
              height={480}
            />
            <p className="card-label">Back</p>
          </div>
        </div>
      </div>
    </CardScrollReveal>
  );
}
