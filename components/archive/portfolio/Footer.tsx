import LogoLockup from '@/components/shared/LogoLockup';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <LogoLockup />
        <div className="footer__stamp">&#9733;</div>
        <div className="footer__copy">
          &copy; MMXXVI Rakesh Agarwal, Advocates &middot; New Delhi &middot; Agra &middot; Bangalore
        </div>
      </div>
    </footer>
  );
}
