export interface Section {
  number: string
  title: string
}

export const sections: Record<string, Section> = {
  about: { number: '01', title: 'About' },
  now: { number: '02', title: 'Now' },
  featured: { number: '03', title: 'Featured Work' },
  achievements: { number: '04', title: 'Achievements' },
  projects: { number: '05', title: 'Projects' },
  experience: { number: '06', title: 'Experience' },
  skills: { number: '07', title: 'Skills' },
  contact: { number: '08', title: 'Contact' },
}

export function getSection(section: string): Section {
  return sections[section] ?? { number: '--', title: 'Section' }
}
