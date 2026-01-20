import { tracks } from '../data/tracks';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function Music() {
  const { currentIndex, isPlaying, playTrack, togglePlay, progress, seekTo } = useAudioPlayer();
  const { currentTime, duration } = progress;

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="page music-page">
      <div className="page-title-band">
        <h1 className="page-title">Music</h1>
      </div>

      <section className="standard-page-hero">
        <div className="standard-page-hero-image">
          <img src="/me/Piano_hands.jpg" alt="Hands on piano keys" />
        </div>
        <div className="about-divider about-divider--hero">
          <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
        </div>
        <div className="standard-page-hero-content">
          <h2>Listen in.</h2>
          <p>Original compositions, arrangements, covers, and experiments recorded along the way.</p>
        </div>
      </section>

      <div className="music-list">
        {tracks.map((track, index) => {
          const isCurrent = currentIndex === index;
          const scrubValue = isCurrent ? currentTime : 0;
          const scrubMax = isCurrent ? duration : 0;
          const scrubPercent = scrubMax ? (scrubValue / scrubMax) * 100 : 0;
          return (
          <div key={track.title} className="music-card">
            <div className="music-card__meta">
              <h2 className="music-card__title">{track.title}</h2>
              <p className="music-card__desc">{track.description}</p>
            </div>
            <div className="music-card__player">
              <button
                type="button"
                className="music-card__control"
                onClick={() => {
                  if (isCurrent) {
                    togglePlay();
                    return;
                  }
                  playTrack(index);
                }}
              >
                {isCurrent && isPlaying ? (
                  <svg className="music-card__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg className="music-card__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5l11 7-11 7V5z" />
                  </svg>
                )}
              </button>
              <div className="music-card__scrub">
                <span className="music-card__time">{formatTime(isCurrent ? currentTime : 0)}</span>
                <input
                  className="music-card__range"
                  type="range"
                  min="0"
                  max={scrubMax || 0}
                  value={scrubValue}
                  onChange={(event) => {
                    if (!isCurrent) return;
                    seekTo(Number(event.target.value));
                  }}
                  disabled={!isCurrent || !duration}
                  style={{ '--progress': `${scrubPercent}%` }}
                />
                <span className="music-card__time">{formatTime(isCurrent ? duration : 0)}</span>
              </div>
            </div>
          </div>
        );
      })}
      </div>

      <div className="video-embed">
        <h2 className="music-card__title">Autumn Leaves</h2>
        <div className="video-embed__frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/lZph45HaRb0"
            title="Autumn Leaves"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p style={{ marginTop: '0.5rem' }}>
          If the embed is blocked, <a href="https://www.youtube.com/watch?v=lZph45HaRb0" target="_blank" rel="noreferrer">watch on YouTube</a>.
        </p>
      </div>
    </div>
  );
}
