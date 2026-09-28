import { Helmet } from 'react-helmet-async';
import site from '../config/site.js';

const DEFAULT_IMAGE = '/images/og-image.jpg';

function absolute(path) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return site.siteUrl ? `${site.siteUrl}${path}` : path;
}

export default function SEO({ title, description, image = DEFAULT_IMAGE, path = '', type = 'website' }) {
  const fullTitle = title ? `${title} | ${site.brandName}` : `${site.brandName} | MC, Comedian & Event Host in Nairobi`;
  const url = site.siteUrl ? `${site.siteUrl}${path}` : null;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={absolute(image)} />
      {url && <meta property="og:url" content={url} />}
      {url && <link rel="canonical" href={url} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absolute(image)} />
    </Helmet>
  );
}
