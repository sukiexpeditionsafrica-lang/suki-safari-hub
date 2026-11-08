# Suki Safari Hub MVP spec, step by step

## Step 1, done in this file set
Project foundation, name, brand rule, stack, build order, and what is explicitly out of scope.

Scalability requirement, recorded 2026-11-06 at Sula's request: build for the long term and to accommodate millions of users. That means: one Flutter codebase for Android and iOS, Supabase Postgres as the backend with Row Level Security, public read only for places and guides, no hard coded data in the app that would need a rebuild to grow, and no money held by Suki. The current Supabase Free plan and the Hostinger shared hosting for the web preview are starting points only, not millions ready as they stand. They are fine to start at zero cost, and the paid scaling steps, Supabase Pro and a CDN or dedicated web host for the front end, are taken only when real traffic and real income justify them, never before. Do not rebuild the app to chase scale before users arrive.

## Web v1.6, live 2026-11-08
One shared calculator (calculator.js) now powers both the home page and the Plan Your Safari page: same steps, labels, defaults, maths and quote text, built into a mount point on each page, so the two routes can no longer drift apart. The $70 park fee is now labelled as an editable example, not a universal fee, with a note under the field and the chosen destination's own fee note shown. Calculator maths unchanged. Test: Bwindi, 2 travellers, 5 days at defaults gives Permits $1,600, total estimate $5,350.

## Web v1.5, live 2026-11-08
Destination filters on the Destinations page (country and experience, with a live count), a suggested day-by-day itinerary on every destination page, and a Plan This Safari button on every destination page that opens the calculator with that destination already chosen. Calculator maths unchanged. Test: Bwindi, 2 travellers, 5 days at defaults gives Permits $1,600, total estimate $5,350.

## Web v1.4, live 2026-11-08
Visual destination pages with photographs and a homepage hero. 43 visual cards on the Destinations page and one page per destination, each with a photo and credit line, facts only from attractions.json and accommodations.json, SAMPLE stay tiers, a generic suggested stay, and Plan My Safari links. Homepage hero uses Sula's elephant herd photo with the headline "Discover Africa. Experience the Extraordinary." Sula's own photos for Bwindi, Kibale, Queen Elizabeth, Murchison Falls, Lake Bunyonyi and the elephant sunset banner; the other 38 photos are CC-licensed stock from Openverse, captioned as illustrative, to be replaced with Sula's own trip photos over time. Calculator untouched. Note: the GitHub snapshot push accepts UTF-8 text only and rejects the 45 JPEGs (7.0 MB), so the images reached the repo via the GitHub web UI first.

## Web v1.3, live 2026-11-08
Guided multi-step calculator, approved by Sula in chat 2026-11-08. Same calculator on the home page and the standalone calculator, in 6 steps: 1 Where (same 43 destinations), 2 Experience (Gorilla trekking, Wildlife safari, Chimpanzee tracking, Mountain climbing, Beach holiday, or Not sure yet; checked against the chosen destination, with matching destinations offered when it does not match), 3 When (travel month and optional date, or Not sure yet; the date does not change any price in this version), 4 How many people, 5 Accommodation level (Budget, Mid-range, Luxury; sets the stay price to the midpoint of that level for the destination's country, editable afterwards), 6 Budget (days, park fee, guide and vehicle, transport, then Calculate). Maths unchanged and verified: permits are per trekker, not per day (Bwindi $800, Volcanoes $1,500), park fees per person per day; the breakdown states this in words. Test passed locally before push: Bwindi, 2 travellers, Permits $1,600 at 1, 3 and 5 days, totals $2,590, $3,970 and $5,350; Volcanoes, 2 travellers, 5 days, Permits $3,000, total $6,750. The quote message now also carries experience, travel date and comfort level. A destination-name parsing fix in this version also makes the "Stays near this destination" area show the correct area name for gorilla destinations instead of a fallback.

## Web v1.2, live 2026-11-07
Customer cleanup and Plan My Safari quote button, approved by Sula in chat 2026-11-07. New navigation on every page: Home, Destinations, Our Guides, Plan Your Safari, Contact Us. No test-version wording on customer pages. Guides page leads with "Your safety. Our priority." and guides are added one at a time as checks are completed; no guide is listed yet. The calculator on the home page and the standalone calculator both have a "Request this estimate as a quote" section that sends the visitor's own estimate to Suki by WhatsApp (+256 773036247) or email (info@sukiexpeditionsafrica.com); it is an enquiry, not a booking, and no payment is taken there. Calculator logic unchanged. Test passed locally before push: Bwindi, 2 travellers, 5 days at defaults, Permits $1,600, total $5,350.

## Web v1, live 2026-11-06
Live at https://app.sukiexpeditionsafrica.com, subdomain created 2026-11-06 in Hostinger, empty PHP/HTML site on Premium Web Hosting, auto deployed from GitHub repo sukiexpeditionsafrica-lang/suki-safari-hub main. The first deploy showed 403 Forbidden because the repo root had no index.html; v1 fixes that with a root index.html, places.html, guides.html, calculator.html and root attractions.json and accommodations.json. What v1 does: landing page, working calculator with the v3 logic and the 43 place catalogue, Places list by country, Guides page explaining the verification system with 0 guides verified yet, and Contact. What v1 does not do: no bookings, no payments, no escrow, no live park fee feed, no real guide listings. Test passed locally before push: Bwindi, 2 travellers, 5 days at defaults, Permits $1,600, total $5,350.

## Step 2, cost and paperwork engine
Inputs: destination chosen from the full catalogue in web/attractions.json (43 famous parks, zoos and attractions across Uganda, Kenya, Tanzania and Rwanda), travel dates, party size, trip length.
Outputs: itemised estimate (park and concession fees, visa, transport allowance, accommodation allowance, guide allowance, tips), plus a paperwork checklist with official portal links and dates.
Automatic stays: when a destination is chosen, the calculator automatically shows Budget, Mid-range and Luxury stays near that destination, with a stay area, from web/accommodations.json (43 destinations, 129 tier rows). Clicking a tier sets the accommodation field to that tier midpoint and recalculates. All stay rates are SAMPLE, NOT VERIFIED planning ranges, not lodge quotes and not live availability, and are labelled as such in the calculator and in the data file. No specific lodge is named or priced as verified until it is onboarded and confirmed.
Rules:
- Every fee shows source and date. Conflicting figures are flagged, never hidden.
- Estimates are estimates, not quotes. A verified supplier quote replaces the estimate at booking.
- No guaranteed sightings, no prices presented as official if they are not.

## Step 3, verified guide profiles
Fields: name, licence number, issuing registry, languages, specialisms, regions, vehicle type, day rate range, calendar, reviews attached to the guide (not only the company), verification badge status.
Badge levels: self declared, peer reviewed, registry verified. Only registry verified shows the verified badge.
Verification system, defined 2026-11-05 in docs/guide-verification-system.md, with per country fields in docs/guide-profiles.md and prepared SQL in docs/supabase-guides-verification-v2.sql, not yet run in Supabase: Kenya TRA portal check, Uganda UTB operator check, Tanzania MNRT certificate plus current year identity card, Rwanda RDB TOL plus police clearance and medical certificate dates. Association membership alone never earns the badge, and ID or licence numbers are check inputs, not public display fields.

## Step 4, GitHub
Repository: to be created under suk...-lang once installation selection is confirmed and access is verified. Do not push until access is verified with a read tool.

## Step 5, review gate
User reviews the web MVP before any Flutter build, app store work, payments work, or supplier onboarding.

Note, 2026-10-31: Sula asked to start the Flutter shell after the two learning questions, and reminded Amber that the main goal in all of this is to make money. The shell therefore carries the money path in plain words on its Guides tab, planned only: free calculator brings travellers in, later verified bookings can earn a small traveller fee, a supplier verification subscription, and a commission lower than the 15 to 30 percent agents and OTAs usually take. No payments, escrow, or supplier onboarding is live in the shell.
