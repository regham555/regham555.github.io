import { useEffect, useRef } from 'react'

// Minimum horizontal travel before a touch drag counts as a swipe.
const SWIPE_THRESHOLD = 50

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const touchStartX = useRef(null)
  const photo = photos[index]
  const hasSiblings = photos.length > 1

  useEffect(() => {
    const opener = document.activeElement
    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('.lightbox-close')?.focus()

    return () => {
      document.body.style.overflow = bodyOverflow
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'ArrowRight') {
        onNavigate(1)
        return
      }
      if (event.key === 'ArrowLeft') {
        onNavigate(-1)
        return
      }
      if (event.key !== 'Tab') return

      // Keep Tab inside the overlay while it covers the page behind it.
      const buttons = [...dialogRef.current.querySelectorAll('button')]
      const edge = event.shiftKey ? buttons[0] : buttons[buttons.length - 1]
      if (document.activeElement !== edge) return
      event.preventDefault()
      const wrapTo = event.shiftKey ? buttons[buttons.length - 1] : buttons[0]
      wrapTo.focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onNavigate])

  useEffect(() => {
    if (!hasSiblings) return
    // Warm the neighbours so arrow and swipe navigation lands on a loaded photo.
    const neighbours = [index + 1, index - 1]
    neighbours.forEach((position) => {
      const neighbour = photos[(position + photos.length) % photos.length]
      const image = new Image()
      image.src = neighbour.src
    })
  }, [hasSiblings, index, photos])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.place}, photo ${index + 1} of ${photos.length}`}
      ref={dialogRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current
        touchStartX.current = null
        if (start === null) return
        const travel = event.changedTouches[0].clientX - start
        if (Math.abs(travel) < SWIPE_THRESHOLD) return
        onNavigate(travel < 0 ? 1 : -1)
      }}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close photo"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>

      {hasSiblings && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--prev"
          onClick={() => onNavigate(-1)}
          aria-label="Previous photo"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M14.5 5 7.5 12l7 7" />
          </svg>
        </button>
      )}

      <figure className="lightbox-figure">
        <img src={photo.src} alt={photo.caption || photo.place} />
        <figcaption>
          <p className="photo-place">{photo.place}</p>
          {photo.date && <time>{photo.date}</time>}
          {photo.caption && <p>{photo.caption}</p>}
          <p className="lightbox-count">
            {index + 1} of {photos.length}
          </p>
        </figcaption>
      </figure>

      {hasSiblings && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--next"
          onClick={() => onNavigate(1)}
          aria-label="Next photo"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9.5 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}
