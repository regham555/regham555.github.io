import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDir = path.resolve('public/photos')
const outDir = path.join(sourceDir, 'thumbs')
const maxEdge = 800

const files = (await readdir(sourceDir)).filter((name) =>
  /\.jpe?g$/i.test(name),
)

await mkdir(outDir, { recursive: true })

await Promise.all(
  files.map(async (name) => {
    const stem = name.replace(/\.jpe?g$/i, '')
    const dest = path.join(outDir, `${stem}.webp`)
    await sharp(path.join(sourceDir, name))
      .rotate()
      .resize(maxEdge, maxEdge, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(dest)
  }),
)

console.log(`Wrote ${files.length} WebP thumbs in ${outDir}`)
