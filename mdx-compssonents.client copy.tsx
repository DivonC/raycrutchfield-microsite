'use client';
import { Typography, Link as MLink } from '@mui/material';
import NextLink from 'next/link';

export function useMDXComponents(components: any) {
  return {
    h1: (p: any) => <Typography variant="h3" gutterBottom {...p} />,
    h2: (p: any) => <Typography variant="h5" gutterBottom {...p} />,
    p:  (p: any) => <Typography variant="body1" sx={{ mb: 2 }} {...p} />,
    a:  (props: any) => {
      const { href, ...rest } = props;
      const ext = href?.startsWith('http');
      return ext ? <MLink href={href} target="_blank" rel="noopener" {...rest} />
                 : <MLink component={NextLink} href={href} {...rest} />;
    },
    ...components
  };
}


