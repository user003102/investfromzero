import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { useState } from 'react';

const postsDirectory = path.join(process.cwd(), 'posts');

function getPosts(): Array<{ slug: string; title: string; date: string; tags: string[]; excerpt: string }> {
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

function getAllTags(posts: any[]) {
  const tags = new Set<string>();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => tags.add(tag));
    }
  });
  return Array.from(tags);
}

export default function Home() {
  const posts = getPosts();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const allTags = getAllTags(posts);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === '' || (post.tags || []).includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <section style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.01em' }}>Investment Knowledge Blog</h1>
        <p style={{ fontSize: '1.25rem', color: '#555', margin: 0 }}>Grow your wealth from zero. Insights, tips, and strategies for every investor.</p>
      </section>
      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#222' }}>Latest Articles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {filteredPosts.map((post) => (
            <div key={post.slug} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <Link href={`/${post.slug}`} style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0070f3', textDecoration: 'none' }}>{post.title}</Link>
              <div style={{ color: '#888', fontSize: '0.95rem', margin: '0.5rem 0 1rem 0' }}>{post.date}</div>
              <div style={{ color: '#444', fontSize: '1rem' }}>{post.excerpt}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', color: '#222' }}>Subscribe to Our Newsletter</h2>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>Get the latest investment tips and articles delivered to your inbox.</p>
        {submitted ? (
          <div style={{ color: '#0070f3', fontWeight: 500, fontSize: '1.1rem' }}>Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: '1rem', minWidth: 260 }}
            />
            <button
              type="submit"
              style={{ padding: '0.75rem 2rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
