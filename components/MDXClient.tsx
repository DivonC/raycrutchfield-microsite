// components/MDXClient.tsx
'use client';

import { MDXProvider } from '@mdx-js/react';
import { Typography, Link as MLink } from '@mui/material';
import NextLink from 'next/link';

const components = {
  h1: (p: any) => <Typography variant="h3" gutterBottom {...p} />,
  h2: (p: any) => <Typography variant="h5" gutterBottom {...p} />,
  h3: (p: any) => <Typography variant="h6" gutterBottom {...p} />,
  p:  (p: any) => <Typography variant="body1" sx={{ mb: 2 }} {...p} />,
  a:  (props: any) => {
    const { href, ...rest } = props;
    return href?.startsWith('http')
      ? <MLink href={href} target="_blank" rel="noopener" {...rest} />
      : <MLink component={NextLink} href={href} {...rest} />;
  },
  li: (p: any) => <Typography component="li" variant="body1" sx={{ mb: 0.5 }} {...p} />,
};

export default function MDXClient({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
