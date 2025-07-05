"use client";
import Link from "next/link";
import { useState } from "react";

type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
};

function getAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    (post.tags || []).forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

export default function BlogHome({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const allTags = getAllTags(posts);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesTag =
      selectedTag === "" || (post.tags || []).includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <section style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "0.01em" }}>
          Investment Knowledge Blog
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#555", margin: 0 }}>
          Grow your wealth from zero. Insights, tips, and strategies for every investor.
        </p>
      </section>
      <section style={{ marginBottom: "2rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            width: "100%",
            maxWidth: 400,
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            fontSize: "1rem",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        />
      </section>
      <section style={{ marginBottom: "2rem", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setSelectedTag("")}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              background: selectedTag === "" ? "#0070f3" : "#fff",
              color: selectedTag === "" ? "#fff" : "#0070f3",
              fontWeight: 500,
              cursor: "pointer",
              outline: "none",
              fontSize: "1rem",
            }}
          >
            All
          </button>
          {allTags.map((tag: string) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                background: selectedTag === tag ? "#0070f3" : "#fff",
                color: selectedTag === tag ? "#fff" : "#0070f3",
                fontWeight: 500,
                cursor: "pointer",
                outline: "none",
                fontSize: "1rem",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem", color: "#222" }}>
          Latest Articles
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
          {filteredPosts.length === 0 ? (
            <div style={{ color: "#888", fontSize: "1.1rem" }}>No articles found.</div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.slug}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                <Link
                  href={`/${post.slug}`}
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#0070f3",
                    textDecoration: "none",
                  }}
                >
                  {post.title}
                </Link>
                <div
                  style={{
                    color: "#888",
                    fontSize: "0.95rem",
                    margin: "0.5rem 0 1rem 0",
                  }}
                >
                  {post.date}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  {(post.tags || []).map((tag: string) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-block",
                        background: "#f0f4fa",
                        color: "#0070f3",
                        borderRadius: 12,
                        padding: "0.2rem 0.75rem",
                        fontSize: "0.95rem",
                        marginRight: 6,
                        marginBottom: 2,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ color: "#444", fontSize: "1rem" }}>{post.excerpt}</div>
              </div>
            ))
          )}
        </div>
      </section>
      <section
        style={{
          marginTop: "3rem",
          padding: "2rem 0",
          borderTop: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 600,
            marginBottom: "1rem",
            color: "#222",
          }}
        >
          Subscribe to Our Newsletter
        </h2>
        <p style={{ color: "#555", marginBottom: "1.5rem" }}>
          Get the latest investment tips and articles delivered to your inbox.
        </p>
        {submitted ? (
          <div style={{ color: "#0070f3", fontWeight: 500, fontSize: "1.1rem" }}>
            Thank you for subscribing!
          </div>
        ) : (
          <form
            onSubmit={handleNewsletterSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                fontSize: "1rem",
                minWidth: 260,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.75rem 2rem",
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
} 