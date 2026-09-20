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
          <li key={post.slug}>
            <Link className="post" to={`/blog/${post.slug}`}>
              <ul className="post-topics" aria-label="Topics">
                {post.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <h2>{post.title}</h2>
              <p className="post-meta">
                <time>{post.date}</time>
                <span aria-hidden="true">·</span>
                <span>{getReadingTime(post)}</span>
              </p>
              <p>{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
