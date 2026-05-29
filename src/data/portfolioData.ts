// ============================================================
// Portfolio Data — Chathuranga Kumarasinghe
// ============================================================

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
  featured: boolean;
  year?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  country: string;
  year: string;
  icon: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

// ── Personal Info ──────────────────────────────────────────
export const personalInfo = {
  name: 'Chathuranga Kumarasinghe',
  title: 'Senior Software Engineer | Backend Engineer | Team Lead',
  email: 'kumarasinghe.it@gmail.com',
  phone: '+971557504580',
  location: 'Dubai, UAE',
  linkedin: 'https://linkedin.com/in/chathurangak',
  github: 'https://github.com/chakuma8998',
  cvUrl: '/cv.pdf',
  summary:
    'Results-oriented Senior Software Engineer (Full Stack) with 11+ years of experience delivering high-quality software solutions across blockchain, ERP, HR, and healthcare domains. Proficient in Node.js, NestJS, ReactJS, TypeScript, and cloud platforms. Demonstrated ability to lead teams, drive innovation, and design scalable, maintainable systems.',
} as const;

// ── Stats ──────────────────────────────────────────────────
export const stats: StatItem[] = [
  { value: '11+', label: 'Years Experience', icon: '🚀' },
  { value: '15+', label: 'Team Members Led', icon: '👥' },
  { value: '20+', label: 'Projects Shipped', icon: '📦' },
  { value: '3', label: 'Cloud Platforms', icon: '☁️' },
];

// ── Skills ─────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    color: 'from-indigo-500/20 to-indigo-500/5',
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
    icon: '🎨',
    color: 'from-purple-500/20 to-purple-500/5',
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
    id: 'databases',
    label: 'Databases & Messaging',
    icon: '🗄️',
    color: 'from-blue-500/20 to-blue-500/5',
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
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: '☁️',
    color: 'from-cyan-500/20 to-cyan-500/5',
    skills: [
      'Microsoft Azure',
      'AWS',
      'Google Cloud',
      'Docker',
      'Rancher',
      'GitLab CI/CD',
      'GitHub Actions',
      'Bitbucket',
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture & Integration',
    icon: '🏗️',
    color: 'from-violet-500/20 to-violet-500/5',
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
    icon: '🛠️',
    color: 'from-emerald-500/20 to-emerald-500/5',
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
    role: 'Software Developer (Team Lead – Backend)',
    company: 'SoftBuilders Software Design LLC',
    location: 'Business Bay, Dubai, UAE',
    period: 'Aug 2024 – Present',
    current: true,
    description: [
      'Lead backend development for a blockchain-driven platform, designing scalable microservices and real-time systems using NestJS, Redis, RabbitMQ, and Socket.IO.',
      'Built and maintain a BullMQ batch engine that reduces reward processing time by 65%.',
      'Designed and implemented the DeFi360 backend, enabling staking, licensing, wallet integrations, and smart contract–based rewards.',
      'Integrated PandaDoc for seamless onboarding workflows and managed secure CI/CD deployments.',
    ],
    technologies: ['NestJS', 'Node.js', 'Redis', 'RabbitMQ', 'BullMQ', 'Socket.IO', 'Docker', 'MongoDB', 'PostgreSQL'],
  },
  {
    id: 'inova-lead',
    role: 'Technical Lead',
    company: 'Inova IT Systems (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Mar 2023 – Aug 2024',
    current: false,
    description: [
      'Led a cross-functional team of 15+ engineers to deliver secure, high-quality solutions for eRL 2.0 and SLAASM projects.',
      'Designed application architecture, database models, and code structure to ensure scalability and maintainability.',
      'Collaborated closely with international clients in Sweden and Singapore, driving R&D initiatives.',
      'Enforced engineering best practices including TDD, code reviews, and Agile ceremonies.',
    ],
    technologies: ['NestJS', 'React.js', 'TypeORM', 'MySQL', 'Keycloak', 'Docker', 'Azure'],
  },
  {
    id: 'inova-senior',
    role: 'Associate Technical Lead – Senior Software Engineer',
    company: 'Inova IT Systems (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Oct 2018 – Mar 2023',
    current: false,
    description: [
      'Optimized CxPulse platform performance with improved Laravel queues and SQL, boosting system efficiency by 70%.',
      'Enhanced dashboards and CMS by integrating Node.js microservices with React.js frontend.',
      'Led the development team, conducted code reviews, and collaborated with QA to ensure delivery quality.',
      'Mentored junior developers and promoted clean-code and SOLID principles across the team.',
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
    description: [
      'Developed and maintained OneHRIS, a comprehensive HRIS and payroll management system.',
      'Collaborated with end-users to gather requirements and translate them into robust software features.',
      'Delivered performance enhancements and feature upgrades across multiple product modules.',
    ],
    technologies: ['PHP Laravel', 'JavaScript', 'MySQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'infoseek',
    role: 'Software Engineer',
    company: 'Infoseek (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Aug 2016 – Nov 2017',
    current: false,
    description: [
      'Developed mintHRM, an open-source HRIS platform used across multiple organizations.',
      'Led the design and implementation of the Leave Management module end-to-end.',
      'Contributed to architecture decisions and maintained code quality standards.',
    ],
    technologies: ['PHP Yii', 'JavaScript', 'MySQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'uom',
    role: 'Software Engineer',
    company: 'Uni-Consultancy Services, University of Moratuwa',
    location: 'Moratuwa, Sri Lanka',
    period: 'Jul 2014 – Jul 2016',
    current: false,
    description: [
      'Developed and maintained MIS and ERP systems for university administrative operations.',
      'Built data management modules for financial and academic departments.',
      'Collaborated in an Agile team environment to deliver iterative software releases.',
    ],
    technologies: ['PHP', 'JavaScript', 'MySQL', 'HTML5', 'CSS'],
  },
];

// ── Projects ───────────────────────────────────────────────
export const projects: ProjectItem[] = [
  // ── Featured ──────────────────────────────────────────────
  {
    id: 'homnifi',
    name: 'Homnifi Platform',
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
    featured: true,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'defi360',
    name: 'DeFi360',
    year: '2024',
    description:
      'Full-featured DeFi platform backend powering staking, licensing, and crypto wallet operations with on-chain smart contract integrations.',
    techStack: ['NestJS', 'MongoDB', 'Ethers.js', 'Redis', 'Docker', 'PostgreSQL'],
    highlights: [
      'Smart contract reward distribution and vesting schedules',
      'Multi-chain wallet integration and portfolio management',
      'Automated compliance and KYC workflow integration',
      'Real-time staking analytics across multiple token pools',
    ],
    featured: true,
    githubUrl: 'https://github.com/chakuma8998',
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
    featured: true,
    githubUrl: 'https://github.com/chakuma8998',
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
    featured: true,
    githubUrl: 'https://github.com/chakuma8998',
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
    featured: true,
    githubUrl: 'https://github.com/chakuma8998',
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
    featured: true,
    githubUrl: 'https://github.com/chakuma8998',
  },

  // ── Also Shipped ───────────────────────────────────────────
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
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
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
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'blockchain-reward-engine',
    name: 'Blockchain Reward Engine',
    year: '2024',
    description:
      'High-throughput batch processing engine for on-chain reward calculations and smart contract distribution at scale.',
    techStack: ['NestJS', 'BullMQ', 'Redis', 'Ethers.js', 'PostgreSQL'],
    highlights: [
      'Processes millions of reward calculations per cycle',
      'Retry logic and dead-letter queues for fault tolerance',
      'Real-time job monitoring and alerting dashboard',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'staker-wallet-gateway',
    name: 'Staker Wallet Gateway',
    year: '2024',
    description:
      'Unified wallet abstraction layer supporting MetaMask, WalletConnect, and custom hardware wallet integrations.',
    techStack: ['NestJS', 'Ethers.js', 'Web3.js', 'MongoDB', 'Redis'],
    highlights: [
      'Multi-chain support across EVM-compatible networks',
      'Transaction signing and gas estimation',
      'Wallet session management with JWT and refresh tokens',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'pandadoc-onboarding',
    name: 'PandaDoc Onboarding Service',
    year: '2024',
    description:
      'Automated document workflow for user onboarding, e-signature collection, and KYC compliance at SoftBuilders.',
    techStack: ['NestJS', 'PandaDoc API', 'MongoDB', 'RabbitMQ'],
    highlights: [
      'End-to-end e-signature workflow automation',
      'Template-driven document generation',
      'Webhook-driven real-time status updates',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'erl-api-gateway',
    name: 'eRL API Gateway',
    year: '2023',
    description:
      'Centralized API gateway for routing, authentication, and rate-limiting across eRL government microservices.',
    techStack: ['NestJS', 'Keycloak', 'Redis', 'Docker', 'Azure'],
    highlights: [
      'JWT and OAuth2 authentication middleware',
      'Rate limiting and DDoS protection at gateway level',
      'Audit logging for all government API interactions',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'revenue-license-docs',
    name: 'Revenue License Document Engine',
    year: '2023',
    description:
      'Automated PDF generation engine for vehicle revenue licenses, receipts, and government compliance documents.',
    techStack: ['NestJS', 'Puppeteer', 'MySQL', 'Azure Blob Storage'],
    highlights: [
      'Bulk document generation at high throughput',
      'Digital signature, watermarking, and tamper detection',
      'Template management for 10+ document types',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'cxpulse-campaign',
    name: 'CxPulse Campaign Engine',
    year: '2022',
    description:
      'Multi-channel survey campaign scheduler and delivery system with audience targeting and segmentation.',
    techStack: ['PHP Laravel', 'MySQL', 'Redis', 'Laravel Queue', 'SMS Gateway'],
    highlights: [
      'Segment-based campaign audience targeting',
      'SMS and email delivery with intelligent retry logic',
      'Campaign analytics, heatmaps, and response tracking',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'channel-analytics',
    name: 'Channel Partner Analytics',
    year: '2021',
    description:
      'Real-time analytics portal for telecom channel partners to monitor KPIs, commissions, and product performance.',
    techStack: ['Node.js', 'React.js', 'MySQL', 'Redis', 'Chart.js'],
    highlights: [
      'Real-time KPI dashboards with drill-down capability',
      'Commission calculation and dispute reporting',
      'Regional performance analytics by product category',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'wso2-iam',
    name: 'WSO2 Identity Platform',
    year: '2023',
    description:
      'Enterprise Identity and Access Management implementation with SSO, MFA, and role-based access control across government systems.',
    techStack: ['WSO2 IS', 'SAML 2.0', 'OAuth2', 'LDAP', 'React.js'],
    highlights: [
      'SSO across 5+ enterprise applications',
      'MFA with TOTP and SMS verification',
      'User provisioning and full lifecycle management',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'patient-queue',
    name: 'Patient Queue Manager',
    year: '2021',
    description:
      'Real-time patient queue tracking system with token management and digital signage integration for hospital OPDs.',
    techStack: ['Node.js', 'Socket.IO', 'MySQL', 'React.js'],
    highlights: [
      'Real-time queue updates via WebSockets',
      'Digital display board integration',
      'Doctor availability and appointment slot management',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'payroll-engine',
    name: 'OneHRIS Payroll Engine',
    year: '2018',
    description:
      'Complex payroll calculation engine supporting multi-company, multi-currency, and statutory deduction computations.',
    techStack: ['PHP Laravel', 'MySQL', 'JavaScript', 'Redis'],
    highlights: [
      'Multi-company payroll in a single batch run',
      'Statutory deduction rules per jurisdiction',
      'Bank export formats for direct payment processing',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'biometric-attendance',
    name: 'Biometric Attendance System',
    year: '2018',
    description:
      'Integration layer for biometric fingerprint devices with real-time attendance sync and shift management.',
    techStack: ['PHP Laravel', 'MySQL', 'ZKTeco SDK', 'Node.js'],
    highlights: [
      'Real-time device synchronization via TCP/IP',
      'Shift scheduling and overtime calculation engine',
      'Late arrival, early exit, and absentee tracking',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'mintherm-recruitment',
    name: 'MintHRM Recruitment Module',
    year: '2017',
    description:
      'End-to-end recruitment workflow module with job posting, applicant tracking, and interview scheduling.',
    techStack: ['PHP Yii', 'MySQL', 'JavaScript', 'HTML5'],
    highlights: [
      'Job board integration and applicant self-service portal',
      'Interview scheduling and structured feedback collection',
      'Offer letter generation and digital acceptance tracking',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'university-erp',
    name: 'University Financial ERP',
    year: '2015',
    description:
      'Financial management information system for university accounts, procurement, and budget management.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML5'],
    highlights: [
      'Chart of accounts with double-entry bookkeeping',
      'Purchase order and vendor management workflows',
      'Budget allocation, variance reporting, and forecasting',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'student-portal',
    name: 'Student Affairs Portal',
    year: '2015',
    description:
      'Self-service student portal for academic records, course registration, and campus administrative services.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'CSS3'],
    highlights: [
      'Online course registration and add/drop management',
      'Academic transcript and certificate generation',
      'Fee payment and scholarship application tracking',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
  {
    id: 'exam-management',
    name: 'Examination Management System',
    year: '2014',
    description:
      'Comprehensive exam scheduling, hall allocation, and result processing system for university administration.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML5'],
    highlights: [
      'Automated timetable and hall allocation generation',
      'Invigilator assignment and conflict resolution',
      'Result processing, GPA calculation, and transcript output',
    ],
    featured: false,
    githubUrl: 'https://github.com/chakuma8998',
  },
];

// ── Education ──────────────────────────────────────────────
export const education: EducationItem[] = [
  {
    degree: 'MSc Information Technology',
    institution: 'Cardiff Metropolitan University',
    country: 'United Kingdom',
    year: '2017',
    icon: '🎓',
  },
  {
    degree: 'BEng (Hons) Software Engineering',
    institution: 'Staffordshire University',
    country: 'United Kingdom',
    year: '2013',
    icon: '🎓',
  },
];

// ── Certifications ─────────────────────────────────────────
export const certifications: CertificationItem[] = [
  {
    title: 'Certification of Leadership and Communication',
    issuer: 'Toastmasters International',
    year: '2022',
    icon: '🏆',
  },
  {
    title: 'CMMI 2.0 Level 3 – Certificate of Appreciation',
    issuer: 'CMMI Institute',
    year: '2022',
    icon: '📜',
  },
  {
    title: 'Agile Certification',
    issuer: 'Axiata Digital Labs',
    year: '2022',
    icon: '⚡',
  },
];

// ── Tech Badges (Hero floating badges) ─────────────────────
export const heroBadges = [
  { label: 'Node.js', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { label: 'NestJS', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  { label: 'TypeScript', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { label: 'React', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { label: 'Docker', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  { label: 'MongoDB', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { label: 'Redis', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  { label: 'AWS', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
];
