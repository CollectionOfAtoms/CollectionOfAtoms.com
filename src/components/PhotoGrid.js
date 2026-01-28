"use client";

import { useEffect, useState } from 'react';

export default function PhotoGrid({ photos = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const closeOverlay = () => {
    setActiveIndex(null);
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

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
        {photos.map((photo, index) => {
          const thumbSrc = photo.thumbSrc || photo.thumb || photo.src;
          const fullSrc = photo.fullSrc || photo.src;
          return (
            <button
              key={fullSrc}
              className="photo-grid__item"
              onClick={() => setActiveIndex(index)}
              aria-label={photo.alt || 'Open photo'}
            >
              <img
                src={thumbSrc}
                alt={photo.alt || 'Photo thumbnail'}
                className="photo-grid__thumb"
                loading="lazy"
                decoding="async"
              />
            </button>
          );
        })}
      </div>

      {activePhoto ? (
        <div className="photo-overlay" onClick={closeOverlay}>
          <div className="photo-overlay__inner" onClick={(e) => e.stopPropagation()}>
            <button className="photo-overlay__close" onClick={closeOverlay} aria-label="Close photo">✕</button>
            <img
              src={activePhoto.fullSrc || activePhoto.src}
              alt={activePhoto.alt || 'Full size photo'}
              loading="eager"
            />
            {(activePhoto.caption || activePhoto.alt) && (
              <p className="photo-overlay__caption">
                {activePhoto.caption || activePhoto.alt}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
