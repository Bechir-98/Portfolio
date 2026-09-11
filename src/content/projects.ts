import { attachProjectMedia } from '../lib/projectImages'

export type ProjectCategory = 'full-stack' | 'ai' | 'hackathon'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  tagline: string
  category: ProjectCategory
  year: string
  role: string
  timeline: string
  challenge: string
  summary: string[]
  solutions: string[]
  impact: string[]
  stack: string[]
  links?: ProjectLink[]
  liveUrl?: string
  image?: string
  gallery?: string[]
}

const projectData = [
  {
    id: 'ma-federation',
    title: 'MaFederation',
    subtitle: 'Sports Federation Management Platform',
    tagline: 'Run an entire sports federation without the paper trail.',
    category: 'full-stack',
    year: '2025',
    role: 'Full-Stack Developer',
    timeline: 'Summer 2025 · 3 months',
    challenge:
      'Sports federations juggle clubs, players, licenses and staff on spreadsheets and email: slow, error-prone, and impossible to audit.',
    summary: [
      'Full-stack platform for managing clubs, players, and staff with role-based access and approval workflows.',
      'Layered Spring Boot backend secured with JWT and a responsive Angular frontend.',
    ],
    solutions: [
      'Designed a role-based access model covering federation admins, club managers, and staff with granular permissions.',
      'Built approval workflows for license renewals and member transfers so nothing ships without review.',
      'Modeled a layered Spring Boot service architecture with JWT-secured endpoints and a PostgreSQL schema.',
      'Delivered a responsive Angular SPA with dashboards tailored to each role.',
    ],
    impact: [
      'Replaced manual spreadsheets with a single source of truth for member records.',
      'Shipped a JWT-secured API used across all client surfaces.',
      'Learned to negotiate scope with stakeholders and defend architecture choices in review.',
    ],
    stack: ['Angular', 'Spring Boot', 'PostgreSQL', 'JWT'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Bechir-98/MaFederation',
      },
    ],
  },
  {
    id: 'wheel-match',
    title: 'Wheel Match',
    subtitle: 'AI-Matched Wheelchair Selection for Patients & Vendors',
    tagline:
      "Rule-first wheelchair ranking with an optional SLM re-rank. The patient's choice is final.",
    category: 'ai',
    year: '2025',
    role: 'AI Engineer',
    timeline: '2025 · semester project',
    challenge:
      'Choosing a wheelchair is a medical decision, yet patients compare specs by hand while vendors manage stock blindly. Matching has to be explainable, in-stock, and final, with no clinician in the loop.',
    summary: [
      'Role-based platform for patients and vendors: medical-profile matching, filterable catalog, request tracking, and a vendor inventory dashboard.',
      'Rule-first ranking (association, propulsion, in-stock) via /recommendations with an optional llama.cpp SLM re-rank.',
    ],
    solutions: [
      'Built rule-first ranking on medical profile (morphology, pathologies, propulsion, habits) with in-stock filtering; optional Qwen2.5-0.5B SLM re-rank that never writes approvals.',
      'Shipped a FastAPI plus SQLAlchemy 2.0 plus PostgreSQL backend with JWT auth, role guards, chat with KB rebuild, and patient-vendor messaging.',
      'Built the React 18 plus Vite plus Tailwind plus Radix frontend: catalog with filters, search and pagination, medical record forms, dashboards, cart and wishlist.',
      'Retired the clinician role cleanly: drop_clinician.sql removes the CLINICIEN tables while keeping Consultation and MedicalEntry history.',
      'Added an eval_recommend.py recall@3 gate that exits 1 under 0.8, so ranking regressions fail loud.',
    ],
    impact: [
      'Patient choice from the ranking is final (APPROUVE at creation), so there is no approval limbo.',
      'Vendors get stock alerts, inventory value stats, and an incoming request queue.',
      'One docker compose up runs the whole stack, including the local SLM.',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'JWT', 'llama.cpp', 'Docker'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Bechir-98/Wheel_Match',
      },
    ],
  },
  {
    id: 'geekshack',
    title: 'Geekshack',
    subtitle: 'Competitive Programming Platform',
    tagline: '50+ hackers, 24 hours, one platform, built by a team of four.',
    category: 'hackathon',
    year: '2025',
    role: 'Tech Lead',
    timeline: 'Hackathon · 1 weekend',
    challenge:
      'Hosting a competitive programming hackathon needs a reliable platform for problems, leaderboards, and submissions under real pressure.',
    summary: [
      'Built in a team of 4 during a hackathon with 50+ participants.',
      'Led architecture, task distribution, and deployment of the full platform.',
    ],
    solutions: [
      'Led architecture, task breakdown, and review flow across a four-person team.',
      'Designed the submission pipeline and live leaderboard with Redis-backed state.',
      'Owned deployment so the platform stayed up while participants were actively solving.',
    ],
    impact: [
      'Kept the contest running for the full event with zero downtime.',
      'Gave 50+ participants a smooth experience, and the club a repeatable platform for future editions.',
    ],
    stack: ['React', 'Laravel', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'traffici',
    title: 'Traffici',
    subtitle: 'Traffic Light Optimization with RL',
    tagline: 'Teaching traffic lights to think ahead with reinforcement learning.',
    category: 'ai',
    year: '2025',
    role: 'ML Engineer',
    timeline: '2025 · research project',
    challenge:
      'Fixed traffic light timers waste minutes at intersections; optimizing them in the real world is risky and expensive.',
    summary: [
      'Intelligent traffic signal optimization using Q-Learning and Deep Q-Learning.',
      'Designed reward systems and trained neural agents to reduce congestion and wait times.',
    ],
    solutions: [
      'Modeled intersections in SUMO and trained Q-Learning and Deep Q-Learning agents against baselines.',
      'Engineered reward functions balancing queue length, wait time, and throughput.',
      'Built evaluation harnesses comparing agent policies across congestion levels.',
    ],
    impact: [
      'Cut average wait time 23% and lifted throughput 17% versus fixed-cycle baselines in SUMO simulation.',
      'Validated that deep policies generalize better under heavy traffic than tabular Q-Learning.',
    ],
    stack: ['Python', 'PyTorch', 'Reinforcement Learning', 'SUMO'],
  },
  {
    id: 'ai-gate',
    title: 'AI Gate',
    subtitle: 'Security and reversible-anonymization proxy for LLM chat traffic',
    tagline:
      'Intercepts prompts, strips PII, forwards to your OpenAI-compatible model, restores sensitive data.',
    category: 'ai',
    year: '2026',
    role: 'Full-Stack Developer',
    timeline: '2026 · personal project',
    challenge:
      'Personal data sent to LLM APIs becomes unrecoverable once a prompt is logged or a model is trained. Teams need AI power against their own models without ever exposing PII, transparently through the clients they already use.',
    summary: [
      'OpenAI-compatible gateway: any client talks to /v1/chat/completions with an aig_... key; PII is stripped before the model and restored in the response.',
      'React + Vite chat UI with session management, audit trail, and a latency/token metrics dashboard behind Google OAuth.',
    ],
    solutions: [
      'Built a security pipeline: GLiNER v2 PII detection (HuggingFace Space) plus Presidio anonymization and user-defined regex patterns, all togglable in-app.',
      'Implemented an in-memory reversible-anonymization vault: PII becomes tokens before the LLM call and is restored on output with editable entity mappings.',
      'Shipped the gateway: POST /v1/chat/completions with streaming SSE and GET /v1/models, authenticated by per-service aig_... API keys routed to configured model credentials.',
      'Backed it with FastAPI and async SQLAlchemy on PostgreSQL: audit log plus per-exchange latency/token telemetry with 30-day retention.',
      'Dockerized the stack (Postgres, API, Caddy): copy .env.example to .env, docker compose up, open http://localhost.',
    ],
    impact: [
      'Any OpenAI SDK client works unchanged: swap base_url and key; anonymization stays transparent to API clients.',
      'Makes the security cost of every call visible: per-exchange and per-scanner latency on the Metrics page.',
      'Fully configurable per deployment: scanners, entity mappings, and patterns managed in-app.',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'Presidio', 'GLiNER', 'Docker', 'Google OAuth'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Bechir-98/AiGate',
      },
    ],
  },
  {
    id: 'carthvillage',
    title: 'CarthVillage',
    subtitle: 'Unified Academic Platform for Carthage University',
    tagline:
      'Bringing universities together as a village, uniting academic management, data intelligence, and AI reporting in one green campus.',
    category: 'hackathon',
    year: '2026',
    role: 'Full-Stack Developer',
    timeline: '2026 · hackathon',
    challenge:
      'University systems live in silos: academic records, campus services, and planning data never meet, so staff decide on spreadsheets while sustainability goals stay on paper.',
    summary: [
      'Unified academic platform: data catalog, reporting, dashboards, and campus services in one cohesive experience.',
      'AI layer with assistants, predictive forecasting, automated reports, and natural-language queries over university data.',
    ],
    solutions: [
      'Built the FastAPI backend with uv: API routes, ingest endpoints, AI orchestration services, and background workers.',
      'Backed user management and secure access with Supabase and extensible workflow integration.',
      'Shipped a React + Vite + TypeScript frontend with real-time dashboards and collaborative interfaces for staff.',
      'Added document ingestion pipelines that turn policies and campus data into searchable knowledge for natural-language queries.',
      'Bundled the platform with its presentation deck and an overview video for the final demo.',
    ],
    impact: [
      'Gave staff one village: new programs, partnerships, and resource optimizations surfaced by an opportunities finder.',
      'Turned enrollment, resource, and sustainability planning into predictive forecasts instead of spreadsheet guesswork.',
      'Designed around green campus operations and cross-university collaboration.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'Supabase', 'AI orchestration'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Taha2053/Carthage',
      },
    ],
  },
  {
    id: 'defendrag',
    title: 'DefendRag',
    subtitle: 'Agentic RAG for AI Security Knowledge Retrieval',
    tagline:
      'Hybrid search plus cross-encoder rerank plus LLM generation, answering cybersecurity questions from trusted sources.',
    category: 'ai',
    year: '2026',
    role: 'AI Engineer',
    timeline: '2026 · personal project',
    challenge:
      'Security teams drown in OWASP, MITRE, and NIST documents, while naive RAG hallucinates or retrieves junk. Answers need to come from trusted sources, with citations, not vibes.',
    summary: [
      'Agentic RAG over trusted cybersecurity sources: hybrid keyword-plus-vector search, cross-encoder rerank, and LLM generation with cited sources.',
      'Streamlit Q&A interface plus a built-in eval harness that checks doc recall, key terms, and citations, and exits non-zero on failure.',
    ],
    solutions: [
      'Built a LangGraph agent pipeline (retrieve, cross-encoder rerank, generate) that rescores hybrid results and passes only the top-K to the LLM.',
      'Combined SQLite FTS5 keyword search with SentenceTransformer vector embeddings for hybrid retrieval.',
      'Made the LLM pluggable: any OpenAI-compatible API (Ollama, vLLM, OpenAI, Groq with backoff retries on 429s).',
      'Wrote an eval harness with a golden question set, turning retrieval quality into a repeatable fail-loud metric.',
      'Kept setup local-first: drop PDFs in data/, run index.py, then streamlit run app.py; models auto-download on first run.',
    ],
    impact: [
      'Every answer ships with its trusted sources instead of hallucinating.',
      'Runs fully local with Ollama for sensitive security docs that cannot leave the machine.',
      'Eval gate makes regressions visible before they reach users.',
    ],
    stack: ['Python', 'LangGraph', 'Streamlit', 'SQLite FTS5', 'SentenceTransformers', 'CrossEncoder', 'RAG'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Bechir-98/DefendRag',
      },
    ],
    liveUrl: 'https://bechbech.duckdns.org/',
  },
] satisfies Omit<Project, 'image' | 'gallery'>[]

const projectOrder = [
  'ai-gate',
  'defendrag',
  'carthvillage',
  'traffici',
  'wheel-match',
  'ma-federation',
  'geekshack',
]

export const projects: Project[] = projectData
  .map(attachProjectMedia)
  .sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id))

export function getProjectById(id: string | undefined) {
  return projects.find((project) => project.id === id)
}
