import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SEO from '../components/SEO.jsx';

export default function NotFound() {
  return (
    <section className="section notfound">
      <SEO title="Page not found" description="This page has left the stage. Head back home or book Emcee TJAY for your event." />
      <Container className="text-center">
        <p className="notfound-code font-heading" aria-hidden="true">404</p>
        <span className="eyebrow">Mic drop</span>
        <h1 className="mt-3 notfound-title">This page has left the stage.</h1>
        <p className="lead-brand mx-auto">The link may be old, or the page moved. The show goes on, though.</p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <Link to="/" className="btn btn-outline-brand">Back to home</Link>
          <Link to="/book" className="btn btn-gold">Book TJAY</Link>
        </div>
      </Container>
    </section>
  );
}
