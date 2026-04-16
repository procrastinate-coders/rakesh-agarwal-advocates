import CardScrollReveal from './CardScrollReveal';

export default function CardFooter() {
  return (
    <CardScrollReveal>
      <div className="card-footer">
        <div className="card-footer__logo">
          <span className="r">R</span>
          <span className="a">AA</span>
        </div>
        <p className="card-footer__text">Rakesh Agarwal Advocates</p>
      </div>
    </CardScrollReveal>
  );
}
