import BlogPost from '../components/BlogPost';
import { posts } from '../data/posts';

export default function Blog() {
  return (
    <div className="page">
      <h1>Blog</h1>
      <p>Longer-form writing and experiments from the lab. Tap a preview to read the full entry.</p>
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          {...post}
        />
      ))}
    </div>
  );
}
