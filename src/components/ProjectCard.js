"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProjectCard({
  title,
  description = [],
  tags = [],
  detailPath,
  mediaAlign = 'center',
  video,
  image,
  website,
  className = '',
}) {
  const router = useRouter();
  const isClickable = Boolean(detailPath);
  const cardClassName = [
    'project-card',
    isClickable ? 'project-card--link' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleNavigate = () => {
    if (isClickable) {
      router.push(detailPath);
    }
  };

  const handleKeyDown = (event) => {
    if (!isClickable) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      router.push(detailPath);
    }
  };

  const renderWebsiteLink = () => {
    if (!website) return null;
    const { url, label } = website;

    if (url.startsWith('/')) {
      return (
        <Link href={url} onClick={(event) => event.stopPropagation()}>
          {label} →
        </Link>
      );
    }

    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        {label} →
      </a>
    );
  };

  return (
    <article
      className={cardClassName}
      onClick={isClickable ? handleNavigate : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? 'link' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className={`project-card__media project-card__media--${mediaAlign}`}>
        {video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={video.poster}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ) : image ? (
          <img src={image} alt={`${title} preview`} />
        ) : (
          <span>Project image coming soon</span>
        )}
      </div>
      <div className="project-card__body">
        <h2 className="project-card__title">{title}</h2>
        <div className="project-card__desc">
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {renderWebsiteLink()}
        </div>
        {tags.length > 0 ? (
          <ul className="project-card__tags">
            {tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
