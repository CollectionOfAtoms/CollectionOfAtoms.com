import brainForAHeart from '../content/posts/Brain For a Heart.md';
import onEnvironmentalism from '../content/posts/On Environmentalism.md';

export const posts = [
  {
    id: 'brain-for-a-heart',
    title: 'Brain For A Heart',
    date: 'Dec 2025',
    readTime: '4 min read',
    excerpt: 'Why the logo blends atoms, hearts, and brains, and how each symbol earned its place.',
    tags: ['identity', 'design', 'symbols'],
    status: 'Published',
    file: brainForAHeart,
  },
  {
    id: 'on-environmentalism',
    title: 'On Environmentalism',
    date: 'Mar 2024',
    readTime: '8 min read',
    excerpt: 'A guided reflection on the values that root us and why they depend on the environment.',
    tags: ['values', 'environment', 'reflection'],
    status: 'Drafting',
    file: onEnvironmentalism,
  },
];

export const getPostById = (id) => posts.find((post) => post.id === id);
