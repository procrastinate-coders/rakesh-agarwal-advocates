import { QUOTES } from '@/lib/constants';

export default function PullQuote() {
  return (
    <section className="gm-pullquote">
      <blockquote>&ldquo;{QUOTES.brief}&rdquo;</blockquote>
    </section>
  );
}
