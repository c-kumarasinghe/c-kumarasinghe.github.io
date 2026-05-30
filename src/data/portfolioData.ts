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
  description: string;
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
  logo?: string;
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
  { value: '5+', label: 'Industry Domains', icon: '🌐' },
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
    id: 'domains',
    label: 'Industry Domains',
    icon: '🌐',
    color: 'from-cyan-500/20 to-cyan-500/5',
    skills: [
      'HR & Workforce Management',
      'ERP & Enterprise Systems',
      'Healthcare & Clinic Management',
      'Blockchain & DeFi',
      'E-commerce & Retail',
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
    description: 'Leading backend development for blockchain & DeFi platforms, architecting scalable microservices with NestJS, Redis, and RabbitMQ — including a BullMQ batch engine that cut reward processing time by 65%.',
    technologies: ['NestJS', 'Node.js', 'Redis', 'RabbitMQ', 'BullMQ', 'Socket.IO', 'Docker', 'MongoDB', 'PostgreSQL'],
  },
  {
    id: 'inova-lead',
    role: 'Technical Lead',
    company: 'Inova IT Systems (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Mar 2023 – Aug 2024',
    current: false,
    description: 'Led a 15+ engineer team delivering eRL 2.0 and SLAASM for international clients in Sweden and Singapore, driving architecture design, code quality, and Agile best practices.',
    technologies: ['NestJS', 'React.js', 'TypeORM', 'MySQL', 'Keycloak', 'Docker', 'Azure'],
  },
  {
    id: 'inova-atl',
    role: 'Associate Tech Lead',
    company: 'Inova IT Systems (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Apr 2021 – Mar 2023',
    current: false,
    description: 'Promoted to Associate Technical Lead, driving architecture decisions, mentoring developers on clean-code and SOLID principles, and collaborating with QA to ensure delivery quality.',
    technologies: ['PHP Laravel', 'Node.js', 'React.js', 'Redis', 'MySQL', 'Docker'],
  },
  {
    id: 'inova-senior',
    role: 'Senior Software Engineer',
    company: 'Inova IT Systems (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Oct 2018 – Apr 2021',
    current: false,
    description: 'Optimized the CxPulse platform boosting efficiency by 70%, integrated Node.js microservices with React.js frontend, and enhanced dashboards and CMS modules.',
    technologies: ['PHP Laravel', 'Node.js', 'React.js', 'Redis', 'MySQL', 'Docker'],
  },
  {
    id: 'smart-employees',
    role: 'Senior Software Engineer',
    company: 'Smart Employees (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Nov 2017 – Sep 2018',
    current: false,
    description: 'Developed and maintained OneHRIS, a full-featured HRIS and payroll system, delivering performance enhancements and new features based on end-user requirements.',
    technologies: ['PHP Laravel', 'JavaScript', 'MySQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'infoseek',
    role: 'Software Engineer',
    company: 'Infoseek (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Aug 2016 – Nov 2017',
    current: false,
    description: 'Built mintHRM, an open-source HRIS platform, leading the end-to-end design of the Leave Management module and contributing to architecture and code quality standards.',
    technologies: ['PHP Yii', 'JavaScript', 'MySQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'uom',
    role: 'Software Engineer',
    company: 'Uni-Consultancy Services, University of Moratuwa',
    location: 'Moratuwa, Sri Lanka',
    period: 'Jul 2014 – Jul 2016',
    current: false,
    description: 'Developed and maintained MIS systems for university administrative operations, building data management modules for financial and academic departments in an Agile environment.',
    technologies: ['PHP', 'JavaScript', 'MySQL', 'HTML5', 'CSS'],
  },
];

// ── Projects ───────────────────────────────────────────────
export const projects: ProjectItem[] = [
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
  },
  {
    id: 'mai-hrms',
    name: 'Mai HRMS',
    year: '2025',
    description:
      'AI-powered HR platform that transforms employee data into smart insights, automates workflows, and enriches decisions.',
    techStack: ['NestJS', 'MongoDB', 'Next.js', 'Redis', 'Docker', 'PostgreSQL'],
    highlights: [
      'AI-driven insights from employee data and behaviour patterns',
      'Automated HR workflows for onboarding, leave, and payroll',
      'Smart decision enrichment across workforce management',
      'Real-time analytics dashboards with predictive reporting',
    ],
    featured: true,
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
    logo: '/cardiff-met.png',
  },
  {
    degree: 'BEng (Hons) Software Engineering',
    institution: 'Staffordshire University',
    country: 'United Kingdom',
    year: '2013',
    icon: '🎓',
    logo: '/staffordshire.png',
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
  { label: 'Next.js', color: 'bg-white/10 text-white/70 border-white/20' },
  { label: 'Docker', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  { label: 'PostgreSQL', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  { label: 'MySQL', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  { label: 'MongoDB', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { label: 'Redis', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  { label: 'AWS', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
];
