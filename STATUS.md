# Status

Through PR #366, merged 2 October 2026. #323 was closed and did not merge.

The GHDP-1 file in Downloads (`MEC_GHDP1_1.pdf`, 157974 bytes, created 2 October 2026) is source 149. It is the same schedule cover as source 115, a newer one-page copy. It is a benefit schedule at rank 2, matching sources 115 through 119. It is not the older 249604-byte file. It settles none of the blocked documents below.

## Done

### Ledger and the profile build

- #321 Track the ledger directory.
- #322 Commit the four ledger files the profile build reads.
- #325 Refuse to overwrite plan profiles unless `--write` is set.

### Plan Vault

- #334 Mark vault fallback text with a NOT CONFIRMED badge.
- #335 Show multi-source verified leaves on the plan card.
- #337 Show a verified plan type on the plan card.
- #342 Show member services on every plan card.
- #350 Show verified indemnity rows on the plan card.
- #355 Add cards for seven families that had no open card.
- #356 Move those seven cards into a More plans section.
- #357 Move SmartChoice into a Limited medical section.
- #358 Add a Key terms block that shows only verified printed values.
- #366 Show telemedicine on the plan card after urgent care.

### Harbor

- #323 Closed, not merged. It cited the August 20 brochure. #324 replaced that.
- #324 Record the August 27 claims administrator.
- #326 Store pre-existing limits as printed in the 08/27 brochure.
- #327 Tell agents not to state a Harbor pre-existing period.
- #328 Record brochure grid cells from the 08/27 page images.
- #329 Replace admin and exclusion facts with the 08/27 brochure text.
- #330 Remove the hand-added pre-existing period warning.
- #340 Use the brochure line for member services.
- #347 Record the cut-off prescription bullet as a source defect.
- #348 Put the page 10 exclusion list on the three profiles.

### SmartChoice

- #320 Show the plan-document out-of-pocket limit.
- #336 Record the plan type from the cover title.
- #346 Add the printed Embedded footnote to the out-of-pocket limits.

### Access Health and AmeriCare

- #331 Record the network as the brochure PHCS wording.
- #332 Record the facility charge limit from brochure page 9.
- #333 Record both AmeriCare ICU rows from the brochure summary.
- #351 Classify the AmeriCare summaries as filed benefit schedules.

### GoodHealth, Goodlife, and the registry

- #339 Record the Harbor cover title and flag the Goodlife plan type.
- #341 Flag Goodlife leaves that cite a Smart Choice document.
- #343 Use the GoodHealth certificate definition and schedule network.
- #344 Drop the unsold MedValue plans from the registry.
- #354 Record the GoodHealth 1 plan type from the certificate.
- #361 Rank the newer GHDP-1 schedule with the older copy, as a benefit schedule at rank 2.
- #362 Show the printed GoodHealth plan administrator, and clear underwriter and association.
- #363 Record GoodHealth 1 primary care, specialist, and telemedicine from the schedule cover.
- #364 Clear GoodHealth member services. The certificate line is a service address, not a member phone and hours.
- #365 Record GoodHealth 2-5 primary care, the combined specialist or urgent care row, and telemedicine from the schedules.

### Other printed facts

- #338 Record short product-type labels from the brochure covers.
- #345 Drop resolved conflicts from the plan profiles.
- #349 Replace indemnity dash notes with the printed schedule rows.
- #352 Add the Pinnacle Critical Care brochure to the source inventory.
- #353 Replace paraphrased exclusion lists with the printed text.

### Intake

- #360 File the 2 October 2026 GHDP-1 download in the source inventory as source 149.

## Rules in force

- A new or changed fact is the verbatim text from a page image.
- Supersede a fact. Never delete it.
- `npm run build:profiles` is a dry run unless `--write` is passed.
- When a plan card shows its own type, network, carrier, or association because no verified leaf exists, that text carries a NOT CONFIRMED badge.
- A brochure at rank 7 cannot verify benefits or limitations. Those leaves are capped to needs manual verification.

### Batch-mode gates

All of these pass, or the change does not merge.

1. Every new or changed value is verbatim from a source page image, with the source ID, page, and section. The inventory row for that source ID matches the document that was read. When two rows share a name, cite the row whose filename and file size match the file that was opened.
2. The 60-character limit applies only to label slots: Plan type, Network name, Underwriter, Association, and Plan, Claims, or Billing administrator. A list or paragraph may be longer when it is the printed text.
3. Supersede, never delete. After the change, one current fact per leaf per plan.
4. Run `npm run build:profiles` without `--write` and compare only the leaves that were touched. A full dry run also differs on older, unrelated drift. Do not copy that drift, and do not add a new CONFLICTED leaf. The builder drops superseded facts. Two current facts of equal rank on one field become CONFLICTED, or needs manual verification with no value. A fact applies only to its own plan id. On benefits and limitations, high confidence at authority 6 or higher is rewritten to medium confidence and needs manual verification. Ranks 2 and 4 are not capped. Rank 7 with high confidence is capped. Commit the leaf the dry run emits. Do not lower the authority rank to avoid the cap.
5. A data-only change bumps the cache name and the cache test assertion. A JavaScript, CSS, or HTML change also replaces the matching `?v=` strings. Run `npm run check`, the pre-commit lint, and `node scripts/test-stage-s.js`. Wait for CI, then squash-merge.
6. Do not change pre-existing wording, MEC or ACA status, the words "covers" or "covered", rider names, or claims and underwriter names, except where the printed page uses those words.

## Blocked on documents

- Harbor Certificate of Coverage. Unlocks the pre-existing period and the hospital waiting period. The brochure does not print either figure, and the spoken script still states both.
- AWA Safe Guard certificate GC-1400. Unlocks the certificate benefit and exclusion wording behind the welcome-kit brochures.
- Ameritas/Fusion certificate. Unlocks the Fusion dental benefits. Those plans still have no card.
- TDK 2025-26 plan document, from Detego at (866) 815-6001. Unlocks the current TDK benefits. The brochures on file are older.
- Pinnacle Protect certificate, and Brochure V3. Unlocks confirmed benefit amounts for Protect 1-4. The brochure on file does not replace the certificate.
- GoodLife brochure or certificate. Unlocks contribution amounts and the benefit lines the member guide does not print.
- Access Health certificate (form AF ST CERT 818, named in the 2022 brochure). Unlocks any facility-charge or plan terms newer than that brochure, and which brochure column is Traditional or Lite.
- Full SmartChoice 1500, 3000, and 3500 plan documents. Unlocks the rest of those benefit grids. Specialty and preventive rows are still notes.
- SmartHealth STM Traditional and Limited FirstEnroll page PDFs. Sources 125 and 126 are URLs only. Unlocks pre-existing conditions and the carrier by state. Those pages were blocked.
- GoodHealth/MBA member services contact: a welcome kit, sample ID card, or member letter that prints a member phone and hours. Unlocks Member services on GoodHealth 1-5.

## Platform facts

Access Health STM is sold on FirstEnroll, not NEO. Traditional is page 28230 and Lite is page 28231.

GoodHealth is a self-funded employee welfare benefit plan (certificate source 114, page 2, section 1.4.7; page 69, section 13.8). Plan Administrator is Merchants Benefit Administration. Plan Sponsor is Good Health Distribution Partners. No insurance underwriter or association is named.

## Open decisions

- Whether the chat panel launches with `?showchat=1`.
- About 42 add-on plans still have no Plan Vault card.
