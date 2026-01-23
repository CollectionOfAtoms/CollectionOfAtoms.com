import { readFile } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPostById } from '../../../data/posts';

export default async function BlogPostPage({ params }) {
  const post = getPostById(params.postId);

  if (!post) {
    notFound();
  }

  let content = '';
  try {
    const relativePath = post.file.replace('/content/', 'content/');
    const filePath = decodeURIComponent(path.join(process.cwd(), 'public', relativePath));
    const text = await readFile(filePath, 'utf8');
    content = text.replace(/^#\s+.*(?:\r?\n)+/, '');
  } catch (error) {
    content = '*Unable to load this post right now.*';
  }

  return (
    <div className="page blog-post-page">
      <Link href="/blog" className="blog-post-page__back">← Back to Blog</Link>
      <header className="blog-post-page__header">
        <p className="blog-post__meta">{post.date} · {post.readTime}</p>
      </header>
      <div className="blog-post__content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
