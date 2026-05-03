---
read_time: ~5 min read
status: Final
type: Initial Requirements
is_extra: true
---

# Initial Requirements

## Effort Estimation and Engineering Inputs to RICE

**Author:** Aaron Sulbaran
**Course:** MKT 372T Feature Prioritization Assignment
**Term:** Spring 2026

---

## Purpose

The RICE Prioritization document explains the reasoning behind three of the four scoring inputs (Reach, Impact, and Confidence). This document fills the remaining gap by documenting the engineering rationale behind each feature's effort estimate.

T-shirt sizes (Small, Medium, Large) were assigned based on four factors: implementation complexity within Apple's existing infrastructure, the number of external partners required for launch, regulatory or platform work needed beyond the core engineering effort, and the breadth of teams that need to coordinate to ship.

| Size | Story Points | Definition |
|---|---|---|
| Small | 3 | Self-contained work inside the Wallet app or a single iOS subsystem. No external partner dependencies. Can be shipped within a single iOS minor release. |
| Medium | 8 | Cross-team coordination within Apple required (e.g., Wallet plus Maps, plus iCloud, plus Apple Pay infrastructure). Limited external dependencies. Typically aligned to a single iOS major release. |
| Large | 21 | Significant external partner integration required (issuers, regulators, governments, employers, transit authorities). Multiple Apple teams involved. May span more than one iOS release cycle. |

## Effort Justification by Feature

| Feature | Effort | Justification |
|---|---|---|
| Health Insurance Credential Integration | Large | Requires partnership agreements with major health insurers and PBMs, each with their own credential format and verification flow. HIPAA compliance work is non-trivial and runs in parallel with engineering. NFC verification at provider check-in desks depends on point-of-care infrastructure that Apple does not control. Estimated at three quarters of focused work across Wallet engineering, Apple Health legal, and a new partnerships function. |
| Universal Campus and Workplace Badge | Large | Extends Apple's existing digital key infrastructure but adds an enterprise admin portal for provisioning and revocation. Each launch employer or university represents a separate IT integration. Standardization of the credential format requires Apple to publish a framework spec and recruit early adopters. The engineering surface is medium, but the partner enablement work is what drives this to Large. |
| Credential Import Scanner | Medium | Leverages on-device OCR capabilities Apple already ships in the Photos and Notes apps. New work is concentrated in Wallet UI, the credential storage schema, and supporting barcode and QR formats reliably. No external partner dependencies. Can be scoped to a single iOS major release. |
| Wallet Organization and Custom Grouping | Medium | Pure software feature with no hardware or partner dependencies. Engineering work is in Wallet UI (drag-and-drop, group creation flows) and the underlying data model that supports many-to-many credential-to-group relationships. Sized Medium rather than Small because of the design surface area, not technical complexity. |
| Contextual Smart Surfacing Improvements | Medium | Apple controls the full stack here, which constrains effort to internal systems. Work is concentrated in the contextual engine (location, time, NFC proximity heuristics) and integration with newly added credential types. Improving accuracy from 72% to 92% is a measurable target that requires telemetry and iteration, not a single ship. |
| Merchant Acceptance Indicator | Small | Apple Maps already has merchant data and the Wallet app already has user location. Work is a data integration and a small in-app map view layer. No new partnerships required beyond the existing Apple Maps data pipeline. The smallest feature in scope. |
| Offline Transaction Mode | Medium | Express Transit already supports offline NFC for select transit credentials. Extending the same pattern to other credential types requires changes to the secure element token schema and credential refresh policies. Hardware compatibility across older iPhone models needs to be validated. Medium because the foundation exists; new code is incremental. |
| Peer-to-Peer Identity Verification | Large | The most technically novel feature in the roadmap. Requires a new privacy architecture for selective attribute disclosure (sharing "over 21" without sharing date of birth), a new NFC or AirDrop handshake protocol, and Face ID authentication on both sender and receiver devices. Cross-device interoperability with non-iPhone users is an open question that adds further scope. |
| International Wallet Compatibility | Large | Country-by-country partnerships with transit authorities, regional payment networks, and government ID programs. Each market has its own technical standards and regulatory environment. Phased by tier, but even Tier 1 markets (UK, Canada, Australia, Japan) each represent significant integration work. The effort is dominated by external coordination rather than core engineering. |
| Guided Wallet Setup Experience | Small | Fully within Apple's control. Engineering work is a new onboarding flow that runs during iPhone setup, plus the logic to map user-stated daily habits to feature recommendations. Design and A/B testing represent the bulk of the effort, not implementation. Small because it is a self-contained UI flow with no platform changes. |

## How These Estimates Inform the RICE Output

Effort sits in the denominator of the RICE formula, which means a misestimated effort number swings the resulting score significantly. Two patterns emerged from this analysis that shaped the final ranking:

The features sized Small (Merchant Acceptance Indicator, Guided Wallet Setup Experience) ranked first and third in the final priority ranking despite having modest impact scores. Their low effort created leverage that high-impact, high-effort features could not match.

The Large-effort features (Health Insurance, Workplace Badge, Peer-to-Peer Identity, International Compatibility) all ranked in the bottom half of the priority list despite strong strategic value. RICE correctly surfaces that these are foundational bets where the path to value runs through partner adoption, not through Apple engineering velocity. The implication for sequencing is that these features need to be staffed and started early even when they will not score highest in any single quarter's prioritization exercise.
