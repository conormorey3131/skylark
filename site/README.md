# Skylark Lodge — Website

A premium, mobile-first single-page site for Skylark Lodge. The primary call-to-action is to **call or WhatsApp Breda** to book direct.

## ⚠️ Before going live — set the contact details

Open **`js/main.js`** and edit the `CONTACT` object at the very top (this is the only thing you must change):

```js
const CONTACT = {
  phoneDisplay : "Call Breda",
  phone        : "+353870000000",   // ← Breda's real number, full international format
  whatsapp     : "353870000000",    // ← same number, digits only, no "+"
  whatsappMsg  : "Hi Breda! ...",   // pre-filled WhatsApp message (optional)
  instagram    : "https://instagram.com/yourhandle",  // ← real link
  facebook     : "https://facebook.com/yourpage",     // ← real link
  tiktok       : "https://tiktok.com/@yourhandle"      // ← real link
};
```

The Call / WhatsApp buttons (hero, sticky mobile bar, footer, and the contact section) and the social icons all update automatically from these values.

## Running locally

```bash
cd site
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying

It's a static site — upload the contents of the `site/` folder to any host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or normal web hosting). No build step required.

## Structure

```
site/
├── index.html
├── css/style.css
├── js/main.js
├── assets/img/          # web-optimised photos
└── README.md
```

## Map location

The map in the **Location** section is a keyless Google Maps embed in `index.html`, set to **73PC+PQ Glennascaul Business Park, County Galway**. To change it, edit the `q=` value in the iframe `src` (an address or `latitude,longitude` both work).

## Logo & favicon

The brand badge (`assets/img/logo.png`) appears in the header and footer, and is used as the browser/app icon (`assets/img/logo-icon.png`). Replace those two files to swap the logo.

## Notes
- Photos were resized/compressed for the web from the original shoot.
- The Airbnb listing is intentionally **not** linked — bookings are driven to Breda directly.
- Built mobile-first with scroll animations, parallax, a lightbox gallery and a sticky mobile booking bar.
