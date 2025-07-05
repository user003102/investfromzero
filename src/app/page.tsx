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
    const { data, content } = matter(fileContents);
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title || fileName,
      date: data.date || '',
      excerpt: content.slice(0, 120) + (content.length > 120 ? '...' : ''),
    };
  });
}

export default function Home() {
  const posts = getPosts();
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <section style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.01em' }}>Investment Knowledge Blog</h1>
        <p style={{ fontSize: '1.25rem', color: '#555', margin: 0 }}>Grow your wealth from zero. Insights, tips, and strategies for every investor.</p>
      </section>
      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#222' }}>Latest Articles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {posts.map((post) => (
            <div key={post.slug} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <Link href={`/${post.slug}`} style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0070f3', textDecoration: 'none' }}>{post.title}</Link>
              <div style={{ color: '#888', fontSize: '0.95rem', margin: '0.5rem 0 1rem 0' }}>{post.date}</div>
              <div style={{ color: '#444', fontSize: '1rem' }}>{post.excerpt}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
