export interface Section {
  number: string
  title: string
}

export const sections: Record<string, Section> = {
  about: { number: '01', title: 'About' },
  now: { number: '02', title: 'Now' },
  projects: { number: '03', title: 'Projects' },
  achievements: { number: '04', title: 'Achievements' },
  experience: { number: '05', title: 'Experience' },
  skills: { number: '06', title: 'Skills' },
  contact: { number: '07', title: 'Contact' },
}

export function getSection(section: string): Section {
  return sections[section] ?? { number: '--', title: 'Section' }
}
