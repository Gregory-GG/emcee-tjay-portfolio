import site from '../config/site.js';

export function whatsappUrl(text = site.whatsappDefaultText) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telUrl = `tel:${site.phone}`;
export const mailUrl = `mailto:${site.email}`;

/** Accepts 07XXXXXXXX, 01XXXXXXXX, +2547/1XXXXXXXX and 2547/1XXXXXXXX (spaces and dashes allowed). */
export function isKenyanPhone(value) {
  const cleaned = String(value || '').replace(/[\s\-().]/g, '');
  return /^(?:\+?254|0)[17]\d{8}$/.test(cleaned);
}

export function formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', opts);
}
