import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const VIRTUAL_ID = 'virtual:project-images'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i

function isImageFile(name: string) {
  return IMAGE_EXT.test(name)
}

function scanProjectImages(publicDir: string) {
  const projectsDir = path.join(publicDir, 'projects')
  const galleries: Record<string, string[]> = {}
  const covers: Record<string, string> = {}

  if (!fs.existsSync(projectsDir)) {
    return { galleries, covers }
  }

  for (const entry of fs.readdirSync(projectsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const projectId = entry.name
    const images = fs
      .readdirSync(path.join(projectsDir, projectId))
      .filter(isImageFile)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map((file) => `/projects/${projectId}/${file}`)

    if (images.length > 0) {
      galleries[projectId] = images
      covers[projectId] = images[0]
    }
  }

  for (const entry of fs.readdirSync(projectsDir, { withFileTypes: true })) {
    if (!entry.isFile() || !isImageFile(entry.name)) continue

    const id = entry.name.replace(/\.[^.]+$/, '')
    if (!(id in covers)) {
      covers[id] = `/projects/${entry.name}`
    }
  }

  return { galleries, covers }
}

function toModule(galleries: Record<string, string[]>, covers: Record<string, string>) {
  return `export const projectGalleries = ${JSON.stringify(galleries)};\nexport const projectCovers = ${JSON.stringify(covers)};\n`
}

export function projectImagesPlugin(): Plugin {
  let publicDir = 'public'

  return {
    name: 'project-images',
    configResolved(config) {
      publicDir = config.publicDir
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return

      const { galleries, covers } = scanProjectImages(publicDir)
      return toModule(galleries, covers)
    },
    configureServer(server) {
      const watchDir = path.join(publicDir, 'projects')
      if (fs.existsSync(watchDir)) {
        server.watcher.add(watchDir)
      }
    },
    handleHotUpdate({ file, server }) {
      const projectsRoot = path.join(publicDir, 'projects').replace(/\\/g, '/')
      if (!file.replace(/\\/g, '/').startsWith(projectsRoot)) return

      const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
      if (!mod) return

      server.moduleGraph.invalidateModule(mod)
      return [...mod.importers]
    },
  }
}
