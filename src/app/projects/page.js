"use client";

import ProjectCard from '../../components/ProjectCard';

export default function Projects() {
  const projects = [
    {
      title: 'Sprialator',
      description: [
      "An in-browser visual experiment exploring recursive geometry and motion.",
      "Built for projection and physical interaction."
      ],
      detailPath: '/projects/sprialator',
      tags: ['creative-coding', 'generative', 'HTML5', 'SVG', 'visualizer'],
      mediaAlign: 'center',
      video: {
        src: '/projects/sprialator-preview.mp4',
        poster: '/projects/sprialator-poster.png',
      },
    },
    {
      title: 'KrampusBot',
      description: [
        'A mischievous party bot built for a high-concept holiday vault gathering, greeting guests emerging after 1000 years.',
        'It chats briefly, assigns snarky festive tasks, and prints the mission slip from a hidden overhead printer.',
      ],
      image: '/projects/KrampusBot.png',
      detailPath: '/projects/krampusbot',
      tags: ['automation', 'ChatGPT', 'bot'],
      mediaAlign: 'left',
    },
  ];

  return(
    <div className="page projects-page">
      <div className="page-title-band">
        <h1 className="page-title">Projects</h1>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
