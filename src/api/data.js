// Data access layer. Everything the UI knows about content comes through here,
// so this file can later be swapped for real API calls (e.g. fetch) without
// touching components. Functions are synchronous today; keep call sites simple.
import db from '../data/db.json';
import site from '../config/site.js';

const gridPosts = db.posts.filter((p) => p.placement === 'grid' && p.category);

const byNewest = (a, b) => (b.date || '').localeCompare(a.date || '');
const byFeatured = (a, b) => {
  if (a.featured && b.featured) return a.featuredOrder - b.featuredOrder;
  if (a.featured) return -1;
  if (b.featured) return 1;
  return byNewest(a, b);
};

function matchesQuery(post, q) {
  const haystack = [post.title, post.description, post.venue, post.client, ...(post.hashtags || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term.replace(/^#/, '')));
}

export function getProfile() {
  return db.profile;
}

export function getCategories() {
  return db.categories;
}

export function getCategory(slug) {
  return db.categories.find((c) => c.slug === slug) || null;
}

/**
 * @param {{category?: string, q?: string, sort?: 'newest'|'featured', limit?: number, offset?: number, featuredOnly?: boolean}} opts
 * @returns {{items: object[], total: number}}
 */
export function getPosts({ category, q, sort = 'newest', limit, offset = 0, featuredOnly = false } = {}) {
  let list = gridPosts;
  if (featuredOnly) list = list.filter((p) => p.featured);
  if (category && category !== 'all') list = list.filter((p) => p.category === category);
  if (q && q.trim()) list = list.filter((p) => matchesQuery(p, q.trim()));
  list = [...list].sort(sort === 'featured' ? byFeatured : byNewest);
  const total = list.length;
  const items = typeof limit === 'number' ? list.slice(offset, offset + limit) : list.slice(offset);
  return { items, total };
}

export function getFeaturedPosts() {
  return getPosts({ featuredOnly: true, sort: 'featured' }).items;
}

/** Any post by shortcode, including About/brand-only photos. */
export function getPost(shortcode) {
  return db.posts.find((p) => p.shortcode === shortcode) || null;
}

/** Previous (newer) and next (older) posts within the portfolio grid. */
export function getAdjacentPosts(shortcode) {
  const list = [...gridPosts].sort(byNewest);
  const i = list.findIndex((p) => p.shortcode === shortcode);
  if (i === -1) return { prev: null, next: null };
  return { prev: list[i - 1] || null, next: list[i + 1] || null };
}

export function getAboutPhotos() {
  return db.profile.aboutPhotoShortcodes.map(getPost).filter(Boolean);
}

export function getServices() {
  return db.services;
}

export function getService(slug) {
  return db.services.find((s) => s.slug === slug) || null;
}

export function getVenues() {
  return db.venues;
}

export function getEvents() {
  return db.events || [];
}

export function getCollaborators() {
  return db.collaborators;
}

export function getTestimonials() {
  return [...(db.testimonials || []), ...(site.testimonials || [])];
}
