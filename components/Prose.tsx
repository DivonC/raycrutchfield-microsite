// components/Prose.tsx
import * as React from 'react';
import { Container, Box } from '@mui/material';

export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="md" sx={{ pt: { xs: 4, sm: 6 }, pb: { xs: 8, sm: 10 } }}>
      <Box
        sx={{
            fontFamily: [
                '"Roboto"',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
              ].join(','),
          // Vertical rhythm
          '& h1, & h2, & h3': { fontWeight: 700, mt: 3, mb: 2 },
          '& h4, & h5, & h6': { fontWeight: 700, mt: 3, mb: 1.5 },
          '& p, & ul, & ol, & blockquote, & pre': { mb: 2 },
          '& ul, & ol': { pl: 3 },
          '& li > ul, & li > ol': { mt: 1, mb: 1 },
          '& hr': { my: 4, border: 0, height: 1, bgcolor: 'divider' },

          // Links & images
          '& a': { textDecoration: 'none' },
          '& img, & .next-image': { maxWidth: '100%', height: 'auto', display: 'block' },

          // Code block breathing room (if you add syntax highlighting later)
          '& pre': {
            p: 2,
            borderRadius: 2,
            bgcolor: 'grey.100',
            overflowX: 'auto',
          },

          // Callout boxes (if needed later)
          '& .callout': {
            p: 2,
            borderRadius: 2,
            bgcolor: 'grey.50',
            border: '1px solid',
            borderColor: 'divider',
            my: 2,
          },
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
