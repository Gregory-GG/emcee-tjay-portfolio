export default function SectionHeading({ eyebrow, title, children, align = 'start', as: Tag = 'h2', id }) {
  const center = align === 'center';
  return (
    <div className={`section-heading ${center ? 'text-center mx-auto' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag id={id} className="mt-3 mb-3">{title}</Tag>
      {children && <p className={`lead-brand mb-0 ${center ? 'mx-auto' : ''}`}>{children}</p>}
    </div>
  );
}
