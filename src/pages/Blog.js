import BlogPost from '../components/BlogPost';

export default function Blog() {
  const placeholderPost = {
    title: 'My First Longform Post',
    date: 'Jan 2024',
    readTime: '5 min read',
    excerpt: 'An upcoming deep-dive on the experiments, side quests, and lessons learned while building CollectionOfAtoms.com.',
    tags: ['react', 'personal-site', 'experiments'],
    status: 'Drafting',
  };

  return (
    <div className="page">
      <h1>Blog</h1>
      <p>Longer-form writing and experiments from the lab. First entry is on the way—here is the layout it will use.</p>
      <BlogPost {...placeholderPost} />
    </div>
  );
}
