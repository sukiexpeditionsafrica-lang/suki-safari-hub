# Suki Safari Hub guide verification system

Prepared 2026-11-05, at Sula's request, so the check is clear in the back end before any real guide is added.
Status: SYSTEM DEFINED AND LIVE IN SUPABASE BACK END, RUN 2026-11-05. The SQL in supabase-guides-verification-v2.sql was run in the Supabase SQL Editor on 2026-11-05 with result "Success. No rows returned": all 24 new verification columns are in the guides table, guides count still 0. No real guide has been checked or added, and no guide is shown as verified in the app yet.
Update 2026-11-23: this system is now Tier 2 of the operator verification system in docs/operator-verification-system.md. The country checks below are unchanged. A guide is now listed only as a named guide of a verified operator, and the guides table gains an operator_id link. Sula approved the pivot to companies first on 2026-11-23.

## The rule in one line

A guide only shows a verified badge when the licence check for their country has been done, recorded, and is still in date. Association membership alone never earns the badge. A certificate alone, without its in date companion document, never earns the badge.

## Badge levels

- self_declared: the guide says they are licensed. No check has been done. No badge.
- peer_reviewed: another guide or operator has vouched for them, or a review exists. Still no licence check. No badge.
- registry_verified: the country check below has been done and recorded, and nothing in it has expired. This is the only level that shows the verified badge.

A guide can move up a level, and can move back down. If a document expires, or a suspension is found, the badge comes off until a fresh check is recorded.

## What to record for every guide

For every guide, in every country, record all of these, even when a field does not apply:
- full_name, as on the licence document
- country of guiding, one country per check. A guide who works in two countries needs a separate check for each country.
- verification_status, one of the three levels above
- verification_checked_at, the date the check was done
- verification_checked_by, who did the check
- verification_method, portal lookup, or document sighted, or operator licence check
- verification_evidence, what was seen, for example portal result, certificate copy, identity card copy. Keep the evidence file name, never a national ID number in a public field.
- verification_notes, anything that did not match, for example name spelling, expiry, or suspension.
- Languages, specialisms, regions, vehicle type, day rate range, as in the guide profile model. These are profile facts, not licence proof.

National ID numbers, licence numbers and certificate numbers are check inputs, not public display fields. The app shows the badge, the country, the registry name and the check date. It does not show an ID number or a licence number to travellers.

## Kenya

Licence: Tourism Regulatory Authority, TRA, tour guide licence.
How to check: public portal at https://verify.tra.go.ke/
Individual guide: search by ID number.
Company: search by file number.
Record: TRA licence number, portal result, licence currency, check date.
Separate label, not the licence: KPSGA level, Bronze, Silver or Gold.
Park registration, for example KWS, is a separate label, not the licence.

## Uganda

Licence: no public searchable individual guide portal was found.
How to check: operator first. Check the Uganda Tourism Board, UTB, operator licence for the operator the guide works under.
Record: operator name, UTB licence number, nature of business, issue date, expiry date, suspension position, check date.
Separate label, not the licence: USAGA membership, and any DIT level.
A guide is not registry_verified in Uganda on association membership alone.

## Tanzania, mainland

Licence: Ministry of Natural Resources and Tourism, MNRT, register of tour guides, under the Tourism Act 2008 and the Tour Guides Regulations 2015.
How to check: document based, no public portal was found. Sight the Certificate of Registration and the current year identity card.
Record: Certificate of Registration, its three year renewal point, current year identity card, its 31 December expiry, enlisting operator or association, suspension or cancellation position, check date.
Two clocks, do not mix them: the certificate renews every third November, the identity card expires every 31 December. A certificate without a current year identity card is not a guide who may practise today.
Citizenship rule: only Tanzanian citizens can be licensed as tour guides in Tanzania. A non Tanzanian cannot be listed as a licensed Tanzania guide. A foreign tour leader may only coordinate logistics, not guide in Tanzania.
Separate labels, not the licence: TATO membership, TANAPA park registration, Mweka training.
Operator check, separate: TALA licence number and year, checked against the TATO online member directory. A TATO listing alone is not a licence check, and a missing TATO listing alone is not a verdict.
Zanzibar: not covered by this mainland check. Whether Zanzibar uses the same MNRT registration or a separate regime is still open.

## Rwanda

Licence: Rwanda Development Board, RDB, tourism operating licence, TOL, for the individual guide.
How to check: document based, no public portal was found. Sight the TOL certificate, the association membership letter, the police clearance and the medical certificate.
Record: TOL certificate, association letter, police clearance date, medical certificate date, suspension or revocation position, check date.
Two short clocks: police clearance is valid within one year, medical certificate within three months. Record both dates, not just the licence.
No expiry date on the licence itself: under current law the TOL is valid for an unspecified period, subject to suspension or revocation. Do not invent a one year Rwanda licence expiry. A proposed law change to one year licences is a proposal only, not law in force.
Separate labels, not the licence: RSGA membership and grade, RTTA membership.

## What never counts as verified

- Association membership alone, in any country: KPSGA, USAGA, TATO, RSGA, RTTA.
- Park registration alone: KWS, UWA, TANAPA.
- Training alone: Mweka, DIT, or any course certificate.
- A certificate without its companion document in date: Tanzania certificate without a current year identity card, Rwanda TOL without an in date police clearance and medical certificate.
- A company licence used as if it were an individual guide licence, except in Uganda, where the operator check is the defined route.
- A check done once and never rechecked after its documents expire.

## Recheck rules

- Kenya: recheck on the TRA portal when a licence is due to expire, and before a guide is listed again after a long gap.
- Uganda: recheck the UTB operator licence at its expiry, one year, and check suspension position at listing time.
- Tanzania: recheck the identity card every year before 31 December, and the certificate at its three year renewal point.
- Rwanda: recheck the police clearance every year and the medical certificate every three months, and check suspension position at listing time.
- Any guide: if a suspension, cancellation or revocation is found, set verification_status back to self_declared, remove the badge, and record the reason and date. Do not delete the guide record.

## How a guide gets added, in order

1. Sula approves the guide, one at a time.
2. The guide gives consent to be checked and listed.
3. The country check above is done, and the fields are filled in.
4. Only if the check passes and is in date, verification_status is set to registry_verified.
5. The guide is added to the Supabase guides table, with those fields.
6. The app shows the badge, the country, the registry name and the check date. It does not show ID or licence numbers.

## Suki's own guides

Suki Expeditions Africa guides, if listed later, use exactly the same fields, the same fees display, and the same verification rules as every other guide. Suki as a company must also be checked in the same way as any other operator in Tanzania and Rwanda, if Suki guides are to be listed for those countries. No claim is made here that Suki holds a TALA licence or an RDB tourism operating licence.
