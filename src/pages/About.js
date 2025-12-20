import { useEffect, useState } from 'react';

export default function About() {
  const [activeImage, setActiveImage] = useState(null);
  const sections = [
    {
      title: 'My Roots',
      text: `Born in Flagstaff, Arizona and raised in Boulder, Colorado, I learned to think for myself, to enjoy nature's abundance, and to never fear learning. In 2015 I moved away and hiked the Pacific Crest Trail from Mexico to Canada before putting down new roots in Oregon. 
      \n Today I'm based in Portland, Oregon, where I live in and help lead a community house. Much of my free time is spent tending to the place itself—repairing what’s worn, improving what’s awkward, and slowly shaping a space that can hold people well. `,
      image: '/me/Longs_Peak.jpg',
      fullBleed: true,
    },
    {
      title: 'Care Beyond The Usual Scope',
      text: `I care deeply about animals and animal rights. My concern for them isn’t separate from my concern for people—it grows from the same place — valuing the experience of being matter-come-alive. A small bit of cosmic dust endowed with faculties enough to think and percieve on the only known bubble in the whole universe in which we do not perish instantly.  
      
      \nRealistically animal agriculture threatens what we humans hold most dear. Whether we value our own future, our legacies, the health and wellbeing of our most loved, our natural environment, or the happiness of our own children, then what our kind does with animals presents a threat to each of us. 
      \n But so too, we must acknowledge the very real and tangible impact of our choices on the animals themselves, who are given no choices of their own and who are killed by the tens of billions each year.  Each has their own story, their own perspective, and their own desire to go on holding onto what is most dear to them: their own lives.`,
      image: '/me/Chickens_sharp.png',
    },
    {
      title: 'Thinking at Scale',
      text: `I’m drawn to large questions.  It was this drive that led me to study Astrophysics in college, and that learning that informs the broad directions of my life. It is why I will not use my efforts to help enable or support systems that I see as bad for humanity or the planet. I have spent a lot of time thinking about humanity as a whole — where we’re headed, what systems we’re reinforcing, and which problems we keep deferring because they don’t yield to quick fixes. 
      \n I long to bring about a future that we can show our children and say : "Look at what we did.  We studied our reality, we understood what must change, and we responded to it. We changed because we understood that ignorance was not a solution. We changed it because we love existence.  We changed it because we love you.  Now use this gift to show the universe something it has never seen before"`,
      image: '/me/JWST_cornucopia.jpg',
    },
    {
      title: 'Making Meaning',
      text: `Philosophically, I’m an Absurdist. I don’t believe the universe offers us meaning by default. Instead, meaning emerges through what we choose to care about, what we build, and how we show up for one another. Creating things—ideas, systems, structures, places—is one way I participate in that ongoing act of meaning-making.
      \n
      I bring the most meaning to my own life by loving deeply. The experience of my two closest loves is something I look forward to every day — My cherished partner in life [Eleanor](ElleSparksStudio.com), and our amazing circus dog Nibbler.`,
      image: '/me/Elle+Nibs.jpg',
    },
    {
      title: 'The Pleasure of Problems',
      text: `I love a good problem. Technical or practical, conceptual or ethical—it doesn’t matter much. There’s a particular satisfaction in understanding a system deeply enough to improve it, simplify it, or redirect it toward something more humane. Problem-solving, for me, is less about conquest and more about alignment.`,
      image: '/photos/20190928_151114.jpg',
    },
    {
      title: 'This Space',
      text: `This site is a collection of projects, thoughts, experiments, and partial answers. It’s not a declaration or a finished body of work—just a place to think in public, to build slowly, and to leave behind a few useful traces.`,
      image: '/CollectionOfAtoms_logo/Logo_yellow_transparent_bold.svg',
      key: 'space',
    },
  ];

  useEffect(() => {
    if (!activeImage) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeImage]);

  const renderRichText = (text = '') => {
    const withLinks = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
      const href = url.startsWith('http') ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
    });
    const withBreaks = withLinks.replace(/\n/g, '<br/>');
    return { __html: withBreaks };
  };

  return (
    <div className="page">
      <h1>About</h1>
      <div className="about-sections">
        {sections.map((section, idx) => {
          const isEven = idx % 2 === 0;
          if (section.fullBleed) {
            return (
              <>
                <section className="about-hero-block" key={section.title + idx}>
                  <div className="about-hero-image">
                    <img src={section.image} alt={section.title} />
                  </div>
                  <div className="about-hero-content">
                    <h2>{section.title}</h2>
                    <p dangerouslySetInnerHTML={renderRichText(section.text)} />
                  </div>
                </section>
                {idx < sections.length - 1 ? (
                  <div className="about-divider">
                    <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
                  </div>
                ) : null}
              </>
            );
          }
          return (
            <>
              <section
                className={`about-block ${isEven ? 'about-block--right' : 'about-block--left'} ${section.key === 'space' ? 'about-block--space' : ''}`}
                key={section.title + idx}
              >
                <button
                  className={`about-photo ${isEven ? 'about-photo--right' : 'about-photo--left'} ${section.key === 'space' ? 'about-photo--no-shadow' : ''}`}
                  onClick={() => setActiveImage({ src: section.image, alt: section.title })}
                  aria-label={`Open ${section.title} photo`}
                >
                  <img src={section.image} alt={section.title} />
                </button>
                <h2>{section.title}</h2>
                <p dangerouslySetInnerHTML={renderRichText(section.text)} />
              </section>
              {idx < sections.length - 1 ? (
                <div className="about-divider">
                  <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
                </div>
              ) : null}
            </>
          );
        })}
      </div>
      {activeImage ? (
        <div className="photo-overlay" onClick={() => setActiveImage(null)}>
          <div className="photo-overlay__inner" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
}
