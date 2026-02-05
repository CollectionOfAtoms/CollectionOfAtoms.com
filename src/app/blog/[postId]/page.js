import { readFile } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostById } from '../../../data/posts';
import BlogPostContentClient from '../../../components/BlogPostContentClient';

export default async function BlogPostPage({ params }) {
  const { postId } = await params;
  const post = getPostById(postId);

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

  const meaningCopy = {
    entry: {
      heading: 'Entry',
      hint: 'Capture whatever gives your life meaning. Keep it short. Three to five items is plenty.',
      placeholder: 'e.g. my partner, the forest, making art',
    },
    list: {
      heading: 'List',
    },
    'list-custom': {
      heading: 'List',
      hint: '',
      entries: '',
    },
    select_environmental: {
      heading: 'Values tied to environment',
      hint: 'Tap the items that depend on the environment. Add a note once selected.',
      commentPlaceholder: 'What about this depends on the environment?',
    },
    list_non_environmental: {
      heading: 'Values less tied to environment',
      hint: 'These were not marked as environmentally dependent. Add a note if you want.',
      commentPlaceholder: 'Optional note',
    },
    add: {
      heading: 'Add',
      hint: 'Add more items and optional notes.',
      entryPlaceholder: 'A new entry',
      commentPlaceholder: 'Optional note',
      addLabel: 'Add',
    },
    submit: {
      heading: 'Submit',
      hint: 'What changed, if anything, as you moved through the essay?',
      placeholder: 'A sentence or two is plenty.',
      submitLabel: 'Submit anonymously',
      successMessage: 'Thanks — your reflection has been received.',
    },
  };

  return (
    <div className="page blog-post-page">
      <div className="page-title-band">
        <h1 className="page-title">{post.title}</h1>
      </div>
      <div className="blog-post__content">
        <BlogPostContentClient
          content={content}
          postId={post.id}
          meaningCopy={meaningCopy}
        />
      </div>
      <Link href="/blog" className="blog-post-page__back">← Back to Blog</Link>
    </div>
  );
}
