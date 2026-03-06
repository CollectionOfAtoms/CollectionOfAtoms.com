export function formatPostDate(mmddyyyy) {
  const [m, , y] = mmddyyyy.split('/');
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
    .format(new Date(y, m - 1));
}

export const posts = [
  {
    id: 'on-ai-art',
    title: 'The Loss of Assumed Intention',
    subtitle: 'What AI changed about how we encounter art',
    date: '02/01/2026',
    readTime: '15 min read',
    excerpt: 'How AI art reshapes intention, attention, and trust—and why reclaiming human meaning matters.',
    image: '/misc/Cat_wall.jpg',
    imageSource: 'daily-comic',
    imageAlt: 'Daily comic',
    imageFit: 'cover',
    tags: ['ai', 'art', 'culture'],
    status: 'Drafting',
    file: '/content/posts/On%20AI%20Art.md',
    listed: true,
  },
  {
    id: 'brain-for-a-heart',
    title: 'Brain For A Heart',
    subtitle: "What's with the logo?",
    date: '12/01/2025',
    readTime: '4 min read',
    excerpt: 'Why the logo blends atoms, hearts, and brains, and how each symbol earned its place.',
    image: '/CollectionOfAtoms_logo/Logo_transparent_512.png',
    imageAlt: 'Collection of Atoms logo',
    imageFit: 'contain',
    tags: ['identity', 'design', 'symbols'],
    status: 'Published',
    file: '/content/posts/Brain%20For%20a%20Heart.md',
    listed: true,
  },
  {
    id: 'tree-of-heaven',
    title: 'Tree of Heaven, the Tree from Hell',
    subtitle: 'A primer on Tree of Heaven in Portland, Oregon and how to manage it.',
    date: '03/01/2026',
    readTime: '6 min read',
    excerpt: 'It smells faintly of cat urine, it can crack through concrete, and it will outlast your patience. Here\'s what Tree of Heaven is, how it conquered Portland, and how to actually fight back.',
    tags: ['invasive species', 'portland', 'environment', 'gardening'],
    status: 'Drafting',
    file: '/content/posts/Tree%20of%20Heaven.md',
    listed: false,
  },
  {
    id: 'on-environmentalism',
    title: 'On Environmentalism',
    date: '03/01/2024',
    readTime: '8 min read',
    excerpt: 'A guided reflection on the values that root us and why they depend on the environment.',
    image: '/misc/On_environmentalism.jpg',
    imageAlt: 'Desert landscape with atmospheric clouds',
    tags: ['values', 'environment', 'reflection'],
    status: 'Drafting',
    file: '/content/posts/On%20Environmentalism.md',
    listed: false,
  },
];

export const getPostById = (id) => posts.find((post) => post.id === id);
