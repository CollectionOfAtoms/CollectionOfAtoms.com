 "use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BlogPostCard({
  id,
  title,
  date,
  readTime,
  excerpt,
  subtitle,
  image,
  imageSource,
  imageAlt,
  imageFit,
  tags = [],
}) {
  const [dynamicImageUrl, setDynamicImageUrl] = useState(null);

  useEffect(() => {
    if (imageSource !== 'daily-comic') return;
    let active = true;
    const load = async () => {
      try {
        const response = await fetch('/api/daily-comic/latest', { cache: 'no-store' });
        if (!response.ok) return;
        const json = await response.json();
        const url = json?.data?.imageUrl;
        if (active && url) setDynamicImageUrl(url);
      } catch {
        // ignore fetch failures for card image
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [imageSource]);
  return (
    <article className="blog-post">
      <div className="blog-post__layout">
        <div className="blog-post__text">
          <header className="blog-post__header">
            <div>
              <p className="blog-post__meta">{date} · {readTime}</p>
              <h2 className="blog-post__title">{title}</h2>
              {subtitle ? <p className="blog-post__subtitle">{subtitle}</p> : null}
            </div>
          </header>

          {excerpt ? (
            <Link className="blog-post__link" href={`/blog/${id}`}>
              <p className="blog-post__excerpt">{excerpt}</p>
              <span className="blog-post__cta">Read the full post →</span>
            </Link>
          ) : null}

          {tags.length > 0 && (
            <ul className="blog-post__tags">
              {tags.map((tag) => (
                <li key={tag} className="blog-post__tag">#{tag}</li>
              ))}
            </ul>
          )}
        </div>

        {(dynamicImageUrl || image) ? (
          <Link
            className={`blog-post__media${imageFit === 'contain' ? ' blog-post__media--contain' : ''}`}
            href={`/blog/${id}`}
            aria-label={`Read ${title}`}
          >
            <img src={dynamicImageUrl || image} alt={imageAlt || `${title} preview`} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
