import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowDown, faArrowRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getFeaturedPosts, getPost, getProfile, getServices, getTestimonials } from '../api/data.js';
import { whatsappUrl } from '../utils/contact.js';
import SEO from '../components/SEO.jsx';
import VenueStrip from '../components/VenueStrip.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import PostGrid from '../components/PostGrid.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import InstagramEmbed from '../components/InstagramEmbed.jsx';

const TEASER_SERVICES = ['corporate-emcee', 'wedding-ruracio-mc', 'graduation-ceremonies', 'comedy-host-standup'];

export default function Home() {
  const profile = getProfile();
  const hero = getPost(profile.heroShortcode).images[0];
  const stage = getPost(profile.stageShortcode).images[0];
  const liveReel = getPost(profile.liveReelShortcode);
  const featured = getFeaturedPosts();
  const services = getServices().filter((s) => TEASER_SERVICES.includes(s.slug));
  const testimonials = getTestimonials();

  const scrollToFeatured = (e) => {
    e.preventDefault();
    const el = document.getElementById('featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <SEO description="Emcee TJAY is a Nairobi MC, comedian and event host for corporate events, weddings, ruracios, graduations and celebrations. Your Event. Your Voice." />

      {/* Hero */}
      <section className="hero on-dark" aria-labelledby="hero-title">
        <div className="hero-media">
          <img
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            fetchPriority="high"
            loading="eager"
          />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <Container className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">MC · Comedian · Event Host · Nairobi</span>
            <h1 id="hero-title" className="hero-title">
              Emcee <span className="text-gold-hero">TJAY</span>
            </h1>
            <p className="hero-tagline font-heading">{site.tagline}</p>
            <p className="hero-intro">
              Corporate events, weddings, graduations and celebrations, hosted with energy, polish and a laugh.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href={whatsappUrl()} className="btn btn-gold btn-lg" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} /> Book TJAY
              </a>
              <a href="#featured" onClick={scrollToFeatured} className="btn btn-outline-brand btn-lg">
                See Him Live <FontAwesomeIcon icon={faArrowDown} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <VenueStrip />

      {/* Featured work */}
      <section className="section" id="featured" tabIndex={-1} aria-labelledby="featured-title">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-5">
            <SectionHeading eyebrow="Featured work" title="On stage, on the mic" id="featured-title">
              Graduations, weddings, corporate nights and comedy stages.
            </SectionHeading>
            <Link to="/portfolio" className="btn btn-outline-brand">
              Full portfolio <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <PostGrid posts={featured} />
        </Container>
      </section>

      {/* Half host, half comic */}
      <section className="section section-surface split-section" aria-labelledby="split-title">
        <Container>
          <Row className="align-items-center gy-5 gx-lg-5">
            <Col lg={6}>
              <figure className="split-media mb-0">
                <img src={stage.src} alt={stage.alt} width={stage.width} height={stage.height} loading="lazy" />
              </figure>
            </Col>
            <Col lg={6}>
              <span className="eyebrow">The TJAY difference</span>
              <h2 id="split-title" className="mt-3 mb-4">
                Half host, <em className="text-gold">half stand-up comic.</em>
              </h2>
              <p className="lead-brand">
                A great MC keeps the programme on time. A great comic keeps the room with you. TJAY does both.
              </p>
              <p className="text-muted-brand">
                He runs the order of events with polish, then reads the room and brings the laugh when it needs lifting.
                Formal protocol one minute, a crowd in stitches the next.
              </p>
              <Link to="/about" className="btn btn-outline-brand mt-3">
                Meet TJAY <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Live reel */}
      {liveReel && (
        <section className="section live-section" aria-labelledby="live-title">
          <Container>
            <Row className="align-items-center gy-5 gx-lg-5">
              <Col lg={5}>
                <span className="eyebrow">Live from the floor</span>
                <h2 id="live-title" className="mt-3 mb-4">{liveReel.title}</h2>
                <p className="lead-brand">
                  NIMPA Class of 2026. A live graduation crowd, and TJAY on the mic. This is what your guests get.
                </p>
                <a href={liveReel.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-brand mt-3">
                  <FontAwesomeIcon icon={faInstagram} /> Watch on Instagram
                </a>
              </Col>
              <Col lg={7}>
                <InstagramEmbed url={liveReel.url} title={`Instagram reel: ${liveReel.title}`} />
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Services teaser */}
      <section className="section section-surface" aria-labelledby="services-title">
        <Container>
          <SectionHeading eyebrow="Services" title="One voice, every kind of room" align="center" id="services-title">
            From boardrooms to ruracios, the programme flows and the guests stay with you.
          </SectionHeading>
          <Row xs={1} sm={2} lg={4} className="g-4 mt-4">
            {services.map((s) => (
              <Col key={s.slug}>
                <ServiceCard service={s} compact />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <Link to="/services" className="btn btn-gold">
              All services <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Testimonials: hidden until real ones are added */}
      {testimonials.length > 0 && (
        <section className="section" aria-labelledby="testimonials-title">
          <Container>
            <SectionHeading eyebrow="Kind words" title="What hosts say" align="center" id="testimonials-title" />
            <Row xs={1} md={2} lg={3} className="g-4 mt-4">
              {testimonials.map((t, i) => (
                <Col key={i}>
                  <figure className="testimonial h-100">
                    <FontAwesomeIcon icon={faQuoteLeft} className="text-gold" aria-hidden="true" />
                    <blockquote className="mt-3">{t.quote}</blockquote>
                    <figcaption>
                      <strong>{t.name}</strong>
                      {t.event && <span className="text-muted-brand"> · {t.event}</span>}
                    </figcaption>
                  </figure>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}
