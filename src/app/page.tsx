import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogHome from '../components/BlogHome';

const postsDirectory = path.join(process.cwd(), 'posts');

function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title || fileName,
      date: data.date || '',
      tags: data.tags || [],
      excerpt: content.slice(0, 120) + (content.length > 120 ? '...' : ''),
    };
  });
}

export default function Home() {
  const posts = getPosts();
  return <BlogHome posts={posts} />;
}
