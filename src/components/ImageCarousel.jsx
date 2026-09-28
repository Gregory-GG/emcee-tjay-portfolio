import { Carousel } from 'react-bootstrap';

export default function ImageCarousel({ images, title }) {
  if (images.length === 1) {
    const img = images[0];
    return (
      <div className="detail-media">
        <img src={img.src} alt={img.alt} width={img.width} height={img.height} fetchPriority="high" />
      </div>
    );
  }
  return (
    <Carousel
      className="detail-media detail-carousel"
      interval={null}
      touch
      aria-label={`${title}, ${images.length} photos`}
      prevLabel="Previous photo"
      nextLabel="Next photo"
    >
      {images.map((img, i) => (
        <Carousel.Item key={img.src}>
          <img
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="d-block w-100"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
