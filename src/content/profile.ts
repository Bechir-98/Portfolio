import { asset } from '../lib/paths'

export interface SocialLink {
  label: string
  url: string
  icon: 'email' | 'phone' | 'linkedin' | 'github'
}

export interface Education {
  school: string
  location: string
  degree: string
  dates: string
}

export interface Profile {
  name: string
  shortName: string
  headline: string
  hook: string
  location: string
  about: string[]
  now: string[]
  facts: string[]
  education: Education[]
  email: string
  phone: string
  cvUrl: string
  photoUrl: string
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Mohamed Bechir Chemam',
  shortName: 'Bechir',
  headline:
    'Final-year software engineering student building LLM security, RAG systems, and full-stack products.',
  hook: 'AI engineer & full-stack developer building systems that reason.',
  location: 'Tunis, Tunisia',
  about: [
    'Software engineering student at ENSIT. During the day I build full-stack applications and intelligent systems: REST APIs, modern frontends, RAG chatbots, and reinforcement learning agents. At night I organize hackathons as Vice-President of the ENSIT Geeks Club.',
    "I believe software is a craft: layering a clean API is as satisfying as getting a WebGL scene to render at 60fps. That's why this site is hand-rolled, no templates, with a Three.js hero you can feel and a design system built from scratch.",
    'Spent Summer 2026 at ATS Dev building an OpenAI-compatible AI security gateway with reversible PII anonymization. Now back for my final year at ENSIT and always hunting for the next problem worth over-engineering.',
  ],
  now: [
    'Final year @ ENSIT (Software Engineering, 2027)',
    'Shipping AI Gate, a reversible-anonymization proxy for LLM chat',
    'Teaching competitive programming at ENSIT Geeks Club',
    'Reading "Designing Data-Intensive Applications"',
  ],
  facts: [
    'Vice-President, ENSIT Geeks Club',
    '1st place, ENDA Hackathon',
    'Speaks Arabic, French, English',
    'Prefers typed languages and dark mode',
  ],
  education: [
    {
      school: 'Higher National Engineering School of Tunis (ENSIT)',
      location: 'Tunis, Tunisia',
      degree: 'Engineering Degree in Software Engineering',
      dates: 'Sep 2024 – Jun 2027',
    },
    {
      school: 'Tunis Preparatory Engineering Institute (IPEIT)',
      location: 'Tunis, Tunisia',
      degree: 'Preparatory Classes in Mathematics and Physics',
      dates: 'Sep 2022 – Jun 2024',
    },
  ],
  email: 'mohamedbechir.chemam@ensit.u-tunis.tn',
  phone: '+216 92 195 666',
  cvUrl: asset('/Mohamed_Bechir_Chemam_CV.pdf'),
  photoUrl: asset('/bechir.png'),
  socials: [
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/bechirchemam',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/Bechir-98',
      icon: 'github',
    },
    {
      label: 'Email',
      url: 'mailto:mohamedbechir.chemam@ensit.u-tunis.tn',
      icon: 'email',
    },
  ],
}
