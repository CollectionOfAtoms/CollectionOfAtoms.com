import BlogPost from '../../components/BlogPost';
import { posts } from '../../data/posts';

export default function Blog() {
  return (
    <div className="page blog-page">
      <div className="page-title-band">
        <h1 className="page-title">Blog</h1>
      </div>
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
