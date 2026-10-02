/**
 * Portfolio Data: Srujan Raghavendra S
 * Fully hardcoded dataset (Zero Excel / Google Sheet dependency)
 */
window.PORTFOLIO_DATA = {
  profile: {
    name: "Srujan Raghavendra S",
    title: "Backend-focused Software Engineer & AI Systems Developer",
    currentRoleLine: "Associate AI Developer @ Conneqtion Group (Client: Etihad Engineering) · Ex-Bright Money",
    headline: "Backend engineer who designs distributed microservices, event-driven pipelines and AI systems that stay calm under load.",
    about: "Backend-focused Software Engineer with hands-on experience building scalable REST APIs and distributed microservices in production FinTech, AI and Enterprise environments. Passionate about system design, reliability, and backend architecture.",
    company: "Conneqtion Group",
    client: "Etihad Engineering",
    currently: "Associate AI Developer at Conneqtion Group (Client: Etihad Engineering)",
    pastCompany: "Bright Money",
    focus: "Distributed microservices, event-driven workflows, LangGraph RAG, and high-throughput backend architecture",
    openTo: "Backend, Distributed Systems, and Applied AI Engineering roles",
    location: "Bengaluru, Karnataka, India",
    email: "srujan9712@gmail.com",
    phone: "(+91) 9110415398",
    linkedin: "https://www.linkedin.com/in/srujan-raghavendra-s/",
    github: "https://github.com/SrujanRaghavendraS",
    githubUsername: "SrujanRaghavendraS",
    medium: "https://medium.com/@srujan9712",
    mediumUsername: "srujan9712",
    leetcode: "https://leetcode.com/u/Srujan_Raghavendra_S",
    leetcodeUsername: "Srujan_Raghavendra_S",
    resumeUrl: "assets/Srujan_Raghavendra_Resume.pdf",
    degree: "B.E. in Computer Science and Engineering, BNMIT (GPA: 9.01/10)"
  },

  experience: [
    {
      id: "conneqtion-etihad",
      company: "Conneqtion Group",
      logo: "assets/conneqtiongroup.jpg",
      client: "Etihad Engineering",
      via: "Client: Etihad Engineering",
      role: "Associate AI Developer",
      location: "Bengaluru, Karnataka, India",
      start: "2026-06",
      end: "Present",
      duration: "June 2026 — Present (5 mos)",
      color: "#38bdf8", // Sky Blue
      isCurrent: true,
      stack: [
        "Python", "FastAPI", "LangGraph", "RAG", "React", "Docker", "PostgreSQL",
        "OpenSearch", "OCR", "OAuth 2.0", "OCI IDCS", "Oracle ATP",
        "Object Storage", "OCI Compute", "Oracle WebCenter Content (WCC)", "Oracle Capture"
      ],
      summary: "Architecting document version control, LangGraph RAG assistants, and enterprise search platforms for aviation maintenance manuals at Etihad Engineering.",
      tasks: [
        {
          title: "Document Version Control System for Aviation Maintenance Manuals",
          detail: "Designed and built the backend for an aviation maintenance manual version control system. Authors revise manuals on a cyclical schedule, and approved versions become the source of truth for engineering crews. Drafts transition through hierarchy-based approvals with state management, strict RBAC, and OAuth sign-in via OCI IDCS. Metadata resides in Oracle ATP, files in Oracle WCC on Object Storage, running on an OCI VM.",
          metrics: "State-machine approvals, RBAC, OAuth 2.0, Zero-downtime revision"
        },
        {
          title: "LangGraph RAG Assistant with MMR & Prompt Caching",
          detail: "Built a LangGraph RAG chatbot for maintenance manuals using chunking, embeddings, Maximum Marginal Relevance (MMR) retrieval, and prompt caching. PostgreSQL with pgvector stores embeddings, and incremental re-indexing runs immediately upon manual revision so technicians always query verified specs.",
          metrics: "Incremental re-indexing, MMR retrieval, Prompt caching"
        },
        {
          title: "1.5 TB+ Enterprise Content Migration & OCR Search",
          detail: "Migrated over 1.5 TB of technical documentation into Oracle WCC with department-wise security groups, retention policies, and automated alerts. Built an OCR pipeline indexed with OpenSearch allowing full-text search inside scanned PDFs, plus an access-request chatbot for new user onboarding.",
          metrics: "1.5 TB+ data migrated, Full-text PDF OCR search"
        },
        {
          title: "AI Watchtower On-Premise Monitoring Licensing",
          detail: "Built the licensing and entitlement module for AI Watchtower—an on-premise monitoring platform for VMs and EC2 instances featuring AI-generated reports, anomaly detection, and real-time alerts. Deployed into private tenancies of 3+ enterprise customers.",
          metrics: "Deployed in 3+ enterprise tenancies"
        },
        {
          title: "Automated HR Claims Assistant with Receipt OCR",
          detail: "Engineered an intelligent claims chatbot for Etihad that extracts receipt data using OCR and cross-references line items against employee corporate transactions, drastically cutting manual claim verification time.",
          metrics: "OCR receipt parsing & transaction reconciliation"
        }
      ]
    },
    {
      id: "bright",
      company: "Bright Money",
      logo: "assets/brightmoney.jpg",
      client: null,
      via: "AI-Driven Consumer FinTech",
      role: "Software Development Engineer – Backend (Intern)",
      location: "Bengaluru, Karnataka, India",
      start: "2025-06",
      end: "2026-03",
      duration: "June 2025 — March 2026 (10 mos)",
      color: "#f59e0b", // Amber
      isCurrent: false,
      stack: [
        "Python", "Django", "PostgreSQL", "Kafka", "Celery", "Redis",
        "AWS Glue", "Mixpanel", "Split.io", "New Relic", "Grafana",
        "Jenkins", "GitHub Actions", "Docker"
      ],
      summary: "Built high-throughput backend services, event-driven notification pipelines, and feature stores for credit-building FinTech products serving millions of US users.",
      tasks: [
        {
          title: "Feature Store Architecture for LLM-Powered Features",
          detail: "Migrated LLM-powered product capabilities (Rent Reporting, Subscription Management) from asynchronous runtime inference to a Feature Store–based architecture, boosting pipeline reliability, reducing latency, and decoupling downstream services.",
          metrics: "Decoupled architecture, higher fault tolerance"
        },
        {
          title: "End-to-End Rent Reporting Product Reconstruction",
          detail: "Rebuilt the credit-building Rent Reporting product end-to-end: notification microservices, seamless user onboarding journey, automated cron jobs for GFR/FGFR bureau updates, and an AWS Glue job filtering eligible users; powers ~40k+ monthly active users.",
          metrics: "~40k+ monthly active users"
        },
        {
          title: "High-Scale Event-Driven Notification Workflows (10M+ Users)",
          detail: "Architected and deployed high-throughput event-driven notification workflows across Apache Kafka, Celery, and Redis for user engagement campaigns reaching 5M+ and 10M+ users. Configured A/B test experiments via Split.io and analyzed conversion impact via Mixpanel.",
          metrics: "10M+ users reached, +20% user re-engagement"
        },
        {
          title: "Rent Reporting Opt-Out Experiment with Caching & Polling",
          detail: "Led backend planning and developed Rent Reporting Opt-out experiment, integrating a data science model that processed user transactions while ensuring a zero-breakage funnel experience by implementing strategies like Redis caching and efficient polling.",
          metrics: "Zero-breakage funnel, Caching & Polling optimization"
        },
        {
          title: "Privacy Policy Rollout for 1.4 Million Customers",
          detail: "Coordinated backend migration and consent enforcement for a major privacy policy update covering 1.4 million customers, collaborating closely with frontend engineers to guarantee zero friction and zero downtime.",
          metrics: "1.4M customer migration, 100% compliance"
        },
        {
          title: "10+ Production Deployments & State Machine Reliability",
          detail: "Contributed to 10+ production releases using Jenkins and GitHub Actions CI/CD workflows with zero downtime. Diagnosed and resolved production issues related to state machine transitions and REST API failures, improving system stability.",
          metrics: "10+ zero-downtime releases, MTTR reduction"
        }
      ]
    },
    {
      id: "subhanu",
      company: "Subhanu Technologies",
      client: null,
      via: "Bengaluru, Karnataka, India",
      role: "Software Engineer Intern",
      location: "Bengaluru, Karnataka, India",
      start: "2024-09",
      end: "2025-01",
      duration: "Sept 2024 — Jan 2025 (5 mos)",
      color: "#a855f7", // Purple
      isCurrent: false,
      stack: ["Python", "FastAPI", "REST APIs", "HLD / SLD Design", "API Documentation", "PoC Engineering", "Swagger/OpenAPI"],
      summary: "Engineered scalable REST APIs, High-Level and Low-Level system designs, and proof-of-concepts for electronic beginners and developer learning platforms.",
      tasks: [
        {
          title: "High-Performance Backend REST APIs Development",
          detail: "Actively participated in backend REST API design and implementation using FastAPI, focusing on async handlers, request validation, and comprehensive automated test suites.",
          metrics: "FastAPI Async Services, Modular Endpoints"
        },
        {
          title: "System Design (HLD & SLD) & API Documentation",
          detail: "Contributed to High-Level Design (HLD), System Level Design (SLD), and detailed OpenAPI/Swagger documentation for scalable backend services serving electronic beginners and tech enthusiasts.",
          metrics: "Architecture blueprints & PoC delivery"
        }
      ]
    },
    {
      id: "bnmit",
      company: "BNM Institute of Technology",
      client: null,
      via: "Bengaluru, Karnataka, India",
      role: "B.E. in Computer Science and Engineering",
      location: "Bengaluru, Karnataka, India",
      start: "2021-11",
      end: "2025-06",
      duration: "Nov 2021 — June 2025 (4 yrs)",
      color: "#10b981", // Emerald
      isCurrent: false,
      stack: ["Python", "C", "C++", "SQL", "Data Structures", "Algorithms", "Distributed Systems", "Database Engineering", "Operating Systems"],
      summary: "Graduated with Bachelor of Engineering in Computer Science with a high distinction GPA of 9.01/10 and an IEEE conference publication.",
      tasks: [
        {
          title: "Academic Distinction — GPA 9.01 / 10",
          detail: "Focused coursework in Distributed Systems, Object-Oriented Analysis & Design, Database Engineering, Algorithms & Operating Systems.",
          metrics: "GPA 9.01/10 (Top Tier Honors)"
        },
        {
          title: "IEEE Conference Publication (ICIITCEE 2024)",
          detail: "Authored and published research paper titled 'uFood – Your Meal, Your Way: Say Goodbye to Food Waste' addressing algorithmic food waste reduction in commercial dining environments.",
          metrics: "DOI: 10.1109/IITCEE64140.2025.10915288"
        }
      ]
    }
  ],

  projects: [
    {
      title: "Agentic Hiring Workflow (Multi-Agent Candidate Research and Ranking)",
      summary: "A production-grade multi-agent autonomous hiring platform that conducts thorough research across candidate profiles and assists HR via interactive natural language reasoning.",
      tech: ["Python", "LangGraph", "LangChain", "FastAPI", "RAG", "Vector Search"],
      highlights: [
        "Supervisor agent dynamically splits candidate screening tasks across specialized sub-agents.",
        "Autonomous nodes independently research candidate LinkedIn profiles, GitHub repositories, and previous employment histories.",
        "Predicts compensation benchmarks and computes weighted ranking across technical projects and production experience.",
        "Ingests drives containing 100+ resumes concurrently while preserving isolated conversational memory per candidate profile.",
        "Interactive conversational interface allows HR teams to interrogate candidate decisions with citations and reasoning."
      ],
      link: "https://github.com/SrujanRaghavendraS",
      repo: "https://github.com/SrujanRaghavendraS",
      badge: "Featured AI System"
    },
    {
      title: "Inventory Management System",
      summary: "Full-stack enterprise inventory platform built with Next.js, Express.js, and Tailwind CSS, deployed on AWS with high availability and security hardening.",
      tech: ["Next.js", "Tailwind CSS", "Express.js", "PostgreSQL", "AWS (EC2, RDS, S3, VPC)", "pm2", "Helmet", "Axios"],
      highlights: [
        "Architected secure RESTful services in Express.js with Helmet and Morgan for enterprise audit logging and zero-leakage security headers.",
        "Configured AWS infrastructure including isolated VPCs, RDS multi-AZ databases, and S3 asset buckets.",
        "High-performance client built in Next.js and Tailwind CSS with real-time stock notifications and inventory turnover analytics."
      ],
      link: "https://github.com/SrujanRaghavendraS",
      repo: "https://github.com/SrujanRaghavendraS",
      badge: "Full-Stack & Cloud"
    },
    {
      title: "uFood — Smart Food Waste Mitigation Platform",
      summary: "Published IoT and machine learning software system designed to forecast and mitigate food surplus in university and enterprise dining facilities.",
      tech: ["Python", "FastAPI", "Machine Learning", "PostgreSQL", "React", "Docker"],
      highlights: [
        "Predictive demand-forecasting model factoring in seasonal attendance and meal choices.",
        "Real-time food redistribution dispatch connecting institutional cafeterias with local food rescue initiatives.",
        "Published in IEEE ICIITCEE 2024 (DOI: 10.1109/IITCEE64140.2025.10915288)."
      ],
      link: "https://doi.org/10.1109/IITCEE64140.2025.10915288",
      repo: "https://github.com/SrujanRaghavendraS",
      badge: "IEEE Published"
    },
    {
      title: "AI Watchtower On-Prem Monitoring & Anomaly Detection",
      summary: "On-premise infrastructure monitoring service with automated anomaly detection, AI incident reporting, and cryptographic tenant licensing.",
      tech: ["Python", "FastAPI", "Docker", "Prometheus", "OCI Compute", "OpenSearch"],
      highlights: [
        "Real-time telemetry aggregation for VMs and EC2 instances detecting sudden CPU, RAM, and I/O bottlenecks.",
        "Cryptographic node-locked license verification engine deployed into air-gapped private customer tenancies.",
        "Automated root-cause analysis reporting powered by LLM integration."
      ],
      link: "https://github.com/SrujanRaghavendraS",
      repo: "https://github.com/SrujanRaghavendraS",
      badge: "Enterprise"
    }
  ],

  // Deeply categorized skills with verified proficiency & production impact
  skillsOverview: {
    headline: "Proven track record across full backend architecture, distributed microservices, AI pipelines, and cloud infrastructure.",
    subtext: "From high-throughput event buses (10M+ users) and production RAG agents to relational and vector storage engines."
  },

  skillsByLayer: [
    {
      layer: "AI, Agents & Retrieval Systems",
      icon: "brain",
      description: "Production agentic workflows, embeddings & vector search",
      skills: ["LangGraph", "LangChain", "RAG Systems", "pgvector", "Vector Embeddings", "MMR Retrieval", "Prompt Caching", "Multi-Agent Supervisor Networks", "Receipt & PDF OCR", "FastAPI AI Endpoints"]
    },
    {
      layer: "Backend Architecture & Microservices",
      icon: "server",
      description: "High-performance REST APIs, state machines & security",
      skills: ["Python", "FastAPI", "Django", "Flask", "Node.js", "Express.js", "REST APIs", "OAuth 2.0 / JWT", "RBAC Security", "State Machine Workflows", "C", "C++"]
    },
    {
      layer: "Distributed Systems, Messaging & Async",
      icon: "zap",
      description: "Event-driven pipelines handling millions of users",
      skills: ["Apache Kafka", "Celery", "Redis Caching", "Cron Schedulers", "Event-Driven Notifications (10M+)", "Polling Strategies", "Distributed Task Queues", "Zero-Breakage Funnels"]
    },
    {
      layer: "Databases & Storage Engineering",
      icon: "database",
      description: "Relational, document, search & feature store models",
      skills: ["PostgreSQL", "Oracle ATP", "Oracle WebCenter Content (WCC)", "OpenSearch", "MongoDB", "AWS S3 / OCI Object Storage", "AWS Glue ETL", "Feature Store Architecture", "SQL Query Optimization"]
    },
    {
      layer: "Cloud Infrastructure, DevOps & CI/CD",
      icon: "cloud",
      description: "Automated pipelines, multi-cloud & containerized deployments",
      skills: ["Docker", "OCI (IDCS, Compute, Object Storage)", "AWS (VPC, EC2, RDS, Glue, Amplify, S3)", "Jenkins CI/CD", "GitHub Actions", "Linux / Bash", "PM2 Process Manager", "Vercel"]
    },
    {
      layer: "Observability, Testing & Experimentation",
      icon: "activity",
      description: "Data-driven feature flags, telemetry & system metrics",
      skills: ["Split.io (A/B Testing)", "Mixpanel Product Analytics", "New Relic APM", "Grafana Dashboards", "Postman / Swagger", "Power BI", "System Logging & Auditing"]
    }
  ],

  // Verified PDF Certificates (served from certificates/ directory)
  certificates: [
    {
      id: "cert-rag",
      title: "Ultimate RAG Bootcamp Using LangChain, LangGraph & LangSmith",
      issuer: "Udemy · Krish Naik (KRISHAI Technologies)",
      date: "Aug 2026",
      length: "34 hours",
      credentialId: "UC-689d2602-1d12-4202-8f29-dd14493cba40",
      credentialUrl: "https://ude.my/UC-689d2602-1d12-4202-8f29-dd14493cba40",
      pdfFile: "certificates/Ultimate RAG Bootcamp.pdf",
      tags: ["LangGraph", "LangChain", "RAG", "LangSmith", "Vector Search"],
      description: "Mastery of enterprise retrieval augmented generation, multi-agent LangGraph workflows, LangSmith tracing, embedding indexing, and production LLM orchestration."
    },
    {
      id: "cert-django",
      title: "Python and Django Full Stack Web Developer Bootcamp",
      issuer: "Udemy · Jose Portilla (Pierian Training)",
      date: "Oct 2026",
      length: "32 hours",
      credentialId: "UC-79ef8c93-b559-45c7-beef-8baf93f49cf2",
      credentialUrl: "https://ude.my/UC-79ef8c93-b559-45c7-beef-8baf93f49cf2",
      pdfFile: "certificates/Python and Django.pdf",
      tags: ["Python", "Django", "REST APIs", "Full Stack", "PostgreSQL"],
      description: "Comprehensive full stack development with Django ORM, backend architectures, REST APIs, user authentication, and responsive frontend integration."
    },
    {
      id: "cert-powerbi",
      title: "Microsoft Power BI Desktop for Business Intelligence",
      issuer: "Udemy · Maven Analytics (Chris Dutton & Aaron Parry)",
      date: "Mar 2024",
      length: "16 hours",
      credentialId: "UC-7c9f17b8-d901-45aa-b272-bb3ae26a815d",
      credentialUrl: "https://ude.my/UC-7c9f17b8-d901-45aa-b272-bb3ae26a815d",
      pdfFile: "certificates/Microsoft Power BI Desktop for.pdf",
      tags: ["Power BI", "Data Analytics", "DAX", "Business Intelligence"],
      description: "Hands-on data modeling, DAX measures and calculated columns, automated ETL pipelines, and interactive enterprise business intelligence reporting."
    },
    {
      id: "cert-python",
      title: "2022 Complete Python Bootcamp From Zero to Hero in Python",
      issuer: "Udemy · Jose Portilla",
      date: "Oct 2022",
      length: "22 hours",
      credentialId: "UC-c9a1741f-01bb-4b7b-9fda-56b1f190fe37",
      credentialUrl: "https://ude.my/UC-c9a1741f-01bb-4b7b-9fda-56b1f190fe37",
      pdfFile: "certificates/2022 Complete Python.pdf",
      tags: ["Python 3", "OOP", "Data Structures", "Algorithms", "Decorators"],
      description: "In-depth foundation in modern Python programming, Object-Oriented Programming (OOP), built-in modules, algorithms, decorators, and generators."
    }
  ],

  publications: [
    {
      title: "uFood – Your Meal, Your Way: Say Goodbye to Food Waste",
      venue: "IEEE ICIITCEE 2024",
      doi: "10.1109/IITCEE64140.2025.10915288",
      url: "https://doi.org/10.1109/IITCEE64140.2025.10915288",
      authors: "Srujan Raghavendra S, Chirag G Shetty, Pallavi CV, Shreyas Y M",
      abstract: "Addresses food waste minimization in institutional settings through predictive supply planning and responsive distribution algorithms."
    }
  ],

  // Fallback articles in case RSS is unreachable or offline
  articlesFallback: [
    {
      title: "A/B Experimentation: How Different Roles in a Company Use It (and Tools Like Split.io, Optimizely)",
      date: "2026-04-17",
      pubDateFormatted: "Apr 17, 2026",
      readMinutes: 6,
      categories: ["split", "ab-testing", "backend"],
      url: "https://medium.com/@srujan9712/a-b-experimentation-how-different-roles-in-a-company-use-it-and-tools-like-split-io-optimizely-0f4eaade3f9d",
      summary: "A deep dive into how A/B experimentation operates as a cross-functional system across Engineering, Product, Design, and Data teams, with feature flagging and safe rollouts."
    },
    {
      title: "Authentication: Understanding Stateful, Stateless, and Other Methods",
      date: "2025-03-02",
      pubDateFormatted: "Mar 2, 2025",
      readMinutes: 5,
      categories: ["authentication", "security", "microservices"],
      url: "https://medium.com/@srujan9712/authentication-understanding-stateful-stateless-and-other-methods-d2398bcf2996",
      summary: "Comprehensive guide comparing session-based stateful authentication against JWT/OAuth stateless tokens, centralized LDAP/AD, and adaptive risk-based verification models."
    },
    {
      title: "Building APIs in 2025: Should You Go with FastAPI or ExpressJS?",
      date: "2025-02-26",
      pubDateFormatted: "Feb 26, 2025",
      readMinutes: 5,
      categories: ["fastapi", "expressjs", "python", "javascript"],
      url: "https://medium.com/@srujan9712/building-apis-in-2025-should-you-go-with-fastapi-or-expressjs-ecc76457190c",
      summary: "Architectural comparison of Python's asynchronous FastAPI against Node.js ExpressJS across concurrency, Pydantic type validation, machine learning integration, and raw throughput."
    }
  ]
};
