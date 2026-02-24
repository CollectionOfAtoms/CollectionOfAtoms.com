"use client";

import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import DailyComicEmbed from './DailyComicEmbed';
import {
  MeaningListAdd,
  MeaningListEntry,
  MeaningListList,
  MeaningListListCustom,
  MeaningListProvider,
  MeaningListSelectEnvironmental,
  MeaningListNonEnvironmental,
  MeaningListSubmit,
} from './MeaningList';
import { parseArgs, parseMeaningContent, resolveMeaningProps } from '../lib/meaningMarkdown';

const stripMarkdownComments = (text) => text.replace(/<!--[\s\S]*?-->/g, '');

const splitContentTokens = (text) => {
  const regex = /\[\[(daily-comic|image|quote-inset|subtitle)([\s\S]*?)\]\]/g;
  let lastIndex = 0;
  let match;
  const parts = [];
  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const end = regex.lastIndex;
    if (start > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, start) });
    }
    const tokenType = match[1];
    const args = parseArgs(match[2] || '');
    parts.push({ type: tokenType, args });
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return parts;
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
  const regex = /\[\[hero([^\]]*)\]\]([\s\S]*?)\[\[\/hero\]\]/g;
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
    parts.push({ type: 'hero', value: match[2], args });
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return parts;
};

const HeroBlock = ({ raw, args = {}, onImageClick }) => {
  const lines = raw.split('\n').map((line) => line.trim()).filter(Boolean);
  const fallbackLine = lines[0] || '';
  const [fallbackSrc, fallbackAlt = 'Hero image'] = fallbackLine
    ? fallbackLine.split('|').map((entry) => entry.trim())
    : [];
  const src = args.src || args.url || fallbackSrc;
  const alt = args.alt || args.title || fallbackAlt || 'Hero image';
  const focus = args.focus || 'center';
  if (!src) return null;
  return (
    <section className="standard-page-hero">
      <button
        type="button"
        className="blog-image-button standard-page-hero-image standard-page-hero-image--top"
        onClick={() => onImageClick({ src, alt })}
        aria-label={`Open ${alt}`}
      >
        <img src={src} alt={alt || 'Hero image'} style={{ objectPosition: focus }} />
      </button>
      <div className="section-divider section-divider--hero">
        <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
      </div>
    </section>
  );
};

const MarkdownBlock = ({ text, onImageClick, keyPrefix }) => {
  if (!text.trim()) return null;
  return (
    <ReactMarkdown
      key={keyPrefix}
      components={{
        img: ({ src, alt }) => (
          <button
            type="button"
            className="blog-image-button"
            onClick={() => onImageClick({ src, alt })}
            aria-label={`Open ${alt || 'image'}`}
          >
            <img src={src} alt={alt || ''} />
          </button>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

const renderMarkdownWithTokens = (text, keyPrefix, onImageClick) =>
  splitContentTokens(text).map((part, index) => {
    if (part.type === 'daily-comic') {
      const caption = part.args?.caption || part.args?.title || '';
      return (
        <DailyComicEmbed
          key={`${keyPrefix}-daily-comic-${index}`}
          caption={caption}
          onImageClick={onImageClick}
        />
      );
    }
    if (part.type === 'image') {
      const src = part.args?.src || part.args?.url;
      if (!src) return null;
      const alt = part.args?.alt || part.args?.title || 'Image';
      const framed = String(part.args?.framed || '').toLowerCase() === 'true';
      return (
        <button
          key={`${keyPrefix}-image-${index}`}
          type="button"
          className={`blog-image-button${framed ? ' blog-image-button--framed' : ''}`}
          onClick={() => onImageClick({ src, alt })}
          aria-label={`Open ${alt}`}
        >
          <img src={src} alt={alt} />
        </button>
      );
    }
    if (part.type === 'quote-inset') {
      const textValue = part.args?.text || '';
      if (!textValue.trim()) return null;
      const align = (part.args?.align || 'center').toLowerCase();
      const alignClass = ['left', 'right', 'center'].includes(align)
        ? `quote-inset--${align}`
        : 'quote-inset--center';
      return (
        <aside
          key={`${keyPrefix}-quote-${index}`}
          className={`quote-inset ${alignClass}`}
        >
          <p className="quote-inset__text">{textValue}</p>
        </aside>
      );
    }
    if (part.type === 'subtitle') {
      const textValue = part.args?.text || '';
      if (!textValue.trim()) return null;
      return (
        <p key={`${keyPrefix}-subtitle-${index}`} className="post-subtitle">
          {textValue}
        </p>
      );
    }
    return (
      <MarkdownBlock
        key={`${keyPrefix}-text-${index}`}
        text={part.value}
        onImageClick={onImageClick}
        keyPrefix={`${keyPrefix}-text-${index}`}
      />
    );
  });

const renderMarkdownWithDividers = (text, keyPrefix, onImageClick) => {
  const cleaned = stripMarkdownComments(text);
  const chunks = cleaned.split('[[atom_divider]]');
  return chunks.flatMap((chunk, chunkIndex) => {
    const nodes = [];
    if (chunk.trim()) {
      nodes.push(
        ...renderMarkdownWithTokens(
          chunk,
          `${keyPrefix}-chunk-${chunkIndex}`,
          onImageClick
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

const renderContentBlocks = (content, keyPrefix, onImageClick) =>
  splitHeroBlocks(content).flatMap((heroBlock, heroIndex) => {
    if (heroBlock.type === 'hero') {
      return (
        <HeroBlock
          key={`hero-${keyPrefix}-${heroIndex}`}
          raw={heroBlock.value}
          args={heroBlock.args}
          onImageClick={onImageClick}
        />
      );
    }
    return splitGoldBlocks(heroBlock.value).flatMap((block, blockIndex) => {
      if (block.type === 'gold') {
        return (
          <div className="blog-gold-block" key={`gold-${keyPrefix}-${heroIndex}-${blockIndex}`}>
            {renderMarkdownWithDividers(
              block.value,
              `gold-${keyPrefix}-${heroIndex}-${blockIndex}`,
              onImageClick
            )}
          </div>
        );
      }
      return renderMarkdownWithDividers(
        block.value,
        `text-${keyPrefix}-${heroIndex}-${blockIndex}`,
        onImageClick
      );
    });
  });

const renderMeaningSections = (content, copy, onImageClick) =>
  parseMeaningContent(content).map((part, index) => {
    if (part.type === 'text') {
      if (!part.value.trim()) return null;
      return renderContentBlocks(part.value, index, onImageClick);
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

export default function BlogPostContentClient({ content, postId, meaningCopy }) {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeImage]);

  const onImageClick = useMemo(
    () => (payload) => {
      if (!payload?.src) return;
      setActiveImage({ src: payload.src, alt: payload.alt || 'Image' });
    },
    []
  );

  const body = postId === 'on-environmentalism'
    ? (
      <MeaningListProvider storageKey={`meaning-list-${postId}`}>
        {renderMeaningSections(content, meaningCopy, onImageClick)}
      </MeaningListProvider>
    )
    : renderContentBlocks(content, 'post', onImageClick);

  return (
    <>
      {body}
      {activeImage ? (
        <div className="photo-overlay" onClick={() => setActiveImage(null)}>
          <div className="photo-overlay__inner" onClick={(event) => event.stopPropagation()}>
            <button
              className="photo-overlay__close"
              onClick={() => setActiveImage(null)}
              aria-label="Close photo"
            >
              ✕
            </button>
            <img src={activeImage.src} alt={activeImage.alt} />
          </div>
        </div>
      ) : null}
    </>
  );
}
