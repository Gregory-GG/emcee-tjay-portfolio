export default function CategoryPills({ categories, active, onChange }) {
  const all = [{ slug: 'all', label: 'All' }, ...categories];
  return (
    <div className="pill-scroller" role="group" aria-label="Filter by category">
      {all.map((c) => {
        const isActive = (active || 'all') === c.slug;
        return (
          <button
            key={c.slug}
            type="button"
            className={`cat-pill ${isActive ? 'active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(c.slug)}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
