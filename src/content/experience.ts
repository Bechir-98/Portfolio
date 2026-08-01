export interface Experience {
  id: string
  title: string
  company: string
  location: string
  dates: string
  highlights: string[]
}

export const experience: Experience[] = [
  {
    id: 'cybersqool',
    title: 'Software Engineer (Part-time)',
    company: 'CyberSqool',
    location: 'Remote, Morocco',
    dates: 'Oct 2025 · May 2026',
    highlights: [
      'Contributed to the development and evolution of a production EdTech platform.',
      'Delivered new backend features and improved application architecture.',
      'Built n8n automation workflows to personalize user content and optimize business processes.',
    ],
  },
  {
    id: 'lbconsulting',
    title: 'Software Development Intern',
    company: 'LBConsulting',
    location: 'Tunis, Tunisia',
    dates: 'Summer 2025',
    highlights: [
      'Developed MaFederation, a sports federation management platform.',
      'Implemented a JWT-secured Spring Boot backend and Angular frontend.',
      'Worked in an agile team with code reviews and organizational standards.',
    ],
  },
]
