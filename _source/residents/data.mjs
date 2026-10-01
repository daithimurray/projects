// Barnhall Meadows residents association · site content.
// Estate facts come from the research profile (/mnt/project-files/research/barnhall-meadows-profile.md),
// which was built from search results only: check every fact against its source before launch.
// Anything the committee still has to supply is a placeholder. Wrap it in ph() (see build.mjs)
// so it shows with a dotted underline in preview builds.
// Page map and copy: /mnt/project-files/content-plan/site-content-plan.md

export const site = {
  // Working name only. No formal association was found online; the committee confirms the real name.
  name: "Barnhall Meadows Residents' Association",
  shortName: 'Barnhall Meadows RA',
  estate: 'Barnhall Meadows',
  area: 'Leixlip, Co. Kildare',
  council: 'Kildare County Council',
  councilUrl: 'https://kildarecoco.ie/',
  district: 'Celbridge-Leixlip Municipal District',
  homes: 450,
  // Placeholder address on a reserved domain until the committee sets up a shared inbox.
  email: 'committee@example.com',
  // Public social pages, once the association has them. The current Facebook group is private, so it can't go here.
  facebook: null,
  instagram: null,
  replyDays: 5,
  meetingMonth: 'November',
  meetingRhythm: 'once a month',
  meetingVenue: 'Venue to be confirmed',
  garda: { name: 'Leixlip Garda Station', address: '19 Station Road, Leixlip', phone: '01 666 7800', tel: '+35316667800' },
  cluidUrl: 'https://www.cluid.ie/property/barnhall-meadows/',
  // Update when content changes. Shown in the footer so residents can see the site is looked after.
  lastUpdated: '2026-09-30',
};

// Facts about the estate, each with a source. Shown on Home.
export const impact = [
  { value: 450, label: 'homes in the estate when complete', source: 'An Bord Pleanála, ABP-300606 (2018)', placeholder: true },
  { value: 56, label: 'cost-rental homes run by Clúid Housing', source: 'Clúid Housing, 2021' },
  { value: 1743, label: 'the year the Wonderful Barn was built', source: 'The Wonderful Barn, Wikipedia' },
];

export const estateFacts = {
  title: 'Living beside the Wonderful Barn.',
  body: [
    'Barnhall Meadows was built by Glenveagh Homes on the former Wonderful Barn lands, off the Celbridge Road (R404). Planning permission for up to 450 homes, a crèche, green areas and a new roundabout on the R404 was granted in April 2018.',
    'The estate takes its name from Barnhall House and the Wonderful Barn beside it. Katherine Conolly of Castletown built the barn in 1743, probably as famine relief work. Its corkscrew stair winds around the outside, between two conical dovecotes.',
    'Owners, private renters and Clúid Housing tenants all live here, and the association is open to all of them.',
  ],
  sources: [
    ['An Bord Pleanála case ABP-300606', 'https://www.pleanala.ie/en-ie/case/300606'],
    ['Glenveagh: Barnhall Meadows', 'https://glenveagh.ie/developments/barnhall-meadows'],
    ['Clúid Housing: Barnhall Meadows', 'https://www.cluid.ie/property/barnhall-meadows/'],
    ['The Wonderful Barn (Wikipedia)', 'https://en.wikipedia.org/wiki/The_Wonderful_Barn'],
  ],
};

export const whatWeDo = [
  {
    title: 'A voice with the council.',
    body: 'We raise roads, street lights, green areas and planning with Kildare County Council, councillors and the developer. Our first job is getting the estate taken in charge.',
  },
  {
    title: 'Events on the estate.',
    body: 'Clean-ups, summer fun days, Halloween trails and the Christmas lights switch-on.',
  },
  {
    title: 'Minutes and updates in one place.',
    body: 'Meeting minutes, news and council notices, here and in the monthly update.',
  },
];

// The taking-in-charge campaign, shown as stair steps on Home and on the taking-in-charge post.
// status: done | now | next. When the council replies, update the statuses, latest and the post.
export const takingInCharge = {
  latest: 'September 2025',
  waitingOn: 'the council’s decision',
  steps: [
    {
      title: 'Planning permission granted',
      when: 'April 2018',
      body: 'An Bord Pleanála approved up to 450 homes, a crèche and green areas.',
      status: 'done',
      source: ['An Bord Pleanála, ABP-300606', 'https://www.pleanala.ie/en-ie/case/300606'],
    },
    {
      title: 'Residents move in',
      when: 'From 2020',
      whenPlaceholder: true,
      body: 'Until the estate is taken in charge, the developer looks after the roads, footpaths, street lights and green areas.',
      status: 'done',
    },
    {
      title: 'Council consultation',
      when: 'Nov to Dec 2024',
      body: 'Kildare County Council asked the public for views on taking the estate in charge.',
      status: 'done',
      source: ['Kildare County Council consultation', 'https://consult.kildarecoco.ie/en/consultation/taking-charge-roads-and-services-barnhall-meadows-leixlip'],
    },
    {
      title: 'Council decision',
      when: 'Waiting',
      body: 'The estate was still not taken in charge at the last update we found. We are asking the council for the current position.',
      status: 'now',
      source: ['Kildare Now, September 2025', 'https://www.kildarenow.com/news/councillor-asks-for-update-on-landscaping-works-at-kildares-wonderful-barn-9142973'],
    },
    {
      title: 'Taken in charge',
      when: 'Date not set',
      body: 'The council maintains the roads, footpaths, street lights, green areas and surface water drains.',
      status: 'next',
    },
  ],
};

// kind: news | council. sources: [label, url] pairs shown under the post.
// Council posts use researched facts. News posts are placeholders until the committee writes real ones.
export const posts = [
  {
    slug: 'taking-in-charge',
    kind: 'council',
    title: 'Taking in charge: where things stand',
    date: '2026-09-28',
    author: 'Committee',
    summary: 'The council has not yet taken the estate in charge. Until it does, the developer is responsible for roads, street lights and green areas.',
    body: [
      '“Taking in charge” is when the council takes responsibility for an estate’s roads, footpaths, street lights, green areas and surface water drains from the developer, and maintains them from then on.',
      'Kildare County Council ran a public consultation on taking Barnhall Meadows in charge from 19 November to 18 December 2024.',
      'The most recent council update we have found, from September 2025, said the estate was still not taken in charge.',
      'Until then, report problems with roads, street lights and green areas to the developer, and copy us so we can keep a record. We are asking the council for the current position and will post it here.',
    ],
    sources: [
      ['Kildare County Council consultation, Nov to Dec 2024', 'https://consult.kildarecoco.ie/en/consultation/taking-charge-roads-and-services-barnhall-meadows-leixlip'],
      ['Kildare Now, September 2025', 'https://www.kildarenow.com/news/councillor-asks-for-update-on-landscaping-works-at-kildares-wonderful-barn-9142973'],
    ],
  },
  {
    slug: 'wonderful-barn-park',
    kind: 'council',
    title: 'Plans for a public park at the Wonderful Barn',
    date: '2026-09-21',
    author: 'Committee',
    summary: 'The council’s plan to turn the Wonderful Barn lands into a public park was approved in October 2024. It includes a walking and cycling bridge over the M4.',
    body: [
      'Kildare County Council plans to turn about 19.8 hectares around the Wonderful Barn into a public park and heritage attraction. The plan covers the barn, Barnhall House, the two dovecotes, the walled garden, the courtyards and the parkland between the M4, the Celbridge Road and the estate.',
      'Councillors in the Celbridge-Leixlip Municipal District approved the plan (Part 8 scheme P82024.10) on 18 October 2024.',
      'It includes a walking and cycling bridge over the M4 to the Castletown Estate in Celbridge. The bridge’s final design needs approval from Transport Infrastructure Ireland.',
      'We have not seen a start date for the works. We will share one when the council publishes it.',
    ],
    sources: [
      ['Kildare County Council: The Wonderful Barn', 'https://kildarecoco.ie/AllServices/PublicRealm/TheWonderfulBarn/'],
      ['IrishCycle.com, December 2024', 'https://irishcycle.com/2024/12/02/cycle-paths-planned-to-connect-the-wonderful-barn-in-lexilip-to-castletown-estate-in-celbridge-via-new-bridge-over-the-m4/'],
    ],
  },
  {
    slug: 'first-public-meeting',
    kind: 'news',
    title: 'Help set up a residents association',
    date: '2026-09-14',
    author: 'Organisers',
    placeholder: true,
    summary: 'Our first public meeting is on Tuesday 17 November. Come along, have your say, and put your name forward for the committee.',
    body: [
      'Barnhall Meadows doesn’t have a formal residents association yet. We want to change that, so the estate has one voice with the council and the developer.',
      'Our first public meeting is on Tuesday 17 November at 7.30pm. Every resident is welcome, whether you own your home, rent privately or rent from Clúid Housing.',
      'We will agree a constitution, elect a committee, and choose our first priorities. Getting the estate taken in charge is top of the list.',
    ],
  },
  {
    slug: 'autumn-clean-up',
    kind: 'news',
    title: 'Community clean-up: Saturday 17 October',
    date: '2026-09-08',
    author: 'Organisers',
    placeholder: true,
    summary: 'Gloves, bags and litter pickers are provided, with tea and cake after.',
    body: [
      'Our autumn clean-up is on Saturday 17 October from 10am. We will split into small teams, one for each road, and finish by midday.',
      'Gloves, bags and litter pickers are provided. Children are welcome with an adult.',
    ],
  },
];

// All events are placeholders until the committee confirms dates and places.
export const events = [
  {
    slug: 'autumn-clean-up',
    title: 'Community clean-up',
    date: '2026-10-17',
    start: '10:00',
    end: '12:00',
    place: 'Meeting point to be confirmed',
    summary: 'Gloves, bags and litter pickers are provided, with tea and cake after.',
    body: [
      'We split into small teams, one per road, and finish by midday.',
      'Gloves, bags and litter pickers are provided. Children are welcome with an adult.',
    ],
    contact: 'organisers',
  },
  {
    slug: 'halloween-trail',
    title: 'Halloween trail',
    date: '2026-10-31',
    start: '17:30',
    end: '19:30',
    place: 'Starting point to be confirmed',
    summary: 'A lantern-lit trail around the estate for families. Houses taking part display a pumpkin sticker.',
    body: [
      'A lantern-lit trail around the estate for families. Houses taking part will display a pumpkin sticker in the window.',
      'Want your house on the trail? Let us know by 24 October and we will drop a sticker in.',
    ],
    contact: 'organisers',
  },
  {
    slug: 'first-public-meeting',
    title: 'First public meeting',
    date: '2026-11-17',
    start: '19:30',
    end: '21:00',
    place: 'Venue to be confirmed',
    summary: 'Set up the association, agree a constitution and elect a committee. All residents welcome.',
    body: [
      'We will agree a constitution, elect a committee and choose our first priorities.',
      'Every resident is welcome, whether you own your home, rent privately or rent from Clúid Housing.',
    ],
    contact: 'organisers',
  },
];

// Names stay placeholders until each person gives written consent to be published.
export const committee = [
  { role: 'Chairperson', line: 'Leads meetings and liaison with the council and the developer.' },
  { role: 'Secretary', line: 'Keeps minutes and handles correspondence.' },
  { role: 'Treasurer', line: 'Manages accounts and membership.' },
  { role: 'PRO', line: 'Runs the monthly update, the website and social media.' },
  { role: 'Road rep', line: 'The link between each road and the committee. Roads to be confirmed.' },
  { role: 'Clúid tenants’ rep', line: 'Raises issues for Clúid Housing tenants.' },
];

export const nextMeeting = { date: '2026-11-17', time: '7.30pm', venue: 'Venue to be confirmed' };

// file: a PDF under residents/docs/. url: an outside source. Neither shows "Coming soon".
export const documents = [
  { category: 'Constitution', items: [{ title: 'Constitution of the association', type: 'PDF', file: null }] },
  { category: 'Meeting minutes', items: [{ title: 'Minutes of the first public meeting', type: 'PDF', file: null }] },
  { category: 'Financial statements', items: [{ title: 'First financial statement', type: 'PDF', file: null }] },
  {
    category: 'Council and planning',
    items: [
      { title: 'Taking in charge consultation, Barnhall Meadows', source: 'Kildare County Council', date: '2024-11-19', type: 'Web page', url: 'https://consult.kildarecoco.ie/en/consultation/taking-charge-roads-and-services-barnhall-meadows-leixlip' },
      { title: 'Wonderful Barn redevelopment, Part 8 summary', source: 'Kildare County Council', date: '2024-10-18', type: 'PDF', url: 'https://kildarecoco.ie/AllServices/Planning/Part8Schemes/StrategicProjectsandPublicRealm/P8202410Part8-ProposedRedevelopmentofTheWonderfulBarnLeixlipCoKildare/2.%20Part%208%20Summary%20Sheet%20%20accessible.pdf' },
      { title: 'Planning permission for Barnhall Meadows, ABP-300606', source: 'An Bord Pleanála', date: '2018-04-13', type: 'PDF', url: 'https://www.pleanala.ie/anbordpleanala/media/abp/cases/orders/300/d300606.pdf' },
    ],
  },
  {
    category: 'Local guides',
    items: [
      { title: 'Bin collection schedule', type: 'PDF', file: null },
      { title: 'Useful numbers', type: 'PDF', file: null },
      { title: 'Estate map', type: 'PDF', file: null },
    ],
  },
];

export const faqs = [
  { q: 'Does it cost anything?', a: 'No. Membership is free for every household.' },
  { q: 'Do I have to attend meetings?', a: 'No. Attend when you can. Members get the minutes either way.' },
  { q: 'I rent. Can I join?', a: 'Yes. Every resident is welcome, whether you rent privately or from Clúid Housing.' },
  { q: 'How is my data used?', a: 'Only to contact you about association business. See our privacy notice.' },
];
