import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { whatsappUrl } from '../utils/contact.js';

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TJAY on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </a>
  );
}
