import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { serviceIcon } from '../utils/icons.js';

export default function ServiceCard({ service, compact = false }) {
  return (
    <article className="service-card h-100">
      <span className="service-icon" aria-hidden="true">
        <FontAwesomeIcon icon={serviceIcon(service.icon)} />
      </span>
      <h3 className="service-title">{service.title}</h3>
      <p className="text-muted-brand service-desc">{service.description}</p>
      {service.price && <p className="service-price">{service.price}</p>}
      {!compact && (
        <Link
          to={`/book?service=${service.slug}`}
          className="btn btn-outline-brand btn-sm mt-auto align-self-start"
          aria-label={`Enquire about ${service.title}`}
        >
          Enquire <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      )}
    </article>
  );
}
