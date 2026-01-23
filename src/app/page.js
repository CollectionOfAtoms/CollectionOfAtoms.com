"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { posts } from '../data/posts';
import { tracks } from '../data/tracks';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function Home() {
  const router = useRouter();
  const sectionsRef = useRef(null);
  const [latestExcerpt, setLatestExcerpt] = useState('');
  const latestPost = posts[0];
  const { playTrack, togglePlay, currentIndex, isPlaying, progress, seekTo } = useAudioPlayer();
  const { currentTime, duration } = progress;

  useEffect(() => {
    let isActive = true;

    const countWords = (text) => {
      const cleaned = text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]*`/g, '')
        .replace(/!\[[^\]]*]\([^)]+\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[#>*_~\-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      return cleaned ? cleaned.split(' ').length : 0;
    };

    const extractExcerpt = (markdown) => {
      const withoutTitle = markdown.replace(/^#\s+.*(?:\r?\n)+/, '');
      const blocks = withoutTitle.split(/\n{2,}/);
      const excerptBlocks = [];
      let wordTotal = 0;

      for (const block of blocks) {
        const trimmed = block.trim();
        if (!trimmed) {
          continue;
        }

        if (/^!\[[^\]]*]\([^)]+\)$/.test(trimmed) || trimmed === '---') {
          continue;
        }

        const words = countWords(trimmed);
        if (!words) {
          continue;
        }

        excerptBlocks.push(trimmed);
        wordTotal += words;

        if (wordTotal >= 300) {
          break;
        }
      }

      return excerptBlocks.join('\n\n');
    };

    const loadLatestExcerpt = async () => {
      if (!latestPost?.file) {
        return;
      }

      try {
        const response = await fetch(latestPost.file);
        if (!response.ok) {
          throw new Error(`Failed to load ${latestPost.file}`);
        }
        const text = await response.text();
        const excerpt = extractExcerpt(text);
        if (isActive) {
          setLatestExcerpt(excerpt);
        }
      } catch (error) {
        if (isActive) {
          setLatestExcerpt('');
        }
      }
    };

    loadLatestExcerpt();

    return () => {
      isActive = false;
    };
  }, [latestPost]);

  const blogExcerpt = latestPost && latestExcerpt
    ? latestExcerpt
    : 'Latest writing from the lab.';

  const featuredProject = {
    title: 'Sprialator',
    description: [
      "An in-browser visual experiment exploring recursive geometry and motion.",
      "Built for projection and physical interaction."
    ],
    website: {
      label: 'Check it out',
      url: 'https://collectionofatoms.github.io/sprialator/',
    },
    detailPath: '/projects/sprialator',
    link: 'https://github.com/CollectionOfAtoms/sprialator',
    tags: ['creative-coding', 'generative', 'HTML5', 'SVG', 'visualizer'],
    video: {
      src: '/projects/sprialator-preview.mp4',
      poster: '/projects/sprialator-poster.png',
    },
  };

  const scrollToFirstSection = () => {
    const firstSection = sectionsRef.current?.querySelector('.home-section-wrapper .home-section');
    if (firstSection) {
      const sectionRect = firstSection.getBoundingClientRect();
      const currentScroll = window.scrollY || window.pageYOffset;

      const target = Math.max(sectionRect.top + currentScroll, 0);
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };
  const sections = [
    {
      key: 'about',
      title: "Hey I'm Jesse",
      content: `Welcome to CollectionOfAtoms.com, my new home online. As time goes on, the corporate services we use to share ourselves online are being increasingly corrupted by anti-user business incentives.  This is my hedge against negative advertising incentives and censorship.  A place to keep those ideas I want to be sharing, a place for me express myself, and an avenue to get ahold of me as we negotiate our relationships with social media.
      \n Putting myself forward in this way feels vulnerable, but vulnerable is something I am aiming to be more often. 
      \n Stay a minute and check something out.`,
      bg: '#15200B',
      textColor: '#ffecd3',
      link: '/about',
      ctaBg: '#f4f4f0',
      ctaColor: '#1c2118',
      ctaText: 'Learn more about me',
      portrait: 'me/Self_1.jpg',
    },
    {
      key: 'projects',
      title: 'Projects',
      content: '',
      featuredProject,
      bg: '#0f2320',
      textColor: '#ffecd3',
      link: '/projects',
      ctaBg: '#f7f1e9',
      ctaColor: '#3a1c07',
    },
    {
      key: 'blog',
      title: 'Blog',
      content: blogExcerpt,
      contentIsMarkdown: true,
      bg: '#2b1416',
      textColor: '#ffecd3',
      link: '/blog',
      ctaBg: '#f7f1e9',
      ctaColor: '#3a1c07',
      ctaText: 'Read On',
    },
    {
      key: 'music',
      title: 'Music',
      content_title: tracks[0]?.title || 'Featured track',
      bg: '#1A0427',
      textColor: '#ffecd3',
      link: '/music',
      ctaBg: '#f8f2e7',
      ctaColor: '#2e1f08',
      ctaText: 'Keep Listening',
      mediaImage: '/me/Beach_guitar.jpg',
      mediaPosition: '25% center',
      trackIndex: 0,
    },
    {
      key: 'photography',
      title: 'Photography',
      content: '',
      bg: '#271E04',
      textColor: '#ffecd3',
      mediaImage: '/photos/20250801_100930.jpg',
      mediaPosition: 'center center',
      link: '/photography',
      ctaBg: 'rgba(0,0,0,0.78)',
      ctaColor: '#f5e9e9',
    },
  ];

  return (
    <div className="page home">
      <div className="home-content-wrapper">
        <div className="home-section-wrapper">
          <section className="home-hero-banner">
            <img
              src="/CollectionOfAtoms_logo/Logo_aura.svg"
              alt="Collection of Atoms logo"
              className="home-hero-logo"
            />
          <h1 className="home-hero-title">CollectionOfAtoms</h1>
          <p className="home-hero-tagline">Thoughts, projects, and things still becoming.</p>
          <p className="home-hero-tagline home-hero-tagline--secondary">
            Currently: exploring creative code + discussing animal ethics + looking for my dream-job.
          </p>
          <button className="home-hero-button" onClick={scrollToFirstSection}>
            Explore ↓
          </button>
        </section>
        </div>

        <div className="home-sections" ref={sectionsRef}>
          {sections.map((section, idx) => (
            <div className="home-section-wrapper" key={`${section.key}-${idx}`}>
              <div
                className={`home-section home-section--${section.key} ${section.key === 'about' ? 'home-section--about' : ''}`}
                style={(() => {
                  const isPhoto = section.key === 'photography';
                  const style = section.bgImage
                    ? {
                        backgroundImage: section.noOverlay
                          ? `url(${section.bgImage})`
                          : `linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${section.bgImage})`,
                        color: section.textColor,
                        backgroundPosition: section.bgPosition || 'left center',
                      }
                    : { backgroundColor: section.bg, color: section.textColor };
                  if (isPhoto) style.cursor = 'pointer';
                  return style;
                })()}
                onClick={section.key === 'photography' ? () => router.push(section.link) : undefined}
                role={section.key === 'photography' ? 'button' : undefined}
                tabIndex={section.key === 'photography' ? 0 : undefined}
                onKeyDown={
                  section.key === 'photography'
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          router.push(section.link);
                        }
                      }
                    : undefined
                }
              >
                <h2>{section.title}</h2>
                {section.key === 'about' && section.portrait ? (
                  <div className="home-about-layout">
                    <img src={section.portrait} alt="Portrait of Jesse" className="home-portrait" />
                    <p>{section.content}</p>
                  </div>
                ) : section.key === 'projects' && section.featuredProject ? (
                  <article
                    className="project-card home-project-card"
                    onClick={() => router.push(section.featuredProject.detailPath)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        router.push(section.featuredProject.detailPath);
                      }
                    }}
                    role="link"
                    tabIndex={0}
                  >
                    <div className="project-card__media project-card__media--center">
                      {section.featuredProject.video ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          poster={section.featuredProject.video.poster}
                        >
                          <source src={section.featuredProject.video.src} type="video/mp4" />
                        </video>
                      ) : section.featuredProject.image ? (
                        <img
                          src={section.featuredProject.image}
                          alt={`${section.featuredProject.title} preview`}
                        />
                      ) : (
                        <span>Project image coming soon</span>
                      )}
                    </div>
                    <div className="project-card__body">
                      <h2 className="project-card__title">{section.featuredProject.title}</h2>
                      <div className="project-card__desc">
                        {section.featuredProject.description.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.featuredProject.website ? (
                          <a
                            href={section.featuredProject.website.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            {section.featuredProject.website.label} →
                          </a>
                        ) : null}
                      </div>
                      <ul className="project-card__tags">
                        {section.featuredProject.tags.map((tag) => (
                          <li key={tag}>#{tag}</li>
                        ))}
                      </ul>
                    </div>
                    <a
                      className="project-card__github"
                      href={section.featuredProject.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${section.featuredProject.title} on GitHub`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.38-2.04 1-2.76-.1-.26-.43-1.3.09-2.71 0 0 .82-.27 2.7 1.03a9.08 9.08 0 0 1 2.46-.34c.84 0 1.69.12 2.46.34 1.88-1.3 2.7-1.03 2.7-1.03.52 1.41.2 2.45.1 2.71.62.72 1 1.64 1 2.76 0 3.93-2.34 4.79-4.57 5.05.36.33.68.97.68 1.96 0 1.41-.01 2.55-.01 2.9 0 .27.18.6.69.49 3.96-1.35 6.83-5.17 6.83-9.67C22 6.58 17.52 2 12 2z"
                        />
                      </svg>
                    </a>
                  </article>
                ) : section.key === 'music' ? (
                  <div className="home-media-frame">
                    <div
                      className="home-media-frame__image"
                      style={{
                        backgroundImage: `url(${section.mediaImage})`,
                        backgroundPosition: section.mediaPosition || 'center',
                      }}
                    />
                  <div className="home-media-frame__content">
                    <div className="home-music">
                      <div className="home-music__title">{section.content_title}</div>
                      {typeof section.trackIndex === 'number' ? (() => {
                        const isCurrent = currentIndex === section.trackIndex;
                        const scrubValue = isCurrent ? currentTime : 0;
                        const scrubMax = isCurrent ? duration : 0;
                        const scrubPercent = scrubMax ? (scrubValue / scrubMax) * 100 : 0;
                        const formatTime = (time) => {
                          if (!Number.isFinite(time)) return '0:00';
                          const minutes = Math.floor(time / 60);
                          const seconds = Math.floor(time % 60).toString().padStart(2, '0');
                          return `${minutes}:${seconds}`;
                        };

                        return (
                          <div className="music-card__player">
                            <button
                              type="button"
                              className="music-card__control"
                              onClick={() => {
                                if (isCurrent) {
                                  togglePlay();
                                  return;
                                }
                                playTrack(section.trackIndex);
                              }}
                            >
                              {isCurrent && isPlaying ? (
                                <svg className="music-card__icon" viewBox="0 0 24 24" aria-hidden="true">
                                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                                </svg>
                              ) : (
                                <svg className="music-card__icon" viewBox="0 0 24 24" aria-hidden="true">
                                  <path d="M8 5l11 7-11 7V5z" />
                                </svg>
                              )}
                            </button>
                            <div className="music-card__scrub">
                              <span className="music-card__time">{formatTime(isCurrent ? currentTime : 0)}</span>
                              <input
                                className="music-card__range"
                                type="range"
                                min="0"
                                max={scrubMax || 0}
                                value={scrubValue}
                                onChange={(event) => {
                                  if (!isCurrent) return;
                                  seekTo(Number(event.target.value));
                                }}
                                disabled={!isCurrent || !duration}
                                style={{ '--progress': `${scrubPercent}%` }}
                              />
                              <span className="music-card__time">{formatTime(isCurrent ? duration : 0)}</span>
                            </div>
                          </div>
                        );
                      })() : null}
                    </div>
                  </div>
                </div>
                ) : section.key === 'photography' ? (
                  <div className="home-media-frame">
                    <div
                      className="home-media-frame__image"
                      style={{
                        backgroundImage: `url(${section.mediaImage})`,
                        backgroundPosition: section.mediaPosition || 'center',
                      }}
                    />
                  </div>
                ) : section.key === 'blog' && section.contentIsMarkdown ? (
                  <div className="home-blog-card">
                    <h3 className="home-blog-card__title">{latestPost?.title || 'Latest post'}</h3>
                    <div className="home-blog-excerpt blog-post__content">
                      <div className="home-blog-excerpt__content">
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="home-blog-card__fade" aria-hidden="true" />
                  </div>
                ) : (
                  section.content ? <p>{section.content}</p> : null
                )}
                {section.link ? (
                  <Link className="section-link" href={section.link}>
                    {section.ctaText || 'See more'}
                  </Link>
                ) : null}
              </div>
              {idx < sections.length - 1 && idx % 2 === 0 ? (
                <div className="home-divider">
                  <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
