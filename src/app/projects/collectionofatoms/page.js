export const metadata = {
  title: 'CollectionOfAtoms | CollectionOfAtoms.com',
};

export default function CollectionOfAtomsProject() {
  return (
    <div className="page projects-page">
      <div className="page-title-band">
        <h1 className="page-title">CollectionOfAtoms.com</h1>
      </div>

      <div className="project-detail-hero project-detail-hero--collection">
        <img
          className="project-detail-hero__media project-detail-hero__media--collection"
          src="/misc/CollectionOfAtoms-Home.png"
          alt="CollectionOfAtoms.com homepage"
        />
      </div>

      <p className="project-detail-intro">
        CollectionOfAtoms.com is a personal platform built with Next.js and PostgreSQL. It includes custom
        markdown rendering, an integrated web audio player, and a CI/CD pipeline.
      </p>
      <p className="project-detail-intro">
        It evolved from a simple React SPA into a full-stack application with a backend API and database layer.
        Now it is set up to grow with me.
      </p>

      <div className="section-divider section-divider--hero">
        <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
      </div>

      <section className="project-detail-section">
        <h2>An Exercise In Design</h2>

        <p>I came across a suggestion the other day:</p>

        <aside className="standard-blue-block">
          <p>In a world with AI, taste becomes the new core skill.</p>
        </aside>

        <p>
          I do not think we are yet at the point where AI can replace human expertise in web development, but it
          played a real role in building this site.
        </p>

        <p>
          From quickstart questions to long stretches of vibe-coding, AI helped in nearly all aspects of the implementation.
          My human work has largely been the design, the editing, and most importantly the original content. I am proud of how it has
          turned out.
        </p>

        <p>
          Restrained design does not demand attention. I have followed this principle and made interface quiet so
          the actual content, my thoughts and art, has room to land.
        </p>
      </section>

      <div className="section-divider section-divider--hero">
        <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
      </div>

      <section className="project-detail-section">
        <h2>Features by Design</h2>

        <h3>Integrated Web Player</h3>
        <p>
          I wanted one place to share my music without it getting interrupted by normal browsing. I built an
          audio player that keeps playing while you move around the site. The soundtrack becomes part of the 
          browsing experience.
        </p>

        <h3>CI/CD Pipeline</h3>
        <p>
          Managing servers and hosting minutiae has been a recurring annoyance in my career. I wanted this site
          to deploy reliably from the code, without ceremony.
        </p>
        <p>
          I chose Vercel for a smooth workflow. When I push to main, the site builds and deploys automatically.
        </p>

        <h3>Custom Markdown Rendering</h3>
        <p>
          Writing in code-heavy interfaces slows me down, so I adopted markdown for blog posts early. Over time
          I realized I wanted richer interactions inside posts, not just formatted text.
        </p>
        <p>
          The site now supports custom ReactMarkdown components and inline tags that can invoke more complex
          behavior. It lets me write quickly without constantly chasing HTML structure and CSS classes.
          This way of doing things bridges the gap between ease of use and flexibility, which makes me want to contribute more.
        </p>
      </section>

      <section className="project-detail-section">
        <h2>Architecture and Evolution</h2>

        <p>
          CollectionOfAtoms.com began as a simple React single-page application. It had no backend and no
          persistent data. It started as an exercise in design and interaction.
        </p>

        <p>As the project grew, new needs emerged:</p>
        <ul>
          <li>A backend API for dynamic features</li>
          <li>A database to store structured data</li>
          <li>Server-side capabilities for future expansion</li>
          <li>A deployment workflow with minimal overhead</li>
        </ul>

        <p>
          Rather than bolt services onto the existing SPA, I migrated the project to Next.js. It kept the React
          foundation while adding API routes, server rendering, and a cleaner path toward scale.
        </p>

        <p>The system today:</p>
        <ul>
          <li><strong>Next.js</strong> for routing and hybrid rendering</li>
          <li><strong>API routes</strong> for backend logic and form submissions</li>
          <li><strong>PostgreSQL</strong> via Neon for persistent data</li>
          <li><strong>Vercel</strong> for deployment and CI/CD</li>
        </ul>

        <div className="architecture-diagram standard-red-block">
          <svg
            className="architecture-diagram__svg architecture-diagram__svg--vertical"
            width="100%"
            viewBox="90 20 220 390"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="arrow-vertical"
                markerWidth="4"
                markerHeight="4"
                refX="2"
                refY="2"
                orient="auto"
              >
                <path d="M0,0 L4,2 L0,4 Z" fill="#d7be82" />
              </marker>
            </defs>

            {/* Boxes */}
            <rect x="90" y="20" width="220" height="60" rx="8"
              stroke="#d7be82" fill="none" strokeWidth="1.2" />
            <text x="200" y="55" textAnchor="middle" fill="#e8e2d6">
              Next.js (Client + SSR)
            </text>

            <rect x="90" y="130" width="220" height="60" rx="8"
              stroke="#d7be82" fill="none" strokeWidth="1.2" />
            <text x="200" y="165" textAnchor="middle" fill="#e8e2d6">
              API Routes
            </text>

            <rect x="90" y="240" width="220" height="60" rx="8"
              stroke="#d7be82" fill="none" strokeWidth="1.2" />
            <text x="200" y="275" textAnchor="middle" fill="#e8e2d6">
              PostgreSQL
            </text>

            <rect x="90" y="350" width="220" height="60" rx="8"
              stroke="#d7be82" fill="none" strokeWidth="1.2" />
            <text x="200" y="385" textAnchor="middle" fill="#e8e2d6">
              Vercel (CI/CD)
            </text>

            {/* Arrows */}
            <line x1="200" y1="88" x2="200" y2="120"
              stroke="#d7be82" strokeWidth="1.2"
              markerEnd="url(#arrow-vertical)" />
            <line x1="200" y1="198" x2="200" y2="230"
              stroke="#d7be82" strokeWidth="1.2"
              markerEnd="url(#arrow-vertical)" />
            <line x1="200" y1="308" x2="200" y2="340"
              stroke="#d7be82" strokeWidth="1.2"
              markerEnd="url(#arrow-vertical)" />
          </svg>

          <svg
            className="architecture-diagram__svg architecture-diagram__svg--horizontal"
            width="100%"
            viewBox="20 150 530 60"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="arrow-horizontal"
                markerWidth="4"
                markerHeight="4"
                refX="2"
                refY="2"
                orient="auto"
              >
                <path d="M0,0 L4,2 L0,4 Z" fill="#d7be82" />
              </marker>
            </defs>

            {/* Boxes */}
            <rect x="20" y="150" width="110" height="60" rx="8"
              stroke="#d7be82" fill="none" strokeWidth="1.2" />
            <text x="75" y="185" textAnchor="middle" fill="#e8e2d6">
              Next.js
            </text>

            <rect x="160" y="150" width="100" height="60" rx="8"
              stroke="#d7be82" fill="none" strokeWidth="1.2" />
            <text x="210" y="185" textAnchor="middle" fill="#e8e2d6">
              API
            </text>

            <rect x="290" y="150" width="120" height="60" rx="8"
              stroke="#d7be82" fill="none" strokeWidth="1.2" />
            <text x="350" y="185" textAnchor="middle" fill="#e8e2d6">
              PostgreSQL
            </text>

            <rect x="440" y="150" width="110" height="60" rx="8"
              stroke="#d7be82" fill="none" strokeWidth="1.2" />
            <text x="495" y="185" textAnchor="middle" fill="#e8e2d6">
              Vercel
            </text>

            {/* Arrows */}
            <line x1="136" y1="180" x2="154" y2="180"
              stroke="#d7be82" strokeWidth="1.2"
              markerEnd="url(#arrow-horizontal)" />
            <line x1="266" y1="180" x2="284" y2="180"
              stroke="#d7be82" strokeWidth="1.2"
              markerEnd="url(#arrow-horizontal)" />
            <line x1="416" y1="180" x2="434" y2="180"
              stroke="#d7be82" strokeWidth="1.2"
              markerEnd="url(#arrow-horizontal)" />
          </svg>
        </div>

        <p>
          Every push to main triggers an automated deployment. Environment variables are managed per
          environment, and preview builds are generated for branch testing.
        </p>

        <p>
          Authentication and caching have not yet been implemented. That decision is
          intentional, but not permanent. The site's architecture follows its needs, and I simply
          don't need it yet.
        </p>

        <p className="project-detail-epilogue">
          The result is a system that is simple, stable, and ready to grow with whatever I build next.
        </p>
      </section>

      <a
        className="button-standard-glow"
        href="https://github.com/CollectionOfAtoms/collectionofatoms.com"
        target="_blank"
        rel="noreferrer"
      >
        View on GitHub →
      </a>
    </div>
  );
}
