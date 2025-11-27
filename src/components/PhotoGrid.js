import React, { useEffect, useState } from 'react';

export default function PhotoGrid({ photos = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const closeOverlay = () => setActiveIndex(null);

  const showPrev = () => {
    if (activeIndex === null || photos.length === 0) return;
    setActiveIndex((idx) => (idx === 0 ? photos.length - 1 : idx - 1));
  };

  const showNext = () => {
    if (activeIndex === null || photos.length === 0) return;
    setActiveIndex((idx) => (idx === photos.length - 1 ? 0 : idx + 1));
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      } else if (event.key === 'Escape') {
        closeOverlay();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, photos.length]);

  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  return (
    <>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            className="photo-grid__item"
            onClick={() => setActiveIndex(index)}
            style={{ backgroundImage: `url(${photo.src})` }}
            aria-label={photo.alt || 'Open photo'}
          />
        ))}
      </div>

      {activePhoto ? (
        <div className="photo-overlay" onClick={closeOverlay}>
          <div className="photo-overlay__inner" onClick={(e) => e.stopPropagation()}>
            <button className="photo-overlay__close" onClick={closeOverlay} aria-label="Close photo">✕</button>
            <img src={activePhoto.src} alt={activePhoto.alt || 'Full size photo'} />
          </div>
        </div>
      ) : null}
    </>
  );
}
