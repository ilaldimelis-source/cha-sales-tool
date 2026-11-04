# STM grid check log (2026-11-04)

Method: each page was rendered with pdftoppm -r 110 and viewed as a PNG. Values were transcribed by hand and printed column order was recorded with both end columns checked. Every $ and % value in each Benefits table was then confirmed present in pdftotext output for those pages (scripted check: 0 missing on all 15 cards). No dashes appear in any of these grids. "N/A" (Allstate Health Access) is printed text.

| Plan | PDF + pages checked | Printed columns (L to R) | Rows matched | Rows that differ (portal vs PDF) | Rows not in PDF |
|---|---|---|---|---|---|
| Harbor STM Essential | HarborSTM Brochure 0827 (PDF 2026-08-27) p5, p6 (0820 copy pp5-6 text identical) | Essential, Access, Secure | 13/13 | none | none (wellness "1 per year" is portal-only text, not a grid value) |
| Harbor STM Access | same, p5, p6 | same | 13/13 | none | none (wellness count as above) |
| Harbor STM Secure | same, p5, p6 | same | 13/13 (e-sign values also match) | none | none (wellness count as above) |
| Access Health Lite STM | AccessHealthBrochure2 BR-AFS-STM-2022 p3, p4 | Plan 1, Plan 2, Plan 3 (no Lite/Traditional labels) | 16 rows that are identical across all 3 columns | none vs portal (portal has no grid); e-sign values fit the brochure ranges | copays, room/ICU, surgery, outpatient, ER rows not mapped (columns differ, no tier label); e-sign UC/ER additional deductibles not tied to a column |
| Access Health Traditional STM | same, p3, p4 | same | 15 rows identical across all 3 columns | none | same unmapped rows as Lite |
| SmartHealth STM Traditional | SmartHealth_v3 (2020) p5, p6 | Limited, Traditional | 29/29 | none (portal has no grid values) | none |
| SmartHealth STM Limited | same, p5, p6 | Limited, Traditional | 31/31 | none | none |
| Pinnacle STM Traditional | Pinnacle STM Brochure (device copy PDF 2026-08-24 = 2023 text) p7 | single column, Traditional Plan | 21/21; portal copays, add'l deductibles, extended care, home health, therapy all match | none | none |
| AFRP Galena STM Economy | NEO-SGIC_AFRP STM Limited-Elite STC2000AFRP (2024) p6 | Economy, Standard, Elite | 21/21 | none | none |
| AFRP Galena STM Standard | same, p6 | same | 21/21 | none | none |
| AFRP Galena STM Elite | same, p6 | same | 20/21 | Office visit: portal "$40 / $60 copay (all)" vs PDF "*Copay: Primary $30; Specialty $45". Card shows portal | none |
| Allstate Essentials STM PPO | AHS_STMP_1513-7 Rev 04/2026 p3, p4, p5 | Essentials, Enhanced (3 sub-columns), Copay Enhanced (2 sub-columns) | 13/13 (NEO 4/8/26 print also matches) | none | none |
| Allstate Enhanced STM PPO | same, p3, p4, p5 | same | 11/11 (NEO print lists same 9 combinations) | none | none |
| Allstate Copay Enhanced STM PPO | same, p3, p4, p5 | same | 11/11 | Pharmacy: portal "Rx copays may apply" vs PDF "$10 generic; $3,000 max" (no conflict, the portal gives no amount). Deductible options: NEO 4/8/26 print shows $6k/$8k only, PDF adds $2,000/$4,000 at 25% | none |
| Allstate Health Access | AHS_ACS_1844-1 Rev 09/2024 p4, p5 | Metal gap, Core, Plus | 26/26 (NEO 4/8/26 print also matches for the rows it shows) | none | none |

Other findings, not grid conflicts:
- Allstate STM sickness wait: the PDF says 7 days on p3 (footnote 3). "No waiting period applies" is footnote 7 on the Pharmacy row. Earlier fact files misread it.
- Harbor Essential card from the earlier pass was re-checked. All values match the p5 image. Tags were updated to image-checked, and the Pre-Existing Conditions Rider row was added from p6.
