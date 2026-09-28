import { useCallback, useEffect, useState } from 'react';

const KEY = 'tjay-theme';

function readInitial() {
  // index.html already resolved saved/preferred theme before paint.
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export default function useTheme() {
  const [theme, setTheme] = useState(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-bs-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F6F4EF' : '#0E0E10');
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(KEY, next);
      } catch {
        // Storage unavailable (private mode, blocked). Theme still applies for this visit.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
