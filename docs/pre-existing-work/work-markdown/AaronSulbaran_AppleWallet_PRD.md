---
read_time: ~12 min read
status: Final
type: PRD
---

# Product Requirements Document

## Apple Wallet: Credential Expansion and Experience Platform

**Product Manager:** Aaron Sulbaran
**Course:** MKT 372T Strategic Product Management
**School:** McCombs School of Business, UT Austin
**Term:** Spring 2026
**Date:** March 25, 2026

---

## 1. Overview

This Product Requirements Document defines the next phase of Apple Wallet's evolution from a payment and pass management tool into a comprehensive credential and identity platform. The features outlined here address four strategic opportunities identified through customer research and market analysis: expanding into unsupported credential categories, improving the at-scale user experience, increasing infrastructure reliability, and driving deeper adoption of Wallet's full feature set.

The product vision for Apple Wallet is to eliminate the need for a physical wallet entirely. Today, Wallet handles payments, transit, boarding passes, digital keys, and state-issued IDs. However, key credential categories remain unsupported (healthcare, workplace access), the experience degrades as users add more credentials, and infrastructure inconsistency in the physical world still forces users to carry backup payment methods. This PRD addresses those gaps.

## 2. Problem Statement

Despite Apple Wallet's expansion beyond payments into IDs, transit, keys, and passes, the majority of iPhone users still carry a physical wallet daily. Research indicates four primary barriers preventing full adoption:

- **Key credential categories remain unsupported.** Health insurance cards, pharmacy benefit IDs, workplace badges, and campus credentials have no digital home in Wallet, forcing users to maintain physical backups for everyday interactions like checking in at a doctor's office or entering an office building.
- **Wallet becomes disorganized at scale.** Users with 10+ credentials have no way to group, categorize, or prioritize what they see. Contextual auto-surfacing is inconsistent across credential types, meaning users frequently open the app and scroll manually rather than trusting the lock screen.
- **Merchant and infrastructure inconsistency erodes trust.** Users cannot determine in advance whether a venue accepts Apple Pay, and failed NFC taps at terminals create lasting distrust that discourages users from leaving physical cards behind.
- **Most users never explore beyond payments.** The current setup flow adds a payment card and stops. There is no guided experience connecting a user's daily habits to the non-payment features Wallet already supports.

## 3. Target Users

Apple Wallet serves a multi-sided ecosystem. The features in this PRD target the following user segments:

- **Primary:** iPhone and Apple Watch users who interact with Wallet for payments, transit, or passes and represent the core adoption base for expanded credential types.
- **Secondary:** Issuing partners including banks, health insurers, PBMs, employers, universities, and transit authorities who provision credentials into Wallet and benefit from reduced fraud and higher engagement.
- **Tertiary:** Merchants and service providers (retail, healthcare, hospitality) who accept Wallet-based credentials at point of service and benefit from faster transactions and expanded payment channels.

## 4. Proposed Solution

The solution is organized into 10 features spanning new credential categories, UX and infrastructure improvements, and adoption-driving experiences. Together, they move Apple Wallet from a payment tool with additional capabilities into a unified credential platform that can credibly replace a physical wallet for the majority of daily interactions.

The features are prioritized using MoSCoW and sized using T-shirt sizing (Small, Medium, Large) consistent with the engineering estimation practices used by the Apple Wallet team.

### 4.1 Feature Requirements

| # | Feature | Size | Priority | Description |
|---|---|---|---|---|
| 1 | Health Insurance Credential Integration | Large | Must Have | New credential category enabling insurance cards, HSA/FSA credentials, and pharmacy benefit IDs to be stored in Wallet and verified via NFC tap at provider check-in desks and pharmacies. |
| 2 | Universal Campus and Workplace Badge | Large | Must Have | A standardized credential framework for employers and universities to issue digital access badges directly into Wallet, replacing proprietary badge apps with native NFC-based building entry. |
| 3 | Credential Import Scanner | Medium | Should Have | A camera-based feature allowing users to photograph any unsupported physical card and store a scannable digital version in Wallet, bridging the gap before formal partner integrations exist. |
| 4 | Wallet Organization and Custom Grouping | Medium | Should Have | User-created folders or categories (e.g., Travel, Work, Health) to organize 10+ credentials, with drag-and-drop reordering and the ability to pin frequently used items. |
| 5 | Contextual Smart Surfacing Improvements | Medium | Must Have | Reliability and consistency improvements to the system that auto-surfaces credentials on the lock screen based on time, location, and NFC proximity across all credential types. |
| 6 | Merchant Acceptance Indicator | Small | Could Have | An in-app map layer or search feature showing which nearby merchants and transit systems accept Apple Pay, integrated with Apple Maps data. |
| 7 | Offline Transaction Mode | Medium | Should Have | Stored NFC token capability enabling a limited set of transactions (transit taps, building access) to complete even when the device has no network connectivity. |
| 8 | Peer-to-Peer Identity Verification | Large | Could Have | Secure, selective sharing of verified identity attributes (age, name, membership) between devices via NFC tap or AirDrop, without exposing full credential details. |
| 9 | International Wallet Compatibility | Large | Should Have | Expanded support for foreign transit networks, regional payment systems, and international ID standards to enable seamless Wallet usage when traveling abroad. |
| 10 | Guided Wallet Setup Experience | Small | Must Have | A first-time onboarding flow during device setup that maps users' daily habits (commuting, shopping, travel) to Wallet features they can activate immediately, driving adoption beyond a single payment card. |

### 4.2 Feature Details

**Health Insurance Credential Integration**

This feature establishes Apple Wallet as the digital home for healthcare credentials. Users will be able to add their health insurance card, HSA/FSA account credentials, and pharmacy benefit ID to Wallet through partnerships with major insurers and pharmacy benefit managers. At a provider's front desk, a single NFC tap would transmit verified insurance information, eliminating paper forms and manual ID entry. The credential would display a visual card in Wallet matching the insurer's branding, with key information (member ID, group number, plan type) accessible at a glance. Face ID authentication ensures the credential is only shared when the user explicitly authorizes it.

**Universal Campus and Workplace Badge**

This feature extends Apple Wallet's existing digital key infrastructure into a standardized framework that employers and universities can adopt to issue NFC-based access badges. Today, many organizations use proprietary badge apps that fragment the user experience and require separate authentication. By providing a native Wallet-based credential, users can tap into buildings, secure areas, and campus facilities using the same device and interface they already use for transit and payments. The framework would include an employer admin portal for provisioning, revoking, and managing badge access levels.

**Credential Import Scanner**

This feature serves as a bridge for the long tail of credentials that do not yet have formal Apple Wallet integrations. Users photograph the front and back of any physical card, and Wallet uses on-device OCR to extract key fields (member ID, name, barcode) and create a digital version that can be displayed and scanned. While this does not provide the full NFC verification of a formally integrated credential, it is meaningfully better than a photo saved in the camera roll, because it is organized within Wallet, surfaced contextually, and accessible from the lock screen.

**Wallet Organization and Custom Grouping**

As Wallet expands to support more credential types, the current flat list of cards becomes harder to navigate. This feature introduces user-created groups (e.g., Travel, Work, Health, Daily) with drag-and-drop organization and the ability to pin frequently used credentials to the top of Wallet. Groups function like lightweight folders: tapping a group reveals its contents, and users can assign any credential to one or more groups. The default view remains the existing card stack for users who prefer simplicity.

**Contextual Smart Surfacing Improvements**

Apple Wallet already surfaces certain credentials on the lock screen based on time and location (e.g., a boarding pass at the airport). However, this behavior is inconsistent across credential types and sometimes fails to trigger. This feature is a non-functional improvement focused on increasing the accuracy and reliability of the contextual engine across all credential categories, including newly added ones like health insurance and workplace badges. The goal is to raise surfacing accuracy from an estimated 72% to 92% or higher, so users can trust that the right credential will appear without manual selection.

**Merchant Acceptance Indicator**

One of the top reasons users still carry a physical wallet is uncertainty about whether their destination accepts Apple Pay. This feature integrates Apple Pay acceptance data into an in-app map view (leveraging Apple Maps infrastructure) and a search function that lets users look up specific merchants. Acceptance status would be sourced from payment processor partnerships and crowdsourced user reports. Over time, this feature reduces the anxiety that drives backup physical card behavior.

**Offline Transaction Mode**

Certain high-frequency use cases, particularly transit gate taps and building access, occur in environments with poor or no connectivity (underground stations, parking garages, basements). This feature enables a limited set of NFC transactions to complete using pre-stored authentication tokens when the device has no network connection. Tokens are refreshed automatically when connectivity resumes. This addresses the hardware dependency pain identified in customer research and ensures Wallet works in the exact moments where reliability matters most.

**Peer-to-Peer Identity Verification**

This feature enables a new category of interaction: user-to-user credential sharing. Rather than handing a physical ID to a bartender, a bouncer, or a colleague, a user could tap their device to share only the specific verified attribute needed (e.g., "over 21" or "employee of Acme Corp") without revealing their full name, address, or ID number. The transaction uses NFC or AirDrop and is authenticated via Face ID. This is the most forward-looking feature in the roadmap and positions Wallet as an identity layer, not just a credential container.

**International Wallet Compatibility**

Apple Wallet's utility drops significantly when users travel abroad. Foreign transit systems, regional payment networks, and international ID standards are not consistently supported. This feature is a phased infrastructure expansion that adds support for transit networks, payment processors, and government ID programs in priority international markets. Phase 1 targets markets with existing Apple Pay infrastructure (UK, Canada, Australia, Japan). Phase 2 expands into the EU, South Korea, and additional Asia-Pacific markets.

**Guided Wallet Setup Experience**

Today, the iPhone setup process prompts users to add a payment card to Wallet and then stops. The Guided Setup Experience replaces this with a brief, habit-based onboarding flow that asks users about their daily routines ("Do you commute by public transit?" "Do you use a work badge to enter your building?") and then suggests specific Wallet features and credentials to activate. The goal is to increase the number of credential types activated during first-week usage from an average of 1.2 to 3 or more, converting passive Wallet users into active multi-credential users.

## 5. Success Metrics

The following metrics define how we will measure whether this product initiative is achieving its intended outcomes. Each metric is tied to a specific aspect of the strategy: adoption breadth, user behavior change, feature-level activation, and infrastructure reliability.

| Metric | Definition | Current Baseline | Target |
|---|---|---|---|
| Full-suite credential adoption rate | % of iPhone users actively using 3+ credential types in Wallet (payments, ID, transit, keys, passes) | Currently estimated at 18% | 35% within 12 months of launch |
| Physical wallet abandonment rate | % of active Wallet users who report no longer carrying a physical wallet daily | Baseline TBD via user survey | 25% of power users within 12 months |
| Health credential activation rate | % of users who add at least one health insurance credential within 90 days of feature availability | 0% (feature does not exist) | 12% of Wallet users in supported markets |
| Onboarding completion rate | % of new iPhone users who complete the Guided Wallet Setup flow and activate 2+ features | N/A (no guided flow exists) | 60% completion rate |
| Credential surfacing accuracy | % of contextual auto-surface events that present the correct credential on the first attempt | Estimated 72% across all types | 92% accuracy across all credential types |
| International transaction success rate | % of Wallet-initiated transactions that complete successfully in supported foreign markets | Varies by region | 95% success rate in Tier 1 international markets |

## 6. Risks and Mitigations

| Risk | Severity | Description | Mitigation |
|---|---|---|---|
| Healthcare regulatory compliance | High | Health insurance data is subject to HIPAA and equivalent international regulations. Non-compliance could delay launch or expose Apple to legal liability. | Engage Apple Health legal and privacy teams from day one. Design credential storage to meet or exceed HIPAA data handling requirements. Begin insurer partnership conversations with compliance as a precondition. |
| Partner adoption velocity | High | Health credential integration and campus/workplace badges depend on external partners (insurers, PBMs, employers, universities) adopting Apple's framework. | Prioritize partnerships with 3 to 5 large insurers and 10+ enterprise employers for launch. Use the Credential Import Scanner as a stopgap for unsupported providers. |
| International regulatory fragmentation | Medium | ID standards, transit protocols, and financial regulations differ significantly by country, which could slow international expansion. | Phase rollout by region. Start with markets that have existing Apple Pay infrastructure and government ID programs (UK, Canada, Australia), then expand. |
| User trust with sensitive credentials | Medium | Users may hesitate to store health, identity, or workplace credentials in Wallet despite trusting it with payment cards. | Leverage Apple's existing privacy positioning. Provide transparent data handling disclosures within Wallet. Launch with a user education campaign during onboarding. |
| Contextual surfacing false positives | Low | Improved auto-surfacing could present the wrong credential in ambiguous contexts (e.g., a pharmacy that is also a retail store), eroding user trust. | Implement a confidence threshold for auto-surfacing. When confidence is below threshold, show a short list of likely credentials rather than auto-selecting one. |

## 7. Release Timeline

The release strategy is organized into four phases, sequenced to build foundational UX improvements first, then launch headline credential categories, and finally expand reach and introduce forward-looking capabilities. Each phase is designed to deliver measurable value independently while building toward the full vision.

| Phase | Features | Rationale |
|---|---|---|
| Phase 1: Foundation (Q3 2026) | Guided Wallet Setup Experience, Wallet Organization and Custom Grouping, Contextual Smart Surfacing Improvements | Establish the UX foundation. These features improve the experience for existing credentials and prepare the app to handle a larger, more diverse credential library. |
| Phase 2: Credential Expansion (Q4 2026) | Health Insurance Credential Integration, Credential Import Scanner, Universal Campus and Workplace Badge | Launch the headline credential categories with initial launch partners. The Scanner provides coverage for credentials without formal partnerships yet. |
| Phase 3: Reach and Resilience (Q1 2027) | Merchant Acceptance Indicator, Offline Transaction Mode, International Wallet Compatibility (Tier 1 markets) | Expand the product's reliability and geographic reach, addressing the remaining friction points that prevent users from going fully digital. |
| Phase 4: Next Frontier (Q2 2027) | Peer-to-Peer Identity Verification, International Wallet Compatibility (Tier 2 markets) | Introduce the most technically complex and partnership-dependent features after the core platform is stable and adoption metrics from earlier phases are validated. |

## 8. Dependencies and Constraints

- **Partner readiness:** Health credential integration and campus/workplace badge features require signed partnership agreements and technical integration with external organizations. Feature launch timelines are contingent on partner onboarding velocity.
- **Regulatory approval:** Health insurance credentials must comply with HIPAA (US), GDPR (EU), and equivalent data protection regulations in each launch market. International Wallet Compatibility requires compliance with local financial and identity regulations per country.
- **iOS release cycle:** Several features (Guided Setup, Smart Surfacing, Offline Mode) require changes to iOS system-level behavior and will need to align with Apple's annual iOS release schedule.
- **Hardware compatibility:** Offline Transaction Mode relies on NFC hardware capabilities that may vary across older iPhone models. Minimum supported device must be defined during technical scoping.
- **Apple Maps integration:** The Merchant Acceptance Indicator depends on Apple Maps data infrastructure and will require coordination with the Maps team for data ingestion and display.

## 9. Open Questions

1. What is the minimum number of insurer partnerships needed to make Health Credential Integration credible at launch? Should we require coverage of a certain percentage of the US insured population before going live?
2. How will the Credential Import Scanner handle credentials with QR codes vs. barcodes vs. text-only cards? Does each type require a separate OCR pipeline?
3. Should the Peer-to-Peer Identity Verification feature support verification between an iPhone user and a non-iPhone user, or is this an Apple ecosystem-only capability at launch?
4. For International Wallet Compatibility, which transit systems in Tier 1 markets should be prioritized first? Should selection be driven by Apple Pay adoption rates or tourist volume?
5. How many stored offline tokens should be supported simultaneously, and what is the acceptable expiration window before a network refresh is required?
