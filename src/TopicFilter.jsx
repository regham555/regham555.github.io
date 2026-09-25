export default function TopicFilter({ topics, active, onChange, label }) {
  if (topics.length < 2) return null

  return (
    <div className="topic-filter" role="group" aria-label={label}>
      <button
        type="button"
        className={active ? 'topic-chip' : 'topic-chip is-active'}
        aria-pressed={!active}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {topics.map((topic) => (
        <button
          key={topic}
          type="button"
          className={active === topic ? 'topic-chip is-active' : 'topic-chip'}
          aria-pressed={active === topic}
          onClick={() => onChange(active === topic ? null : topic)}
        >
          {topic}
        </button>
      ))}
    </div>
  )
}
