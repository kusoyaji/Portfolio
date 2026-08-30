export type CapabilityGroup = {
  index: string;
  title: string;
  /** Plain-language framing for readers who do not know the tools. */
  blurb: string;
  items: string[];
};

export const capabilities: CapabilityGroup[] = [
  {
    index: '01',
    title: 'AI systems',
    blurb:
      'Deploying large language models in production environments with the ' +
      'availability, accuracy and validation guarantees enterprise clients require.',
    items: [
      'Multi-model orchestration (Gemini, Claude, OpenAI)',
      'Five-tier failover',
      'Agentic function calling',
      'Hybrid RAG — pgvector, BM25, HyDE',
      'Custom MCP servers',
      'Output validation & guardrails',
      'TTS, transcription, vision',
      'Darija & multilingual support',
    ],
  },
  {
    index: '02',
    title: 'Backend & data',
    blurb:
      'Multi-tenant backend architecture with strict data isolation, comprehensive ' +
      'automated test coverage and measured production reliability.',
    items: [
      'Java 17 / 21 — Oracle Certified Professional',
      'Spring Boot 3, Spring Security',
      'Virtual threads',
      'JPA / Hibernate performance',
      'PostgreSQL, pgvector, Redis',
      'Flyway, Quartz, Resilience4j',
      'Apache Kafka, event-driven pipelines',
      'REST / OpenAPI design',
    ],
  },
  {
    index: '03',
    title: 'Integrations & CRM',
    blurb:
      'Connecting messaging platforms, CRMs and payment providers into unified ' +
      'pipelines, with the resulting data available where sales teams already work.',
    items: [
      'Meta WhatsApp Cloud API',
      'Official WhatsApp coexistence',
      'Click-to-WhatsApp ad attribution',
      'Zoho CRM extensions, widgets & functions',
      'Salesforce',
      'Template & flow automation',
      'Webhooks, OAuth2, HMAC',
      'Stripe',
    ],
  },
  {
    index: '04',
    title: 'Product & delivery',
    blurb:
      'End-to-end delivery across interface, infrastructure, domain configuration ' +
      'and deployment, including direct technical discovery with clients.',
    items: [
      'Next.js, React, TypeScript',
      'Tailwind, motion design',
      'Angular, Vue',
      'Docker, Railway, Vercel, Nginx',
      'CI/CD, Jenkins',
      'DNS & deployment architecture',
      'JUnit, Mockito, Playwright',
      'Technical discovery with clients',
    ],
  },
];
