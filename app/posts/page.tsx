import { Container, Stack, Typography, Card, CardActionArea, CardContent, Button } from '@mui/material';
import Link from 'next/link';
import { getAllPosts, paginate } from '@/lib/content';

const PAGE_SIZE = 10;

type Props = {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;

  };

export default async function PostsIndex({ searchParams }: Props) {
    const awaitedSearchParams = await searchParams;
    let pageItem = awaitedSearchParams?.page || '1';
  const page = Number(pageItem) || 1;
  const posts = await getAllPosts();
  const { items, pages } = paginate(posts, page, PAGE_SIZE);

  return (
    <Container maxWidth="md" sx={{ pt: { xs: 4, sm: 6 }, pb: { xs: 8, sm: 10 } }}>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h4">Posts</Typography>
        <Typography color="text.secondary">Serverless, data platforms, and LLM engineering.</Typography>
      </Stack>

      <Stack spacing={2}>
        {items.map(({ frontmatter }) => (
          <Card key={frontmatter.slug} variant="outlined">
            <CardActionArea component={Link as any} href={`/posts/${frontmatter.slug}`}>
              <CardContent>
                <Typography variant="h6">{frontmatter.title}</Typography>
                {frontmatter.description && (
                  <Typography variant="body2" color="text.secondary">{frontmatter.description}</Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {new Date(frontmatter.date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      {pages > 1 && (
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button component={Link} href={page > 1 ? `/posts?page=${page - 1}` : '#'} disabled={page <= 1}>Newer</Button>
          <Typography variant="body2" color="text.secondary">Page {page} of {pages}</Typography>
          <Button component={Link} href={page < pages ? `/posts?page=${page + 1}` : '#'} disabled={page >= pages}>Older</Button>
        </Stack>
      )}
    </Container>
  );
}
