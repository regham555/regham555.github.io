import { useState } from 'react'
import { useParams } from 'react-router-dom'
import BackLink from '../BackLink.jsx'
import Lightbox from '../Lightbox.jsx'
import { getAlbum } from '../photos.js'

export default function Album() {
  const { slug } = useParams()
  const album = getAlbum(slug)
  const [openAt, setOpenAt] = useState(null)
  const photos = album?.photos ?? []

  if (!album) {
    return (
      <article className="page">
        <BackLink to="/photos" label="Back to Photography" />
        <h1>No album with that name.</h1>
      </article>
    )
  }

  return (
    <article className="page">
      <BackLink to="/photos" label="Back to Photography" />
      <h1>{album.title}</h1>
      <p className="post-header-meta">
        <time>{album.date}</time>
        <span aria-hidden="true">·</span>
        <span>{album.topics.join(' / ')}</span>
      </p>
      <p className="lede">{album.summary}</p>

      {photos.length === 0 ? (
        <section className="photo-empty">
          <p>No photos posted yet. New ones will show up here.</p>
        </section>
      ) : (
        <ul className="photo-grid">
          {photos.map((photo, index) => (
            <li key={photo.src} className="photo-card">
              <button
                type="button"
                className="photo-open"
                onClick={() => setOpenAt(index)}
                aria-label={`View ${photo.place} full size`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption || photo.place}
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div>
                <p className="photo-place">{photo.place}</p>
                {photo.date && <time>{photo.date}</time>}
                {photo.caption && <p>{photo.caption}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}

      {openAt !== null && (
        <Lightbox
          photos={photos}
          index={openAt}
          onClose={() => setOpenAt(null)}
          onNavigate={(step) =>
            setOpenAt((current) => {
              const next = current + step
              return (next + photos.length) % photos.length
            })
          }
        />
      )}
    </article>
  )
}
