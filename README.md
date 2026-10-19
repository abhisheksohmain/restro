# StayNest Premium One-Page Landing Page

A responsive single-page hotel landing page built with HTML5, CSS3 and vanilla JavaScript.

## Project structure

```text
staynest-landing-page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── (put your original logo and local images here)
├── robots.txt
├── sitemap.xml
└── README.md
```

## Quick start

1. Extract the project ZIP.
2. Put your original logo at `images/staynest-logo.png`. If you use another filename, update both logo image paths in `index.html`.
3. Open `index.html` in a browser, or use VS Code Live Server for local testing.
4. Replace the remote Unsplash demo photographs with your own licensed hotel images before launch.
5. Complete the owner-confirmation checklist below before publishing.

## Important owner-confirmation checklist

- [ ] Confirm the official StayNest business name and actual property location.
- [ ] Confirm guest-service hours and check-in/check-out policy.
- [ ] Replace `whatsappNumber` in `js/script.js` with the real WhatsApp number in international format without `+`, spaces or punctuation (for example, `91XXXXXXXXXX`).
- [ ] Replace `phoneNumber` in `js/script.js` with the real phone number, including country code (for example, `+91XXXXXXXXXX`).
- [ ] Confirm every room type, service, inclusion, availability rule and policy.
- [ ] Replace every illustrative price with owner-approved rates, including applicable taxes and fees. Alternatively remove the prices.
- [ ] Supply authentic guest reviews before publishing reviews. No invented reviews are included.
- [ ] Add an approved Privacy Policy and Terms. Current footer links are placeholders.
- [ ] Configure a verified map embed and directions link after the address is confirmed.
- [ ] Replace the canonical URL, Open Graph URL/image and sitemap/robots domain placeholders with the real production domain.
- [ ] Add Hotel/LodgingBusiness JSON-LD only with verified property data.

## Change the logo

Save the original logo as `images/staynest-logo.png`. The logo is displayed with `object-fit: contain` and a large responsive width. If your logo file has another name, search `index.html` for `staynest-logo.png` and update both occurrences.

## Replace demo room images

The room and hero images currently use distinct remote Unsplash demo images. To use local images:
1. Copy optimized images into `images/`, preferably WebP or AVIF.
2. Replace each `src="https://images.unsplash.com/..."` with a local path such as `images/deluxe-room.webp`.
3. Keep descriptive alt text and dimensions. The hero image is prioritized; below-the-fold photos use lazy loading.

The current image URLs are for design demonstration. Make sure you have permission to use any final photographs.

## Edit prices and offerings

Room cards are in `index.html` inside the `<!-- START: ROOMS AND PACKAGES SECTION -->` comments. Search for the room/package title and update its price, unit, description and inclusions. All displayed rates are illustrative placeholders and must be approved before publication. Add-on services are separate and are not automatically included in room prices.

## Update phone and WhatsApp

Edit the single `STAYNEST_CONFIG` object near the top of `js/script.js`:
- `whatsappNumber`: digits only, international country code included, no plus sign.
- `phoneNumber`: valid `tel:` number, including country code.

Until configured, the contact links intentionally do not use a fake example number; they show an explanation instead.

## Location and opening hours

The location and proposed hours in the brief have not been verified as StayNest's actual information. The page therefore uses provisional messaging instead of publishing an unverified address or fabricated hours. Replace it only after owner confirmation. Then add a real Google Maps embed and verified directions URL.

## Contact form

The form validates required fields and dates in the browser, then prepares a WhatsApp message. It does not automatically send a message and does not store submitted data. The guest must press Send inside WhatsApp. For a true web form submission, connect a trusted form endpoint or backend and update the JavaScript to handle its response; never display success unless the endpoint confirms submission.

## SEO updates

Before launch:
1. Replace `https://YOUR-DOMAIN.example/` in the canonical URL, Open Graph URL, `robots.txt`, and `sitemap.xml`.
2. Update the Open Graph image to an absolute URL for a real image on your domain.
3. Use location-specific SEO wording only after confirming the property location. Do not stuff keywords.
4. Add verified LocalBusiness/Hotel structured data with accurate name, address, phone, URL, and other supported properties.
5. Submit the sitemap URL in Google Search Console after the domain is verified.
6. Do not promise rankings; indexing and ranking are controlled by search engines.

## Test before publishing

- Test every header and footer anchor link.
- Test the mobile menu on a narrow screen and close it with Escape.
- Check filters for Rooms, Packages and Add-On Services.
- Test FAQ open/close buttons with keyboard and screen reader.
- Configure real contact numbers and test each WhatsApp/call link on mobile and desktop.
- Submit the form with missing fields, invalid phone/email, past dates, and checkout before/equal to check-in.
- Test the form with the configured WhatsApp number and confirm it only opens a prefilled draft.
- Check the page at desktop, tablet and mobile widths; confirm no horizontal scrolling.
- Verify rates, amenities, address, hours, cancellation policy, tax information and reviews with the owner.
- Run an HTML/CSS validation and a performance/accessibility audit.

## Deploy

This is a static website. Upload the whole project while preserving folder paths to any static host (for example, Cloudflare Pages, GitHub Pages, Netlify or your web host). Ensure `index.html` is at the published root. After deployment, open the live site and test all links. Update canonical/sitemap/robots URLs to the final production domain.

## Updated contact details

The project is currently configured with the owner-provided number `+91 93682 53357` for phone and WhatsApp. Confirm the number is correct and has WhatsApp activated before launch. The Contact section now uses a Google Maps embed for the supplied address and keeps the enquiry form beside it on desktop; on smaller screens, the layout stacks vertically. The supplied address is included in the map and footer, but confirm that it is the actual StayNest property address before publishing.
