// Hawthorn Green Residents' Association · site content.
// Everything estate-specific is a placeholder until the committee supplies the real detail.
// Wrap placeholder text in ph() (see build.mjs) so it shows with a dotted underline in preview builds.
// Source of the copy: /mnt/project-files/content-plan/site-content-plan.md

export const site = {
  name: "Hawthorn Green Residents' Association",
  shortName: 'Hawthorn Green RA',
  estate: 'Hawthorn Green',
  area: 'Co. Kildare',
  council: 'Kildare County Council',
  councilUrl: 'https://kildarecoco.ie/',
  homes: 412,
  founded: 1998,
  email: 'hello@hawthorngreen-ra.ie',
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
  replyDays: 5,
  meetingMonth: 'November',
  meetingRhythm: 'on the first Tuesday of every month',
  meetingVenue: 'Hawthorn Green Community Centre',
  garda: 'your local Garda station',
  // Update when content changes. Shown on Home so residents can see the site is looked after.
  lastUpdated: '2026-09-30',
  roads: ['Hawthorn Avenue', 'Hawthorn Close', 'Blackthorn Drive', 'Elder Grove', 'Rowan Court', 'The Green'],
};

export const impact = [
  { value: 412, label: 'homes represented' },
  { value: 9, label: 'events this year' },
  { value: 23, label: 'issues resolved with the council' },
];

export const whatWeDo = [
  {
    title: 'A voice with the council.',
    body: 'We raise issues on roads, lighting, green spaces and planning with the council and local reps.',
  },
  {
    title: 'Events that bring people together.',
    body: 'Clean-ups, summer fun days, Halloween trails and the Christmas lights switch-on.',
  },
  {
    title: 'Information you can trust.',
    body: 'Meeting minutes, updates and local notices, all in one place.',
  },
];

// kind: news | council
export const posts = [
  {
    slug: 'agm-notice-2026',
    kind: 'news',
    title: 'AGM notice',
    date: '2026-09-22',
    author: 'Secretary',
    summary: 'Our AGM takes place on Tuesday 17 November at the Community Centre. All residents welcome. Nominations for committee close on 3 November.',
    body: [
      'Our Annual General Meeting takes place on Tuesday 17 November at 7.30pm in Hawthorn Green Community Centre. Every resident is welcome, whether you are a member or not.',
      'We will present the year in review, the financial statement, and elect the committee for the coming year. Members can vote. You can join on the night.',
      'Nominations for committee close on Tuesday 3 November. Send the name of the person you are nominating, with their agreement, to the Secretary.',
    ],
  },
  {
    slug: 'street-lighting-update',
    kind: 'council',
    title: 'Update on the street lighting on Elder Grove',
    date: '2026-09-15',
    author: 'Chairperson',
    summary: 'We met with the council on 10 September. Here is what was agreed and what happens next.',
    body: [
      'Four lights on Elder Grove have been out since June. We met the council’s public lighting team on 10 September with photos and a map residents helped us put together.',
      'The council agreed to replace the four heads with LED units. Works are scheduled for the week of 12 October. There may be short traffic stops on the day.',
      'If a light is still out after that week, report it to the council directly and let us know so we can follow up.',
    ],
  },
  {
    slug: 'autumn-clean-up',
    kind: 'news',
    title: 'Community clean-up: Saturday 17 October',
    date: '2026-09-08',
    author: 'PRO',
    summary: 'Gloves, bags and pickers provided. Meet at the green at 10am. Tea and cake after.',
    body: [
      'Our autumn clean-up is on Saturday 17 October. Meet at the green at 10am. We will split into small teams, one for each road, and finish by midday.',
      'Gloves, bags and litter pickers are provided, thanks to the council’s Community Clean-Up scheme. Children are very welcome with an adult.',
      'Tea and cake afterwards in the Community Centre.',
    ],
  },
  {
    slug: 'resurfacing-hawthorn-avenue',
    kind: 'council',
    title: 'Resurfacing works on Hawthorn Avenue',
    date: '2026-08-27',
    author: 'Council notice',
    summary: 'The council will resurface Hawthorn Avenue from 5 October. Parking restrictions apply for three days.',
    body: [
      'The council has confirmed resurfacing works on Hawthorn Avenue starting Monday 5 October, weather permitting.',
      'Please do not park on the road between 7am and 6pm from 5 to 7 October. Access to driveways will be kept open except for short periods.',
      'Questions about the works go to the council’s roads section. We are passing on any issues residents raise with us.',
    ],
  },
  {
    slug: 'summer-fun-day-thank-you',
    kind: 'news',
    title: 'Thank you for the summer fun day',
    date: '2026-08-10',
    author: 'Chairperson',
    summary: 'Over 300 people came to the green. Here is where the money raised is going.',
    body: [
      'Over 300 people came along to the summer fun day on the green. Thank you to the 38 volunteers who set up, ran stalls and cleared away.',
      'We raised €1,840. It goes towards new planters at the estate entrance and the Christmas lights.',
    ],
  },
];

export const events = [
  {
    slug: 'autumn-clean-up',
    title: 'Community clean-up',
    date: '2026-10-17',
    start: '10:00',
    end: '12:00',
    place: 'The green, Hawthorn Green',
    summary: 'Gloves, bags and pickers provided. Tea and cake after.',
    body: [
      'Meet at the green at 10am. We split into small teams, one per road, and finish by midday.',
      'Gloves, bags and litter pickers are provided. Children are welcome with an adult.',
    ],
    contact: 'PRO',
  },
  {
    slug: 'halloween-trail',
    title: 'Halloween trail',
    date: '2026-10-31',
    start: '17:30',
    end: '19:30',
    place: 'Starts at Rowan Court',
    summary: 'A lantern-lit trail around the estate for families. Houses taking part display a pumpkin.',
    body: [
      'A lantern-lit trail around the estate for families. Houses taking part will display a pumpkin sticker in the window.',
      'Want your house on the trail? Let us know by 24 October and we will drop a sticker in.',
    ],
    contact: 'Secretary',
  },
  {
    slug: 'agm-2026',
    title: 'Annual General Meeting',
    date: '2026-11-17',
    start: '19:30',
    end: '21:00',
    place: 'Hawthorn Green Community Centre',
    summary: 'Year in review, accounts and committee elections. All residents welcome.',
    body: [
      'The year in review, the financial statement, and the election of the committee for the coming year.',
      'All residents are welcome. Members can vote, and you can join on the night.',
    ],
    contact: 'Secretary',
  },
  {
    slug: 'christmas-lights',
    title: 'Christmas lights switch-on',
    date: '2026-12-05',
    start: '17:00',
    end: '18:30',
    place: 'The green, Hawthorn Green',
    summary: 'Carols, hot chocolate and the big switch-on at 5.30pm.',
    body: [
      'Carols from the local school choir, hot chocolate, and the switch-on at 5.30pm.',
      'We need volunteers to help set up from 3pm. Get in touch if you can give an hour.',
    ],
    contact: 'PRO',
  },
];

export const committee = [
  { name: 'Máire Kavanagh', role: 'Chairperson', line: 'Living in Hawthorn Green since 2004. Leads meetings and council liaison.' },
  { name: 'Tom Byrne', role: 'Secretary', line: 'Keeps minutes and handles correspondence.' },
  { name: 'Aoife Dunne', role: 'Treasurer', line: 'Manages accounts and membership.' },
  { name: 'Ciarán Walsh', role: 'PRO', line: 'Runs the newsletter, website and social channels.' },
  { name: 'Niamh O’Reilly', role: 'Road rep', line: 'Blackthorn Drive and Rowan Court.' },
  { name: 'Pádraig Flood', role: 'Road rep', line: 'Elder Grove and Hawthorn Close.' },
];

export const nextMeeting = { date: '2026-10-06', time: '8pm', venue: 'Hawthorn Green Community Centre' };

// file: null shows "Coming soon" instead of a broken download link.
export const documents = [
  { category: 'Constitution', items: [{ title: 'Constitution of the association', date: '2019-11-12', type: 'PDF', size: '180 KB', file: null }] },
  {
    category: 'AGM minutes and reports',
    items: [
      { title: 'AGM minutes 2025', date: '2025-11-18', type: 'PDF', size: '240 KB', file: null },
      { title: 'Chairperson’s report 2025', date: '2025-11-18', type: 'PDF', size: '310 KB', file: null },
    ],
  },
  {
    category: 'Committee meeting minutes',
    items: [
      { title: 'Minutes, September 2026', date: '2026-09-01', type: 'PDF', size: '120 KB', file: null },
      { title: 'Minutes, August 2026', date: '2026-08-04', type: 'PDF', size: '110 KB', file: null },
      { title: 'Minutes, July 2026', date: '2026-07-07', type: 'PDF', size: '115 KB', file: null },
    ],
  },
  { category: 'Financial statements', items: [{ title: 'Financial statement 2025', date: '2025-11-10', type: 'PDF', size: '95 KB', file: null }] },
  {
    category: 'Council correspondence and submissions',
    items: [{ title: 'Street lighting submission, Elder Grove', date: '2026-07-20', type: 'PDF', size: '1.2 MB', file: null }],
  },
  {
    category: 'Planning submissions and observations',
    items: [{ title: 'Observation on application 26/1234', date: '2026-03-14', type: 'PDF', size: '420 KB', file: null }],
  },
  {
    category: 'Local guides',
    items: [
      { title: 'Bin collection schedule', date: '2026-01-05', type: 'PDF', size: '60 KB', file: null },
      { title: 'Useful numbers', date: '2026-01-05', type: 'PDF', size: '40 KB', file: null },
      { title: 'Estate map', date: '2024-05-01', type: 'PDF', size: '2.1 MB', file: null },
    ],
  },
];

export const faqs = [
  { q: 'Does it cost anything?', a: 'No. Membership is free for every household.' },
  { q: 'Do I have to attend meetings?', a: 'No. Attend when you can. Members get the minutes either way.' },
  { q: 'I rent. Can I join?', a: 'Yes. Every resident is welcome.' },
  { q: 'How is my data used?', a: 'Only to contact you about association business. See our privacy notice.' },
];
