export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  current: boolean;
  /** One line a non-technical reader can repeat back. */
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: 'Voom Digital',
    title: 'AI & Platform Engineer',
    location: 'Casablanca, hybrid',
    period: 'Jan 2026 — Present',
    current: true,
    summary:
      'Conversational AI, platform engineering and CRM integrations for a multi-tenant ' +
      'messaging platform serving 10+ enterprise tenants across eight channels.',
    points: [
      'Built a production AI agent with five-tier model failover and seven agentic tools, serving 10+ tenants and lifting conversion by 15%.',
      'Implemented official Meta coexistence, allowing clients to retain the WhatsApp Business app on their own devices while the same number operates through the Cloud API, with message history synchronised in both directions. Previously, connecting a number to the API meant deleting the client’s WhatsApp accounts outright.',
      'Extended the agent to Instagram and Messenger, and added real-time catalogue and order sync so it can assemble and submit e-commerce orders in-chat on customer confirmation.',
      'Delivered custom Zoho CRM widgets surfacing a contact’s live conversation within the CRM record, eliminating tab switching and manual lookups for sales agents.',
      'Captured Click-to-WhatsApp advertisement webhooks and injected the originating ad context into the agent prompt, so initial responses reflect the specific campaign the customer engaged with.',
      'Automated per-client workflows dispatching approved WhatsApp templates and flows from CRM triggers, with variable resolution and delivery tracking.',
      'Integrated the AI agent with the CRM prospect module for automated prospect creation from qualified conversations.',
      'Ran the backbone on Java 21 virtual threads and Spring Boot 3.3: 2,645+ tests, 138 migrations, 100+ webhooks/sec at 99.9% uptime.',
    ],
    stack: [
      'Java 21',
      'Spring Boot 3.3',
      'PostgreSQL / pgvector',
      'Redis',
      'Gemini',
      'Claude',
      'OpenAI',
      'MCP',
      'Meta Cloud API',
      'Zoho CRM',
      'Salesforce',
      'Next.js',
      'Docker',
    ],
  },
  {
    company: 'Orange Morocco',
    title: 'Software Engineer — Final Year Project',
    location: 'Rabat',
    period: 'Mar — Sep 2025',
    current: false,
    summary:
      'Digitalised the FabLab end to end, replacing manual paperwork for 50+ members and 200+ users.',
    points: [
      'Modular microservices backend of 9+ Spring Boot services with inter-service messaging over Apache Kafka.',
      'Real-time reservation system using optimistic locking, eliminating 100% of scheduling conflicts.',
      'Integrated 10+ IoT devices — 3D printers, Raspberry Pi — over REST, plus an AI support assistant.',
    ],
    stack: ['Java 17', 'Spring Boot 3.4', 'Angular', 'MySQL', 'Apache Kafka', 'Swagger'],
  },
  {
    company: 'Lanoria Club',
    title: 'Backend Java Developer',
    location: 'Rabat, hybrid',
    period: '2024',
    current: false,
    summary:
      'Backend for an HR platform serving 50+ users, built and documented end to end.',
    points: [
      'Built 25+ REST endpoints secured with Keycloak SSO and role-based access control.',
      'Optimised queries and the cache layer, cutting latency by 40% while holding 99.9% uptime.',
      'Full Swagger/OpenAPI documentation, and delivery presentations to the client.',
    ],
    stack: ['Java 17', 'Spring Boot 3.1', 'PostgreSQL', 'Keycloak', 'Angular', 'Swagger'],
  },
  {
    company: 'YOS Études',
    title: 'Full-Stack Developer',
    location: 'Rabat, hybrid',
    period: '2023',
    current: false,
    summary: 'Secure HR portal with granular permissions and live performance dashboards.',
    points: [
      'Three-level RBAC with granular permission management across the portal.',
      'Real-time dashboards tracking 12+ KPIs over WebSocket.',
    ],
    stack: ['Java 17', 'Spring Boot 3.1', 'Spring Security', 'JWT', 'Angular', 'SQL Server'],
  },
  {
    company: 'Ministry of National Education',
    title: 'Full-Stack Developer',
    location: 'Rabat',
    period: '2022',
    current: false,
    summary: 'School management platform for the Moroccan national education ministry.',
    points: [
      'Designed and built a platform for administering schools, from data model to interface.',
    ],
    stack: ['Java', 'Spring', 'JWT', 'Design patterns', 'UML'],
  },
];
