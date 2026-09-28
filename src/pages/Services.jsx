import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTag } from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getServices } from '../api/data.js';
import SEO from '../components/SEO.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Services() {
  const services = getServices();
  return (
    <>
      <SEO
        title="Services"
        path="/services"
        description="Book Emcee TJAY as corporate emcee, team-building host, wedding and ruracio MC, graduation MC, comedy host or party hype man in Nairobi and Kiambu."
      />
      <section className="page-header">
        <Container>
          <SectionHeading eyebrow="Services" title="The right voice for your event" as="h1">
            Corporate stages, family celebrations and comedy nights. Pick your event and let&apos;s talk.
          </SectionHeading>
          {(site.pricingNote || site.coverage) && (
            <div className="service-notes">
              {site.pricingNote && (
                <p>
                  <FontAwesomeIcon icon={faTag} className="text-gold" aria-hidden="true" /> {site.pricingNote}
                </p>
              )}
              {site.coverage && (
                <p>
                  <FontAwesomeIcon icon={faLocationDot} className="text-gold" aria-hidden="true" /> {site.coverage}
                </p>
              )}
            </div>
          )}
        </Container>
      </section>
      <section className="section pt-0" aria-label="Service list">
        <Container>
          <Row xs={1} md={2} xl={3} className="g-4">
            {services.map((s) => (
              <Col key={s.slug}>
                <ServiceCard service={s} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
