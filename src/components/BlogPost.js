import React from 'react';

export default function BlogPost({ title, date, readTime, excerpt, tags = [], status }) {
  return (
    <article className="blog-post">
      <header className="blog-post__header">
        <div>
          <p className="blog-post__meta">{date} · {readTime}</p>
          <h2 className="blog-post__title">{title}</h2>
        </div>
        {status ? <span className="blog-post__status">{status}</span> : null}
      </header>

      <p className="blog-post__excerpt">{excerpt}</p>

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
