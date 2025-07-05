import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <article style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", maxWidth: 800, margin: "2rem auto", padding: "2.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{data.title}</h1>
      <div style={{ color: "#888", fontSize: "1rem", marginBottom: "2rem" }}>{data.date}</div>
      <div style={{ color: "#333", fontSize: "1.15rem", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}