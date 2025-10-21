import 'server-only';
import fs from 'fs/promises';     // <-- no "node:" scheme



import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export type PostFM = {
  title: string;
  slug: string;
  description?: string;
  date: string;         // ISO
  updated?: string;     // ISO
  tags?: string[];
  ogImage?: string;
};

export type Post = { frontmatter: PostFM; content: string; filePath: string; html?: React.ReactNode };

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

export async function getAllPosts(): Promise<Post[]> {
  const entries = await fs.readdir(POSTS_DIR);
  const files = entries.filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  const posts: Post[] = [];
  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { content, data } = matter(raw);
    const fm = data as PostFM;
    if (!fm?.title || !fm?.slug || !fm?.date) continue;
    posts.push({ frontmatter: fm, content, filePath });
  }
  posts.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
  return posts;
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  const post = posts.find(p => p.frontmatter.slug === slug);
  if (!post) return null;

  const { content } = post;
  const { content: compiled, frontmatter } = await compileMDX<PostFM>({
    source: `---\n${matter.stringify('', post.frontmatter)}\n---\n${content}`,
    options: {
      parseFrontmatter: true,
      mdxOptions: { rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' } as any]] }
    }
  });

  return { ...post, frontmatter, html: compiled };
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length, pages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page, pages, total };
}
