// All copy and facts for the Amptech site, in one place.
// Source of truth: _source/amptech/dossier.md and PRODUCT.md. "Company claim"
// items come from the client's own site and are on the pre-launch confirm list
// in README.md. Never add prices, aggregate ratings, customer counts or
// response-time promises here, and never call the company "Amptech Ltd".

export const company = {
  name: 'Amptech',
  // Verified on the PSA register. Company number and Eircode are Reported (SoloCheck); confirm before launch.
  legalName: 'Robert Farnan Electrical & Alarms Limited',
  tradingAs: 'Robert Farnan Electrical & Alarms Limited, trading as Amptech',
  companyNo: '501850',
  eircode: 'W23 N226',
  psaExpiry: 'April 2028',
  callout: '24/7 emergency call-out, 365 days a year',
  areas: ['Dublin', 'Kildare', 'Meath'],
  phoneDisplay: '01 615 5980',
  phoneIntl: '+353 1 615 5980',
  phoneHref: 'tel:+35316155980',
  psaLicence: '03019',
  standard: 'EN 50131-1',
  years: '20+',
  address: {
    street: '3 The Rise, Louisa Valley',
    town: 'Leixlip',
    county: 'Co. Kildare',
    country: 'Ireland',
    postalCountry: 'IE',
  },
  // The address is probably a home office: show it as the registered address only, never as a place to visit.
  // Approximate location of Leixlip, for the area map and JSON-LD.
  geo: { lat: 53.3659, lng: -6.4955 },
};

// Interface strings for the header, menu, pause control and mobile bar.
export const ui = {
  skip: 'Skip to content',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  menu: 'Menu',
  pause: 'Pause animations',
  play: 'Play animations',
  quickContact: 'Quick contact',
  call: 'Call',
};

export const nav = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#services', label: 'Services' },
  { href: '#upgrades', label: 'Upgrades' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export const hero = {
  title: 'Nobody reaches the door unseen.',
  lede:
    'Intruder alarms, CCTV, fire detection and security lighting for homes and businesses across Dublin, Kildare and Meath. Installed and looked after by a PSA-licensed installer from Leixlip, for over 20 years.',
  primary: { label: 'Call 01 615 5980', href: 'tel:+35316155980' },
  secondary: { label: 'Request a quote', href: '#contact' },
  proof: ['PSA licence 03019', 'Certificate of Compliance with every intruder install', '24/7 emergency call-out'],
  hintPointer: 'Walk onto the driveway',
  hintTouch: 'Tap the driveway',
  camLabel: 'CAM 01 · DRIVEWAY',
  sceneLabel:
    'Illustration: two semi-detached houses at night. A motion sensor switches on a floodlight over the driveway and a CCTV camera turns to follow whatever moves.',
};

// The "system check" strip under the hero.
export const trust = [
  { label: 'PSA licensed', value: 'Licence 03019, valid to 2028' },
  { label: 'Certificate of Compliance', value: 'Uniquely numbered, for your insurer' },
  { label: '24/7 call-out', value: '365 days a year' },
  { label: 'Over 20 years', value: 'Big jobs, small jobs and everywhere in between' },
  { label: 'Leixlip based', value: 'Dublin, Kildare and Meath' },
];

export const anatomy = {
  title: 'One house. Every way in, covered.',
  lede:
    'A good system is designed around how your home is actually used. Scroll through a typical install and watch each part do its job.',
  steps: [
    {
      id: 'contacts',
      zone: 'Zone 1 · Front door',
      title: 'Door and window contacts',
      body: 'Magnetic contacts on doors and windows. Open one while the system is armed and the alarm knows exactly which one.',
    },
    {
      id: 'motion',
      zone: 'Zone 2 · Hall',
      title: 'Motion detectors',
      body: 'PIR detectors cover halls, landings and open-plan rooms. Set the system to guard downstairs only while you sleep upstairs.',
    },
    {
      id: 'cctv',
      zone: 'Cam 1 · Driveway',
      title: 'CCTV',
      body: 'Cameras on the driveway, doors and back garden record day and night, so you can see what happened, not just that something did.',
    },
    {
      id: 'fire',
      zone: 'Zone 5 · Landing',
      title: 'Fire detection',
      body: 'Smoke and heat detectors raise the alarm early, whether or not the intruder alarm is set.',
    },
    {
      id: 'deterrent',
      zone: 'External',
      title: 'Siren and security lighting',
      body: 'A bell box on the front wall and floodlights on the approach make it plain the house is protected, before and during an alarm.',
    },
    {
      id: 'app',
      zone: 'HKC app',
      title: 'Alerts on your phone',
      body: 'With the HKC app you can set and unset the alarm, check the log and see images from anywhere. Alerts and messages reach your phone as audible and text notifications.',
    },
  ],
  footnote: 'Every intruder system we fit comes with a uniquely numbered Certificate of Compliance.',
};

export const services = {
  title: 'What we install and look after',
  lede: 'For homes, shops, offices, workshops and warehouses. New systems, or the one already on your wall.',
  // Two groups, using the client's own service names where they exist
  // (Security, System Upgrades, Maintenance, Monitoring Services).
  groups: [
    {
      id: 'install',
      title: 'New systems',
      items: [
        {
          id: 'intruder',
          name: 'Intruder alarms',
          body: 'Wired and wireless alarms for homes, businesses and industrial sites, with key fobs, 24-hour panic alarms and a Certificate of Compliance on completion.',
        },
        {
          id: 'cctv',
          name: 'CCTV',
          body: 'High-resolution, low-light cameras for driveways, entrances, yards and warehouses. Surveyed, installed and supported.',
        },
        {
          id: 'fire',
          name: 'Fire detection',
          body: 'Smoke and heat detection reviewed, designed and upgraded to bring homes and premises up to code.',
        },
        {
          id: 'lighting',
          name: 'Security lighting',
          body: 'Floodlights and security lighting that make the approach to your property hard to use unseen.',
        },
        {
          id: 'access',
          name: 'Access control',
          body: 'Controlled entry for offices, units and warehouses. Access control is one of the categories on our PSA licence.',
          for: ['Businesses'],
        },
      ],
    },
    {
      id: 'care',
      title: 'Looking after them',
      items: [
        {
          id: 'upgrades',
          name: 'System upgrades',
          body: 'Repair or upgrade the system you already have, or extend it after building work.',
          href: '#upgrades',
        },
        {
          id: 'maintenance',
          name: 'Maintenance',
          body: 'Contracted annual inspections of intruder alarms, fire alarms, CCTV and fire extinguishers, with a detailed engineer’s report after every service.',
        },
        {
          id: 'monitoring',
          name: 'Monitoring services',
          body: '24/7 monitored systems with keyholder calls and a Garda Unique Reference Number, so a confirmed alarm can get a Garda response. Or a GSM unit that texts your phone, with no landline and no monitoring fee.',
        },
        {
          id: 'callout',
          name: '24/7 call-out',
          body: 'Emergency call-out, 24 hours a day, 365 days a year, on 01 615 5980.',
        },
        {
          id: 'app',
          name: 'HKC mobile app',
          body: 'Set and unset, check the log, and get alerts and images from anywhere.',
          for: ['HKC systems'],
          href: '#app',
        },
      ],
    },
  ],
};

export const upgrade = {
  title: 'Old alarm? Upgrade it. Don’t rip it out.',
  lede:
    'Replace an outdated panel and sensors, add doors and windows after an extension, or move old CCTV to high-resolution, low-light cameras. Tell us what’s on the wall and we’ll tell you what can be kept.',
  beforeLabel: 'Before',
  afterLabel: 'After',
  beforeCaption: 'An ageing keypad showing a fault',
  afterCaption: 'A modern HKC keypad, with the app on your phone',
  sliderLabel: 'Compare the old keypad with the upgraded one',
  illustrationNote: 'Illustration',
  cta: { label: 'Ask about an upgrade', href: '#contact' },
};

// Customer testimonials, verbatim from the client's site (amptech.ie/whatourcustomerssay/).
// Do not edit the wording, and never attribute one customer's words to another's job.
export const testimonials = {
  brian: {
    quote:
      'I recently used Amptech to install an intruder alarm. The house has recently been updated and had no alarm previously. Amptech handled the whole thing. Neatly installed, would recommend.',
    name: 'Brian W.',
    place: 'Clonsilla, Dublin',
    job: 'New intruder alarm',
  },
  robert: {
    quote:
      'Largescale CCTV system installed. Very happy with choosing Amptech for this. They listened to my needs and provided a cost effective solution. The installation was professional and the support given once up and running has been second to none.',
    name: 'Robert C.',
    place: 'Donaghmede, Dublin',
    job: 'Large-scale CCTV system',
  },
  mary: {
    quote:
      'I had my outdated HKC alarm upgraded by Amptech. It was done quickly and the new alarm is very easy to use with lots of features.',
    name: 'Mary T.',
    place: 'Lucan, Co. Dublin',
    job: 'Outdated HKC alarm upgraded',
  },
  dave: {
    quote:
      'Amptech were able to add new windows and doors to our existing alarm after we had some home alteration work. Not a bother since.',
    name: 'Dave G.',
    place: 'Clonsilla, Dublin',
    job: 'Doors and windows added to an existing alarm',
  },
  melanie: {
    quote:
      'Outdated panel and sensors replaced by Amptech. Very happy didn’t have to change much to update. The two lads demonstrated the system and made sure I was satisfied before leaving. Very helpful, super stuff.',
    name: 'Melanie R.',
    place: 'Sutton, Dublin',
    job: 'Old panel and sensors replaced',
  },
  distributor: {
    quote:
      'We built a new warehouse for our regional distribution centre. Amptech conducted a survey and submitted a winning proposal for the best camera coverage, installation and support. All for a competitive price. Still a customer and would recommend.',
    name: 'Retail goods distributor',
    place: 'Co. Meath',
    job: 'CCTV for a new distribution warehouse',
  },
};

// Google reviews supplied by the client. Each is 5/5. There is no confirmed
// total or average, so never show one. Rating-only reviews are not quoted.
export const googleReviews = [
  {
    quote:
      'Got CCTV, intruder alarm and smoke detectors installed. Top drawer service and products. Great value for money and sound advice on what we needed. Would highly recommend.',
    name: 'Google reviewer',
    job: 'CCTV, intruder alarm and smoke detectors',
    rating: 5,
  },
  {
    quote: 'Did a great job on our lighting in the workshop reception and in the unit repair bay of our workshop.',
    name: 'McCoy Motors',
    job: 'Workshop lighting',
    rating: 5,
  },
];

// Upgrade section: the three testimonials about upgrading an existing system.
export const upgradeVoices = ['melanie', 'mary', 'dave'];

// The reviews section. Heading and lede adapted from the client's own testimonials page.
export const voices = {
  title: 'Big jobs, small jobs and everywhere in between.',
  lede: 'We’ve made and kept a lot of happy customers over the years. Don’t take our word for it.',
  featured: ['robert', 'brian', 'distributor'],
  googleLabel: 'Google review',
  siteLabel: 'From amptech.ie',
  ratingLabel: '5 out of 5',
};

export const app = {
  title: 'Your alarm, in your pocket.',
  lede:
    'On HKC systems, the HKC app lets you set and unset your alarm, check the log and capture images from anywhere. Alerts, images and messages reach your phone as audible and text notifications.',
  points: ['Set and unset from anywhere', 'Alerts and images the moment something happens', 'Check the log, and capture an image on demand'],
  demoButton: 'Send a test alert',
  illustrationNote: 'Illustration of the HKC app. Not a live system.',
  // Synthetic demo feed for the phone illustration.
  feed: [
    { time: '18:02', title: 'Front door opened', detail: 'Zone 1 · System disarmed' },
    { time: '23:10', title: 'System armed', detail: 'Night mode · Downstairs guarded' },
    { time: '02:14', title: 'Motion on the driveway', detail: 'Cam 1 · Image attached', image: true },
  ],
};

export const process = {
  title: 'From first call to certificate',
  lede: 'What happens after you pick up the phone.',
  // The client's own policy statement (About Us), with "Its" corrected.
  policy:
    'It’s our policy to provide each and every one of our clients with the best possible service – from the time of survey through to completion of installation with ongoing backup, service and maintenance.',
  policyCite: 'Amptech’s policy',
  steps: [
    {
      title: 'Call or send a request',
      body: 'Ring 01 615 5980 or use the form. Tell us about the property and what’s worrying you.',
    },
    {
      title: 'A survey, then a proposal',
      body: 'We look at the property, listen to what you need, and give you a clear, competitive quote.',
    },
    {
      title: 'Neat, professional installation',
      body: 'Fitted and tested, then demonstrated before we leave, so you know exactly how to use it.',
    },
    {
      title: 'Certificate of Compliance',
      body: 'Every intruder system gets a uniquely numbered certificate. Your insurer may ask for it, and it may help with your premium.',
    },
    {
      title: 'Backup, service and maintenance',
      body: 'Maintenance contracts, repairs, upgrades and a 24/7 call-out, from the company that fitted it.',
    },
  ],
  certificate: {
    title: 'Certificate of Compliance',
    rows: [
      ['Certificate no.', '000000'],
      ['System', 'Intruder alarm'],
      ['Standard', 'EN 50131-1'],
      ['Installer', 'Amptech'],
      ['PSA licence', '03019'],
    ],
    specimen: 'Specimen',
  },
};

export const about = {
  title: 'Leixlip-based. Working countrywide.',
  body: [
    'Amptech is the trading name of Robert Farnan Electrical & Alarms Limited, a PSA-licensed installer based in Leixlip, on the Kildare edge of Dublin. For over 20 years we’ve done big jobs, small jobs and everywhere in between: alarms, CCTV and fire systems for homes and businesses throughout the country.',
    'Customers include homes in Clonsilla, Lucan, Donaghmede and Sutton, and a regional distribution warehouse in Co. Meath.',
  ],
  facts: [
    { label: 'Company', value: 'Robert Farnan Electrical & Alarms Limited, trading as Amptech' },
    { label: 'Registered address', value: '3 The Rise, Louisa Valley, Leixlip, Co. Kildare, W23 N226' },
    { label: 'Phone', value: '01 615 5980', href: 'tel:+35316155980' },
    { label: 'PSA licence', value: '03019, valid to April 2028' },
  ],
  mapLabel: 'Map of Ireland showing Amptech’s base in Leixlip, Co. Kildare, and coverage across the country.',
};

export const faq = {
  title: 'Questions people ask before they call',
  items: [
    {
      q: 'Can you upgrade the alarm I already have?',
      a: 'Often, yes, and we can add new doors and windows to it after an extension. Tell us the make and model if you know it, or describe the keypad, and we’ll advise.',
    },
    {
      q: 'What if my alarm goes off in the middle of the night?',
      a: 'Call 01 615 5980. We run a 24/7 emergency call-out, 365 days a year.',
    },
    {
      q: 'Are you licensed?',
      a: 'Yes. Amptech is the trading name of Robert Farnan Electrical & Alarms Limited, licensed by the Private Security Authority under licence number 03019. The licence covers intruder alarms, CCTV and access control.',
    },
    {
      q: 'What do I get when the installation is finished?',
      a: 'A demonstration of the system before we leave. For intruder alarms, you also get a uniquely numbered Certificate of Compliance to EN 50131-1. Your insurer may ask for it, and it may help with your premium.',
    },
    {
      q: 'Can my alarm be monitored?',
      a: 'Yes. We offer 24/7 monitored systems that call your designated keyholders and can carry a Garda Unique Reference Number (URN), so a confirmed alarm can get a Garda response. If you’d rather not pay for monitoring, a GSM unit can text alerts straight to your phone, with no landline and no annual fee.',
    },
    {
      q: 'Can I check my alarm from my phone?',
      a: 'Yes, if it’s an HKC system: the HKC mobile app lets you set and unset it, check the log and see images from anywhere. On any system, a GSM unit can text alerts to your phone. Have a different make? Ask us about an upgrade.',
    },
    {
      q: 'Do you do maintenance contracts?',
      a: 'Yes. Under contract we inspect intruder alarms, fire alarms, CCTV and fire extinguishers every year, and send a detailed engineer’s report after each service.',
    },
    {
      q: 'Do you work with businesses?',
      a: 'Yes, from shops and workshops to a regional distribution warehouse. We install and maintain intruder alarms, CCTV, fire detection and access control for commercial and industrial premises as well as homes.',
    },
    {
      q: 'What areas do you cover?',
      a: 'We’re based in Leixlip, Co. Kildare. Our customers include homes in Clonsilla, Lucan, Donaghmede and Sutton and businesses in Co. Meath, and we work throughout the country.',
    },
    {
      q: 'How much does a system cost?',
      a: 'It depends on the property and what you need. Call 01 615 5980 or send a request and we’ll give you a competitive quote.',
    },
  ],
};

export const contact = {
  title: 'Tell us about the property.',
  lede: 'Call for a competitive quote, or send the details and we’ll ring you back.',
  emergency: 'Alarm going off? Our 24/7 emergency call-out runs 365 days a year, on the same number.',
  propertyTypes: ['Home', 'Business'],
  interests: [
    'Intruder alarm',
    'CCTV',
    'Fire detection',
    'Security lighting',
    'Access control',
    'Upgrade or extension',
    'Maintenance',
    'Monitoring',
    'Not sure yet',
  ],
  submit: 'Send request',
  consent: 'We use these details only to reply to your request.',
  success: 'Thanks. Your request is in. We’ll ring you back.',
  notConnected: 'This form isn’t connected yet. Please call 01 615 5980 and we’ll take the details by phone.',
  error: 'Something went wrong sending that. Please try again, or call 01 615 5980.',
};

export const footer = {
  tagline: 'Intruder alarms, CCTV, fire detection and security lighting. Leixlip, Co. Kildare.',
  // Irish company websites must show the registered name, number and office (Companies Act 2014, s. 151).
  legal:
    'Amptech is the trading name of Robert Farnan Electrical & Alarms Limited. Registered in Ireland, no. 501850. Registered office: 3 The Rise, Louisa Valley, Leixlip, Co. Kildare, W23 N226.',
  copyright: '© 2026 Robert Farnan Electrical & Alarms Limited',
};

// Hero scene overlay: the CCTV on-screen display. Data voice only.
export const heroScene = {
  motionLabel: 'MOTION · DRIVEWAY',
  trackLabel: 'MOTION',
  rec: 'REC',
};

// Labels for the "How it works" drawing. Illustration only: the house, the
// times and the notification are generic demo data, not a real install.
export const anatomyArt = {
  label:
    'Illustration: a cross-section of a two-storey semi-detached house at night. Magnetic contacts sit on the front door and a window, a motion detector watches the hall, a CCTV camera on the front wall covers the driveway, a smoke detector is fitted to the landing ceiling, a bell box and a floodlight are mounted outside, and an alert arrives on a phone.',
  sheetTitle: 'Section A–A',
  sheetNote: 'Typical semi-detached house · Illustration',
  open: 'Open',
  camTime: '02:14:07',
  rec: 'Rec',
  phone: {
    clock: '02:14',
    title: 'Motion · Hall',
    time: '02:14',
    detail: 'Zone 2 · Image attached',
    note: 'Illustration',
  },
};


// ---------- Services, trust strip and upgrade: interface strings ----------

// The panel self-test on the trust strip. Visual only; the list carries the facts.
export const trustCheck = {
  title: 'Credentials',
  checking: 'System check',
  ok: 'All zones OK',
};

export const servicesUi = {
  forLabel: 'Suitable for:',
  links: {
    upgrades: 'See an upgrade',
    app: 'See the app',
  },
  call: 'Call 01 615 5980',
  quote: 'Request a quote',
};

// Text drawn inside the before/after keypad illustration. Generic demo data, labelled "Illustration".
export const upgradeScene = {
  stageLabel:
    'Illustration. Before: a yellowed beige alarm keypad with worn number keys, its small grey-green display blinking FAULT and a red light on. After: the same wall with a slim dark touchscreen keypad showing the system armed in night mode with every zone OK, and a phone beside it showing an app notification.',
  lcd: 'FAULT',
  status: 'Armed · Night',
  time: '23:10',
  zones: [
    ['Z1 Front door', 'OK'],
    ['Z2 Hall', 'OK'],
    ['Z3 Back door', 'OK'],
  ],
  modes: ['Away', 'Night', 'Off'],
  notifyApp: 'Alarm',
  notifyWhen: 'now',
  notifyTitle: 'System armed',
  notifyBody: ['Night mode', 'Downstairs guarded'],
  // {before} and {after} are replaced with percentages for screen readers.
  valueText: 'Old keypad {before}%, upgraded keypad {after}%',
};


// Phone illustration in the App section. Synthetic demo data, labelled as an illustration.
export const appDemo = {
  status: 'Armed',
  mode: 'Night mode',
  clock: '02:14',
  feedLabel: 'Notifications',
  camLabel: 'CAM 1',
  camTime: '02:14:07',
  test: { title: 'Test alert', detail: 'Sent from this page', time: 'Just now', earlier: 'Earlier' },
  announce: 'Test alert received on the phone illustration.',
  phoneLabel: 'Illustration: a phone showing an alarm app, armed in night mode, with a feed of recent notifications.',
  stillLabel: 'Illustration: an infrared camera still of a driveway at night, with a person walking towards the house.',
};

// The end of the Process cable run: a specimen certificate, then the next step.
export const processDemo = {
  finale: 'It starts with a phone call.',
  signature: 'Signed for the installer',
  stampRing: 'Specimen',
  certNote: 'Specimen shown for illustration. Not a real certificate.',
};


// ---- About map, FAQ aside, contact form, footer and privacy notice ----
// (appended by the about / FAQ / contact / footer builder)

export const aboutMap = {
  place: 'Leixlip',
  scale: '100 km',
};

export const faqAside = {
  ask: 'Still have a question?',
  call: 'Call 01 615 5980',
  or: 'Or send the details and we’ll ring you back',
};

export const contactForm = {
  callLabel: 'Call Amptech on',
  addressLabel: 'Registered address',
  licence: 'PSA licence 03019',
  required: 'Fields marked * are required.',
  fields: {
    name: 'Your name',
    phone: 'Phone number',
    phoneHint: 'So we can ring you back.',
    email: 'Email',
    optional: 'optional',
    propertyType: 'Property type',
    interests: 'What are you interested in?',
    interestsHint: 'Tick any that apply.',
    area: 'Town or area',
    areaHint: 'For example, Leixlip or Lucan.',
    message: 'Anything else we should know?',
    messageHint: 'The make of your current alarm, what’s worrying you, a good time to call.',
    honeypot: 'Leave this field empty',
  },
  errors: {
    name: 'Please enter your name.',
    phone: 'Please enter a phone number so we can ring you back.',
    phoneFormat: 'That number doesn’t look right. Use digits, with spaces if you like.',
    email: 'That email address doesn’t look right. Check it, or leave it blank.',
  },
  sending: 'Sending…',
  privacyLead: 'See our',
  privacyLink: 'privacy notice',
  successTitle: 'Request sent',
  urgent: 'If it’s urgent, call 01 615 5980.',
  noscript: 'This form needs JavaScript to send. Please call 01 615 5980 and we’ll take the details by phone.',
};

export const footerLinks = {
  explore: 'Explore',
  extra: [{ href: '#faq', label: 'Questions' }],
  contact: 'Contact',
  credentials: 'Credentials',
  credentialsList: ['PSA licence 03019', 'Certificate of Compliance with every intruder install', '24/7 emergency call-out'],
  privacy: 'Privacy notice',
  top: 'Back to top',
};

// Privacy notice. Each paragraph is a list of parts: a string, a link
// ({ link, href }), or a placeholder Amptech must confirm before launch ({ tbc }).
const privacyTel = { link: '01 615 5980', href: 'tel:+35316155980' };
export const privacy = {
  title: 'Privacy notice',
  metaTitle: 'Privacy notice | Amptech, Leixlip, Co. Kildare',
  description: 'How Amptech (Robert Farnan Electrical & Alarms Limited) handles the details you send through the quote form on this website.',
  intro: 'How Amptech handles the details you send through this website.',
  draftTitle: 'Draft for Amptech to confirm before launch',
  draftBody:
    'The highlighted items are placeholders. Confirm them, and check the rest against how you actually work, before this page goes live.',
  updated: ['Last updated: ', { tbc: 'date to confirm' }],
  back: 'Back to the home page',
  sections: [
    {
      title: 'Who we are',
      paragraphs: [
        [
          'Robert Farnan Electrical & Alarms Limited, trading as Amptech, 3 The Rise, Louisa Valley, Leixlip, Co. Kildare, W23 N226 (registered in Ireland, no. 501850), is the controller of the personal data described here. You can reach us on ',
          privacyTel,
          ' or by email at ',
          { tbc: 'email address to confirm' },
          '. We are licensed by the Private Security Authority, licence number 03019.',
        ],
      ],
    },
    {
      title: 'What the quote form collects',
      paragraphs: [
        [
          'Your name and phone number. If you choose to give them, also your email address, the type of property, the services you’re interested in, your town or area, and anything you write in the message.',
        ],
        ['You don’t have to give us your details, but without a name and phone number we can’t ring you back.'],
      ],
    },
    {
      title: 'Why we use it',
      paragraphs: [
        [
          'Only to reply to your request: to ring you back, answer your questions and give you a quote. We don’t use it for marketing, and we don’t sell it or share it with anyone for their own use.',
        ],
        [
          'Our legal basis is taking steps at your request before a possible contract (Article 6(1)(b) of the GDPR). ',
          { tbc: 'Amptech to confirm the legal basis' },
        ],
      ],
    },
    {
      title: 'Who sees it',
      paragraphs: [
        [
          'The Amptech team dealing with your request. The form is delivered to us by ',
          { tbc: 'form service provider, name and location to confirm' },
          ', which handles it on our behalf and may not use it for anything else. ',
          { tbc: 'if the form service stores data outside the EEA, name the safeguard (for example the EU–US Data Privacy Framework or Standard Contractual Clauses)' },
        ],
      ],
    },
    {
      title: 'How long we keep it',
      paragraphs: [
        ['We keep enquiry details for ', { tbc: 'retention period to confirm' }, ' and then delete them, unless you become a customer.'],
      ],
    },
    {
      title: 'This website',
      paragraphs: [
        [
          'This website sets no cookies and uses no analytics or tracking. Fonts are served from this website, not from a third party. ',
          { tbc: 'update this if analytics are added' },
        ],
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        [
          'Under the GDPR you can ask for a copy of the personal data we hold about you, ask us to correct or delete it, ask us to restrict its use, or ask for the details you gave us in a common electronic format so you can take them elsewhere (data portability).',
        ],
        [
          'If you’re unhappy with how we’ve handled your data, you can complain to the Data Protection Commission at ',
          { link: 'dataprotection.ie', href: 'https://www.dataprotection.ie' },
          '.',
        ],
      ],
    },
    {
      title: 'How to contact us',
      paragraphs: [
        [
          'To use any of these rights, or with a question about this notice, call us on ',
          privacyTel,
          ' or write to Amptech Ltd, 3 The Rise, Louisa Valley, Leixlip, Co. Kildare. ',
          { tbc: 'email address to confirm' },
        ],
      ],
    },
  ],
};
