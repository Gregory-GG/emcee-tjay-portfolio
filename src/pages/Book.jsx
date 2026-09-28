import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCircleCheck, faEnvelope, faLocationDot, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getService, getServices } from '../api/data.js';
import { formatDate, isKenyanPhone, mailUrl, telUrl, whatsappUrl } from '../utils/contact.js';
import SEO from '../components/SEO.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const EMPTY = { name: '', phone: '', email: '', eventType: '', eventDate: '', venue: '', guests: '', message: '' };

function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!v.phone.trim()) e.phone = 'Please enter a phone number.';
  else if (!isKenyanPhone(v.phone)) e.phone = 'Use a Kenyan number, e.g. 0712 345 678, 0112 345 678 or +254 712 345 678.';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'That email address does not look right.';
  if (!v.eventType) e.eventType = 'Please choose an event type.';
  if (!v.eventDate) e.eventDate = 'Please choose the event date.';
  else if (v.eventDate < todayISO()) e.eventDate = 'The event date cannot be in the past.';
  if (!v.venue.trim()) e.venue = 'Please tell us the venue or area.';
  if (v.guests !== '' && (!/^\d+$/.test(v.guests) || Number(v.guests) < 1)) e.guests = 'Enter a whole number of guests.';
  return e;
}

function buildSummary(v) {
  const service = getService(v.eventType);
  const lines = [
    '*New booking enquiry: Emcee TJAY*',
    '',
    `*Name:* ${v.name.trim()}`,
    `*Phone:* ${v.phone.trim()}`,
  ];
  if (v.email.trim()) lines.push(`*Email:* ${v.email.trim()}`);
  lines.push(
    `*Event:* ${service ? service.title : v.eventType}`,
    `*Date:* ${formatDate(v.eventDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
    `*Venue/area:* ${v.venue.trim()}`
  );
  if (v.guests) lines.push(`*Guests:* ${v.guests}`);
  if (v.message.trim()) lines.push('', '*Message:*', v.message.trim());
  return lines.join('\n');
}

export default function Book() {
  const [params] = useSearchParams();
  const services = getServices();
  const preselected = getService(params.get('service'))?.slug || '';
  const [values, setValues] = useState({ ...EMPTY, eventType: preselected });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const formRef = useRef(null);

  const set = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      formRef.current?.querySelector(`[name="${firstKey}"]`)?.focus();
      return;
    }
    const url = whatsappUrl(buildSummary(values));
    // Open synchronously inside the click handler so pop-up blockers allow it.
    window.open(url, '_blank', 'noopener,noreferrer');

    if (site.formspreeId) {
      fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          eventType: getService(values.eventType)?.title || values.eventType,
          _subject: `Booking enquiry from ${values.name.trim()}`,
        }),
      }).catch(() => {
        // WhatsApp is the primary channel; an email copy failing should not block the user.
      });
    }
    setSent({ url, name: values.name.trim().split(' ')[0] });
  };

  const field = (key) => ({
    name: key,
    value: values[key],
    onChange: set(key),
    isInvalid: Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  const error = (key) =>
    errors[key] ? (
      <Form.Control.Feedback type="invalid" id={`${key}-error`}>
        {errors[key]}
      </Form.Control.Feedback>
    ) : null;

  return (
    <>
      <SEO
        title="Book TJAY"
        path="/book"
        description="Book Emcee TJAY for your corporate event, wedding, ruracio, graduation or party. Send your event details on WhatsApp for a quote."
      />
      <section className="page-header">
        <Container>
          <SectionHeading eyebrow="Book" title="Let's make your event unforgettable" as="h1">
            Share a few details and your enquiry opens in WhatsApp, ready to send. {site.pricingNote}
          </SectionHeading>
        </Container>
      </section>

      <section className="section pt-0">
        <Container>
          <Row className="gy-5 gx-lg-5">
            <Col lg={8}>
              <div className="form-card">
                {sent ? (
                  <div className="text-center py-4" role="status" aria-live="polite">
                    <FontAwesomeIcon icon={faCircleCheck} className="confirm-icon" aria-hidden="true" />
                    <h2 className="mt-3">Thank you{sent.name ? `, ${sent.name}` : ''}.</h2>
                    <p className="lead-brand mx-auto">
                      Your booking summary has opened in WhatsApp. Press send there to reach TJAY directly.
                    </p>
                    <p className="text-muted-brand">WhatsApp didn&apos;t open?</p>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                      <a href={sent.url} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                        <FontAwesomeIcon icon={faWhatsapp} /> Open WhatsApp
                      </a>
                      <Button
                        variant="outline-brand"
                        onClick={() => {
                          setSent(null);
                          setValues({ ...EMPTY, eventType: preselected });
                        }}
                      >
                        Start a new enquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form noValidate onSubmit={onSubmit} ref={formRef} aria-label="Booking enquiry">
                    <p className="text-muted-brand small mb-4">
                      Fields marked <span aria-hidden="true">*</span>
                      <span className="visually-hidden">with an asterisk</span> are required.
                    </p>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="book-name">
                          <Form.Label>Your name *</Form.Label>
                          <Form.Control type="text" autoComplete="name" required {...field('name')} />
                          {error('name')}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="book-phone">
                          <Form.Label>Phone *</Form.Label>
                          <Form.Control
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="07XX XXX XXX"
                            required
                            {...field('phone')}
                          />
                          {error('phone')}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="book-email">
                          <Form.Label>Email (optional)</Form.Label>
                          <Form.Control type="email" autoComplete="email" {...field('email')} />
                          {error('email')}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="book-type">
                          <Form.Label>Event type *</Form.Label>
                          <Form.Select required {...field('eventType')}>
                            <option value="">Choose an event type</option>
                            {services.map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {s.title}
                              </option>
                            ))}
                            <option value="Other">Other</option>
                          </Form.Select>
                          {error('eventType')}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="book-date">
                          <Form.Label>Event date *</Form.Label>
                          <Form.Control type="date" min={todayISO()} required {...field('eventDate')} />
                          {error('eventDate')}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="book-guests">
                          <Form.Label>Expected guests</Form.Label>
                          <Form.Control type="number" min="1" step="1" inputMode="numeric" {...field('guests')} />
                          {error('guests')}
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="book-venue">
                          <Form.Label>Venue or area *</Form.Label>
                          <Form.Control type="text" placeholder="e.g. Karen, Nairobi" required {...field('venue')} />
                          {error('venue')}
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="book-message">
                          <Form.Label>Tell TJAY about your event</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Programme, timings, anything special."
                            {...field('message')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit" variant="gold" size="lg" className="mt-4 tw-w-full sm:tw-w-auto">
                      <FontAwesomeIcon icon={faPaperPlane} /> Send via WhatsApp
                    </Button>
                  </Form>
                )}
              </div>
            </Col>

            <Col lg={4}>
              <aside className="contact-panel" aria-labelledby="contact-title">
                <h2 id="contact-title" className="h3">Prefer to reach out directly?</h2>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-100 mt-3">
                  <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp TJAY
                </a>
                <ul className="contact-list">
                  <li>
                    <a href={telUrl}>
                      <FontAwesomeIcon icon={faPhone} fixedWidth className="text-gold" /> Call {site.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={mailUrl} className="text-break">
                      <FontAwesomeIcon icon={faEnvelope} fixedWidth className="text-gold" /> {site.email}
                    </a>
                  </li>
                  <li>
                    <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faInstagram} fixedWidth className="text-gold" /> {site.instagramHandle}
                    </a>
                  </li>
                  {site.coverage && (
                    <li className="text-muted-brand">
                      <FontAwesomeIcon icon={faLocationDot} fixedWidth className="text-gold" /> {site.coverage}
                    </li>
                  )}
                </ul>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
