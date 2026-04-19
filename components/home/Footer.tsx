import LogoLockup from '@/components/shared/LogoLockup';
import { SITE } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="gm-footer">
      <LogoLockup />
      <p>{SITE.copyright}</p>
    </footer>
  );
}
