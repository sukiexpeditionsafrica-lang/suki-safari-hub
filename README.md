# Suki Safari Hub, by Suki Expeditions Africa

Legal entity: Suki Expeditions Africa.
Product name: Suki Safari Hub.
Status: Web v1.3 live at https://app.sukiexpeditionsafrica.com from 2026-11-08, on Hostinger Premium Web Hosting, auto deployed from GitHub main. Web v1.4 live at https://app.sukiexpeditionsafrica.com from 2026-11-08 (visual destination pages + homepage hero; photos reached the repo via the GitHub web UI, commit 9043bdd, then the HTML shipped by snapshot push, commit 0f3f7fa9). Flutter app shell built 2026-10-31, MVP in progress, not yet published to app stores. Main goal in all of this: make money for Suki, as a separate income stream from Suki's standard tours.

## Web v1.6, live 2026-11-08
One shared calculator (calculator.js) now powers both the home page and the Plan Your Safari page: same steps, labels, defaults, maths and quote text, built into a mount point on each page, so the two routes can no longer drift apart. The $70 park fee is now labelled as an editable example, not a universal fee, with a note under the field and the chosen destination's own fee note shown. Calculator maths unchanged. Test: Bwindi, 2 travellers, 5 days at defaults gives Permits $1,600, total estimate $5,350.

## Web v1.5, live 2026-11-08
Destination filters on the Destinations page (country and experience, with a live count), a suggested day-by-day itinerary on every destination page, and a Plan This Safari button on every destination page that opens the calculator with that destination already chosen. Calculator maths unchanged. Test: Bwindi, 2 travellers, 5 days at defaults gives Permits $1,600, total estimate $5,350.

## Web v1.4, live 2026-11-08
Visual destination pages with photographs and a homepage hero, approved by Sula in chat 2026-11-08 ("use stock photos and/or publicly available photos of these places from the internet for now"). places.html now has 43 visual cards grouped by country, each with a photo and an Explore destination link. One individual page per destination (destination-&lt;slug&gt;.html, 43 files) with a large photo and credit line, description from famous_for, fees from fee_note, the three SAMPLE stay tiers for its country, a generic suggested stay length, and Plan My Safari / request-a-quote links. Homepage hero uses Sula's own elephant herd photo (images/hero-elephant-herd.jpg) with the headline "Discover Africa. Experience the Extraordinary." in the existing forest-green and gold branding. Sula's own photos are used for Bwindi, Kibale, Queen Elizabeth, Murchison Falls and Lake Bunyonyi, plus the elephant sunset banner on the Destinations page. The other 38 destination photos are CC-licensed stock from Openverse (Flickr/Wikimedia sources, see images/credits.json), each captioned with its source and "illustrative photo", and the Destinations page states photographs are illustrative for now and will be replaced with Suki's own trip photos over time. No stock photo is presented as a Suki trip. Calculator untouched (v1.3 guided calculator, same maths, Permits $1,600 / Total $5,350 for Bwindi 2 travellers 5 days, verified again in this build). Verified locally: 43 pages, 43 cards, all 44 images on places.html load, zero horizontal overflow at 360px and 768px, hero headline in frame at 360px, no banned wording. Note: the GitHub snapshot push validates UTF-8 content only and rejects binary JPEGs, so the 45 images (7.0 MB) reached the repo via the GitHub web UI first; the v1.4 HTML then shipped by snapshot push.

## Web v1.3, live 2026-11-08
Guided multi-step calculator, approved by Sula in chat 2026-11-08 ("Start with the guided calculator"). Same calculator on the home page and the standalone calculator, in 6 steps: 1 Where (same 43 destinations), 2 Experience (Gorilla trekking, Wildlife safari, Chimpanzee tracking, Mountain climbing, Beach holiday, or Not sure yet; checked against the chosen destination, with matching destinations offered when it does not match), 3 When (travel month and optional date, or Not sure yet; the date does not change any price in this version), 4 How many people, 5 Accommodation level (Budget, Mid-range, Luxury; sets the stay price to the midpoint of that level for the destination's country, editable afterwards), 6 Budget (days, park fee, guide and vehicle, transport, then Calculate). Maths unchanged and verified: permits are per trekker, not per day (Bwindi $800, Volcanoes $1,500), park fees per person per day; the breakdown states this in words. Test passed locally before push: Bwindi, 2 travellers, Permits $1,600 at 1, 3 and 5 days, totals $2,590, $3,970 and $5,350; Volcanoes, 2 travellers, 5 days, Permits $3,000, total $6,750. The quote message now also carries experience, travel date and comfort level. A destination-name parsing fix in this version also makes the "Stays near this destination" area show the correct area name for gorilla destinations instead of a fallback.

## Web v1.2, live 2026-11-07
Customer cleanup and Plan My Safari quote button. New navigation on every page: Home, Destinations, Our Guides, Plan Your Safari, Contact Us. No test-version wording on customer pages. Guides page leads with "Your safety. Our priority." and guides are added one at a time as checks are completed; no guide is listed yet. The calculator on the home page and the standalone calculator both have a "Request this estimate as a quote" section that sends the visitor's own estimate to Suki by WhatsApp (+256 773036247) or email (info@sukiexpeditionsafrica.com); it is an enquiry, not a booking, and no payment is taken there. Calculator logic unchanged. Test: Bwindi, 2 travellers, 5 days at defaults gives Permits $1,600, total estimate $5,350.

## Web v1, live 2026-11-06
Root index.html is the landing page and calculator, with Places (places.html, all 43 places by country) and Guides (guides.html, verification system, 0 guides verified yet). The calculator is the tested v3 logic: Bwindi and Mgahinga gorilla permit $800 per person for foreign non residents, Rwanda Volcanoes $1,500, tiered sample stays labelled SAMPLE, NOT VERIFIED, paperwork checklist, estimates not quotes, recheck official portals. Test: Bwindi, 2 travellers, 5 days at defaults gives Permits $1,600, total estimate $5,350. No bookings, no payments and no escrow are live in v1. No keys or secrets are in the code.

## What it is
A hub for planning and booking East Africa safaris with clear prices, verified guides, drivers, lodges and transfers, and paperwork help across Uganda, Rwanda, Kenya and Tanzania. It does not own vehicles or lodges and does not operate tours itself. Suki Expeditions Africa tours may appear as one verified supplier, on the same terms as other verified suppliers, with ownership disclosed in the app.

## Build order
1. Cost and paperwork engine (web first, then in app)
2. Verified guide and driver profiles
3. Bookings for guides, transfers and small lodges, via a licensed payments partner
4. Milestone escrow, refund ladder and arbitration, only after legal advice in Kenya and Uganda
5. Shared seats, idle inventory and community experiences, once booking volume exists

## Technical stack (chosen for small budget)
- App: Flutter with Dart, one codebase for Android and iOS
- Backend and database: Supabase (Postgres, auth, storage)
- Web cost engine: same Supabase backend, Flutter Web or Next.js
- Payments: licensed partner only (for example Pesapal, Flutterwave or iPay). The app never holds traveller money itself and never stores card details.
- Website: sukiexpeditionsafrica.com stays on Hostinger. The app is linked from it, ideally at app.sukiexpeditionsafrica.com. No website migration in this project.

## What this MVP does NOT do yet
- No payments or escrow
- No permit or visa issuing
- No live park fee feed. All fees in the MVP are labelled with source and date, and must be rechecked on official portals (KWS, TANAPA, NCAA, UWA, RDB, immigration) before booking.
- No real guide bookings. Sample profiles are clearly marked as samples until verified suppliers are onboarded.

## Folders
- docs/: product spec and data model
- web/: working cost calculator MVP (step 2). The old single-page calculators in web/ were retired 2026-11-08: web/index.html, web/calculator-v2.html and web/calculator-v3.html now redirect to the guided calculator at /calculator.html. web/attractions.json and web/accommodations.json remain the catalogue data.
- flutter_app/: Flutter app shell, built 2026-10-31 with Flutter 3.47.9. Three tabs: Calculator, Places, Guides. Same 43 place catalogue and same $800 Bwindi permit as calculator v3. Run with flutter analyze and flutter test, both pass. No payments, no escrow, no app store release yet.
- lib/: reserved at project root, real Flutter code lives in flutter_app/lib/
