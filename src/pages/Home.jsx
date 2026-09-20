import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Greeting from '../Greeting.jsx'
import { timeline } from '../timeline.js'

export default function Home() {
  const timelineRef = useRef(null)

  useEffect(() => {
    const element = timelineRef.current
    if (!element) return undefined

    const items = [...element.querySelectorAll('.timeline-item')]
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      items.forEach((item) => item.classList.add('is-visible'))
      element.style.setProperty('--timeline-progress', '1')
      return undefined
    }

    element.classList.add('is-enhanced')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    )

    items.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add('is-visible')
      } else {
        observer.observe(item)
      }
    })

    let frame
    const updateTimeline = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const marker = window.innerHeight * 0.55
        const progress = Math.min(
          1,
          Math.max(0, (marker - rect.top) / rect.height),
        )
        element.style.setProperty('--timeline-progress', progress)

        let nearest
        let nearestDistance = Infinity
        items.forEach((item) => {
          const itemRect = item.getBoundingClientRect()
          const distance = Math.abs(
            itemRect.top + itemRect.height / 2 - marker,
          )
          if (distance < nearestDistance) {
            nearest = item
            nearestDistance = distance
          }
        })
        items.forEach((item) => {
          item.classList.toggle('is-current', item === nearest)
        })
      })
    }

    updateTimeline()
    window.addEventListener('scroll', updateTimeline, { passive: true })
    window.addEventListener('resize', updateTimeline)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateTimeline)
      window.removeEventListener('resize', updateTimeline)
    }
  }, [])

  return (
    <article className="intro">
      <p className="kicker">Brookhaven, NY</p>
      <h1>
        <Greeting />
      </h1>
      <p className="lede">
        Master&apos;s student in AI Engineering at Stony Brook, with nearly
        three years as a software engineer building data pipelines, APIs, and
        distributed systems.
      </p>
      <p>
        I care about systems that hold up in production, models that can be
        evaluated honestly, and explaining technical work to people who
        don&apos;t live in it every day.
      </p>

      <section className="timeline-section" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading">Experience</h2>
        <ol className="timeline" ref={timelineRef}>
          {timeline.map((item) => (
            <li
              key={`${item.company}-${item.role}`}
              className={
                item.hideWhen
                  ? 'timeline-item timeline-item--no-when'
                  : 'timeline-item'
              }
            >
              <div className="timeline-mark">
                <img
                  className="company-logo"
                  src={item.logo}
                  alt=""
                  width="48"
                  height="48"
                />
              </div>
              {item.hideWhen ? null : (
                <p className="timeline-when">
                  <time dateTime={item.start}>{item.startLabel}</time>
                  <span aria-hidden="true"> – </span>
                  <time dateTime={item.end}>{item.endLabel}</time>
                </p>
              )}
              <div className="timeline-copy">
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                {item.note && <p>{item.note}</p>}
                {item.href && (
                  <p className="timeline-link">
                    <Link to="/photos/langtang-and-gosaikunda">
                      {item.hrefLabel}
                    </Link>
                  </p>
                )}
                {item.stack && (
                  <ul className="stack">
                    {item.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}
