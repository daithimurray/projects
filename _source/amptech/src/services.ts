// Service page content. Facts here come from the design brief and existing site copy.
// Anything Amptech hasn't confirmed is flagged in README under "Placeholders to replace before launch".
import type { PlanKey } from "./components/CoveragePlan";

export type ServiceKey = "alarms" | "cctv" | "fire";
type Spec = { term: string; detail: string };
type Variant = { title: string; description: string; specs: Spec[]; plan: PlanKey };
type Price = { name: string; price: string; period?: string; description: string; features: string[]; highlighted?: boolean; badge?: string };

export type Service = {
  name: string;
  hero: { title: string; description: string; proof: string[]; photo: string };
  plan: { title: string; description: string };
  home: Variant;
  business: Variant;
  /** Short list of things the service also covers, shown as a plain list, not cards. */
  also?: { title: string; items: { title: string; body: string }[] };
  pricing?: { title: string; description: string; items: Price[] };
  reviews: number[];
  faq: { title: string; content: string }[];
  cta: { title: string; description: string };
};

export const SERVICES: Record<ServiceKey, Service> = {
  alarms: {
    name: "Intruder alarms",
    hero: {
      title: "An alarm designed around how your building is actually entered.",
      description: "We walk the property first: every door, the windows, the side passage, the back garden. Then we design a Grade 2 or Grade 3 system to cover them, fit it ourselves, and show everyone how it works before we leave.",
      proof: ["PSA licensed", "EN 50131 Grade 2 & 3", "HKC & Ajax systems"],
      photo: "alarm panel install",
    },
    plan: { title: "Every way in, covered", description: "Every system starts as a plan like this: a contact on each door, motion sensors where someone would walk, and the keypad where you'll actually use it." },
    home: {
      title: "A typical home system",
      description: "Door contacts, motion sensors in the main rooms, an external siren and a keypad by the front door. Armed, disarmed and checked from your phone.",
      plan: "alarm-home",
      specs: [
        { term: "Grade", detail: "Grade 2, EN 50131" },
        { term: "Control", detail: "Keypad and phone app" },
        { term: "Sensors", detail: "Door contacts and motion sensors" },
        { term: "Wiring", detail: "Wired, wireless or a mix" },
        { term: "Typical install", detail: "1 day" },
        { term: "Maintenance", detail: "Annual inspection and certificate" },
      ],
    },
    business: {
      title: "A typical commercial system",
      description: "Grade 2 or Grade 3 depending on the risk and what your insurer asks for, with roller-door contacts, motion sensors across the floor and a code for each keyholder.",
      plan: "alarm-business",
      specs: [
        { term: "Grade", detail: "Grade 2 or 3, EN 50131" },
        { term: "Control", detail: "Keypads, app and user codes" },
        { term: "Sensors", detail: "Door, roller-door and motion" },
        { term: "Wiring", detail: "Wired, wireless or a mix" },
        { term: "Typical install", detail: "Confirmed at survey" },
        { term: "Maintenance", detail: "Annual inspection and certificate" },
      ],
    },
    also: {
      title: "Already have an alarm?",
      items: [
        { title: "Upgrade an older panel", body: "Many older HKC panels can be replaced without re-wiring, and existing sensors are often reused. The survey confirms what can stay." },
        { title: "Extend after building work", body: "New doors, windows or an extension added to the system you already have." },
        { title: "Repairs and faults", body: "Priority fault response within 24 hours for systems we maintain." },
      ],
    },
    reviews: [0, 2, 3, 4],
    faq: [
      { title: "Grade 2 or Grade 3: which do I need?", content: "Grade 2 suits most homes and many businesses. Grade 3 is for higher-risk premises, and your insurer may specify it. The survey settles it." },
      { title: "Can I control it from my phone?", content: "Yes. The systems we fit can be armed, disarmed and checked from an app, with an alert if something is triggered." },
      { title: "Do I need a PSA-licensed installer?", content: "Yes. In Ireland anyone installing intruder alarms must hold a Private Security Authority licence. Ours is shown in the footer and on every quote." },
      { title: "How long does a home installation take?", content: "Most homes are finished in a day, including a walk-through of the system before we leave." },
    ],
    cta: { title: "Find out what your building actually needs.", description: "Free survey, fixed quote, installed by our own engineers." },
  },

  cctv: {
    name: "CCTV",
    hero: {
      title: "Cameras placed where they actually see something.",
      description: "We design coverage from a site survey: entrances, approaches and blind spots first, then the cameras to suit. Remote viewing on your phone, footage kept for 30 days.",
      proof: ["PSA licensed", "Hikvision approved", "GDPR signage supplied"],
      photo: "camera install",
    },
    plan: { title: "Coverage first, cameras second", description: "Every system starts as a plan like this one: what each camera sees, and nothing left in the dark between them." },
    home: {
      title: "A typical home system",
      description: "Four to six cameras covering front, rear and side access, recorded locally with app access for the household.",
      plan: "cctv-home",
      specs: [
        { term: "Cameras", detail: "4 to 6 × 4MP or 4K IP" },
        { term: "Recording", detail: "Recorder on site, 30 days kept" },
        { term: "Viewing", detail: "iOS & Android app" },
        { term: "Standard", detail: "PSA licensed install" },
        { term: "Typical install", detail: "1 day" },
        { term: "Maintenance", detail: "Annual, optional" },
      ],
    },
    business: {
      title: "A typical commercial system",
      description: "Coverage-led design for yards, loading bays, tills and stock rooms, with retention and access policies agreed up front.",
      plan: "cctv-business",
      specs: [
        { term: "Cameras", detail: "8 to 32 × 4K IP, PTZ where needed" },
        { term: "Recording", detail: "Recorder on site, 30 days kept" },
        { term: "Viewing", detail: "iOS & Android app" },
        { term: "Standard", detail: "PSA licensed, GDPR signage & policy" },
        { term: "Typical install", detail: "2 to 5 days" },
        { term: "Maintenance", detail: "Annual, optional" },
      ],
    },
    pricing: {
      title: "What it usually costs",
      description: "Every quote follows a survey, so these are honest starting points, not offers.",
      items: [
        { name: "Home, 4 cameras", price: "€1,450", description: "Front, rear and both sides. Recorder and app.", features: ["4 × 4MP IP cameras", "2TB recorder, 30 days", "App viewing", "1-day install"] },
        { name: "Home, 6 cameras", price: "€1,950", description: "Adds driveway and garden coverage.", features: ["6 × 4K IP cameras", "4TB recorder, 30 days", "App viewing & alerts", "1-day install"], highlighted: true, badge: "Most chosen" },
        { name: "Business", price: "Quoted", period: "", description: "Designed from a coverage survey.", features: ["8 to 32 cameras", "Retention & access policy", "GDPR signage", "Maintenance agreement"] },
      ],
    },
    reviews: [1, 5],
    faq: [
      { title: "Do I need a PSA-licensed installer for CCTV?", content: "Yes. In Ireland anyone installing CCTV must hold a Private Security Authority licence. Ours is shown in the footer and on every quote." },
      { title: "What about GDPR?", content: "We supply the signage and, for businesses, help you agree who can view footage and how long it's kept." },
      { title: "Can I watch the cameras on my phone?", content: "Yes. Footage is recorded on site and viewable from the iOS or Android app, with alerts if you want them." },
    ],
    cta: { title: "Get camera coverage designed for your building.", description: "Free survey, fixed quote, installed by our own engineers." },
  },

  fire: {
    name: "Fire detection",
    hero: {
      title: "Smoke and heat detection, fitted where fires start and where people escape.",
      description: "Heat detectors where there's cooking, smoke detectors on the way out, all linked so that when one sounds they all sound. For businesses, full fire alarm systems designed and certified to I.S. 3218.",
      proof: ["Certified to I.S. 3218", "Domestic & commercial", "Annual servicing"],
      photo: "detector install",
    },
    plan: { title: "When one sounds, they all sound", description: "Detectors go in the rooms where fires start and along the route out, then they're linked so a fire in the kitchen wakes the whole house." },
    home: {
      title: "A typical home system",
      description: "Mains-powered, interlinked smoke and heat detectors with battery back-up, on the escape route and in the rooms where fires start.",
      plan: "fire-home",
      specs: [
        { term: "Detectors", detail: "Smoke and heat" },
        { term: "Power", detail: "Mains, with battery back-up" },
        { term: "Linking", detail: "Interlinked" },
        { term: "Placement", detail: "Escape route, kitchen, living rooms" },
        { term: "Typical install", detail: "Confirmed at survey" },
        { term: "Maintenance", detail: "Annual service and test" },
      ],
    },
    business: {
      title: "A typical commercial system",
      description: "A fire alarm system designed, installed and certified to I.S. 3218: detection across every area, manual call points at the exits and a panel at the entrance.",
      plan: "fire-business",
      specs: [
        { term: "Standard", detail: "I.S. 3218" },
        { term: "Detection", detail: "Smoke and heat, by area" },
        { term: "Call points", detail: "At every exit" },
        { term: "Panel", detail: "At the main entrance" },
        { term: "Certification", detail: "On completion" },
        { term: "Servicing", detail: "Scheduled, recorded in the log book" },
      ],
    },
    reviews: [6],
    faq: [
      { title: "What is I.S. 3218?", content: "The Irish standard for fire detection and alarm systems in buildings. We design, install and certify commercial systems to it." },
      { title: "Smoke or heat detector in the kitchen?", content: "Heat. Smoke detectors in kitchens go off with cooking, so people end up disconnecting them. A heat detector responds to a fire, not to toast." },
      { title: "How often should it be serviced?", content: "Homes: an annual service and test. Commercial systems: as often as I.S. 3218 requires for your premises, recorded in the log book." },
    ],
    cta: { title: "Check your fire detection with a free survey.", description: "An engineer looks at every room and the way out, then quotes. No obligation." },
  },
};
