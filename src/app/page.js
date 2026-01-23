import { readFile } from 'fs/promises';
import path from 'path';
import HomePageClient from './HomePageClient';
import { posts } from '../data/posts';

const countWords = (text) => {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned ? cleaned.split(' ').length : 0;
};

const extractExcerpt = (markdown) => {
  const withoutTitle = markdown.replace(/^#\s+.*(?:\r?\n)+/, '');
  const blocks = withoutTitle.split(/\n{2,}/);
  const excerptBlocks = [];
  let wordTotal = 0;

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) {
      continue;
    }

    if (/^!\[[^\]]*]\([^)]+\)$/.test(trimmed) || trimmed === '---') {
      continue;
    }

    const words = countWords(trimmed);
    if (!words) {
      continue;
    }

    excerptBlocks.push(trimmed);
    wordTotal += words;

    if (wordTotal >= 300) {
      break;
    }
  }

  return excerptBlocks.join('\n\n');
};

export default async function Home() {
  const latestPost = posts[0];
  let latestExcerpt = '';

  if (latestPost?.file) {
    try {
      const relativePath = latestPost.file.replace('/content/', 'content/');
      const filePath = decodeURIComponent(path.join(process.cwd(), 'public', relativePath));
      const text = await readFile(filePath, 'utf8');
      latestExcerpt = extractExcerpt(text);
    } catch (error) {
      latestExcerpt = '';
    }
  }

  return <HomePageClient latestExcerpt={latestExcerpt} />;
}
