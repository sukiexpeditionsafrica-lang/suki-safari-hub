# Suki Safari Hub MVP spec, step by step

## Step 1, done in this file set
Project foundation, name, brand rule, stack, build order, and what is explicitly out of scope.

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

## Step 4, GitHub
Repository: to be created under suk...-lang once installation selection is confirmed and access is verified. Do not push until access is verified with a read tool.

## Step 5, review gate
User reviews the web MVP before any Flutter build, app store work, payments work, or supplier onboarding.
