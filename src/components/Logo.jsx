import { Link } from 'react-router-dom';
import site from '../config/site.js';

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="brand-logo" onClick={onClick} aria-label={`${site.brandName}, home`}>
      <span className="brand-mark" aria-hidden="true">MC</span>
      <span className="brand-word">
        Emcee <span className="text-gold">TJAY</span>
      </span>
    </Link>
  );
}
