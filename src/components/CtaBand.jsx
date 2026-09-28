import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { whatsappUrl } from '../utils/contact.js';

export default function CtaBand({ title = "Your event deserves a voice. Let's talk.", text }) {
  return (
    <section className="cta-band on-dark" aria-labelledby="cta-title">
      <Container className="position-relative">
        <span className="gold-rule mx-auto mb-4" />
        <h2 id="cta-title" className="text-center mx-auto cta-title">{title}</h2>
        {text && <p className="text-center cta-text mx-auto">{text}</p>}
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <a href={whatsappUrl()} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp TJAY
          </a>
          <Link to="/book" className="btn btn-gold btn-lg">
            <FontAwesomeIcon icon={faCalendarCheck} /> Book TJAY
          </Link>
        </div>
      </Container>
    </section>
  );
}
