# Ad Meliora Coaching — Website

Marketing site for **Ad Meliora Coaching** (Erin Randall). Static HTML/CSS/JS, deployed on Vercel.

## Stack

- Static HTML, CSS, vanilla JS — no build step
- Hosting: **Vercel** (connected to this GitHub repo; pushes to `main` deploy to production)
- CMS: none yet (Payload + Neon planned if/when content management is needed)

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About Erin |
| `services.html` | Coaching (Individual, Team & Org, Supervision, Agile Coaching Circles) |
| `events.html` | Events (Clean in Montana 2026) |
| `resources.html` | Resources, Blog & Downloads |
| `contact.html` | Contact & free consult |

Shared styles in `css/styles.css`, interactions in `js/main.js`, images in `assets/`.

## Local preview

It's a static site — open `index.html` directly in a browser, or run any static server:

```bash
npx serve .
# or
python3 -m http.server 4599
```

## Design notes

- **Type:** Fraunces (display) + Hanken Grotesk (body)
- **Palette:** warm cream paper, sage, ink, poppy red `#C9202E` (from the logo mark)
- **Voice:** copy follows Erin's documented voice & tone — grounded, honest, specific; avoids coaching clichés

## To do before launch

- Replace portrait/photo placeholders with real imagery
- Wire the contact form to email / a form service, and link the Acuity scheduling URL
- Add real interview & media links on the Resources page
- Confirm final domain and configure it in Vercel
