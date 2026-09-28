import { Outlet } from 'react-router-dom';
import useTheme from '../hooks/useTheme.js';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import FloatingWhatsApp from './FloatingWhatsApp.jsx';
import ScrollToTop from './ScrollToTop.jsx';

export default function Layout() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <NavBar theme={theme} onToggleTheme={toggle} />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
