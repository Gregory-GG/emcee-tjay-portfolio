import { Row, Col } from 'react-bootstrap';
import PostCard from './PostCard.jsx';

export default function PostGrid({ posts, headingLevel = 'h3' }) {
  return (
    <Row xs={1} sm={2} lg={3} className="g-4 post-grid" as="ul" role="list">
      {posts.map((p, i) => (
        <Col as="li" key={p.shortcode} className="list-unstyled">
          <PostCard post={p} headingLevel={headingLevel} eager={i < 3} />
        </Col>
      ))}
    </Row>
  );
}
