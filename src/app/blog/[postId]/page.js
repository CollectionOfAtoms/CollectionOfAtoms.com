import { readFile } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPostById } from '../../../data/posts';
import {
  MeaningListAdd,
  MeaningListEntry,
  MeaningListList,
  MeaningListListCustom,
  MeaningListProvider,
  MeaningListSelectEnvironmental,
  MeaningListNonEnvironmental,
  MeaningListSubmit,
} from '../../../components/MeaningList';
import DailyComicEmbed from '../../../components/DailyComicEmbed';
import { parseArgs, parseMeaningContent, resolveMeaningProps } from '../../../lib/meaningMarkdown';

const stripMarkdownComments = (text) => text.replace(/<!--[\s\S]*?-->/g, '');

const splitDailyComicTokens = (text) => {
  const regex = /\[\[daily-comic([^\]]*)\]\]/g;
  let lastIndex = 0;
  let match;
  const parts = [];
  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const end = regex.lastIndex;
    if (start > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, start) });
    }
    const args = parseArgs(match[1] || '');
    parts.push({ type: 'daily-comic', args });
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return parts;
};

const renderMarkdownWithDailyComic = (text, keyPrefix) =>
  splitDailyComicTokens(text).map((part, index) => {
    if (part.type === 'daily-comic') {
      const caption = part.args?.caption || part.args?.title || '';
      return (
        <DailyComicEmbed
          key={`${keyPrefix}-daily-comic-${index}`}
          caption={caption}
        />
      );
    }
    if (!part.value.trim()) return null;
    return (
      <ReactMarkdown key={`${keyPrefix}-text-${index}`}>
        {part.value}
      </ReactMarkdown>
    );
  });

const renderMarkdownWithDividers = (text, keyPrefix) => {
  const cleaned = stripMarkdownComments(text);
  const chunks = cleaned.split('[[atom_divider]]');
  return chunks.flatMap((chunk, chunkIndex) => {
    const nodes = [];
    if (chunk.trim()) {
      nodes.push(
        ...renderMarkdownWithDailyComic(
          chunk,
          `${keyPrefix}-chunk-${chunkIndex}`
        )
      );
    }
    if (chunkIndex < chunks.length - 1) {
      nodes.push(
        <div className="section-divider section-divider--hero" key={`${keyPrefix}-divider-${chunkIndex}`}>
          <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
        </div>,
      );
    }
    return nodes;
  });
};

const splitGoldBlocks = (text) => {
  const regex = /\[\[gold\]\]([\s\S]*?)\[\[\/gold\]\]/g;
  let lastIndex = 0;
  let match;
  const parts = [];
  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const end = regex.lastIndex;
    if (start > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, start) });
    }
    parts.push({ type: 'gold', value: match[1] });
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return parts;
};

const splitHeroBlocks = (text) => {
  const regex = /\[\[hero\]\]([\s\S]*?)\[\[\/hero\]\]/g;
  let lastIndex = 0;
  let match;
  const parts = [];
  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const end = regex.lastIndex;
    if (start > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, start) });
    }
    parts.push({ type: 'hero', value: match[1] });
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return parts;
};

const renderHeroBlock = (raw, key) => {
  const lines = raw.split('\n').map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return null;
  const [src, alt = 'Hero image'] = lines[0].split('|').map((entry) => entry.trim());
  return (
    <section className="standard-page-hero" key={key}>
      <div className="standard-page-hero-image standard-page-hero-image--top">
        <img src={src} alt={alt || 'Hero image'} />
      </div>
      <div className="section-divider section-divider--hero">
        <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
      </div>
    </section>
  );
};

const renderMeaningSections = (content, copy = {}) =>
  parseMeaningContent(content).map((part, index) => {
    if (part.type === 'text') {
      if (!part.value.trim()) return null;
      return splitHeroBlocks(part.value).flatMap((heroBlock, heroIndex) => {
        if (heroBlock.type === 'hero') {
          return renderHeroBlock(heroBlock.value, `hero-${index}-${heroIndex}`);
        }
        return splitGoldBlocks(heroBlock.value).flatMap((block, blockIndex) => {
          if (block.type === 'gold') {
            return (
              <div className="blog-gold-block" key={`gold-${index}-${heroIndex}-${blockIndex}`}>
                {renderMarkdownWithDividers(block.value, `gold-${index}-${heroIndex}-${blockIndex}`)}
              </div>
            );
          }
          return renderMarkdownWithDividers(block.value, `text-${index}-${heroIndex}-${blockIndex}`);
        });
      });
    }

    const mode = part.mode;
    const props = resolveMeaningProps(mode, copy[mode] || {}, part.args || {});

    if (mode === 'entry') return <MeaningListEntry key={`meaning-entry-${index}`} {...props} />;
    if (mode === 'list') return <MeaningListList key={`meaning-list-${index}`} {...props} />;
    if (mode === 'list-custom') {
      const entries = typeof props.entries === 'string'
        ? props.entries.split('|').map((entry) => entry.trim()).filter(Boolean)
        : props.entries;
      return (
        <MeaningListListCustom
          key={`meaning-list-custom-${index}`}
          {...props}
          entries={entries}
        />
      );
    }
    if (mode === 'select_environmental') {
      return <MeaningListSelectEnvironmental key={`meaning-select-${index}`} {...props} />;
    }
    if (mode === 'list_non_environmental') {
      return <MeaningListNonEnvironmental key={`meaning-non-env-${index}`} {...props} />;
    }
    if (mode === 'add') return <MeaningListAdd key={`meaning-add-${index}`} {...props} />;
    if (mode === 'submit') return <MeaningListSubmit key={`meaning-submit-${index}`} {...props} />;

    return null;
  });

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
        {post.id === 'on-environmentalism' ? (
          <MeaningListProvider storageKey={`meaning-list-${post.id}`}>
            {renderMeaningSections(content, meaningCopy)}
          </MeaningListProvider>
        ) : (
          renderMarkdownWithDividers(content, 'post')
        )}
      </div>
      <Link href="/blog" className="blog-post-page__back">← Back to Blog</Link>
    </div>
  );
}
