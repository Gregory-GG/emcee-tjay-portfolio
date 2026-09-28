import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { getCategory } from '../api/data.js';
import ReelCard from './ReelCard.jsx';

export default function PostCard({ post, headingLevel: H = 'h3', eager = false }) {
  if (post.type === 'reel' || !post.images.length) return <ReelCard post={post} headingLevel={H} />;
  const img = post.images[0];
  const category = getCategory(post.category);
  return (
    <Link to={`/portfolio/${post.shortcode}`} className="work-card">
      <div className="work-media">
        <img
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        {post.images.length > 1 && (
          <span className="work-badge" aria-label={`${post.images.length} photos`}>
            <FontAwesomeIcon icon={faClone} aria-hidden="true" /> {post.images.length}
          </span>
        )}
      </div>
      <div className="work-body">
        {category && <span className="work-cat">{category.label}</span>}
        <H className="work-title">{post.title}</H>
      </div>
    </Link>
  );
}
