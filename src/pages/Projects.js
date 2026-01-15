import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();
  const projects = [
    {
      title: 'Sprialator',
      description: [
      "An in-browser visual experiment exploring recursive geometry and motion.",
      "Built for projection and physical interaction."
      ],
      detailPath: '/projects/sprialator',
      link: 'https://github.com/CollectionOfAtoms/sprialator',
      tags: ['creative-coding', 'generative', 'HTML5', 'SVG', 'visualizer'],
      mediaAlign: 'center',
      video: {
        src: '/projects/sprialator-preview.mp4',
        poster: '/projects/sprialator-poster.png',
      },
    },
    {
      title: 'KrampusBot',
      description: [
        'A mischievous party bot built for a high-concept holiday vault gathering, greeting guests emerging after 1000 years.',
        'It chats briefly, assigns snarky festive tasks, and prints the mission slip from a hidden overhead printer.',
      ],
      image: '/projects/KrampusBot.png',
      detailPath: '/projects/krampusbot',
      link: 'https://github.com/CollectionOfAtoms/krampusbot',
      tags: ['automation', 'ChatGPT', 'bot'],
      mediaAlign: 'left',
    },
  ];

  return(
    <div className="page projects-page">
      <div className="page-title-band">
        <h1 className="page-title">Projects</h1>
      </div>
      <div className="projects-grid">
        {projects.map((project) => {
          const isClickable = Boolean(project.detailPath);
          return (
          <article
            className={`project-card${isClickable ? ' project-card--link' : ''}`}
            key={project.title}
            onClick={isClickable ? () => navigate(project.detailPath) : undefined}
            onKeyDown={
              isClickable
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      navigate(project.detailPath);
                    }
                  }
                : undefined
            }
            role={isClickable ? 'link' : undefined}
            tabIndex={isClickable ? 0 : undefined}
          >
            <div className={`project-card__media project-card__media--${project.mediaAlign || 'center'}`}>
              {project.video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={project.video.poster}
                >
                  <source src={project.video.src} type="video/mp4" />
                </video>
              ) : project.image ? (
                <img src={project.image} alt={`${project.title} preview`} />
              ) : (
                <span>Project image coming soon</span>
              )}
            </div>
            <div className="project-card__body">
              <h2 className="project-card__title">{project.title}</h2>
              <div className="project-card__desc">
                {project.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {project.website ? (
                  <a
                    href={project.website.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {project.website.label} →
                  </a>
                ) : null}
              </div>
              <ul className="project-card__tags">
                {project.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            </div>
            <a
              className="project-card__github"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              onClick={(event) => event.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.38-2.04 1-2.76-.1-.26-.43-1.3.09-2.71 0 0 .82-.27 2.7 1.03a9.08 9.08 0 0 1 2.46-.34c.84 0 1.69.12 2.46.34 1.88-1.3 2.7-1.03 2.7-1.03.52 1.41.2 2.45.1 2.71.62.72 1 1.64 1 2.76 0 3.93-2.34 4.79-4.57 5.05.36.33.68.97.68 1.96 0 1.41-.01 2.55-.01 2.9 0 .27.18.6.69.49 3.96-1.35 6.83-5.17 6.83-9.67C22 6.58 17.52 2 12 2z"
                />
              </svg>
            </a>
          </article>
        );
        })}
      </div>
    </div>
  );
}
