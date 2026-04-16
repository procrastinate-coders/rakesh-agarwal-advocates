interface LogoLockupProps {
  className?: string;
}

export default function LogoLockup({ className }: LogoLockupProps) {
  return (
    <div className={`lockup ${className ?? ''}`}>
      <div className="lockup__R">R</div>
      <div className="lockup__right">
        <div className="lockup__AA">
          A<span className="it">A</span>
        </div>
        <div className="lockup__wordmark">
          <div className="lockup__wordmark-row">
            <span className="lockup__name">Rakesh Agarwal</span>
            <span className="lockup__advocates">Advocates</span>
          </div>
          <div className="lockup__rule" />
        </div>
      </div>
    </div>
  );
}
