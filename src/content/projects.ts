import { asset } from '../lib/paths'

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
  featured?: boolean
}

export const projects: Project[] = [
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
    image: asset('/projects/ma-federation.svg'),
    gallery: [
      asset('/projects/ma-federation/demo-1.svg'),
      asset('/projects/ma-federation/demo-2.svg'),
      asset('/projects/ma-federation/demo-3.svg'),
    ],
  },
  {
    id: 'wheel-match',
    title: 'Wheel Match',
    subtitle: 'Medical Equipment Recommendation Platform',
    tagline: 'Matching patients to the right wheelchair, one RAG query at a time.',
    category: 'ai',
    year: '2025',
    role: 'AI Engineer',
    timeline: '2025 · semester project',
    challenge:
      'Choosing a wheelchair is a medical decision, yet patients compare specs by hand while clinicians and vendors each live in their own silo.',
    summary: [
      'Helps patients find wheelchairs suited to their medical profiles with dedicated dashboards for clinicians and vendors.',
      'Integrates a RAG-powered chatbot for intelligent query handling across role-specific interfaces.',
    ],
    solutions: [
      'Built a RAG pipeline that retrieves product and medical criteria before answering patient questions.',
      'Created role-specific dashboards: patients compare, clinicians verify, vendors maintain inventory.',
      'Wired a FastAPI backend to PostgreSQL with NLP over structured and unstructured product data.',
      'Wrote retrieval tests to keep answer quality stable as the catalog grows.',
    ],
    impact: [
      'Cut the time-to-shortlist from hours of spec-sheet reading to conversational queries.',
      'Showed how retrieval-augmented generation fits into a regulated domain with an approval loop.',
    ],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'RAG', 'NLP'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Bechir-98/Wheel_Match',
      },
    ],
    image: asset('/projects/wheel-match.svg'),
    gallery: [
      asset('/projects/wheel-match/demo-1.svg'),
      asset('/projects/wheel-match/demo-2.svg'),
      asset('/projects/wheel-match/demo-3.svg'),
    ],
    featured: true,
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
    image: asset('/projects/geekshack.svg'),
    gallery: [
      asset('/projects/geekshack/demo-1.svg'),
      asset('/projects/geekshack/demo-2.svg'),
      asset('/projects/geekshack/demo-3.svg'),
    ],
    featured: true,
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
      'Reduced average vehicle wait time versus fixed-cycle baselines in simulation.',
      'Validated that deep policies generalize better under heavy traffic than tabular Q-Learning.',
    ],
    stack: ['Python', 'PyTorch', 'Reinforcement Learning', 'SUMO'],
    image: asset('/projects/traffici.svg'),
    gallery: [
      asset('/projects/traffici/demo-1.svg'),
      asset('/projects/traffici/demo-2.svg'),
      asset('/projects/traffici/demo-3.svg'),
    ],
  },
  {
    id: 'ai-gate',
    title: 'AI Gate',
    subtitle: 'Security & Reversible-Anonymization Proxy for LLM Chat',
    tagline: 'Intercepts prompts, strips PII, blocks injections, forwards to Gemini, restores sensitive data.',
    category: 'ai',
    year: '2026',
    role: 'Full-Stack Developer',
    timeline: '2026 · personal project',
    challenge:
      'Personal data sent to LLM APIs becomes unrecoverable once a prompt is logged or a model is trained. Teams need AI without ever exposing PII.',
    summary: [
      'Security pipeline for LLM chat traffic: PII detection, prompt injection guard, toxicity filter, and custom regex patterns.',
      'Reversible anonymization vault that swaps PII for tokens before the LLM and restores it on output.',
      'React + Vite chat UI with session management, audit trail, and Google OAuth with a JWT-secured API.',
    ],
    solutions: [
      'Detected PII with Presidio and GLiNER alongside custom regex patterns for domain-specific entities.',
      'Built an in-memory vault that tokenizes sensitive values before the request and restores them in the response.',
      'Added prompt injection and toxicity guards so dangerous or abusive input is blocked before reaching the model.',
      'Shipped a Dockerized stack: `docker compose up` runs the full proxy and UI on localhost.',
      'Implemented Google OAuth sign-in with JWT-secured API endpoints and an audit trail of detections with aggregated entity counts.',
    ],
    impact: [
      'Keeps sensitive data out of prompts and logs while preserving full context through the model call.',
      'Ships as a self-hosted secure chat proxy that anyone can run with a single command.',
      'Made every scanner togglable and entity mappings editable in-app, so the pipeline adapts per deployment.',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'Presidio', 'GLiNER', 'Docker', 'Google OAuth', 'Gemini'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Bechir-98/AiGate',
      },
    ],
    image: asset('/projects/ai-gate.svg'),
    gallery: [
      asset('/projects/ai-gate/demo-1.svg'),
      asset('/projects/ai-gate/demo-2.svg'),
      asset('/projects/ai-gate/demo-3.svg'),
    ],
    featured: true,
  },
]

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => (a.id === 'ai-gate' ? -1 : b.id === 'ai-gate' ? 1 : 0))

export function getProjectById(id: string | undefined) {
  return projects.find((project) => project.id === id)
}
