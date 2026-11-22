# Verified guide profiles, data model (step 3, draft)

Status: SAMPLE STRUCTURE ONLY. No real guides are listed yet, and no profile in this file is verified.
Update 2026-11-23: guides are now Tier 2, named guides of a verified operator (see docs/operator-verification-system.md). Add operator_id to the fields below. The per country fields are unchanged.
The full verification system is in guide-verification-system.md in this same folder. This file is the data model that system uses.

Fields per guide:
- full_name
- operator_id, link to the verified operator this guide is named under. A guide without a verified operator is not shown.
- country_of_guiding, one country per check. A guide working in two countries needs a separate check for each.
- verification_status: self_declared | peer_reviewed | registry_verified
- verification_checked_at, verification_checked_by, verification_method, verification_evidence, verification_notes
- Kenya: tra_licence_number, tra_portal_result, tra_check_date
- Uganda: utb_operator_name, utb_licence_number, utb_licence_expiry, utb_suspension_position
- Tanzania: mnrt_certificate_of_registration, mnrt_certificate_renewal_point, mnrt_identity_card_expiry, enlisting_operator_or_association, suspension_position
- Rwanda: rdb_tol_certificate, rdb_police_clearance_date, rdb_medical_certificate_date, association_letter, suspension_position
- association_membership, separate from licence, for example KPSGA level, USAGA, TATO, RSGA, RTTA
- park_registration, separate from licence, for example KWS, UWA, TANAPA
- languages (verified, not self claimed, once registry check exists)
- specialisms (for example gorilla, birding, photography, family)
- regions (for example Bwindi, Queen Elizabeth, Maasai Mara, Serengeti)
- vehicle_type
- day_rate_range_usd
- calendar_available (true/false, with dates in the app database, not in this file)
- reviews: attached to the guide, with trip date and reviewer, not only to a company

Old fields kept for reference only, do not use them as the licence check:
- licence_number, replaced by the per country fields above
- licence_registry, replaced by the per country registry plus the separate association and park registration fields. KPSGA, KWS, TANAPA, UWA and RDB must not be listed as licence registries.

Rules:
- A profile only shows a verified badge at registry_verified, with the country check in date.
- Association membership alone, park registration alone, or training alone never earns the badge.
- National ID numbers and licence numbers are check inputs, not public display fields. The app shows the badge, the country, the registry name and the check date.
- Suki Expeditions Africa guides, if listed later, use the same fields, same fees display, and same verification rules as every other guide.
- No guide is contacted, booked or charged from this draft file.
