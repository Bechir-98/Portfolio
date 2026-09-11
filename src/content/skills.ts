export interface SkillGroup {
  id: string
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C'],
  },
  {
    id: 'web',
    label: 'Web & APIs',
    skills: [
      'Angular',
      'React',
      'Spring Boot',
      'FastAPI',
      'Node.js',
      'Laravel',
      'REST APIs',
      'SQLAlchemy',
      'HTML',
      'CSS',
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: ['PostgreSQL', 'pgvector', 'MySQL', 'SQL', 'Alembic'],
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    skills: [
      'PyTorch',
      'Reinforcement Learning',
      'NLP',
      'spaCy',
      'RAG',
      'Vector Search',
      'Embeddings',
      'LangGraph',
      'LLM Agents',
      'LLMOps',
      'LLM Security',
      'Streamlit',
      'Generative AI APIs',
      'n8n',
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    skills: ['Git', 'Docker', 'Linux', 'CI/CD', 'IntelliJ IDEA'],
  },
  {
    id: 'methods',
    label: 'Methods',
    skills: [
      'Agile',
      'Scrum',
      'System Design',
      'Code Review',
      'TDD',
    ],
  },
]

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'French', level: 'B2' },
  { name: 'English', level: 'C1' },
]
