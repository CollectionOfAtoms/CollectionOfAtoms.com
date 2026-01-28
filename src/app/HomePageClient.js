"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { posts } from '../data/posts';
import { tracks } from '../data/tracks';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import BlogPostCard from '../components/BlogPostCard';
import ProjectCard from '../components/ProjectCard';

export default function HomePageClient() {
  const router = useRouter();
  const sectionsRef = useRef(null);
  const latestPost = posts[0];
  const { playTrack, togglePlay, currentIndex, isPlaying, progress, seekTo } = useAudioPlayer();
  const { currentTime, duration } = progress;

  const featuredProject = {
    title: 'Sprialator',
    description: [
      "An in-browser visual experiment exploring recursive geometry and motion.",
      "Built for projection and physical interaction."
    ],
    website: {
      label: 'Check it out',
      url: '/projects/sprialator',
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
      portrait: '/me/Self_2.jpg',
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
            <div className="home-hero-text">
              <div className="section-divider section-divider--hero">
                <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
              </div>
              <p className="home-hero-tagline">Thoughts, projects, and things still becoming.</p>
              <p className="home-hero-tagline home-hero-tagline--secondary">
                Currently: exploring creative code + discussing animal ethics + looking for my dream-job.
              </p>
            </div>
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
                  <ProjectCard
                    {...section.featuredProject}
                    className="home-project-card"
                  />
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
                ) : section.key === 'blog' ? (
                  latestPost ? (
                    <BlogPostCard {...latestPost} />
                  ) : null
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
