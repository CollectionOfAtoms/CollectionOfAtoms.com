export const metadata = {
  title: 'CollectionOfAtoms | Sprialator',
};

export default function Sprialator() {
  return (
    <div className="page projects-page">
      <div className="page-title-band">
        <h1 className="page-title">Sprialator</h1>
      </div>

      <div className="project-detail-hero">
        <video
          className="project-detail-hero__media"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/projects/sprialator-poster.png"
        >
          <source src="/projects/sprialator-preview.mp4" type="video/mp4" />
        </video>
      </div>

      <p className="project-detail-intro">
        Sprialator: a browser-based visual system for exploring recursive motion and symmetry.
      </p>

      <a
        className="button-standard-glow"
        href="https://collectionofatoms.github.io/sprialator/"
        target="_blank"
        rel="noreferrer"
      >
        Enter the Sprialator →
      </a>

      <section className="project-detail-section">
        <h2>An Accidental Beginning</h2>
        <p>
          I began writing Sprialator after buying a projector for my home. Around the same time, I was learning a guitar cover of Pure Imagination. I had the idea to film a video from inside the guitar—something I occasionally do—and wanted a slowly rotating spiral projected behind me as a backdrop.
        </p>
        <p>
          Rather than playing a pre-rendered video, I wanted the spiral to be generated live. I asked ChatGPT how to draw a rotating spiral on a canvas, got a small piece of starter code, misspelled my github repository, and the project sprialed outward from there.
        </p>
        <p>
          The funny part is that when I finally got Sprialator to a place that felt “good enough” to film, I discovered that the very specific camera settings needed to produce a rolling-shutter effect didn’t play nicely with the projector at all.
        </p>
        <p>
          At that point, I had a project without a use. Instead of abandoning it, I decided to see if it could live somewhere else—and submitted it as an art piece to SOAK, my region’s local Burning Man festival.
        </p>
        <div className="section-divider section-divider--hero">
            <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
        </div>
      </section>
      
      <section className="project-detail-section">
        <h2>What's Interesting Here</h2>
        <p>Sprialator ended up being a learning project in several unexpected directions.</p>

        <h3>Learning SVGs properly</h3>
        <p>
          This project forced me to actually understand SVGs rather than treating them as opaque assets. I spent a lot of time normalizing fundamental shapes—circles, stars, polygons—so they all shared a common scale and structure. That constraint ended up being essential for everything that followed.
        </p>

        <h3>SVG morphing without jump cuts</h3>
        <p>
          One thing I really wanted to avoid was the visual “jump” that happens when one shape abruptly becomes another. Smoothly morphing one SVG into the next turned out to be a surprisingly difficult problem. Especially without visual jump cuts. I explored several libraries that promised to handle it, but none quite fit what I needed.
        </p>
        <p>
          In the end, I hacked together a solution by using an existing morphing library in an unintended way—pre-generating the transitional forms between shapes ahead of time, then animating through those intermediate states. It wasn’t elegant, but it worked, and it taught me a lot about where abstraction helps and where it gets in the way.
        </p>

        <div className="section-divider section-divider--hero">
          <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
        </div>

        <h3>Leaving the browser</h3>
        <figure className="sprialator-media">
          <video
            className="sprialator-media__video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/projects/sprialator_festival_web.mp4" type="video/mp4" />
          </video>
          <figcaption className="sprialator-media__caption">
            Sprialator Setup Soak 2024 with custom microcontroller.
          </figcaption>
        </figure>
        <p>
          When Sprialator was installed at SOAK, it became my first real foray into programming a microcontroller. The project crossed a boundary from “something that lives on a screen” into something physical and interactive, which was both intimidating and deeply satisfying. It’s a direction I’m very much looking forward to exploring again.
        </p>
      </section>

      <p className="project-detail-epilogue">
        Sprialator didn’t start with a plan. It just refused to stop.
      </p>
    </div>
  );
}
