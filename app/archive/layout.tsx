import type { Metadata } from 'next';

// Earlier design iterations — kept for reference, hidden from search so
// they don't compete with the live home page as duplicate content.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
