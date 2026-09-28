import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { getCategory } from '../api/data.js';

/** Poster-style card for video reels that have no still image. */
export default function ReelCard({ post, headingLevel: H = 'h3' }) {
  const category = getCategory(post.category);
  return (
    <Link to={`/portfolio/${post.shortcode}`} className="work-card reel-card" aria-label={`Watch reel: ${post.title}`}>
      <div className="work-media reel-poster">
        <span className="reel-monogram" aria-hidden="true">MC</span>
        <span className="reel-play" aria-hidden="true">
          <FontAwesomeIcon icon={faPlay} />
        </span>
        <span className="work-badge">Reel</span>
      </div>
      <div className="work-body">
        {category && <span className="work-cat">{category.label}</span>}
        <H className="work-title">{post.title}</H>
      </div>
    </Link>
  );
}
