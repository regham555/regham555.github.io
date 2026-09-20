import { Link } from 'react-router-dom'

export default function BackLink({ to, label }) {
  return (
    <p className="back-link">
      <Link to={to} aria-label={label}>
        <span aria-hidden="true">←</span>
        Back
      </Link>
    </p>
  )
}
