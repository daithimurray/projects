# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Astro (static HTML, zero JS by default) with GSAP + ScrollTrigger for scroll and micro motion, Lenis for smooth scroll, and three.js for the hero scene, loaded lazily. Same build pattern as the Leixlip Tarmac site in this repo: source in `_source/amptech/site`, compiled copy in `amptech/`, built for the `/amptech` path on getawebsite.ie with `noindex` until the client signs off.

## Users

- Homeowners in North Kildare and West/North Dublin (Leixlip, Lucan, Maynooth, Celbridge, Donaghmede and beyond). Typical triggers: an old alarm that is outdated or faulty, a break-in nearby, a new house, wanting to check the alarm from a phone.
- Small business and commercial property owners who need intruder, CCTV or fire detection installed or maintained.
- Both usually arrive on a phone, compare two or three local installers, and decide on trust: licence, standards, track record, and whether the installer listens.

## Product Purpose

Amptech designs, installs, certifies and maintains security systems for homes and businesses: intruder alarms, CCTV, fire detection and security lighting. It also repairs and upgrades existing systems, adds zones after extensions, runs maintenance contracts and offers monitored systems. Success for the site: the visitor calls 01 615 5980 or sends a quote request.

## Positioning

A PSA-licensed installer (licence 03019, valid to 12/04/2028) based in Leixlip, Co. Kildare, claiming over 20 years' experience. Every intruder system gets a uniquely numbered Certificate of Compliance, which insurers may ask for. The company upgrades existing alarms instead of forcing a rip-and-replace, fits HKC systems with the HKC mobile app, and offers maintenance contracts, monitoring and a 24/7 call-out. Customers praise neat installs, being listened to, the system being demonstrated before the installers leave, cost-effective solutions and ongoing support.

## Operating Context

- Enquiry path today: a phone call for a competitive quote ("Call us on 01-615 5980 for a competitive quote" in every page header), plus a contact form.
- Survey, then proposal, then installation, then a Certificate of Compliance for intruder systems, then ongoing backup, service and maintenance.
- HKC app (verified): alerts, images, set/unset, log checks and image capture from any location. The client's HKC page also describes alarm alerts, images and messages delivered as audible and text notifications (from search results of amptech.ie/hkc-mobile-app/; used once, in the App section's lede).

## Capabilities and Constraints

Source of truth: `dossier.md` (research dated 23 September 2026) plus the testimonials the user supplied. Labels follow the dossier: Verified, Company claim (stated on the client's own site), Reported, Inferred.

- **Legal entity (Verified, PSA register):** Robert Farnan Electrical & Alarms Limited, trading as Amptech (also "Amptech Security Systems"). Company no. 501850 and incorporation on 3 August 2011 are Reported (SoloCheck). There is **no** "Amptech Ltd": never use that name. Legal and privacy text names the real entity.
- **PSA licence 03019 (Verified):** categories are Installer of Security Equipment for Access Control, for CCTV, and for Installation and Maintenance of Intruder Alarms. Issued 12/04/2026, expires 12/04/2028. It does **not** cover fire systems or alarm monitoring, so never describe fire or monitoring work as PSA-licensed.
- **Address (Verified):** 3 The Rise, Louisa Valley, Leixlip, Co. Kildare. Eircode W23 N226 is Reported. Probably a home office: show it as the registered or postal address only. No "visit us" pin and no directions call to action without client approval.
- **Phone (Verified):** 01 615 5980 (+353 1 615 5980). Email rob@amptech.ie is Reported but not on the client's site, so don't publish it until confirmed.
- **Installation (Company claim):** intruder alarms for domestic, commercial and industrial sites, wired and wireless; key fobs; 24-hour panic alarms; CCTV (upgrades to high-resolution, low-light cameras; probably Hikvision, Inferred); fire detection (review, design and upgrades to bring premises up to code); smoke and heat detectors (the site says "CO2", probably CO, so confirm before mentioning carbon monoxide); security lighting.
- **Access control (Verified licence category):** licensed but not marketed on the current site. It may be listed as a service, flagged for client confirmation.
- **System upgrades (Company claim):** replace outdated intruder, CCTV, fire detection and lighting systems; add zones after extensions or home changes; "AmpTech can repair & upgrade any intruder alarm system". Prefer the testimonial-backed wording "many existing systems".
- **Certificate of Compliance (Company claim):** uniquely numbered, issued for intruder systems on completion; insurers may ask for it and it may help get a premium discount. Say "may", never promise a discount.
- **Maintenance (Company claim):** fully contracted maintenance; annual inspection of intruder alarms, fire alarms, CCTV and fire extinguishers; a detailed engineer's report after each service.
- **Monitoring Services (Company claim):** 24/7 monitored systems; a Garda Unique Reference Number (URN) so a confirmed alarm can get a Garda response; designated keyholders called. Monitoring is probably provided through a third-party monitoring centre (Inferred; partner not named). Don't imply Amptech runs the monitoring centre.
- **GSM text monitoring unit (Company claim):** alerts to a mobile phone, no landline needed, no annual monitoring fee, and it can also switch on heating and control home lighting.
- **Emergency call-out (Company claim):** 24/7, 365 days a year, on the same phone number (no separate emergency line found).
- **Experience:** "over 20 years" is a company claim. The company was incorporated in 2011; earlier trading is undocumented. Keep the claim and flag it for confirmation.
- **Standard:** the client's site says "EN5013-1", a typo. EN 50131-1 is the inferred correct standard: confirm with the client.
- **Geography:** the company claims "throughout Ireland" and "countrywide". The evidence points to Dublin 15, west and north Dublin, north Kildare and Meath (testimonials from Clonsilla ×2, Lucan, Donaghmede, Sutton and Co. Meath).
- **Unconfirmed, do not publish:** general electrical work (legacy), the monitoring partner, fire certifications, team names (Robert Farnan is the Reported contact), opening hours, prices, aggregate review rating or count, and brands beyond HKC.
- **Service names on the current site** (keep for continuity and redirects): Security, Maintenance, System Upgrades, Monitoring Services.
- amptech.ie and its images cannot be fetched from the build environment. Client assets (logo, van photo) must be supplied.

## Brand Commitments

- Name: Amptech (trading name of Robert Farnan Electrical & Alarms Limited). A logo exists on the current site (amptechsecuritysystems.png) but can't be fetched here. The pitch uses an authored wordmark that must be approved or replaced. Branded vans exist (photo on the current About page), and that photo is the strongest real asset.
- Voice (from the client's site): plain, friendly, local tradesperson. "Big jobs, small jobs and everywhere in between." Company policy (preserve, with "Its" corrected): "It's our policy to provide each and every one of our clients with the best possible service – from the time of survey through to completion of installation with ongoing backup, service and maintenance."
- User asked for a ground-up redesign: visually striking, micro-animations, scroll transitions, interactive. Tools delegated (GSAP / three.js / similar).

## Evidence on Hand

- PSA licence 03019. Over 20 years in business. Certificate of Compliance with every intruder install. EN 50131-1.
- Company voice (from the live testimonials page): "For over 20 years Amptech have been doing big jobs, small jobs and everywhere in between. Over this period we have made and retained many happy customers. But don't take our word for it."
- Testimonials from the live site, verbatim, supplied by the user (source of truth; supersedes the earlier search-derived attribution):
  - Brian W., Clonsilla, Dublin: "I recently used Amptech to install an intruder alarm. The house has recently been updated and had no alarm previously. Amptech handled the whole thing. Neatly installed, would recommend."
  - Robert C., Donaghmede, Dublin: "Largescale CCTV system installed. Very happy with choosing Amptech for this. They listened to my needs and provided a cost effective solution. The installation was professional and the support given once up and running has been second to none." (This is a CCTV job, NOT an HKC alarm upgrade.)
  - Mary T., Lucan, Co. Dublin: "I had my outdated HKC alarm upgraded by Amptech. It was done quickly and the new alarm is very easy to use with lots of features."
  - Dave G., Clonsilla, Dublin: "Amptech were able to add new windows and doors to our existing alarm after we had some home alteration work. Not a bother since."
  - Melanie R., Sutton, Dublin: "Outdated panel and sensors replaced by Amptech. Very happy didn't have to change much to update. The two lads demonstrated the system and made sure I was satisfied before leaving. Very helpful, super stuff."
  - Retail goods distributor, Co. Meath: "We built a new warehouse for our regional distribution centre. Amptech conducted a survey and submitted a winning proposal for the best camera coverage, installation and support. All for a competitive price. Still a customer and would recommend."
- Google reviews supplied by the user (each shown as 5/5; no aggregate rating or total count confirmed, so never state one):
  - Reviewer name not supplied, about 2 years ago: "Got CCTV, intruder alarm and smoke detectors installed. Top drawer service and products. Great value for money and sound advice on what we needed. Would highly recommend." (tagged Quality, Professionalism, Value)
  - McCoy Motors, about 9 years ago: "Did a great job on our lighting in the workshop reception and in the unit repair bay of our workshop."
  - Garry O'Brien, about 2 years ago: "Great company with grest service" (sic; typo in the original, so don't quote it)
  - Rating-only 5/5 reviews: damien gibson, Ciaran Killeen, Marius Zagrean, Eleanor Cheevers, Damien Long.
- What the testimonials evidence: new installs (alarm, CCTV, smoke detectors), large-scale and commercial CCTV (warehouse survey and proposal), upgrades of outdated panels and sensors, extending an existing alarm to new doors and windows, lighting work, demonstrating the system before leaving, and customers in Clonsilla, Lucan, Donaghmede, Sutton and Co. Meath.
- No photos supplied. No fabricated reviews, aggregate star ratings, customer counts, prices or response-time promises.

## Product Principles

1. Trust is earned with specifics: licence number, standard, certificate, address, a real quote. Never with vague superlatives.
2. The phone number is the product's front door. It is visible and tappable everywhere.
3. Show how a system protects a home, rather than telling visitors to feel safe.
4. Upgrading what you already have is a first-class offer, not a footnote.
5. Motion demonstrates the system (detection, alerts, coverage). It never hides content or slows the call to action.

## Accessibility & Inclusion

WCAG 2.2 AA. All content readable without JavaScript. Full `prefers-reduced-motion` support: no smooth-scroll hijack, no scrubbed or pinned motion, static fallback for the 3D scene. Tap targets at least 44px. Many visitors are older homeowners on phones.
