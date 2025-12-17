import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
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
      content: 'A rotating collection of builds and experiments in web, visuals, and interactive toys.',
      bg: '#d7be82',
      textColor: '#2b1c0c',
      link: '/projects',
      ctaBg: '#2b1c0c',
      ctaColor: '#f7f0e4',
    },
    {
      key: 'blog',
      title: 'Blog',
      content: 'My First Longform Post — An upcoming deep-dive on the experiments, side quests, and lessons learned while building CollectionOfAtoms.com.',
      bg: '#7a4419',
      textColor: '#f7f1e9',
      link: '/blog',
      ctaBg: '#f7f1e9',
      ctaColor: '#3a1c07',
    },
    {
      key: 'music',
      title: 'Music',
      content_title: 'Jade',
      content_description: 'Original Instrumental composition feat. Hans Swenson on violin.',
      bg: '#755c1b',
      audio: '/music/Jade_w_Hans.m4a',
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
      noOverlay: true,
      link: '/photography',
      ctaBg: 'rgba(0,0,0,0.78)',
      ctaColor: '#f5e9e9',
    },
  ];

  return (
    <div className="page home">
      <div className="home-sections">
        {sections.map((section) => (
          <div
            key={section.key}
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
            ) : (
              section.content ? <p>{section.content}</p> : null
            )}
            {section.link ? (
              <a
                className="section-link"
                href={section.link}
                style={{ backgroundColor: section.ctaBg, color: section.ctaColor }}
              >
                {section.ctaText || 'See more'}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
