import BlogPost from '../components/BlogPost';
import { posts } from '../data/posts';

export default function Blog() {
  return (
    <div className="page blog-page">
      <h1>Blog</h1>
      <p>Welcome to my brain.</p>
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          {...post}
        />
      ))}
    </div>
  );
}
