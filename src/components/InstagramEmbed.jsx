import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const SCRIPT_SRC = 'https://www.instagram.com/embed.js';
let scriptPromise = null;

// Load Instagram's embed script once for the whole app.
function loadEmbedScript() {
  if (window.instgrm) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        s.remove();
        reject(new Error('Instagram embed failed to load'));
      };
      document.body.appendChild(s);
    });
  }
  return scriptPromise;
}

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * Official Instagram embed. The blockquote is written outside React's tree
 * (Instagram's script replaces it with an iframe), so React never reconciles it.
 */
export default function InstagramEmbed({ url, title = 'Instagram post' }) {
  const ref = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let cancelled = false;
    setStatus('loading');
    el.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${escapeAttr(url)}" data-instgrm-version="14"><a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">View this post on Instagram</a></blockquote>`;

    const observer = new MutationObserver(() => {
      if (el.querySelector('iframe')) {
        setStatus('loaded');
        observer.disconnect();
      }
    });
    observer.observe(el, { childList: true, subtree: true });

    loadEmbedScript()
      .then(() => {
        if (!cancelled) window.instgrm?.Embeds?.process();
      })
      .catch(() => {
        if (!cancelled) setStatus('failed');
      });

    const timer = setTimeout(() => {
      if (!cancelled && !el.querySelector('iframe')) setStatus('failed');
    }, 12000);

    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(timer);
      el.innerHTML = '';
    };
  }, [url]);

  return (
    <div className="ig-embed" aria-label={title}>
      <div ref={ref} className={status === 'failed' ? 'd-none' : ''} />
      {status === 'loading' && (
        <div className="ig-loading" aria-live="polite">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" /> Loading from Instagram…
        </div>
      )}
      {status === 'failed' && (
        <div className="ig-fallback">
          <FontAwesomeIcon icon={faInstagram} className="ig-fallback-icon" aria-hidden="true" />
          <p className="mb-3">The Instagram player could not load here.</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Watch on Instagram
          </a>
        </div>
      )}
    </div>
  );
}
