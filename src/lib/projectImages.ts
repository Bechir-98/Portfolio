import { projectCovers, projectGalleries } from 'virtual:project-images'
import { asset } from './paths'

export function getProjectGallery(projectId: string): string[] {
  return (projectGalleries[projectId] ?? []).map((path) => asset(path))
}

export function getProjectCover(projectId: string): string | undefined {
  const cover = projectCovers[projectId]
  return cover ? asset(cover) : undefined
}

export function attachProjectMedia<T extends { id: string }>(
  project: T,
): T & { image?: string; gallery?: string[] } {
  const gallery = getProjectGallery(project.id)
  const image = gallery[0] ?? getProjectCover(project.id)

  return {
    ...project,
    ...(image ? { image } : {}),
    ...(gallery.length > 0 ? { gallery } : {}),
  }
}
