import { Container } from 'react-bootstrap';
import { getVenues } from '../api/data.js';

export default function VenueStrip({ title = 'Trusted on stage at' }) {
  const venues = getVenues();
  if (!venues.length) return null;
  return (
    <section className="venue-strip" aria-labelledby="venue-strip-title">
      <Container>
        <h2 id="venue-strip-title" className="venue-strip-title">{title}</h2>
        <ul className="venue-list">
          {venues.map((v) => (
            <li key={v.name}>
              <span className="venue-name">{v.name}</span>
              {v.area && <span className="venue-area">{v.area}</span>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
