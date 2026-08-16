// ============================================================
// Portfolio Data — Chathuranga Kumarasinghe
// ============================================================

export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  /** A few concrete outcomes. Recent roles carry more; the oldest carry none. */
  highlights?: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
  /** A real product shot, where one exists and is publishable. Projects
      without one fall back to a cover generated from their id. */
  image?: string;
  year?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  country: string;
  /** Short form used inline beside the institution, e.g. "UK" */
  countryShort?: string;
  year: string;
  logo?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface StatItem {
  value: string;
  label: string;
}

// ── Personal Info ──────────────────────────────────────────
export const personalInfo = {
  name: 'Chathuranga Kumarasinghe',
  title: 'Lead Software Engineer',
  email: 'kumarasinghe.it@gmail.com',
  phone: '+971557504580',
  /** Presentational form — the raw value stays for tel: links */
  phoneDisplay: '+971 55 750 4580',
  location: 'Dubai, UAE',
  linkedin: 'https://linkedin.com/in/chathurangak',
  github: 'https://github.com/c-kumarasinghe',
  cvUrl: '/cv.pdf',
  summary:
    'Results-oriented Lead Software Engineer (Full Stack) with 12+ years of experience delivering high-quality software solutions across AI-powered products, blockchain, fintech, HRM and ERP. Proficient in Node.js, NestJS, ReactJS, TypeScript, LLM integrations and cloud platforms. Demonstrated ability to lead teams, drive innovation, and design scalable, maintainable systems.',
  bio:
    'Lead Software Engineer with 12+ years designing scalable systems and leading the engineering teams that build them — from AI-powered platforms and blockchain to fintech, HRM and ERP.',
} as const;

// ── Stats ──────────────────────────────────────────────────
export const stats: StatItem[] = [
  { value: '12+', label: 'Years experience' },
  /* Reach is the strongest number here, so it sits second and lands in the
     hero's first three. */
  { value: '10M+', label: 'Users reached' },
  { value: '15+', label: 'Engineers led' },
  { value: '20+', label: 'Projects shipped' },
  { value: '5+', label: 'Industry domains' },
];

// ── Skills ─────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    label: 'AI & LLM Engineering',
    skills: [
      'OpenAI API',
      'LLM Integration',
      'RAG Pipelines',
      'Embeddings & Vector Search',
      'AI Assistants',
      'Prompt Engineering',
      'Intelligent Automation',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      'Node.js',
      'NestJS',
      'Express.js',
      'TypeScript',
      'JavaScript',
      'PHP',
      'Laravel',
      'TypeORM',
      'Prisma',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      'React.js',
      'Next.js',
      'TailwindCSS',
      'Material-UI',
      'React-Bootstrap',
      'Redux',
      'HTML5',
      'CSS3',
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    skills: [
      'React Native',
      'Expo',
      'Cross-platform iOS & Android',
      'Push Notifications',
      'App Store & Play Store Delivery',
    ],
  },
  {
    id: 'databases',
    label: 'Databases & Messaging',
    skills: [
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'Apache Kafka',
      'BullMQ',
      'Socket.IO',
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture & Integration',
    skills: [
      'Microservices',
      'RESTful APIs',
      'WebSockets',
      'Blockchain',
      'Smart Contracts',
      'DeFi',
      'PandaDoc',
      'Keycloak',
    ],
  },
  {
    id: 'practices',
    label: 'Practices & Tools',
    skills: [
      'Agile / Scrum',
      'CI/CD',
      'Git',
      'Jira',
      'ClickUp',
      'Unit Testing',
      'Code Reviews',
      'WSO2',
    ],
  },
];

// ── Experience ─────────────────────────────────────────────
export const experiences: ExperienceItem[] = [
  {
    id: 'softbuilders',
    role: 'Senior Software Engineer (Team Lead)',
    company: 'SoftBuilders Software Design LLC',
    location: 'Business Bay, Dubai, UAE',
    period: 'Aug 2024 – Present',
    current: true,
    description: 'Lead backend development for blockchain & DeFi platforms. Built a BullMQ batch engine that cut reward processing time by 65%.',
    highlights: [
      'Own the backend architecture for a Web3 and cloud platform — service boundaries, API contracts, review standards and CI/CD.',
      'Lead the team delivering it, and set the patterns the rest of the codebase follows.',
      'Designed the reward pipeline that took generation from hours to minutes — Redis, RabbitMQ fan-out, BullMQ batch workers.',
    ],
    technologies: ['NestJS', 'Node.js', 'React.js', 'Next.js', 'Redis', 'RabbitMQ', 'BullMQ', 'Socket.IO', 'Docker', 'MongoDB', 'PostgreSQL'],
  },
  {
    id: 'inova-lead',
    role: 'Technical Lead',
    company: 'Inova IT Systems (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Mar 2023 – Aug 2024',
    current: false,
    description: 'Led a 15+ engineer team delivering eRL 2.0 and SLAASM for clients in Sweden and Singapore.',
    highlights: [
      'Led a 15+ engineer team across enterprise delivery for clients in Sweden and Singapore.',
      'Set the architecture — NestJS service design, data models and integration layers over MySQL — and the standards around it.',
      'Chose and integrated WSO2 Identity Server for single sign-on and identity across the estate.',
    ],
    technologies: ['NestJS', 'React.js', 'TypeORM', 'MySQL', 'Keycloak', 'Docker', 'Azure'],
  },
  {
    id: 'inova-atl',
    role: 'Associate Tech Lead',
    company: 'Inova IT Systems (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Apr 2021 – Mar 2023',
    current: false,
    description: 'Drove architecture decisions and mentored developers on clean-code and SOLID principles.',
    highlights: [
      'Drove architecture decisions and mentored the team on clean-code and SOLID practice.',
      'Vendor quote engine — bulk import, offer generation, server-side PDF and Excel export, status workflows.',
    ],
    technologies: ['PHP Laravel', 'Node.js', 'React.js', 'Redis', 'MySQL', 'Docker'],
  },
  {
    id: 'inova-senior',
    role: 'Senior Software Engineer',
    company: 'Inova IT Systems (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Oct 2018 – Apr 2021',
    current: false,
    description: 'Optimised the CxPulse platform, boosting efficiency by 70%.',
    highlights: [
      "Survey platform for Dialog Axiata, Sri Lanka's largest network — 17M+ subscribers.",
      'High-volume background processing moved onto Laravel Queue with Redis.',
    ],
    technologies: ['PHP Laravel', 'Node.js', 'React.js', 'Redis', 'MySQL', 'Docker'],
  },
  {
    id: 'smart-employees',
    role: 'Senior Software Engineer',
    company: 'Smart Employees (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Nov 2017 – Sep 2018',
    current: false,
    description: 'Built and maintained OneHRIS, a full HRIS and payroll system.',
    highlights: [
      'Cloud HRIS covering employee records, time and attendance, leave and payroll.',
      'Full-stack build on PHP Laravel, Node.js and MySQL, from data model through to interface.',
    ],
    technologies: ['PHP Laravel', 'Node.js', 'JavaScript', 'jQuery', 'MySQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'infoseek',
    role: 'Software Engineer',
    company: 'Infoseek (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Aug 2016 – Nov 2017',
    current: false,
    description: 'Built mintHRM, an open-source HRIS platform, and led its Leave Management module.',
    highlights: [
      'Core development on mintHRM, an open-source cloud HRIS covering HR and payroll.',
      'Built on the PHP Yii framework over MySQL, and led the Leave Management module.',
    ],
    technologies: ['PHP Yii', 'JavaScript', 'jQuery', 'MySQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'uom',
    role: 'Software Engineer',
    company: 'Uni-Consultancy Services, University of Moratuwa',
    location: 'Moratuwa, Sri Lanka',
    period: 'Jul 2014 – Jul 2016',
    current: false,
    description: 'Built MIS systems for university financial and academic departments.',
    highlights: [
      'MIS and ERP systems used by government and private-sector organisations.',
      'PHP and MySQL builds, with query and configuration tuning to hold platform reliability.',
    ],
    technologies: ['PHP', 'JavaScript', 'MySQL', 'HTML5', 'CSS'],
  },
];

// ── Projects ───────────────────────────────────────────────
export const projects: ProjectItem[] = [
  {
    id: 'mai-hrms',
    name: 'Mai HRMS',
    image: '/mai-hrms.webp',
    year: '2025',
    description:
      'AI-powered HR platform with an embedded assistant that turns employee data into decisions — LLM-driven insight, retrieval and workflow automation.',
    techStack: ['OpenAI API', 'RAG', 'NestJS', 'Next.js', 'MongoDB', 'Redis', 'PostgreSQL', 'Docker'],
    highlights: [
      'Conversational AI assistant for employee and HR queries',
      'RAG pipeline over policy and employee data for grounded answers',
      'AI-driven insight from employee behaviour patterns',
      'Automated onboarding, leave and payroll workflows',
    ],
  },
  {
    id: 'web3-rewards',
    name: 'Web3 Rewards Platform',
    year: '2024',
    description:
      'Decentralized application for staking, license management, and blockchain integration with real-time reward processing at scale.',
    techStack: ['NestJS', 'MongoDB', 'PostgreSQL', 'Socket.IO', 'Redis', 'RabbitMQ', 'BullMQ', 'Docker'],
    highlights: [
      'BullMQ batch engine reduces reward processing time by 65%',
      'Real-time WebSocket updates for 100K+ users',
      'Smart contract–based reward distribution',
      'Multi-wallet integration (MetaMask, WalletConnect)',
    ],
  },
  {
    id: 'erl2',
    name: 'ERL 2.0',
    year: '2023',
    description:
      'Digital vehicle revenue licensing system deployed across 330+ Sri Lankan government authorities, modernizing the national licensing infrastructure.',
    techStack: ['NestJS', 'React.js', 'TypeORM', 'MySQL', 'Keycloak', 'Docker', 'Azure'],
    highlights: [
      'Deployed across 330+ government authorities nationwide',
      'Keycloak-based SSO and identity management',
      'Offline-capable progressive web architecture',
      'Automated audit trails and compliance reporting',
    ],
  },
  {
    id: 'slaasm',
    name: 'SLAASMB',
    year: '2023',
    description:
      'Audit automation platform with secure identity management, streamlining government audit workflows and reporting.',
    techStack: ['Express.js', 'TypeScript', 'React Material-UI', 'MySQL', 'WSO2'],
    highlights: [
      'WSO2 Identity Server integration for secure SSO',
      'Automated audit workflow engine',
      'Role-based access control across departments',
      'Compliance-ready reporting and document management',
    ],
  },
  {
    id: 'dynamicdocs',
    name: 'DynamicDocuments QT',
    year: '2023',
    description:
      'Multi-tenant offer management platform used across Scandinavia, enabling dynamic document generation and workflow automation.',
    techStack: ['Node.js', 'React-Bootstrap', 'MongoDB', 'Azure', 'Docker'],
    highlights: [
      'Multi-tenant SaaS architecture on Azure',
      'Dynamic document templating engine',
      'Containerized microservice deployment',
      'Used by multiple enterprise clients across Scandinavia',
    ],
  },
  {
    id: 'cxpulse',
    name: 'CxPulse',
    year: '2022',
    description:
      "Survey management and analytics platform serving 17M+ users for Sri Lanka's largest mobile network operator.",
    techStack: ['PHP Laravel', 'Redis', 'Node.js', 'MySQL', 'Laravel Queue'],
    highlights: [
      '17M+ active users on the platform',
      '70% performance boost via queue and SQL optimization',
      'High-throughput data processing with Redis',
      'Custom analytics dashboards for real-time insights',
    ],
  },
  {
    id: 'doc990',
    name: 'DOC990 & MageyMemo',
    year: '2021',
    description:
      'Scalable doctor channeling and appointment management systems serving healthcare providers in Sri Lanka and the Maldives.',
    techStack: ['Node.js', 'React.js', 'MySQL', 'Docker', 'CI/CD'],
    highlights: [
      'Real-time appointment booking and queue management',
      'Multi-country deployment (Sri Lanka & Maldives)',
      'Automated CI/CD pipeline for zero-downtime deploys',
      'SMS & email notification integrations',
    ],
  },
  {
    id: 'onehris',
    name: 'OneHRIS / MintHRM',
    year: '2017',
    description:
      'Cloud-based HR management systems with comprehensive leave, attendance, and payroll processing modules.',
    techStack: ['PHP Laravel', 'PHP Yii', 'JavaScript', 'MySQL', 'HTML5'],
    highlights: [
      'End-to-end payroll calculation engine',
      'Biometric attendance integration',
      'Multi-company and multi-currency support',
      'Open-source version adopted globally',
    ],
  },
];

// ── Education ──────────────────────────────────────────────
export const education: EducationItem[] = [
  {
    degree: 'MSc Information Technology',
    institution: 'Cardiff Metropolitan University',
    country: 'United Kingdom',
    countryShort: 'UK',
    year: '2017',
    logo: '/cardiff-met.png',
  },
  {
    degree: 'BEng (Hons) Software Engineering',
    institution: 'Staffordshire University',
    country: 'United Kingdom',
    countryShort: 'UK',
    year: '2013',
    logo: '/staffordshire.png',
  },
];

// ── Certifications ─────────────────────────────────────────
export const certifications: CertificationItem[] = [
  {
    title: 'Certification of Leadership and Communication',
    issuer: 'Toastmasters International',
    year: '2022',
  },
  {
    title: 'CMMI 2.0 Level 3 – Certificate of Appreciation',
    issuer: 'CMMI Institute',
    year: '2022',
  },
  {
    title: 'Agile Certification',
    issuer: 'Axiata Digital Labs',
    year: '2022',
  },
];

// ── Core stack (rendered as a plain typographic line) ──────
export const coreStack: string[] = [
  'Node.js',
  'NestJS',
  'TypeScript',
  'OpenAI API',
  'React',
  'Next.js',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Kafka',
  'Docker',
  'AWS',
  'Azure',
];

