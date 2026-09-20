import { useEffect, useRef } from 'react'

const projects = [
  {
    title: 'AI Engineering Project',
    description:
      'An applied AI build focused on measurable evaluation and dependable model behavior.',
    tags: ['Python', 'Model evaluation', 'Deep learning'],
    date: 'Sep 2026 – Present',
    codeUrl: 'https://github.com/regham555?tab=repositories',
    tone: 'ai',
  },
  {
    title: 'SystemVerilog 2D Convolution Project',
    description:
      'A hardware implementation of a configurable 2D convolution engine for image-processing workloads.',
    tags: ['SystemVerilog', 'FPGA', 'Digital design'],
    date: 'Starts Oct 2026',
    codeUrl: 'https://github.com/regham555?tab=repositories',
    tone: 'systems',
  },
  {
    title: 'Data Engineering Project',
    description:
      'A reproducible pipeline for turning raw data into validated, useful information.',
    tags: ['SQL', 'Data pipelines', 'Cloud'],
    date: 'Scheduled 2027',
    codeUrl: 'https://github.com/regham555?tab=repositories',
    tone: 'data',
  },
]

export default function Projects() {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return undefined

    const cards = [...grid.querySelectorAll('.project-card')]
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      cards.forEach((card) => card.classList.add('is-visible'))
      return undefined
    }

    grid.classList.add('is-enhanced')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            entry.target.classList.remove('will-reveal')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    cards.forEach((card) => {
      if (card.getBoundingClientRect().top < window.innerHeight * 0.92) {
        card.classList.add('is-visible')
      } else {
        card.classList.add('will-reveal')
        observer.observe(card)
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <article className="page">
      <p className="kicker">Selected work</p>
      <h1>Projects</h1>

      <div className="project-grid" ref={gridRef}>
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className={`project-visual project-visual--${project.tone}`}>
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="m24 20-12 12 12 12M40 20l12 12-12 12M36 14 28 50" />
              </svg>
            </div>
            <div className="project-meta">
              <span className="status-badge">
                <span aria-hidden="true" />
                Coming soon
              </span>
              <span className="project-date">{project.date}</span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <ul className="project-tags" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="project-actions" aria-label="Project links">
              <span aria-disabled="true">Live demo soon</span>
              <a href={project.codeUrl} target="_blank" rel="noreferrer">
                Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </article>
  )
}
