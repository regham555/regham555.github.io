import { useEffect, useState } from 'react'

const variants = [
  { lang: 'en', label: 'English', greeting: 'Hello', name: 'Ram' },
  { lang: 'es', label: 'Spanish', greeting: '¡Hola!', name: 'Ram' },
  { lang: 'hi', label: 'Hindi', greeting: 'नमस्ते', name: 'राम' },
]

const ROTATE_MS = 2000

export default function Greeting() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  // A click hands control to the visitor, so stop cycling underneath them.
  const [manual, setManual] = useState(false)

  useEffect(() => {
    if (hovered || manual) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % variants.length)
    }, ROTATE_MS)

    return () => clearInterval(id)
  }, [hovered, manual])

  const next = variants[(index + 1) % variants.length]

  return (
    <button
      type="button"
      className="greeting-button"
      title={`Say it in ${next.label}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setManual(true)
        setIndex((current) => (current + 1) % variants.length)
      }}
    >
      {/* Every phrase shares one grid cell, so the heading is as wide as the
          longest translation and nothing reflows when the language changes. */}
      <span className="greeting-slot" aria-hidden="true">
        {variants.map((variant, i) => (
          <span
            key={variant.lang}
            className={i === index ? 'greeting is-active' : 'greeting'}
          >
            <span className="word" lang={variant.lang}>
              {variant.greeting}
            </span>{' '}
            — I&apos;m{' '}
            <span className="word" lang={variant.lang}>
              {variant.name}
            </span>
            .
          </span>
        ))}
      </span>
      <span className="sr-only">
        Hello — I&apos;m Ram. Greet me in another language.
      </span>
    </button>
  )
}
