export const profile = {
  name: 'Mehdi Boudar',
  role: 'Platform & AI Engineer',
  // Written for a reader who does not know what pgvector is. The headline has to
  // carry the full range: the AI is one layer of the work, not the whole of it.
  headline: ['From infrastructure', 'to interface.'],
  lede:
    'I build production systems across the whole stack: conversational AI and ' +
    'multi-model orchestration, multi-tenant Java backends, CRM and messaging ' +
    'integrations, custom protocol servers, and the client-facing web on top of them. ' +
    'Ten enterprise brands, eight channels, running in production.',
  location: 'Rabat, Morocco',
  timezone: 'GMT+1',
  availability: 'Open to remote (EU / US-overlap) and relocation',
  email: 'meehdi99@gmail.com',
  phone: '+212 610 059 159',
  links: {
    linkedin: 'https://linkedin.com/in/mehdi-boudar',
    github: 'https://github.com/kusoyaji',
    site: 'https://mehdiboudar.com',
  },
} as const;

/**
 * Canonical metrics. Every number shown anywhere on the site resolves here —
 * the previous build drifted between the hero and the project cards.
 */
export const metrics = [
  { value: '2×', label: 'lead-to-visit conversion against a human baseline' },
  { value: '$0.10–0.60', label: 'cost per AI conversation, end to end' },
  { value: '99.9%', label: 'uptime across 10+ enterprise tenants' },
  { value: '2,645+', label: 'automated tests in production' },
  { value: '500k', label: 'contacts imported in under 10 minutes' },
  { value: '8', label: 'channels served from one platform' },
] as const;

export const education = [
  {
    school: 'EMSI Rabat',
    credential: 'State Engineering Degree in Computer Science',
    detail: 'Enterprise Information Systems',
    period: '2022 — 2025',
  },
  {
    school: 'ISTA NTIC',
    credential: 'Higher Technician Diploma (HND), Software Development',
    detail: 'Enterprise Applications & Web Development',
    period: '2019 — 2021',
  },
] as const;

export const certifications = [
  { name: 'Oracle Certified Professional: Java SE 17', code: '1Z0-829', flagship: true },
  { name: 'Oracle Database SQL Certified Associate', code: '1Z0-082', flagship: false },
  { name: 'IBM Full-Stack Developer', code: null, flagship: false },
  { name: 'Google Cloud Java Microservices', code: null, flagship: false },
  { name: 'AWS DevOps', code: null, flagship: false },
] as const;

export const languages = [
  { name: 'Arabic', level: 'Native', cefr: 'C2' },
  { name: 'English', level: 'Fluent', cefr: 'C2' },
  { name: 'French', level: 'Professional', cefr: 'C1' },
] as const;

/** Biography prose. Rendered word-by-word on scroll by <ReadAlong>. */
export const bio = [
  'Software engineer specialising in production AI systems, backend architecture and enterprise integrations. Oracle Certified Professional in Java SE 17, holding a State Engineering degree in Computer Science from EMSI Rabat.',
  'Over the past two years I have architected and delivered a multi-tenant conversational platform serving more than ten enterprise tenants across eight channels, with responsibility for the architecture, data model, test suite, deployment and supporting infrastructure.',
  'My work spans multi-model LLM orchestration, hybrid retrieval, Model Context Protocol servers, and integration across Zoho CRM, Salesforce and the Meta WhatsApp Cloud API. I also design and build the client-facing interfaces these systems support.',
] as const;
