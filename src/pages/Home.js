import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { posts } from '../data/posts';

export default function Home() {
  const navigate = useNavigate();
  const sectionsRef = useRef(null);
  const [latestExcerpt, setLatestExcerpt] = useState('');
  const latestPost = posts[0];

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
      "The Sprialator is an in-browser visualizer that leverages HTML5's canvas feature to animate with SVGs.",
      'Included as placed art at SOAK 2024, shown through a projection installation with custom microcontroller interactivity.',
    ],
    website: {
      label: 'Check it out',
      url: 'https://collectionofatoms.github.io/sprialator/',
    },
    link: 'https://github.com/CollectionOfAtoms/sprialator',
    tags: ['creative-coding', 'generative', 'HTML5', 'SVG', 'visualizer'],
    video: {
      src: '/projects/spiralator-preview.mp4',
      poster: '/projects/sprialator-poster.png',
    },
  };

  const scrollToFirstSection = () => {
    const firstSection = sectionsRef.current?.querySelector('.home-section-wrapper .home-section');
    if (firstSection) {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const sectionRect = firstSection.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      const currentScroll = window.scrollY || window.pageYOffset;

      const offsetForCenter = (viewportHeight - sectionHeight) / 2;
      const baseTarget =
        sectionHeight <= viewportHeight
          ? sectionRect.top + currentScroll - offsetForCenter
          : sectionRect.top + currentScroll;

      const target = Math.max(baseTarget - 50, 0); // 2rem upward adjustment
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };
  const sections = [
    {
      key: 'about',
      title: "Hey I'm Jesse",
      content: `Welcome to CollectionOfAtoms.com, my new home online. As time goes on, all of the places where we share ourselves online are being more and more corrupted by antagonistic business incentives.  This is my hedge against enshitification and censorship.  A place to keep those ideas I want to keep sharing, and place for me express myself and an avenue for people that once lost contact with me to find me once again.
      \n Putting myself forward in this way feels vulnerable, but vulnerable is something I am aiming to be more often. 
      \n Stay a minute and check something out.`,
      bg: '#515a47',
      textColor: '#f4f4f0',
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
      bg: '#d7be82',
      textColor: '#2b1c0c',
      link: '/projects',
      ctaBg: '#2b1c0c',
      ctaColor: '#f7f0e4',
    },
    {
      key: 'blog',
      title: 'Blog',
      content: blogExcerpt,
      contentIsMarkdown: true,
      bg: '#7a4419',
      textColor: '#f7f1e9',
      link: '/blog',
      ctaBg: '#f7f1e9',
      ctaColor: '#3a1c07',
    },
    {
      key: 'music',
      title: 'Music',
      content_title: 'Everything Stays',
      content_description: 'A classical guitar arrangement of a song from Adventure Time.',
      bg: '#755c1b',
      audio: '/music/everything_stays_classical.mpeg',
      textColor: '#f8f2e7',
      link: '/music',
      ctaBg: '#f8f2e7',
      ctaColor: '#2e1f08',
      ctaText: 'Keep Listening',
      bgImage: '/me/Guitar_Outside.jpg',
      bgPosition: '25% center',
    },
    {
      key: 'photography',
      title: 'Photography',
      content: '',
      bg: '#400406',
      textColor: '#000000',
      bgImage: '/photos/20190726_190449.jpg',
      bgPosition: 'center center',
      noOverlay: true,
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
              src="/CollectionOfAtoms_logo/logo_aura.svg"
              alt="Collection of Atoms logo"
              className="home-hero-logo"
            />
          <h1 className="home-hero-title">CollectionOfAtoms</h1>
          <p className="home-hero-tagline">Thoughts, projects, and things still becoming.</p>
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
                onClick={section.key === 'photography' ? () => navigate(section.link) : undefined}
                role={section.key === 'photography' ? 'button' : undefined}
                tabIndex={section.key === 'photography' ? 0 : undefined}
                onKeyDown={
                  section.key === 'photography'
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigate(section.link);
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
                  <article className="project-card home-project-card">
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
                  <div className="home-music">
                    <div className="home-music__title">{section.content_title}</div>
                    <p className="home-music__desc">{section.content_description}</p>
                    {section.audio ? (
                      <audio controls preload="none" src={section.audio} className="home-music__audio">
                        Your browser does not support the audio element.
                      </audio>
                    ) : null}
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
                    {latestPost ? (
                      <a
                        className="section-link home-blog-card__link"
                        href={`/blog/${latestPost.id}`}
                        style={{ backgroundColor: section.ctaBg, color: section.ctaColor }}
                      >
                        Read On
                      </a>
                    ) : null}
                  </div>
                ) : (
                  section.content ? <p>{section.content}</p> : null
                )}
                {section.link && section.key !== 'blog' ? (
                  <a
                    className="section-link"
                    href={section.link}
                    style={{ backgroundColor: section.ctaBg, color: section.ctaColor }}
                  >
                    {section.ctaText || 'See more'}
                  </a>
                ) : null}
              </div>
              {idx < sections.length - 1 ? (
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
