import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const postsDirectory = path.join(process.cwd(), 'posts');

function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: fileName.replace(/\\.md$/, ''),
      title: data.title || fileName,
      date: data.date || '',
    };
  });
}

export default function Home() {
  const posts = getPosts();
  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1>Investment Knowledge Blog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '1.5rem' }}>
            <Link href={`/${post.slug}`} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {post.title}
            </Link>
            <div style={{ color: '#888', fontSize: '0.9rem' }}>{post.date}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
