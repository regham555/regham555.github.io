import { Link } from 'react-router-dom'
import { getReadingTime, posts } from '../posts.js'

export default function Blog() {
  return (
    <article className="page">
      <p className="kicker">Writing</p>
      <h1>Blog</h1>
      <p className="lede">Technical notes from the bench.</p>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.slug} className="post">
            <ul className="post-topics" aria-label="Topics">
              {post.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <h2>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="post-meta">
              <time>{post.date}</time>
              <span aria-hidden="true">·</span>
              <span>{getReadingTime(post)}</span>
            </p>
            <p>{post.summary}</p>
            <Link className="read-link" to={`/blog/${post.slug}`}>
              Read article <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
