// All copy and facts for the Amptech site, in one place.
// Facts come from public search results of the live amptech.ie (the build
// environment could not fetch it). Verify against the live site before launch.
// Never add prices, star ratings, customer counts or response-time promises here.

export const company = {
  name: 'Amptech',
  legalName: 'Amptech Ltd',
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
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=3+The+Rise+Louisa+Valley+Leixlip+Co.+Kildare',
  // Approximate location of Leixlip, for the area map and JSON-LD.
  geo: { lat: 53.3659, lng: -6.4955 },
};

export const nav = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#services', label: 'Services' },
  { href: '#upgrades', label: 'Upgrades' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export const hero = {
  title: 'Nobody reaches the door unseen.',
  lede:
    'Intruder alarms, CCTV, fire detection and security lighting for homes and businesses. Designed, installed and certified by a PSA-licensed team from Leixlip, for over 20 years.',
  primary: { label: 'Call 01 615 5980', href: 'tel:+35316155980' },
  secondary: { label: 'Request a quote', href: '#contact' },
  proof: ['PSA licence 03019', 'Certified to EN 50131-1', 'Certificate of Compliance with every intruder install'],
  hintPointer: 'Walk onto the driveway',
  hintTouch: 'Tap the driveway',
  camLabel: 'CAM 01 · DRIVEWAY',
  sceneLabel:
    'Illustration: two semi-detached houses at night. A motion sensor switches on a floodlight over the driveway and a CCTV camera turns to follow whatever moves.',
};

// The "system check" strip under the hero.
export const trust = [
  { label: 'PSA licensed', value: 'Licence no. 03019' },
  { label: 'EN 50131-1', value: 'Every intruder system conforms' },
  { label: 'Certificate of Compliance', value: 'Issued when the job is done' },
  { label: 'Over 20 years', value: 'Installing and maintaining countrywide' },
  { label: 'Leixlip based', value: '3 The Rise, Louisa Valley' },
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
      body: 'Smoke and heat detectors raise the alarm early, whether or not the intruder alarm is armed.',
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
      body: 'With the HKC app, alarm alerts, images and messages reach your phone as audible and text notifications. Check on the house from anywhere.',
    },
  ],
  footnote: 'Every intruder system we fit conforms to EN 50131-1 and comes with a Certificate of Compliance.',
};

export const services = {
  title: 'What we install and look after',
  lede: 'For homes, shops, offices and industrial units. New systems, or the one already on your wall.',
  items: [
    {
      id: 'intruder',
      name: 'Intruder alarms',
      body: 'Alarm systems for domestic, commercial and industrial property, with a Certificate of Compliance on completion.',
      for: ['Homes', 'Businesses'],
    },
    {
      id: 'cctv',
      name: 'CCTV',
      body: 'Camera systems for driveways, entrances, yards and shop floors. Installed, set up and maintained.',
      for: ['Homes', 'Businesses'],
    },
    {
      id: 'fire',
      name: 'Fire detection',
      body: 'Fire detection systems installed and maintained for homes and commercial premises.',
      for: ['Homes', 'Businesses'],
    },
    {
      id: 'lighting',
      name: 'Security lighting',
      body: 'Floodlights and security lighting that make the approach to your property hard to use unseen.',
      for: ['Homes', 'Businesses'],
    },
    {
      id: 'upgrades',
      name: 'Repairs and upgrades',
      body: 'We repair and upgrade many of the systems already fitted in Ireland. You don’t always need to start again.',
      for: ['Existing systems'],
      href: '#upgrades',
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      body: 'Servicing that keeps a system working the way it was installed, year after year.',
      for: ['Homes', 'Businesses'],
    },
    {
      id: 'app',
      name: 'HKC mobile app',
      body: 'Alerts, images and messages from your alarm, on your phone, wherever you are.',
      for: ['HKC systems'],
      href: '#app',
    },
  ],
};

export const upgrade = {
  title: 'Old alarm? Upgrade it. Don’t rip it out.',
  lede:
    'We repair and upgrade many of the systems already fitted in Irish homes and businesses. Tell us what’s on the wall and we’ll tell you what can be repaired, upgraded or kept.',
  beforeLabel: 'Before',
  afterLabel: 'After',
  beforeCaption: 'An ageing keypad showing a fault',
  afterCaption: 'A modern HKC keypad, with the app on your phone',
  sliderLabel: 'Compare the old keypad with the upgraded one',
  illustrationNote: 'Illustration',
  cta: { label: 'Ask about an upgrade', href: '#contact' },
};

export const testimonial = {
  quote:
    'Very happy with choosing Amptech for this. They listened to my needs and provided a cost effective solution. The installation was professional and the support given once up and running has been second to none.',
  name: 'Robert C.',
  place: 'Donaghmede, Dublin',
  job: 'Outdated HKC alarm upgraded',
};

export const app = {
  title: 'Your alarm, in your pocket.',
  lede:
    'With the HKC app you can check on your alarm from anywhere. Alarm alerts, images and messages come straight to your phone, as audible and text notifications.',
  points: ['Check the system from anywhere', 'Alerts the moment something happens', 'Images and messages, not just a beep'],
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
  steps: [
    {
      title: 'Call or send a request',
      body: 'Ring 01 615 5980 or use the form. Tell us about the property and what’s worrying you.',
    },
    {
      title: 'We listen, then design',
      body: 'A system sized to the property and to how you use it, with a clear, competitive quote.',
    },
    {
      title: 'Professional installation',
      body: 'Fitted, tested and handed over properly.',
    },
    {
      title: 'Certificate of Compliance',
      body: 'Every intruder system comes with a certificate: evidence it was installed by a professional company to the appropriate standard.',
    },
    {
      title: 'Support that continues',
      body: 'Maintenance, repairs and upgrades after the install, from the same company that fitted it.',
    },
  ],
  certificate: {
    title: 'Certificate of Compliance',
    rows: [
      ['System', 'Intruder alarm'],
      ['Standard', 'EN 50131-1'],
      ['Installer', 'Amptech Ltd'],
      ['PSA licence', '03019'],
    ],
    specimen: 'Specimen',
  },
};

export const about = {
  title: 'Leixlip-based. Working countrywide.',
  body: [
    'Amptech is a PSA-licensed company based in Leixlip, on the Kildare edge of Dublin. For over 20 years we’ve installed and maintained CCTV, intruder and fire systems for homes and businesses throughout the country.',
    'We fit new systems, and we repair and upgrade many of the ones already installed.',
  ],
  facts: [
    { label: 'Address', value: '3 The Rise, Louisa Valley, Leixlip, Co. Kildare' },
    { label: 'Phone', value: '01 615 5980', href: 'tel:+35316155980' },
    { label: 'PSA licence', value: '03019' },
    { label: 'Standard', value: 'EN 50131-1' },
  ],
  mapLabel: 'Map of Ireland showing Amptech’s base in Leixlip, Co. Kildare, and coverage across the country.',
};

export const faq = {
  title: 'Questions people ask before they call',
  items: [
    {
      q: 'Can you upgrade the alarm I already have?',
      a: 'Often, yes. We repair and upgrade many of the systems already installed in Ireland. Tell us the make and model if you know it, or describe the keypad, and we’ll advise.',
    },
    {
      q: 'Are you licensed?',
      a: 'Yes. Amptech is licensed by the Private Security Authority. Our licence number is 03019.',
    },
    {
      q: 'What do I get when the installation is finished?',
      a: 'Every intruder system we install comes with a Certificate of Compliance. It is evidence that the system was installed by a professional company and meets the appropriate standard, EN 50131-1.',
    },
    {
      q: 'Can I check my alarm from my phone?',
      a: 'Yes, with the HKC mobile app. It sends alarm alerts, images and messages to your phone as audible and text notifications, so you can check on the system from anywhere.',
    },
    {
      q: 'Do you work with businesses?',
      a: 'Yes. We install and maintain intruder alarms, CCTV and fire detection for commercial and industrial premises as well as homes.',
    },
    {
      q: 'What areas do you cover?',
      a: 'We’re based in Leixlip, Co. Kildare, and work throughout the country.',
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
  propertyTypes: ['Home', 'Business'],
  interests: ['Intruder alarm', 'CCTV', 'Fire detection', 'Security lighting', 'Repair or upgrade', 'Not sure yet'],
  submit: 'Send request',
  consent: 'We use these details only to reply to your request.',
  success: 'Thanks. Your request is in. We’ll ring you back.',
  notConnected: 'This form isn’t connected yet. Please call 01 615 5980 and we’ll take the details by phone.',
  error: 'Something went wrong sending that. Please try again, or call 01 615 5980.',
};

export const footer = {
  tagline: 'Intruder alarms, CCTV, fire detection and security lighting. Leixlip, Co. Kildare.',
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
