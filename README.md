# Suki Safari Hub, by Suki Expeditions Africa

Legal entity: Suki Expeditions Africa.
Product name: Suki Safari Hub.
Status: Flutter app shell built 2026-10-31, MVP in progress, not yet published to app stores. Main goal in all of this: make money for Suki, as a separate income stream from Suki's standard tours.

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
- flutter_app/: Flutter app shell, built 2026-10-31 with Flutter 3.47.9. Three tabs: Calculator, Places, Guides. Same 43 place catalogue and same $800 Bwindi permit as calculator v3. Run with flutter analyze and flutter test, both pass. No payments, no escrow, no app store release yet.
- lib/: reserved at project root, real Flutter code lives in flutter_app/lib/
