const tracks = [
  {
    title: 'Everything Stays',
    description: 'A classical guitar arrangement of a song from Adventure Time',
    src: '/music/everything_stays_classical.mpeg',
  },
  {
    title: 'Jade',
    description: 'Original instrumental composition feat. Hans Swenson on violin.',
    src: '/music/Jade_w_Hans.m4a',
  },
  {
    title: 'Frozen In',
    description: 'The first piano piece I have ever written. It\'s simple, but I like it',
    src: '/music/Frozen_in.mpeg',
  },
  {
    title: 'Transatlanticism',
    description: 'Solo piano performance.  Death Cab For Cutie Cover',
    src: '/music/Transatlanticism.mp3',
  },
];

export default function Music() {
  return (
    <div className="page">
      <h1>Music</h1>
      <p>Enjoy</p>

      <div className="music-list">
        {tracks.map((track) => (
          <div key={track.title} className="music-card">
            <div className="music-card__meta">
              <h2 className="music-card__title">{track.title}</h2>
              <p className="music-card__desc">{track.description}</p>
            </div>
            <audio controls preload="none" src={track.src} className="music-card__player">
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
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
