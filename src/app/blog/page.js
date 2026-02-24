import BlogPostCard from '../../components/BlogPostCard';
import { posts } from '../../data/posts';

export const metadata = {
  title: 'CollectionOfAtoms | Blog',
};

export default function Blog() {
  return (
    <div className="page blog-page">
      <div className="page-title-band">
        <h1 className="page-title">Blog</h1>
      </div>
      <p>Welcome to my brain.</p>
      {posts.filter((post) => post.listed !== false).map((post) => (
        <BlogPostCard
          key={post.id}
          {...post}
        />
      ))}
    </div>
  );
}
