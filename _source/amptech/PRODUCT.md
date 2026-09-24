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

Amptech Ltd designs, installs, certifies and maintains security systems for homes and businesses: intruder alarms, CCTV, fire detection and security lighting. It also repairs and upgrades many existing systems found in Ireland. Success for the site: the visitor calls 01 615 5980 or sends a quote request.

## Positioning

A PSA-licensed installer (licence 03019) based in Leixlip, Co. Kildare, with over 20 years installing and maintaining CCTV, intruder and fire systems countrywide. Every intruder system comes with a Certificate of Compliance, and systems conform to EN 50131-1. Upgrades existing alarms rather than forcing a rip-and-replace. HKC systems with the HKC mobile app for alerts and control from anywhere.

## Operating Context

- Enquiry path today: phone call for a competitive quote (the current site's title is "Call us on 01-615 5980 for a competitive quote"), plus a contact form.
- Installation ends with a Certificate of Compliance for intruder systems.
- HKC app: alarm alerts, images and messages as audible and text notifications.

## Capabilities and Constraints

- Services confirmed: intruder alarms (domestic, commercial, industrial), CCTV, fire detection, security lighting, maintenance, repairs and upgrades of existing systems, HKC mobile app.
- Address: 3 The Rise, Louisa Valley, Leixlip, Co. Kildare. Phone: 01 615 5980 (+353 1 615 5980).
- Undecided / unconfirmed, do not publish: electrical services (directories list "Amptech Electrical & Alarms"), email address, prices, monitoring centre details, response times, brand colours and logo, named commercial clients.
- amptech.ie could not be fetched from the build environment; facts come from public search results of the live site. Verify all copy against the live site before launch.

## Brand Commitments

- Name: Amptech (company: Amptech Ltd). No logo supplied; a wordmark is authored for the pitch and must be replaced or approved.
- User asked for a ground-up redesign: visually striking, micro-animations, scroll transitions, interactive. Tools delegated (GSAP / three.js / similar).

## Evidence on Hand

- PSA licence 03019. Over 20 years in business. Certificate of Compliance with every intruder install. EN 50131-1.
- Testimonial (verbatim from the live About page): "Very happy with choosing Amptech for this. They listened to my needs and provided a cost effective solution. The installation was professional and the support given once up and running has been second to none." Robert C., Donaghmede, Dublin (outdated HKC alarm upgraded).
- A second testimonial exists (Mary T., Lucan, intruder alarm install) but its wording was not recoverable. Do not paraphrase it into a quote.
- No photos supplied. No fabricated reviews, star ratings, customer counts, prices or response-time promises.

## Product Principles

1. Trust is earned with specifics: licence number, standard, certificate, address, a real quote. Never with vague superlatives.
2. The phone number is the product's front door. It is visible and tappable everywhere.
3. Show how a system protects a home, rather than telling visitors to feel safe.
4. Upgrading what you already have is a first-class offer, not a footnote.
5. Motion demonstrates the system (detection, alerts, coverage). It never hides content or slows the call to action.

## Accessibility & Inclusion

WCAG 2.2 AA. All content readable without JavaScript. Full `prefers-reduced-motion` support: no smooth-scroll hijack, no scrubbed or pinned motion, static fallback for the 3D scene. Tap targets at least 44px. Many visitors are older homeowners on phones.
