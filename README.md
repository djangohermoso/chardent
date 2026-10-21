# CharDent — Dental Clinic Website

A single-page, static marketing site for CharDent. Minimalist, warm, and modern —
built with plain HTML, CSS, and vanilla JS (no build step).

## Structure

```
index.html            # all page markup
assets/css/styles.css  # design system + layout
assets/js/main.js      # nav, scroll reveal, form validation
assets/img/            # web-optimised images + logo (from /CHARDENT originals)
CHARDENT/              # original hi-res source images + logo
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Just open `index.html` directly in a browser also works.

## Notes

- Brand colours are taken from the logo (deep teal `#0e3b37`, bright teal `#16a79b`)
  and live as CSS variables at the top of `styles.css`.
- Fonts: Fraunces (headings) + Inter (body), loaded from Google Fonts.
- Images were downscaled and re-encoded (JPEG + WebP) from the originals in
  `CHARDENT/`. Re-run `scratchpad/opt.py`-style processing if you swap them.
- The booking form is **front-end only** — it validates and shows a confirmation
  message but does not send anything. Wire it to an email service / backend
  (Formspree, Netlify Forms, or your own endpoint) before going live. A quick
  option: point it at `chardent2025@gmail.com` via Formspree.
- Real clinic details are in place: Sitio Puting Kahoy, Barangay Cupang,
  Antipolo, Rizal 1873 · 0936 023 3332 · chardent2025@gmail.com ·
  facebook.com/chardentclinic.
- Opening hours are confirmed: Mon–Sat 9:00 AM – 6:00 PM, Sunday by appointment.
- The three testimonials are placeholders — swap in real Facebook/Google reviews.
```
