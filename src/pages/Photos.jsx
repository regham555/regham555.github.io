import { Link } from 'react-router-dom'
import { albums } from '../photos.js'

export default function Photos() {
  return (
    <article className="page">
      <p className="kicker">Personal</p>
      <h1>Photography</h1>
      <p className="lede">Nature, trails, and places.</p>
      <ul className="posts">
        {albums.map((album) => (
          <li key={album.slug} className="post">
            <ul className="post-topics" aria-label="Topics">
              {album.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <h2>
              <Link to={`/photos/${album.slug}`}>{album.title}</Link>
            </h2>
            <p className="post-meta">
              <time>{album.date}</time>
              {album.photos.length > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    {album.photos.length} photo
                    {album.photos.length === 1 ? '' : 's'}
                  </span>
                </>
              )}
            </p>
            <p>{album.summary}</p>
            <Link className="read-link" to={`/photos/${album.slug}`}>
              View photos <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
