export default function Contact() {
  return (
    <article className="page">
      <p className="kicker">Reach me</p>
      <h1>Contact</h1>
      <p className="lede">
        Have a question, opportunity, or technical idea? Email is the best way
        to reach me.
      </p>

      <section className="contact-card" aria-labelledby="contact-email">
        <div className="contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3.5 6.5h17v11h-17z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </div>
        <div className="contact-copy">
          <p>Preferred contact</p>
          <h2 id="contact-email">ramghimire at proton dot me</h2>
        </div>
      </section>

      <div className="contact-details">
        <section>
          <p className="detail-label">Location</p>
          <h2>Brookhaven, New York</h2>
          <p>Eastern Time (ET)</p>
        </section>
      </div>
    </article>
  )
}
