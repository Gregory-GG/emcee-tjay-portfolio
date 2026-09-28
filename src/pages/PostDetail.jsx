import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faArrowRight, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { getAdjacentPosts, getCategory, getPost } from '../api/data.js';
import { formatDate } from '../utils/contact.js';
import SEO from '../components/SEO.jsx';
import ImageCarousel from '../components/ImageCarousel.jsx';
import InstagramEmbed from '../components/InstagramEmbed.jsx';
import NotFound from './NotFound.jsx';

export default function PostDetail() {
  const { shortcode } = useParams();
  const post = getPost(shortcode);
  if (!post || post.placement !== 'grid') return <NotFound />;

  const category = getCategory(post.category);
  const { prev, next } = getAdjacentPosts(post.shortcode);
  const isReel = post.type === 'reel';

  const facts = [
    ['Date', formatDate(post.date)],
    ['Category', category?.label],
    ['Venue', post.venue],
    ['Client', post.client],
  ].filter(([, v]) => v);

  return (
    <>
      <SEO
        title={post.title}
        path={`/portfolio/${post.shortcode}`}
        type="article"
        description={`${post.description} Emcee TJAY, MC and event host in Nairobi.`}
        image={post.images[0]?.src}
      />
      <section className="section detail-section">
        <Container>
          <Link to="/portfolio" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to portfolio
          </Link>
          <Row className="gy-5 gx-lg-5 mt-1">
            <Col lg={7}>
              {isReel ? (
                <InstagramEmbed url={post.url} title={`Instagram reel: ${post.title}`} />
              ) : (
                <ImageCarousel images={post.images} title={post.title} />
              )}
            </Col>
            <Col lg={5}>
              <div className="detail-info">
                {category && (
                  <Link to={`/portfolio?category=${category.slug}`} className="eyebrow text-decoration-none">
                    {category.label}
                  </Link>
                )}
                <h1 className="detail-title mt-3">{post.title}</h1>
                <p className="lead-brand">{post.description}</p>
                <dl className="detail-facts">
                  {facts.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="d-flex flex-wrap gap-3">
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-brand">
                    <FontAwesomeIcon icon={faInstagram} /> View on Instagram
                  </a>
                </div>
                <div className="detail-cta">
                  <p className="font-heading mb-3">Want this energy at your event?</p>
                  <Link to="/book" className="btn btn-gold">
                    <FontAwesomeIcon icon={faCalendarCheck} /> Book TJAY for your event
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          <nav className="post-nav" aria-label="More posts">
            {prev ? (
              <Link to={`/portfolio/${prev.shortcode}`} className="post-nav-link">
                <span className="post-nav-dir"><FontAwesomeIcon icon={faArrowLeft} /> Newer</span>
                <span className="post-nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/portfolio/${next.shortcode}`} className="post-nav-link text-end">
                <span className="post-nav-dir">Older <FontAwesomeIcon icon={faArrowRight} /></span>
                <span className="post-nav-title">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Container>
      </section>
    </>
  );
}
