"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPostById } from '../../../data/posts';

export default function BlogPostPage() {
  const { postId } = useParams();
  const post = getPostById(postId);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadPost = async () => {
      if (!post) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(post.file);
        if (!response.ok) {
          throw new Error(`Failed to load ${post.file}`);
        }
        const text = await response.text();
        const normalized = text.replace(/^#\\s+.*(?:\\r?\\n)+/, '');
        if (isActive) {
          setContent(normalized);
        }
      } catch (error) {
        if (isActive) {
          setContent('*Unable to load this post right now.*');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      isActive = false;
    };
  }, [post]);

  if (!post) {
    return (
      <div className="page blog-post-page">
        <h1>Post not found</h1>
        <p>That entry doesn’t exist yet.</p>
        <Link href="/blog" className="blog-post-page__back">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="page blog-post-page">
      <Link href="/blog" className="blog-post-page__back">← Back to Blog</Link>
      <header className="blog-post-page__header">
        <p className="blog-post__meta">{post.date} · {post.readTime}</p>
      </header>
      {isLoading ? (
        <p>Loading post...</p>
      ) : (
        <div className="blog-post__content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
