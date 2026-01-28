export const posts = [
  {
    id: 'brain-for-a-heart',
    title: 'Brain For A Heart',
    date: 'Dec 2025',
    readTime: '4 min read',
    excerpt: 'Why the logo blends atoms, hearts, and brains, and how each symbol earned its place.',
    image: '/CollectionOfAtoms_logo/Logo_transparent_512.png',
    imageAlt: 'Collection of Atoms logo',
    imageFit: 'contain',
    tags: ['identity', 'design', 'symbols'],
    status: 'Published',
    file: '/content/posts/Brain%20For%20a%20Heart.md',
  },
  {
    id: 'on-environmentalism',
    title: 'On Environmentalism',
    date: 'Mar 2024',
    readTime: '8 min read',
    excerpt: 'A guided reflection on the values that root us and why they depend on the environment.',
    image: '/misc/On_environmentalism.jpg',
    imageAlt: 'Desert landscape with atmospheric clouds',
    tags: ['values', 'environment', 'reflection'],
    status: 'Drafting',
    file: '/content/posts/On%20Environmentalism.md',
  },
];

export const getPostById = (id) => posts.find((post) => post.id === id);
