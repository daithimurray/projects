/* Sample content for the kit. Facts from uploads/cathy-conlon-dossier.md (23 Sep 2026).
   Verified facts are used as-is; "Reported" items are marked; poem texts are NOT reproduced (copyright); placeholders only. */
export const author = { name: "Cathy Conlon", altName: "Catherine Conlon", place: "Celbridge, Co. Kildare", x: "https://x.com/cat_conlon" };
export const poems = [
  { slug: "the-light-dancing", title: "The Light Dancing", collection: "The Light Dancing", year: 2025, about: "The title poem. About the poet's father.", themes: ["father","memory","light"],
    published: [{ where: "Poethead", when: "2016", href: "https://poethead.wordpress.com/2016/09/12/the-light-dancing-and-lizzie-by-catherine-conlon/" }, { where: "The Milk House", when: "2023", href: "https://www.themilkhouse.org/three-poems-by-cathy-conlon/" }],
    stanzas: [["[Poem text to be supplied by the author.]","[Line breaks are kept exactly as written,","\teach line a span, each stanza a paragraph.]"],["[Second stanza placeholder.]","[None of this is the author's text.]"]] },
  { slug: "lizzie", title: "Lizzie", collection: "The Light Dancing", year: 2025, about: "Published alongside the title poem.", themes: ["family","memory"], published: [{ where: "Poethead", when: "2016", href: "https://poethead.wordpress.com/2016/09/12/the-light-dancing-and-lizzie-by-catherine-conlon/" }] },
  { slug: "milk-house-two", title: "Second Milk House poem", collection: "The Light Dancing", year: 2025, about: "Title to confirm with the author.", themes: ["farm","family"], published: [{ where: "The Milk House", when: "2023", href: "https://www.themilkhouse.org/three-poems-by-cathy-conlon/" }] },
  { slug: "milk-house-three", title: "Third Milk House poem", collection: "The Light Dancing", year: 2025, about: "Title to confirm with the author.", themes: ["grief","farm"], published: [{ where: "The Milk House", when: "2023", href: "https://www.themilkhouse.org/three-poems-by-cathy-conlon/" }] },
  { slug: "poems-for-patience", title: "Poems for Patience 2023, winning poem", collection: "Uncollected", year: 2023, about: "Title to confirm. Displayed in Galway hospitals as part of the Cúirt festival.", themes: ["memory"], published: [] },
];
export const books = [
  { slug: "swift-vanessa", title: "Swift, Vanessa & The Sluttery", kind: "Novel", publisher: "Savoy Editions", year: 2026, tag: "New", price: "€20.00", isbn: "978-1-9195262-0-1 (to confirm)", buy: "https://www.buythebook.ie/product/swift-vanessa-the-sluttery/",
    blurb: "Eighteenth-century London, Dublin and Kildare. Esther Vanhomrigh, Swift's Vanessa, was a young woman in Georgian society who met Jonathan Swift and spent seventeen years arguing for an equal place beside him." },
  { slug: "the-light-dancing", title: "The Light Dancing", kind: "Poetry", publisher: "Revival Press", year: 2025, stockists: ["Maynooth Books", "Barker & Jones, Naas", "Bookworm, Thurles"],
    blurb: "A debut collection about fathers, farms, memory and grief. Poems first printed in The Irish Times, Poetry Ireland Review and Cúirt Journal, gathered for the first time." },
];
export const events = [
  { date: "2026-07-17", title: "Reading from Swift, Vanessa & The Sluttery", venue: "Castletown House", city: "Celbridge", time: "5:30 pm", kind: "Swift & Vanessa Festival", past: true },
  { date: "2026-05-10", title: "Launch of Swift, Vanessa & The Sluttery", venue: "Barberstown Castle Hotel", city: "Straffan, Co. Kildare", time: "3 pm", kind: "Book launch · launched by Ger Duffy", past: true },
  { date: "2023-04-25", title: "Eat the Storms, Poetry Day Ireland special", venue: "Podcast", city: "", time: "", kind: "Podcast", past: true },
];
export const news = [
  { kicker: "News", title: "Swift, Vanessa & The Sluttery launched at Barberstown Castle", excerpt: "Ger Duffy launched the novel on Sunday 10 May. Thank you to everyone who came, and to the Limerick Writers' Centre.", date: "10 May 2026" },
  { kicker: "Festival", title: "Reading at the Swift & Vanessa Festival, Castletown House", date: "17 Jul 2026" },
  { kicker: "Poetry", title: "The Light Dancing is out from Revival Press", date: "11 Apr 2025" },
];
export const prizes = [
  { what: "Poems for Patience", detail: "Winner, 2023 · Saolta Arts with Cúirt International Festival of Literature", status: "reported" },
  { what: "Waterford Poetry Prize", detail: "Second prize, 2020", status: "reported" },
  { what: "PENfro First Chapter Competition", detail: "Joint winner, 2016", status: "reported" },
  { what: "RTÉ P.J. O'Connor Radio Drama Awards", detail: "Shortlisted", status: "reported" },
  { what: "Trim Poetry Festival", detail: "Shortlisted, 2020", status: "reported" },
  { what: "Bangor Poetry Competition", detail: "Shortlisted, 2019", status: "reported" },
];
export const publications = ["The Irish Times", "Poetry Ireland Review", "Books Ireland", "Cúirt Journal", "Ropes", "Skylight 47", "Brevity is the Soul (Liberties Press)", "Stories for the Ear (Kildare County Council)", "Boyne Berries"];
