// Site copy and navigation. Reviews are quoted verbatim — do not edit wording.
// Placeholders to replace before launch: phone, PSA licence number, guide prices, stats.

export const PHONE_DISPLAY = "01 800 0000";
export const PHONE_TEL = "tel:+35318000000";
export const PSA_LICENCE = "00000";

export type Link = { label: string; href: string };

export const NAV: Link[] = [
  { label: "Intruder alarms", href: "#/alarms" },
  { label: "CCTV", href: "#/cctv" },
  { label: "Fire detection", href: "#/fire" },
  { label: "Reviews", href: "#/reviews" },
  { label: "Questions", href: "#/questions" },
];

// Only links to pages that exist.
export const FOOTER_COLS: { title: string; links: Link[] }[] = [
  { title: "Services", links: [{ label: "Intruder alarms", href: "#/alarms" }, { label: "CCTV", href: "#/cctv" }, { label: "Fire detection", href: "#/fire" }, { label: "Request a survey", href: "#/survey" }] },
  { title: "Company", links: [{ label: "Reviews", href: "#/reviews" }, { label: "Questions", href: "#/questions" }, { label: "Call " + PHONE_DISPLAY, href: PHONE_TEL }] },
];

// Legal pages don't exist yet. Kept out of the footer until they do (launch blocker, see README).
export const LEGAL: Link[] = [];

export type Review = { quote: string; name: string; location: string; service: string };

export const REVIEWS: Review[] = [
  { quote: "I recently used Amptech to install an intruder alarm. The house has recently been updated and had no alarm previously. Amptech handled the whole thing. Neatly installed, would recommend.", name: "Brian W.", location: "Clonsilla, Dublin", service: "Intruder alarm" },
  { quote: "Largescale CCTV system installed. Very happy with choosing Amptech for this. They listened to my needs and provided a cost effective solution. The installation was professional and the support given once up and running has been second to none.", name: "Robert C.", location: "Donaghmede, Dublin", service: "CCTV" },
  { quote: "I had my outdated HKC alarm upgraded by Amptech. It was done quickly and the new alarm is very easy to use with lots of features.", name: "Mary T.", location: "Lucan, Co. Dublin", service: "Alarm upgrade" },
  { quote: "Amptech were able to add new windows and doors to our existing alarm after we had some home alteration work. Not a bother since.", name: "Dave G.", location: "Clonsilla, Dublin", service: "Alarm extension" },
  { quote: "Outdated panel and sensors replaced by Amptech. Very happy didn't have to change much to update. The two lads demonstrated the system and made sure I was satisfied before leaving. Very helpful, super stuff.", name: "Melanie R.", location: "Sutton, Dublin", service: "Panel replacement" },
  { quote: "We built a new warehouse for our regional distribution centre. Amptech conducted a survey and submitted a winning proposal for the best camera coverage, installation and support. All for a competitive price. Still a customer and would recommend.", name: "Retail goods distributor", location: "Co. Meath", service: "Commercial CCTV" },
  { quote: "Got CCTV, intruder alarm and smoke detectors installed. Top drawer service and products. Great value for money and sound advice on what we needed. Would highly recommend.", name: "Niall D.", location: "Google review", service: "Alarm, CCTV & fire" },
];
