export default function KrampusBot() {
  return (
    <div className="page projects-page">
      <div className="page-title-band">
        <h1 className="page-title">KrampusBot</h1>
      </div>

      <div className="project-detail-hero krampusbot-hero">
        <video
          className="project-detail-hero__media krampusbot-hero__media"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/projects/krampus-poster.jpg"
        >
          <source src="/projects/krampus-trimmed.mp4" type="video/mp4" />
        </video>
      </div>

      <p className="project-detail-intro">
        KrampusBot is a mischievous party bot that assigns festive tasks after a short, snarky conversation.
      </p>
      <a
        className="button-standard-glow"
        href="https://github.com/CollectionOfAtoms/krampusbot"
        target="_blank"
        rel="noreferrer"
      >
        View on GitHub →
      </a>

      <section className="project-detail-section">
        <h2>What It Does</h2>
        <p>
          Krampus 3000 was a high-concept art-party.  At Krampus guests are invited to play along.  Having emerged from their vaults, unaware of why they were summoned to a bizarre techno-futuristic party hosted by an AI.
        
          Guests step up, chat for a minute, and get a printed list of tasks to complete at the party. These tasks fundamentally misunderstands the spirit of the long dead holiday that is Christmas, like leaving a ransom note for a friend, or attempting a risky game of fire-dreidel.
        </p>
        <p>
          KrampusBot (lazily) listens, riffs on what you say, then assigns special tasks from a themed list as well as some it makes up-whole cloth designed to get guests engaging with the activities of the party.
        </p>
        <div className="project-divider">
          <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
        </div>
      </section>

      <section className="project-detail-section">
        <h2>How It Was Built</h2>
        <h3>Conversation layer</h3>
        <p>
          KrampusBot is built on ChatGPT APIs.  It begins by explaining the setup to the computer and directing it to move the conversation forward.  First it collects the user's name and email by pestering them until they provide a valid answer.  If it recognizes the user from the email list it reveals that it knows your name then asks a few questions before ultimately giving the user tasks for its amusement.
        </p>

        <h3>Task engine + printing</h3>
        <p>
          After a short and snarky dialog the bot formats a list of tasks and sends it (bypassing any user prompting) to a concealed printer that drops the list on the user as they finish typing. Guests walk away with their mission slips and get to appeasing the AI overlord of Christmas.
        </p>

        <h3>Physical presence</h3>
        <figure className="krampusbot-media">
          <img
            className="krampusbot-media__image"
            src="/projects/krampus-install.jpg"
            alt="KrampusBot installation in the holiday vault party space"
          />
        </figure>
        <p>
          KrampusBot's enclosure and staging were designed to feel like a relic from a vault and sits invitingly, but serruptitiously in the corner. 
        </p>
      </section>

      <p className="project-detail-epilogue">
        Holiday chaos, automated.
      </p>
    </div>
  );
}
