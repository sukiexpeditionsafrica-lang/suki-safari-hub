# Suki Safari Hub MVP spec, step by step

## Step 1, done in this file set
Project foundation, name, brand rule, stack, build order, and what is explicitly out of scope.

## Step 2, cost and paperwork engine
Inputs: destination chosen from the full catalogue in web/attractions.json (43 famous parks, zoos and attractions across Uganda, Kenya, Tanzania and Rwanda), travel dates, party size, trip length.
Outputs: itemised estimate (park and concession fees, visa, transport allowance, accommodation allowance, guide allowance, tips), plus a paperwork checklist with official portal links and dates.
Rules:
- Every fee shows source and date. Conflicting figures are flagged, never hidden.
- Estimates are estimates, not quotes. A verified supplier quote replaces the estimate at booking.
- No guaranteed sightings, no prices presented as official if they are not.

## Step 3, verified guide profiles
Fields: name, licence number, issuing registry, languages, specialisms, regions, vehicle type, day rate range, calendar, reviews attached to the guide (not only the company), verification badge status.
Badge levels: self declared, peer reviewed, registry verified. Only registry verified shows the verified badge.

## Step 4, GitHub
Repository: to be created under suk...-lang once installation selection is confirmed and access is verified. Do not push until access is verified with a read tool.

## Step 5, review gate
User reviews the web MVP before any Flutter build, app store work, payments work, or supplier onboarding.
