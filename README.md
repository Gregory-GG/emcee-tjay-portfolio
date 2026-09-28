# Emcee TJAY: Portfolio Website

The portfolio and booking site for **Emcee TJAY** (Brian "TJAY" Mugambi), MC, comedian and event host in Nairobi. Business: Vibe Craft Agency.

It is a static React site (React 18, Vite, React Router, Bootstrap 5, Tailwind with the `tw-` prefix, and Font Awesome). There is no server or database. Bookings go to WhatsApp, and optionally to email through Formspree.

---

## 1. Run it locally

You need [Node.js](https://nodejs.org) 20.19 or newer.

```bash
npm install        # first time only
npm run dev        # start the dev server at http://localhost:5173
npm run build      # build the production site into dist/
npm run preview    # serve the built site at http://localhost:4173
```

## 2. Change contact details and settings

Everything personal lives in **`src/config/site.js`**: name, tagline, phone, WhatsApp number, email, Instagram, coverage area, pricing note and photo credit.

- `whatsapp` must be in international format with no `+` or spaces (e.g. `254769819970`).
- `siteUrl`: once the site is live, set this to the full address (e.g. `https://emceetjay.co.ke`) so link previews on WhatsApp, Facebook and X show the photo correctly.
- A section whose value is `null` or an empty list (`[]`) is hidden automatically.

## 3. Content: `src/data/db.json`

All portfolio content is in `src/data/db.json`. The site reads it only through `src/api/data.js`, so it can later be swapped for a real API without changing the pages.

### Add testimonials
Add real quotes to the `testimonials` list, in either `db.json` or `site.js`. The Home page testimonials section appears as soon as the list has at least one entry.

```json
"testimonials": [
  { "quote": "TJAY kept our 400 guests engaged all evening.", "name": "Jane W.", "event": "Company end-year party" }
]
```

Only use quotes you have permission to publish.

### Add prices
Each service has `"price": null`. Replace it with text to show a price on that service card:

```json
"price": "From KES 00,000"
```

### Add a new post
1. Put the photo(s) in `public/images/portfolio/`.
2. Add an entry to `posts` in `db.json`. Copy an existing post and change it:

```json
{
  "shortcode": "ABC123xyz",
  "type": "image",
  "title": "Gala Night at Example Hotel",
  "description": "Hosting the annual gala.",
  "date": "2026-10-15",
  "category": "corporate-team-building",
  "placement": "grid",
  "url": "https://www.instagram.com/p/ABC123xyz/",
  "venue": "Example Hotel",
  "client": null,
  "hashtags": ["gala", "corporate"],
  "featured": false,
  "featuredOrder": null,
  "images": [
    { "src": "/images/portfolio/my-photo.jpg", "width": 1440, "height": 1800, "slide": 1, "alt": "Emcee TJAY on stage at the gala" }
  ]
}
```

- **type**: `"image"` for one photo, `"carousel"` for several photos, or `"reel"` for an Instagram video. A reel has `"images": []` and uses `https://www.instagram.com/reel/<code>/` as its `url`.
- **category** must be one of: `graduations`, `weddings-ruracios`, `corporate-team-building`, `comedy-stage`, `parties-celebrations`, `behind-the-mic`, `portraits`.
- **placement**: `"grid"` shows the post in the portfolio. `"about"` and `"brand"` keep it off the portfolio grid.
- **featured**: set `true` and give it a `featuredOrder` number to show it on the Home page. Keep six featured posts.
- The shortcode is the code in the Instagram link: `instagram.com/p/`**`ABC123xyz`**`/`.
- Always set `width`, `height` and `alt`. Width and height stop the page from jumping while images load, and alt text describes the photo for screen readers.

## 4. Replace images with high-resolution originals

The current photos are Instagram web copies, up to 1440 px wide. To swap in originals:

1. Export each photo about 1600–2000 px wide as `.jpg` or `.webp`, ideally under 400 KB.
2. Save it into `public/images/portfolio/` with **the same file name**, or update its `src` in `db.json`.
3. Update the `width` and `height` for that image in `db.json` to match the new file.
4. The social preview image is `public/images/og-image.jpg` (1200×630).

## 5. Email copies of bookings (Formspree)

By default, the booking form opens WhatsApp with the enquiry filled in. To also receive every enquiry by email:

1. Create a free account at [formspree.io](https://formspree.io) and create a new form.
2. Copy the form ID. It is the last part of the endpoint: `https://formspree.io/f/`**`xyzabcd`**.
3. In `src/config/site.js`, set `formspreeId: 'xyzabcd'`.
4. Rebuild and redeploy.

## 6. Deploy

The site is fully static. Build it with `npm run build`, and the files to publish are in `dist/`. Links to pages such as `/portfolio/...` work on both hosts thanks to `vercel.json` (Vercel) and `public/_redirects` (Netlify).

### Vercel
- **With Git:** push this folder to GitHub, then on [vercel.com](https://vercel.com) choose **Add New → Project** and import the repository. Vercel detects Vite automatically: build command `npm run build`, output folder `dist`.
- **Command line:** `npx vercel` and then `npx vercel --prod`.

### Netlify
Netlify is fully configured. `netlify.toml` sets the build command, the publish folder and Node 22. `public/_redirects` handles page links, and `public/_headers` sets caching and security headers.
- **With Git:** on [app.netlify.com](https://app.netlify.com) choose **Add new site → Import an existing project** and pick the repository. The build settings fill in automatically from `netlify.toml`.
- **Drag and drop:** run `npm run build`, open **Sites** on [app.netlify.com/drop](https://app.netlify.com/drop), and drag the `dist/` folder onto the page.

## 7. Custom domain

1. Buy the domain (e.g. `emceetjay.co.ke`) from a registrar.
2. **Vercel:** Project → Settings → Domains → Add. **Netlify:** Site → Domain management → Add a domain.
3. At your registrar, create the DNS records the host shows you. Usually that is an `A` record for the root domain and a `CNAME` for `www`.
4. HTTPS is issued automatically once DNS has updated, which can take up to 24 hours.
5. Set `siteUrl` in `src/config/site.js` to the new address, then rebuild and redeploy.

---

### Project layout

```
public/            favicon, social image, _redirects, images/portfolio/
src/api/data.js    data access layer (the only file that reads db.json)
src/components/    NavBar, Footer, PostCard, ReelCard, InstagramEmbed, ...
src/config/site.js contact details and settings
src/data/db.json   posts, services, venues, collaborators, testimonials
src/hooks/         useTheme (light/dark with saved preference)
src/pages/         Home, Portfolio, PostDetail, About, Services, Book, NotFound
src/styles/        variables.css (theme colours), global.css, components.css
src/utils/         WhatsApp links, phone validation, icons
```
