import { useState } from 'react'
import { Link } from 'react-router-dom'
import TopicFilter from '../TopicFilter.jsx'
import { collectTopics } from '../topics.js'
import { getReadingTime, posts } from '../posts.js'

const topics = collectTopics(posts)

export default function Blog() {
  const [topic, setTopic] = useState(null)
  const visible = topic
    ? posts.filter((post) => post.topics.includes(topic))
    : posts

  return (
    <article className="page">
      <p className="kicker">Writing</p>
      <h1>Blog</h1>
      <p className="lede">Technical notes from the bench.</p>
      <TopicFilter
        topics={topics}
        active={topic}
        onChange={setTopic}
        label="Filter posts by topic"
      />
      <ul className="posts">
        {visible.map((post) => (
          <li key={post.slug}>
            <Link className="post" to={`/blog/${post.slug}`}>
              <ul className="post-topics" aria-label="Topics">
                {post.topics.map((item) => (
                  <li key={item}>{item}</li>
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
