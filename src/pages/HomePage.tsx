import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Now } from '../components/sections/Now'
import { Projects } from '../components/sections/Projects'
import { Achievements } from '../components/sections/Achievements'
import { Experience } from '../components/sections/Experience'
import { Skills } from '../components/sections/Skills'
import { Contact } from '../components/sections/Contact'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Now />
      <Projects />
      <Achievements />
      <Experience />
      <Skills />
      <Contact />
    </>
  )
}
