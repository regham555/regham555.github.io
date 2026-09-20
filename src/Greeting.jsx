import { useEffect, useState } from 'react'

const variants = [
  { lang: 'en', greeting: 'Hello', name: 'Ram' },
  { lang: 'es', greeting: '¡Hola!', name: 'Ram' },
  { lang: 'hi', greeting: 'नमस्ते', name: 'राम' },
]

export default function Greeting() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % variants.length)
    }, 2000)

    return () => clearInterval(id)
  }, [])

  return (
    <>
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
      <span className="sr-only">Hello — I&apos;m Ram.</span>
    </>
  )
}
