import { readFile } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPostById } from '../../../data/posts';
import {
  MeaningListEcho,
  MeaningListPrompt,
  MeaningListProvider,
} from '../../../components/MeaningList';

const MEANING_MARKER = /\[\[meaning:(prompt|echo)\]\]/g;

const renderMeaningSections = (content) => {
  const segments = content.split(MEANING_MARKER);
  return segments.map((segment, index) => {
    if (segment === 'prompt') {
      return <MeaningListPrompt key={`meaning-prompt-${index}`} />;
    }
    if (segment === 'echo') {
      return <MeaningListEcho key={`meaning-echo-${index}`} />;
    }
    if (!segment.trim()) return null;
    return <ReactMarkdown key={`meaning-text-${index}`}>{segment}</ReactMarkdown>;
  });
};

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
      <div className="page-title-band">
        <h1 className="page-title">{post.title}</h1>
      </div>
      <header className="blog-post-page__header">
        <p className="blog-post__meta">{post.date} · {post.readTime}</p>
      </header>
      <div className="blog-post__content">
        {post.id === 'on-environmentalism' ? (
          <MeaningListProvider storageKey={`meaning-list-${post.id}`}>
            {renderMeaningSections(content)}
          </MeaningListProvider>
        ) : (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </div>
      <Link href="/blog" className="blog-post-page__back">← Back to Blog</Link>
    </div>
  );
}
