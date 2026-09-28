import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import site from '../config/site.js';
import { whatsappUrl, telUrl, mailUrl, mapUrl } from '../utils/contact.js';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-5">
          <Col lg={5}>
            <Logo />
            <p className="footer-tagline font-heading">{site.tagline}</p>
            <p className="text-muted-brand mb-0">
              {site.fullName}. MC, comedian and event host, Nairobi.
            </p>
          </Col>
          <Col sm={6} lg={3}>
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-list">
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/book">Book TJAY</Link></li>
            </ul>
          </Col>
          <Col sm={6} lg={4}>
            <h2 className="footer-heading">Contact</h2>
            <ul className="footer-list">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faWhatsapp} fixedWidth /> WhatsApp
                </a>
              </li>
              <li>
                <a href={telUrl}><FontAwesomeIcon icon={faPhone} fixedWidth /> {site.phoneDisplay}</a>
              </li>
              <li>
                <a href={mailUrl} className="text-break"><FontAwesomeIcon icon={faEnvelope} fixedWidth /> {site.email}</a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} fixedWidth /> {site.instagramHandle}
                </a>
              </li>
              {site.address && (
                <li>
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faBuilding} fixedWidth /> {site.address}
                  </a>
                </li>
              )}
              <li className="text-muted-brand">
                <FontAwesomeIcon icon={faLocationDot} fixedWidth /> {site.coverage}
              </li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom">
          <span>© 2026 {site.businessName}</span>
          {site.photoCredit && <span>{site.photoCredit}</span>}
        </div>
      </Container>
    </footer>
  );
}
