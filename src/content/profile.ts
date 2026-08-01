import { asset } from '../lib/paths'

export interface SocialLink {
  label: string
  url: string
  icon: 'email' | 'phone' | 'linkedin' | 'github'
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
    'Software engineering student building full-stack products and AI systems from Tunis.',
  hook: 'AI engineer & full-stack developer building systems that reason.',
  location: 'Tunis, Tunisia',
  about: [
    'Software engineering student at ENSIT. During the day I build full-stack applications and intelligent systems: REST APIs, modern frontends, RAG chatbots, and reinforcement learning agents. At night I organize hackathons as Vice-President of the ENSIT Geeks Club.',
    "I believe software is a craft: layering a clean API is as satisfying as getting a WebGL scene to render at 60fps. That's why this site is hand-rolled, no templates, with a Three.js hero you can feel and a design system built from scratch.",
    'Currently contributing to an EdTech platform at CyberSqool and always hunting for the next problem worth over-engineering.',
  ],
  now: [
    'Building RAG pipelines at CyberSqool',
    'Teaching competitive programming at ENSIT Geeks Club',
    'Reading "Designing Data-Intensive Applications"',
    'Improving this very site, one shader at a time',
  ],
  facts: [
    'Vice-President, ENSIT Geeks Club',
    '1st place, ENDA Hackathon',
    'Speaks Arabic, French, English',
    'Prefers typed languages and dark mode',
  ],
  email: 'mohamedbechir.chemam@ensit.u-tunis.tn',
  phone: '+216 92 195 666',
  cvUrl: asset('/cv.pdf'),
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
