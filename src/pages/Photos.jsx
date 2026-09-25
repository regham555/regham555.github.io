import { useState } from 'react'
import { Link } from 'react-router-dom'
import TopicFilter from '../TopicFilter.jsx'
import { collectTopics } from '../topics.js'
import { albums } from '../photos.js'

const topics = collectTopics(albums)

export default function Photos() {
  const [topic, setTopic] = useState(null)
  const visible = topic
    ? albums.filter((album) => album.topics.includes(topic))
    : albums

  return (
    <article className="page">
      <p className="kicker">Personal</p>
      <h1>Photography</h1>
      <p className="lede">Nature, trails, and places.</p>
      <TopicFilter
        topics={topics}
        active={topic}
        onChange={setTopic}
        label="Filter albums by topic"
      />
      <ul className="posts">
        {visible.map((album) => (
          <li key={album.slug}>
            <Link className="post" to={`/photos/${album.slug}`}>
              <ul className="post-topics" aria-label="Topics">
                {album.topics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h2>{album.title}</h2>
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
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
