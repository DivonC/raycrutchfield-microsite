import { Container, Stack, Typography, Chip } from '@mui/material';
import { getAllPosts, getPostBySlug } from '@/lib/content';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.frontmatter.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return null;
  const fm = post.frontmatter;

  return (
    <Container maxWidth="md" sx={{ pt: { xs: 4, sm: 6 }, pb: { xs: 8, sm: 10 } }}>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h3">{fm.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(fm.date).toLocaleDateString()}
          {fm.updated && ` · updated ${new Date(fm.updated).toLocaleDateString()}`}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {(fm.tags || []).map(t => <Chip key={t} size="small" label={t} />)}
        </Stack>
      </Stack>

      {/* MDX compiled nodes */}
      <div>{post.html}</div>
    </Container>
  );
}
