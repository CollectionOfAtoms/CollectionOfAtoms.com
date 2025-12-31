import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogPost({
  id,
  title,
  date,
  readTime,
  excerpt,
  tags = [],
  status,
}) {
  return (
    <article className="blog-post">
      <header className="blog-post__header">
        <div>
          <p className="blog-post__meta">{date} · {readTime}</p>
          <h2 className="blog-post__title">{title}</h2>
        </div>
        {status ? <span className="blog-post__status">{status}</span> : null}
      </header>

      {excerpt ? (
        <Link className="blog-post__link" to={`/blog/${id}`}>
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
    </article>
  );
}
