import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Only scroll to top if pathname actually changed (not just state updates)
    if (prevPathname.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return null;
}