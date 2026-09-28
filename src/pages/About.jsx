import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getAboutPhotos, getCollaborators, getEvents, getPost, getProfile } from '../api/data.js';
import SEO from '../components/SEO.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function About() {
  const profile = getProfile();
  const portrait = getPost(profile.portraitShortcode).images[0];
  const photos = getAboutPhotos();
  const events = getEvents();
  const collaborators = getCollaborators();

  return (
    <>
      <SEO
        title="About"
        path="/about"
        description={`Meet ${site.fullName}: Nairobi MC, comedian and event host, trained at iSpeak Academy and mentored by established MCs. Half host, half stand-up comic.`}
        image={portrait.src}
      />

      <section className="page-header about-intro">
        <Container>
          <Row className="align-items-center gy-5 gx-lg-5">
            <Col lg={6} className="order-lg-2">
              <figure className="about-portrait mb-0">
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  fetchPriority="high"
                />
              </figure>
            </Col>
            <Col lg={6}>
              <span className="eyebrow">About</span>
              <h1 className="mt-3 mb-4">{site.fullName}</h1>
              <p className="lead-brand">
                A Nairobi-based MC, comedian and event host. In his own words: half host, half stand-up comic.
              </p>
              <p className="text-muted-brand">
                Corporate parties, graduations, weddings, team-building days and comedy stages. TJAY brings structure to the
                programme and energy to the room.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section pt-0" aria-labelledby="story-title">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 id="story-title" className="visually-hidden">His story</h2>
              <div className="story">
                <h3>Building the brand</h3>
                <p>
                  2026 is the year Emcee TJAY stepped up. From the NIMPA Class of 2026 graduation to a corporate party for
                  Canaan Developers and the JWFC Fun Day, he has been building the brand one stage at a time.
                </p>
                <h3>Trained for the mic</h3>
                <p>
                  He sharpened his craft with public-speaking training at iSpeak Academy. Good hosting looks effortless; it
                  takes work.
                </p>
                <h3>Learning from the best</h3>
                <p>
                  TJAY learns from MCs who came before him. Mc Joshoyugi is a mentor, and the two have shared the mic at a
                  wedding and a hype set. Veteran MC Abel the Emcee gave him a copy of his book, <em>The Art of MC&apos;ing</em>.
                  Co-hosting with Mc Phylis at a graduation and Mc Mkwasipapa at a team-building day keeps him learning on the job.
                </p>
                <h3>Host and comic</h3>
                <p>
                  He blends formal hosting with stand-up comedy. The programme runs on time, and the room laughs along the way.
                </p>
                <h3>Faith first</h3>
                <p>Faith sits at the heart of how he talks about his journey.</p>
                <h3>A place of his own</h3>
                <p className="mb-0">
                  In September 2026 he opened his own professional office, with the MC TJAY sign on the wall and the tagline he
                  lives by: Your Event, Your Voice.
                </p>
              </div>

              {site.signature && (
                <figure className="pull-quote">
                  <blockquote className="font-heading">“{site.signature}.”</blockquote>
                  <figcaption>The signature line</figcaption>
                </figure>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {photos.length > 0 && (
        <section className="section section-surface" aria-labelledby="gallery-title">
          <Container>
            <SectionHeading eyebrow="Off the stage" title="Behind the mic" id="gallery-title" />
            <Row xs={1} sm={2} lg={3} className="g-4 mt-3" as="ul" role="list">
              {photos.map((p) => {
                const img = p.images[0];
                return (
                  <Col as="li" key={p.shortcode} className="list-unstyled">
                    <figure className="about-photo mb-0">
                      <div className="about-photo-media">
                        <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
                      </div>
                      <figcaption>{p.title}</figcaption>
                    </figure>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
      )}

      <section className="section" aria-label="Events and collaborators">
        <Container>
          <Row className="gy-5 gx-lg-5">
            {events.length > 0 && (
              <Col lg={6}>
                <span className="eyebrow">On the record</span>
                <h2 className="mt-3 mb-4">Named events</h2>
                <ul className="fact-list">
                  {events.map((e) => (
                    <li key={e.name}>
                      <span className="fact-name">{e.name}</span>
                      <span className="fact-meta">{e.type}</span>
                    </li>
                  ))}
                </ul>
              </Col>
            )}
            {collaborators.length > 0 && (
              <Col lg={6}>
                <span className="eyebrow">Community</span>
                <h2 className="mt-3 mb-4">Mentors &amp; collaborators</h2>
                <ul className="fact-list">
                  {collaborators.map((c) => (
                    <li key={c.name}>
                      <span className="fact-name">{c.name}</span>
                      <span className="fact-meta">{c.role}</span>
                    </li>
                  ))}
                </ul>
              </Col>
            )}
          </Row>
          <div className="mt-5">
            <Link to="/portfolio" className="btn btn-outline-brand">
              See the portfolio <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
