import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'AI Engineering Project',
    description:
      'An applied AI build focused on measurable evaluation and dependable model behavior.',
    tags: ['Python', 'Model evaluation', 'Deep learning'],
    date: 'Sep 2026 – Present',
    codeUrl: 'https://github.com/regham555?tab=repositories',
    tone: 'ai',
    plan: [
      'Write the evaluation criteria before the model, so results stay measurable.',
      'Train a baseline first, then improve against a fixed held-out set.',
      'Report failure cases next to the accuracy numbers.',
    ],
  },
  {
    title: 'SystemVerilog 2D Convolution Project',
    description:
      'A hardware implementation of a configurable 2D convolution engine for image-processing workloads.',
    tags: ['SystemVerilog', 'FPGA', 'Digital design'],
    date: 'Starts Oct 2026',
    codeUrl: 'https://github.com/regham555?tab=repositories',
    tone: 'systems',
    plan: [
      'Parameterise kernel size and data width instead of fixing a 3x3 filter.',
      'Check the engine against a software reference model.',
      'Record timing and resource usage after synthesis.',
    ],
  },
  {
    title: 'Data Engineering Project',
    description:
      'A reproducible pipeline for turning raw data into validated, useful information.',
    tags: ['SQL', 'Data pipelines', 'Cloud'],
    date: 'Scheduled 2027',
    codeUrl: 'https://github.com/regham555?tab=repositories',
    tone: 'data',
    plan: [
      'Validate raw data before anything downstream is allowed to read it.',
      'Keep every run reproducible from a clean checkout.',
      'Fail loudly on schema drift rather than dropping rows quietly.',
    ],
  },
]

function panelId(title) {
  return `plan-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

export default function Projects() {
  const gridRef = useRef(null)
  const [expanded, setExpanded] = useState(() => new Set())

  const toggle = (title) =>
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })

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
              <button
                type="button"
                className="project-toggle"
                aria-expanded={expanded.has(project.title)}
                aria-controls={panelId(project.title)}
                onClick={() => toggle(project.title)}
              >
                <span className="project-toggle-icon" aria-hidden="true" />
                {expanded.has(project.title) ? 'Hide scope' : 'Planned scope'}
              </button>
              <a href={project.codeUrl} target="_blank" rel="noreferrer">
                Code
              </a>
            </div>
            {expanded.has(project.title) && (
              <ul className="project-plan" id={panelId(project.title)}>
                {project.plan.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </article>
  )
}
