// All site copy lives here so it can be edited without touching layout code.
// Structure and wording follow version 1 (and the original Wix site).

export const site = {
  name: "MindBridge",
  tagline: "No translation needed",
  phone: { display: "(425) 969-9989", tel: "+14259699989" },
  email: "info@mindbridge.ngo",
  founderEmail: "Kunqi.wang@mindbridge.ngo",
  mailingAddress: ["MindBridge NGO", "522 W Riverside Ave, Ste N", "Spokane, WA 99201"],
  basedIn: "MindBridge is a nonprofit based in Washington state.",
  // TODO: replace with a video MindBridge owns or has licensed (see README).
  heroVideo:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4",
  // TODO: donation processor link (Zeffy, Givebutter, Stripe Payment Link...).
  // Empty = the donate button opens an email with the chosen amount.
  donationUrl: "",
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Our Mission", href: "#mission" },
  { label: "Contact", href: "#contact" },
  { label: "Support Us", href: "#support" },
];

export const hero = {
  // Plain segments and italic grey emphasis, in reading order.
  headline: [
    { text: "Mental wellness for " },
    { text: "youth,", em: true },
    { text: " in words that " },
    { text: "make sense.", em: true },
  ],
  description:
    "Everyone deserves healthcare that is easy to understand. MindBridge works with immigrant families to break down medical language barriers and deliver support that’s accurate, culturally sensitive, and empowering.",
  cta: { label: "Donate today", href: "#donate" },
};

export const story = {
  title: "Our story",
  paragraphs: [
    "The origins of MindBridge lie in the widespread cultural gap between healthcare providers and the immigrant communities they serve. Many families face confusion, isolation, and miscommunication when seeking medical support for mental health.",
    "MindBridge was created to address that gap by providing culturally relevant translation, AI-driven support, and personalized health education.",
  ],
};

// TODO: review this wording before launch (see README: AI framing), and point the CTA at the real tool.
export const aiService = {
  title: "Use our AI therapeutic service today",
  body: "A safe, culturally aware outlet for immigrant youth to process anxiety and access mental health support, in their own language.",
  note: "Not a crisis service. If you are in crisis, call or text 988.",
  cta: { label: "Converse now", href: "#support" },
};

export const supportMission = {
  title: "Support our mission",
  body: "Your gift helps immigrant and international youth access mental health support that truly understands them.",
  cta: { label: "Donate today", href: "#donate" },
};

// TODO: verify every figure against program records before launch.
export const impact = {
  title: "Our growing impact",
  items: [
    { value: "500+", label: "Youth supported", body: "Young people who have accessed our culturally responsive mental health resources and support systems." },
    { value: "12", label: "Languages", body: "Different languages in which we provide mental health education and connect youth with culturally competent care." },
    { value: "5", label: "Organizations", body: "Schools, universities, and community organizations working with us to support immigrant youth mental health." },
    { value: "AI", label: "Therapy", body: "Offering a safe, culturally aware outlet for immigrant youth to process anxiety and access mental health support." },
  ],
};

export const mission = {
  title: "Our mission",
  subtitle: "We recognize the difficulties of reaching out.",
  paragraphs: [
    "MindBridge is dedicated to supporting immigrant and international youth by providing culturally and linguistically accessible mental health resources. We offer multilingual educational materials, interactive workshops, and school-based outreach that promote emotional wellness, identity development, and cultural resilience. Through peer-led support groups, family engagement programs, and community dialogue, we work to reduce stigma and create spaces where young people feel seen, heard, and supported.",
    "Our mission is to bridge the gap between marginalized youth and mental health care by connecting them with trained counselors, mentors, and culturally competent professionals who understand their lived experiences. By partnering with schools, universities, and community organizations, we are building a sustainable network of inclusive support systems that honor diversity, center belonging, and prioritize healing.",
  ],
};

export const support = {
  title: "Be part of the bridge",
  intro: "Help build a future where every young person, regardless of background, can access care they understand and trust.",
  asks: [
    {
      title: "Join our team",
      body: "Join the MindBridge team and help build a future where every young person, regardless of background, can access care they understand and trust. Whether you’re a counselor, educator, designer, or organizer, there’s a place for you in this movement.",
      subject: "Joining the MindBridge team",
    },
    {
      title: "Have space to share?",
      body: "We’re looking for welcoming facilities to host support groups, youth gatherings, and educational workshops. Your space can help foster healing, connection, and learning for immigrant and international youth.",
      subject: "Offering a space",
    },
  ],
  waysTitle: "Support MindBridge",
  ways: [
    { title: "Donate", body: "Give online below, or mail a check to MindBridge NGO, 522 W Riverside Ave, Ste N, Spokane, WA 99201." },
    { title: "Visit us", body: "Keep up with our latest online webinars, educational sessions, and news here at mindbridge.ngo." },
    { title: "Contact us", body: "Have questions or need assistance? Call (425) 969-9989 to speak with a member of the MindBridge team." },
    { title: "Drop us a message", body: "Email info@mindbridge.ngo with any inquiries or feedback. We value your input and look forward to hearing from you." },
  ],
  donate: {
    title: "Donate online",
    body: "Your gift helps immigrant and international youth access mental health support that truly understands them.",
    amounts: [10, 50, 100, 200],
    defaultAmount: 50,
  },
};

export const experiences = {
  title: "Experiences",
  body: "We’re not offering any experiences at the moment. Check back soon.",
  follow: "Want to hear first when workshops, support groups, or gatherings open? Send us a note and we’ll let you know.",
};

export const contact = {
  title: "Get in touch",
  body: "We’d love to hear from you. Feel free to reach out to us with any questions, feedback, or special requests. We are here to make your experience with us exceptional.",
};

// TODO: verify every number before launch and re-check yearly.
export const help = {
  title: "Get help now",
  body: "If you or someone you know is in danger, call 911. MindBridge is not a crisis service, but these free lines are open now.",
  lines: [
    { name: "988 Suicide & Crisis Lifeline", body: "Call or text 988, any time. Interpreters are available in many languages.", actions: [{ label: "Call 988", href: "tel:988" }, { label: "Text 988", href: "sms:988" }] },
    { name: "Crisis Text Line", body: "Text HOME to 741741 to reach a trained crisis counselor.", actions: [{ label: "Text 741741", href: "sms:741741?&body=HOME" }] },
    { name: "Teen Link (Washington)", body: "Talk with a trained teen volunteer in the evening.", actions: [{ label: "Call (866) 833-6546", href: "tel:+18668336546" }] },
    { name: "Emergency", body: "If someone is in immediate danger, call 911.", actions: [{ label: "Call 911", href: "tel:911" }] },
  ],
};
