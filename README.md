# Suki Safari Hub, by Suki Expeditions Africa

Legal entity: Suki Expeditions Africa.
Product name: Suki Safari Hub.
Status: Step 1 foundation. MVP in progress, not yet published to app stores.

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
- web/: working cost calculator MVP (step 2)
- lib/: Flutter app structure to be added after the web MVP is reviewed
