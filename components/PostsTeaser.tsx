import { getAllPosts } from '@/lib/content';
import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default async function PostsTeaser() {
  const posts = (await getAllPosts()).slice(0, 3);
  if (!posts.length) return null;

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Latest Posts</Typography>
        <Typography component={Link as any} href="/posts" color="primary">View all</Typography>
      </Stack>

      <Stack spacing={2}>
        {posts.map(({ frontmatter }) => (
          <Card key={frontmatter.slug} variant="outlined">
            <CardActionArea component={Link as any} href={`/posts/${frontmatter.slug}`}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>{frontmatter.title}</Typography>
                {frontmatter.description && (
                  <Typography variant="body2" color="text.secondary">{frontmatter.description}</Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
