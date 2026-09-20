import { useParams } from 'react-router-dom'
import BackLink from '../BackLink.jsx'
import { getAlbum } from '../photos.js'

export default function Album() {
  const { slug } = useParams()
  const album = getAlbum(slug)

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

      {album.photos.length === 0 ? (
        <section className="photo-empty">
          <p>No photos posted yet. New ones will show up here.</p>
        </section>
      ) : (
        <ul className="photo-grid">
          {album.photos.map((photo) => (
            <li key={photo.src} className="photo-card">
              <img src={photo.src} alt={photo.caption || photo.place} />
              <div>
                <p className="photo-place">{photo.place}</p>
                {photo.date && <time>{photo.date}</time>}
                {photo.caption && <p>{photo.caption}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
