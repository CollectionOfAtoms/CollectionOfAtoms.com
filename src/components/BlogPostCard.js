import Link from 'next/link';

export default function BlogPostCard({
  id,
  title,
  date,
  readTime,
  excerpt,
  image,
  imageAlt,
  imageFit,
  tags = [],
}) {
  return (
    <article className="blog-post">
      <div className="blog-post__layout">
        <div className="blog-post__text">
          <header className="blog-post__header">
            <div>
              <p className="blog-post__meta">{date} · {readTime}</p>
              <h2 className="blog-post__title">{title}</h2>
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

        {image ? (
          <Link
            className={`blog-post__media${imageFit === 'contain' ? ' blog-post__media--contain' : ''}`}
            href={`/blog/${id}`}
            aria-label={`Read ${title}`}
          >
            <img src={image} alt={imageAlt || `${title} preview`} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
