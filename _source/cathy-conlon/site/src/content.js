/* Site content. Facts come from the client dossier (23 Sep 2026); every link below is a published source.
   Anything not yet supplied by the author (portrait, cover art, poem text, quotes) is left out, not faked:
   set the field and the page picks it up. */

export const author = {
  name: "Cathy Conlon",
  place: "Celbridge, Co. Kildare",
  x: "https://x.com/cat_conlon",
  portrait: null, // e.g. "/cathyconlon/img/portrait.jpg" once supplied
  // Where contact-form messages are delivered (via FormSubmit). After the one-time activation email,
  // swap the address for the random alias FormSubmit provides so it is not visible in the page source.
  formTo: "",
};

export const novel = {
  title: "Swift, Vanessa & The Sluttery",
  kind: "Novel",
  publisher: "Savoy Editions",
  year: 2026,
  price: "€20",
  buy: "https://www.buythebook.ie/product/swift-vanessa-the-sluttery/",
  cover: null,
  blurb: "London, Dublin and Kildare in the early eighteenth century. Esther Vanhomrigh, Swift's Vanessa, meets Jonathan Swift and spends seventeen years arguing for an equal place beside him.",
};

export const collection = {
  title: "The Light Dancing",
  kind: "Poetry",
  publisher: "Revival Press",
  year: 2025,
  cover: null,
  blurb: "My debut collection: fathers, farms, memory and grief. Many of the poems first appeared in The Irish Times, Poetry Ireland Review and Cúirt Journal.",
  stockists: ["Maynooth Books", "Barker & Jones, Naas", "Bookworm, Thurles"],
};

export const readOnline = [
  { title: "The Light Dancing and Lizzie", where: "Poethead", year: 2016, note: "The title poem of the collection, about my father, with its companion poem.", href: "https://poethead.wordpress.com/2016/09/12/the-light-dancing-and-lizzie-by-catherine-conlon/", kind: "Read" },
  { title: "Three poems", where: "The Milk House", year: 2023, href: "https://www.themilkhouse.org/three-poems-by-cathy-conlon/", kind: "Read" },
  { title: "Poetry Day Ireland special", where: "Eat the Storms podcast", year: 2023, href: "https://eatthestorms.com/2023/04/25/a-message-in-a-casino-poetry-day-ireland-2023-a-special-episode-of-eat-the-storms/", kind: "Listen" },
];

export const publications = ["The Irish Times", "Poetry Ireland Review", "Books Ireland", "Cúirt Journal", "Ropes", "Skylight 47", "Boyne Berries", "Brevity is the Soul (Liberties Press)", "Stories for the Ear (Kildare County Council)"];

export const events = [
  { date: "2026-07-17", title: "Reading from Swift, Vanessa & The Sluttery", venue: "Castletown House", city: "Celbridge", time: "5.30pm", kind: "Swift & Vanessa Festival" },
  { date: "2026-05-10", title: "Launch of Swift, Vanessa & The Sluttery", venue: "Barberstown Castle", city: "Straffan, Co. Kildare", time: "3pm", kind: "Launched by Ger Duffy", href: "https://www.youtube.com/watch?v=CkugUuJh0dk", linkLabel: "Watch the launch" },
];

export const prizes = {
  won: [
    { what: "Poems for Patience", detail: "Winner, 2023. Saolta Arts with Cúirt International Festival of Literature", href: "https://saoltaarts.com/poems-for-patience-poetry-competition-2023/" },
    { what: "Waterford Poetry Prize", detail: "Second prize, 2020", href: "https://waterfordcouncil.ie/?p=4421" },
    { what: "PENfro First Chapter Competition", detail: "Joint winner, 2016" },
  ],
  shortlisted: [
    { what: "RTÉ P.J. O'Connor Radio Drama Awards", detail: "Radio play" },
    { what: "Trim Poetry Festival", detail: "2020" },
    { what: "Bangor Poetry Competition", detail: "2019" },
  ],
};

export const publisher = { name: "Limerick Writers' Centre", href: "https://limerickwriterscentre.com/", email: "limerickwriterscentre@gmail.com" };

export const festival = { name: "Swift & Vanessa Festival", href: "https://swiftandvanessa.com/" };
