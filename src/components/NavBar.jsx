import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import site from '../config/site.js';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
];

export default function NavBar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Navbar expand="lg" sticky="top" className="site-nav" expanded={open} onToggle={setOpen}>
      <Container>
        <Logo onClick={close} />
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Navbar.Toggle aria-controls="site-nav-offcanvas" aria-label="Open menu" className="nav-toggle" />
        </div>
        <Navbar.Offcanvas
          id="site-nav-offcanvas"
          aria-labelledby="site-nav-offcanvas-title"
          placement="end"
          className="site-offcanvas"
        >
          <Offcanvas.Header closeButton closeLabel="Close menu">
            <Offcanvas.Title id="site-nav-offcanvas-title" className="font-heading">
              {site.brandName}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto align-items-lg-center gap-lg-1">
              {LINKS.map((l) => (
                <Nav.Link key={l.to} as={NavLink} to={l.to} end={l.end} onClick={close} className="site-nav-link">
                  {l.label}
                </Nav.Link>
              ))}
              <div className="d-none d-lg-block ms-2">
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              </div>
              <Link to="/book" className="btn btn-gold btn-sm ms-lg-3 mt-3 mt-lg-0" onClick={close}>
                Book Now
              </Link>
            </Nav>
            <p className="offcanvas-foot d-lg-none">{site.tagline}</p>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
