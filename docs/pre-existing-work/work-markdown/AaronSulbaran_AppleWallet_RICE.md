---
read_time: ~6 min read
status: Final
type: RICE Prioritization
---

# RICE Score Prioritization

## Apple Wallet

**Author:** Aaron Sulbaran
**Course:** MKT 372T Feature Prioritization Assignment
**Term:** Spring 2026

---

## Methodology

RICE Score = (Reach × Impact × Confidence) / Effort

Each feature is scored across four inputs: monthly reach in users, impact on the user (1 to 3 scale), confidence in the estimate (percentage), and effort in story points. The resulting score allows direct comparison across features of different sizes and addresses different problem types.

## RICE Scores

| Feature | Reach (users/month) | Impact (1-3) | Confidence (%) | Effort (Story Points) | RICE Score |
|---|---|---|---|---|---|
| Health Insurance Credential Integration | 150,000,000 | 3 | 80% | 21 | 17,142,857 |
| Universal Campus and Workplace Badge | 80,000,000 | 2 | 70% | 21 | 5,333,333 |
| Credential Import Scanner | 60,000,000 | 1.5 | 60% | 8 | 6,750,000 |
| Wallet Organization and Custom Grouping | 200,000,000 | 1.5 | 85% | 8 | 31,875,000 |
| Contextual Smart Surfacing Improvements | 300,000,000 | 2 | 90% | 8 | 67,500,000 |
| Merchant Acceptance Indicator | 250,000,000 | 1 | 85% | 3 | 70,833,333 |
| Offline Transaction Mode | 100,000,000 | 1.5 | 75% | 8 | 14,062,500 |
| Peer-to-Peer Identity Verification | 30,000,000 | 2 | 50% | 21 | 1,428,571 |
| International Wallet Compatibility | 120,000,000 | 2 | 55% | 21 | 6,285,714 |
| Guided Wallet Setup Experience | 200,000,000 | 1 | 90% | 3 | 60,000,000 |

## Priority Ranking

| Rank | Feature | RICE Score |
|---|---|---|
| 1 | Merchant Acceptance Indicator | 70,833,333 |
| 2 | Contextual Smart Surfacing Improvements | 67,500,000 |
| 3 | Guided Wallet Setup Experience | 60,000,000 |
| 4 | Wallet Organization and Custom Grouping | 31,875,000 |
| 5 | Health Insurance Credential Integration | 17,142,857 |
| 6 | Offline Transaction Mode | 14,062,500 |
| 7 | Credential Import Scanner | 6,750,000 |
| 8 | International Wallet Compatibility | 6,285,714 |
| 9 | Universal Campus and Workplace Badge | 5,333,333 |
| 10 | Peer-to-Peer Identity Verification | 1,428,571 |

## Scoring Rationale

Documents the reasoning behind each RICE input to demonstrate analytical rigor.

| Feature | Reach Rationale | Impact Rationale | Confidence Rationale |
|---|---|---|---|
| Health Insurance Credential Integration | 150M/mo: ~60% of 250M US iPhone users visit a healthcare provider, pharmacy, or need insurance info at least once a month. | High (3): Directly eliminates one of the top reasons users still carry a physical wallet. Core to the product vision. | 80%: Strong signal from user research and competitive moves (Google Wallet health cards). Regulatory complexity is the main uncertainty. |
| Universal Campus and Workplace Badge | 80M/mo: Estimates ~80M US workers and students who badge into a building daily. Requires employer/university adoption. | Medium (2): High individual impact but gated by partner adoption speed. | 70%: Technical feasibility is proven (existing student ID partnerships), but enterprise sales cycle and IT adoption are unknowns. |
| Credential Import Scanner | 60M/mo: Targets the long tail of users with unsupported cards (gym, library, loyalty). Broad but lower-frequency use. | Medium-Low (1.5): Useful bridge feature, but scanned cards lack NFC verification, limiting the experience. | 60%: OCR technology is mature, but user willingness to adopt a "photo card" vs. a formally integrated pass is unproven. |
| Wallet Organization and Custom Grouping | 200M/mo: Every active Wallet user with 3+ credentials benefits. Scales with adoption of other features. | Medium-Low (1.5): Quality-of-life improvement that reduces friction but doesn't unlock new capability. | 85%: Pure software feature with no external dependencies. High confidence in feasibility and user demand from app store reviews. |
| Contextual Smart Surfacing Improvements | 300M/mo: Affects every Wallet user every time they approach a terminal or transit gate. Highest-frequency interaction. | Medium (2): Reliability of this feature directly determines whether users trust Wallet enough to leave cards behind. | 90%: Apple controls the full stack (hardware, OS, Wallet). This is an optimization of existing behavior, not a new capability. |
| Merchant Acceptance Indicator | 250M/mo: Any Apple Pay user wondering "do they take Apple Pay here?" before entering a store. Very broad reach. | Low (1): Informational only. Helpful but doesn't change transaction capability. | 85%: Apple Maps already has business data. This is a data integration and UI task with few unknowns. |
| Offline Transaction Mode | 100M/mo: Transit riders and building-access users in areas with spotty connectivity (subways, parking garages, rural areas). | Medium-Low (1.5): Eliminates a specific, frustrating failure mode. High emotional impact when it works. | 75%: Express Transit already supports limited offline NFC. Extending to other credential types adds complexity. |
| Peer-to-Peer Identity Verification | 30M/mo: Narrower use case; applies to age verification at bars/venues, peer credential sharing. Not a daily action for most users. | Medium (2): Novel capability with strong privacy value proposition, but limited frequency of use. | 50%: Involves complex privacy architecture and requires the receiving party to also have compatible hardware/software. Many unknowns. |
| International Wallet Compatibility | 120M/mo: International travelers and expats. Significant segment but seasonal and concentrated among frequent travelers. | Medium (2): High impact for affected users (travel is a top frustration point), but most users are domestic most of the time. | 55%: Requires country-by-country partnerships with transit authorities and regional payment networks. Execution risk is high. |
| Guided Wallet Setup Experience | 200M/mo: Every new iPhone activation globally (~200M+ annually) plus existing users who reset or upgrade devices. | Medium-Low (1): Drives discovery and adoption of features users already have access to. Multiplier effect on other features. | 90%: Fully within Apple's control. No external dependencies. Design and A/B testing are the main work. |
