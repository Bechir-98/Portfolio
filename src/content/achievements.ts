import { asset } from '../lib/paths'

export type AchievementIcon = 'trophy' | 'users' | 'rocket' | 'certificate'

export interface Achievement {
  id: string
  title: string
  organization: string
  date: string
  description: string[]
  icon: AchievementIcon
  featured?: boolean
}

export interface Certification {
  id: string
  name: string
  image?: string
}

export const achievements: Achievement[] = [
  {
    id: 'enda-hackathon',
    title: '1st Place · ENDA Hackathon',
    organization: 'ENDA',
    date: 'April 2026',
    description: [
      'Won first place in a national technology innovation competition organized by ENDA.',
    ],
    icon: 'trophy',
    featured: true,
  },
  {
    id: 'geeks-club',
    title: 'Vice-President',
    organization: 'ENSIT Geeks Club',
    date: '2024 · 2026',
    description: [
      'Organized Geekshack, a competitive programming hackathon.',
      'Led technical workshops and mentored students for national programming competitions.',
    ],
    icon: 'users',
  },
  {
    id: 'open-startup',
    title: 'Participant',
    organization: 'Open Startup (OST) Program',
    date: 'September 2025',
    description: [
      'Joined a pre-incubation and acceleration program for technology startups.',
      'Participated in the Pôle Étudiant Entrepreneur at the University of Tunis.',
    ],
    icon: 'rocket',
  },
]

export const certifications: Certification[] = [
  {
    id: 'aws-ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    image: asset('/certificates/aws.png'),
  },
  {
    id: 'azure-ai',
    name: 'Microsoft Certified: Azure AI Fundamentals',
    image: asset('/certificates/microsoft.png'),
  },
  {
    id: 'github-security',
    name: 'GitHub Advanced Security',
    image: asset('/certificates/github.png'),
  },
  {
    id: 'cisco-ccna',
    name: 'CCNA: Introduction to Networks',
    image: asset('/certificates/cisco.png'),
  },
]
