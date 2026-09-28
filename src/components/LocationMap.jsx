import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamondTurnRight, faBuilding } from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { mapUrl } from '../utils/contact.js';

// Keyless Google Maps embed for the address in site.js. Hidden when no address is set.
export default function LocationMap({ title = 'Find the office' }) {
  if (!site.address) return null;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;

  return (
    <section className="location-map" aria-labelledby="location-title">
      <div className="location-head">
        <div>
          <span className="eyebrow">Location</span>
          <h2 id="location-title" className="h3 mt-2 mb-2">{title}</h2>
          <p className="text-muted-brand mb-0">
            <FontAwesomeIcon icon={faBuilding} className="text-gold me-2" aria-hidden="true" />
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="location-address">
              {site.address}
            </a>
          </p>
        </div>
        <a href={directions} target="_blank" rel="noopener noreferrer" className="btn btn-outline-brand">
          <FontAwesomeIcon icon={faDiamondTurnRight} /> Get directions
        </a>
      </div>
      <div className="location-frame">
        <iframe
          src={embedSrc}
          title={`Map showing ${site.address}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
