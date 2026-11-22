# Suki Safari Hub operator verification system

Prepared 2026-11-23, at Sula's decision to pivot to companies first, after a colleague's advice and Sula's own view that established companies are easier to hold accountable than independent guides in the East African setup.
Status: SYSTEM DEFINED IN DOCUMENTS ONLY. Not run in Supabase. No operator has been checked or added, and no operator is shown as verified in the app yet. The SQL in supabase-operators-v1.sql is prepared and NOT run. The Supabase project is PAUSED since 2026-11-18, so the SQL cannot run until the project is unpaused from the dashboard, which is free within 90 days of the pause date.

## The pivot, in one line

The Hub lists verified tour and travel operators first. Guides are the second tier: named, verified, assigned by the operator, and the operator is responsible for the guide they assign. A guide is never listed on their own.

Why: travellers buy a safari from an operator, not from a guide. The operator holds the licence, the vehicle, the lodge relationships and the permit access. A company has a registered address, a licence that can be suspended, insurance and a bank account. An individual can change a phone number and vanish. Operators are also the supply: an app that looks like it cuts them out will be fought or ignored, while an app that brings them verified demand and solves trust and payment gets adopted.

## The rule in one line

An operator only shows a verified badge when the licence check for their country has been done, recorded, and is still in date. Association membership alone never earns the badge. A licence for a different country never earns the badge for this country.

## Badge levels

Same three levels as the guide system:

- self_declared: the operator says it is licensed. No check has been done. No badge.
- peer_reviewed: another operator or a review has vouched for it. Still no licence check. No badge.
- registry_verified: the country check below has been done and recorded, and nothing in it has expired. This is the only level that shows the verified badge.

An operator can move up a level, and can move back down. If a document expires, or a suspension is found, the badge comes off until a fresh check is recorded. While an operator is unverified, its named guides are hidden too, though their own guide records and verification status stay intact.

## What to record for every operator

For every operator, in every country, record all of these, even when a field does not apply:
- company legal name, and trading name if different
- country_of_operation, one country per check. An operator working in two countries needs a separate check for each country.
- registration number, physical address, contact email, contact phone, website
- verification_status, one of the three levels above
- verification_checked_at, the date the check was done
- verification_checked_by, who did the check
- verification_method, portal lookup, or document sighted
- verification_evidence, what was seen, for example portal result, licence copy, certificate copy. Keep the evidence file name, never a registration number in a public field.
- verification_notes, anything that did not match, for example name spelling, expiry, or suspension.
- years operating, fleet (vehicles owned or leased), team size, languages, specialisms, regions. These are profile facts, not licence proof.
- reviews, attached to the operator, with trip date and reviewer.

Registration numbers and licence numbers are check inputs, not public display fields. The app shows the badge, the country, the registry name and the check date. It does not show a registration or licence number to travellers.

## Uganda

Licence: Uganda Tourism Board, UTB, Tourism Operating Licence, currently valid.
Also record: URSB Certificate of Incorporation or Registration, URA e-Acknowledgement Receipt dated to the current year, Form of Annual Return dated to the current year with all shareholders named. These are the four documents SafariBookings requires for Uganda, verified from its help centre 2026-11-14.
Record: operator name, UTB licence number, nature of business, issue date, expiry date (one year), suspension position, check date.
Separate labels, not the licence: AUTO membership, USAGA membership.
Note: the UTB public register is paginated. Not finding a company in the portion searched is not proof it is unlicensed.

## Kenya

Licence: Tourism Regulatory Authority, TRA, licence for the company.
How to check: public portal at https://verify.tra.go.ke/, company search by file number.
Record: TRA file number, portal result, licence currency, check date.
Separate labels, not the licence: KATO membership. KPSGA levels belong to individual guides, not to the company.

## Tanzania, mainland

Licence: TALA licence, number and year. It expires each 31 December.
How to check: document based, checked against the TATO online member directory. A TATO listing alone is not a licence check, and a missing TATO listing alone is not a verdict.
Record: TALA licence number, year, check date.
Separate labels, not the licence: TATO membership.
Zanzibar: not covered by this mainland check. Whether Zanzibar uses the same regime or a separate one is still open.

## Rwanda

Licence: Rwanda Development Board, RDB, tourism operating licence, TOL, for the company.
How to check: document based, no public portal was found. Sight the TOL certificate. Applications go through tourismregulation.rw.
Record: TOL certificate, check date, suspension or revocation position.
Separate labels, not the licence: RTTA membership.

## What never counts as verified

- Association membership alone, in any country: KATO, AUTO, TATO, RTTA.
- Park registration alone.
- A licence for another country.
- An expired licence, or a licence under suspension.
- A company registration certificate alone, without the operating licence for that country.
- A check done once and never rechecked after its documents expire.

## Recheck rules

- Uganda: recheck the UTB licence at its expiry, one year, and check suspension position at listing time. Recheck the URA receipt and the annual return each year.
- Kenya: recheck on the TRA portal when a licence is due to expire, and before an operator is listed again after a long gap.
- Tanzania: recheck the TALA licence every year before 31 December.
- Rwanda: check suspension or revocation position at listing time.
- Any operator: if a suspension, cancellation or revocation is found, set verification_status back to self_declared, remove the badge, hide its named guides, and record the reason and date. Do not delete the operator record.

## Tier 2: named guides

The guide verification system defined 2026-11-05 in docs/guide-verification-system.md is unchanged and is now Tier 2. Same per country checks, same three badge levels, same rule that association membership alone never earns the badge. Two changes:

1. A guide is listed only as a named guide of a verified operator. The operator names the guides it assigns, and is responsible for them.
2. The guides table gains an operator_id link to the operators table. A guide record without a verified operator is not shown.

The Uganda guide check already runs through the operator's UTB licence, so nothing changes there in substance.

## How an operator gets added, in order

1. Sula approves the operator, one at a time.
2. The operator gives consent to be checked and listed, and supplies its documents.
3. The country check above is done, and the fields are filled in.
4. Only if the check passes and is in date, verification_status is set to registry_verified.
5. The operator is added to the Supabase operators table, with those fields.
6. The operator names its guides. Each named guide gets the Tier 2 country check. Only registry_verified guides are shown, under the operator.
7. The app shows the operator badge, the country, the registry name and the check date, plus its named verified guides. It does not show registration or licence numbers.
The live operators page shows these seven steps, plus an eighth item stating that no payments, escrow or onboarding is live yet and no money is held by Suki.

## Suki as the first listing, and the neutrality rule

Suki Expeditions Africa is itself a tour operator. If Suki is listed on the Hub, it is listed on exactly the same terms as every other operator: same verification, same fees display, same ranking, with ownership of the Hub by Suki disclosed in the app. Suki's own listing is the first one planned, because it proves the rule and gives the marketplace its first inventory. But Suki cannot be shown as verified until Suki's own documents are checked: UTB licence (currently valid), URSB certificate, current year URA receipt, current year annual return. Whether Suki holds a currently valid UTB licence is unknown, asked 13, 14 and 21 November 2026, still unanswered. Until that is answered and checked, Suki is not a verified listing either.

## Money path

Unchanged from the gaps research, and still hypotheses to test, not promises. The free calculator brings travellers in. Later, verified bookings can earn a small traveller fee (3 to 6 percent), an operator verification subscription, and a commission lower than the 15 to 30 percent agents and OTAs usually take. Milestone escrow sits between traveller and operator, one escrow per milestone, which also fits the KES 650,000 per escrow limit: a large trip is split across milestones rather than squeezed into one escrow. No payments, escrow, or operator onboarding is live yet. No money is held by Suki.

## What this replaces

The guide only marketplace as the main listing, defined 2026-11-05. The guide verification work is kept as Tier 2. The briefing "Verified Guide Days in Kenya" (2026-10-30) is moot. The country guide check briefings (Kenya, Uganda, Tanzania and Rwanda) stay useful as the Tier 2 checks.
