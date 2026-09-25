import { useEffect, useRef, useState } from 'react'

// Roughly the scroll-margin on section headings, so the TOC flips over at the
// same point an anchor jump parks a heading.
const READING_MARKER = 150
import { useParams } from 'react-router-dom'
import BackLink from '../BackLink.jsx'
import { getPost, getReadingTime } from '../posts.js'

function sectionId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function CodeBlock({ text }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="code-block">
      <button type="button" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  )
}

function Block({ block, sectionNumber }) {
  if (block.type === 'h2') {
    return (
      <h2 id={sectionId(block.text)}>
        <span>{String(sectionNumber).padStart(2, '0')}</span>
        {block.text}
      </h2>
    )
  }
  if (block.type === 'code') return <CodeBlock text={block.text} />
  if (block.type === 'comparison') {
    return (
      <div className="concept-grid">
        {block.items.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </section>
        ))}
      </div>
    )
  }
  if (block.type === 'steps') {
    return (
      <ol className="concept-steps">
        {block.items.map((item) => (
          <li key={item.title}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    )
  }
  if (block.type === 'ul') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  return <p>{block.text}</p>
}

export default function Post() {
  const { slug } = useParams()
  const post = getPost(slug)
  const articleRef = useRef(null)
  const progressRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const article = articleRef.current
    const progress = progressRef.current
    if (!article || !progress) return undefined

    const headings = [...article.querySelectorAll('.post-content h2')]

    const update = () => {
      const start = article.offsetTop
      const distance = Math.max(1, article.offsetHeight - window.innerHeight)
      const value = Math.min(1, Math.max(0, (window.scrollY - start) / distance))
      progress.style.transform = `scaleX(${value})`

      let reached = headings[0]?.id ?? null
      headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= READING_MARKER) {
          reached = heading.id
        }
      })
      setActiveSection(reached)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [slug])

  if (!post) {
    return (
      <article className="page">
        <BackLink to="/blog" label="Back to Blog" />
        <h1>No post with that name.</h1>
      </article>
    )
  }

  const sections = post.content.filter((block) => block.type === 'h2')

  return (
    <article className="page post-body" ref={articleRef}>
      <div className="reading-progress" ref={progressRef} aria-hidden="true" />
      <BackLink to="/blog" label="Back to Blog" />
      <h1>{post.title}</h1>
      <div className="post-header-meta">
        <time>{post.date}</time>
        <span aria-hidden="true">·</span>
        <span>{getReadingTime(post)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.topics.join(' / ')}</span>
      </div>
      <p className="post-summary">{post.summary}</p>

      <aside className="takeaways" aria-labelledby="takeaways-heading">
        <h2 id="takeaways-heading">Key takeaways</h2>
        <ul>
          {post.takeaways.map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
      </aside>

      <nav className="post-toc" aria-label="Article sections">
        <p>In this note</p>
        <ol>
          {sections.map((section, index) => {
            const id = sectionId(section.text)
            const isActive = id === activeSection
            return (
              <li key={section.text} className={isActive ? 'is-active' : ''}>
                <a href={`#${id}`} aria-current={isActive ? 'true' : undefined}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {section.text}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="post-content">
        {post.content.map((block, index) => {
          const sectionNumber =
            block.type === 'h2'
              ? post.content
                  .slice(0, index + 1)
                  .filter((item) => item.type === 'h2').length
              : undefined
          return (
            <Block
              key={index}
              block={block}
              sectionNumber={sectionNumber}
            />
          )
        })}
      </div>
    </article>
  )
}
