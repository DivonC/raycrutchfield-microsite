// mdx‐components.tsx
import { Typography, Link as MUILink, Box } from '@mui/material'
import Image from 'next/image'
import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: (props) => <Typography variant="h3" component="h1" gutterBottom {...props} />,
  h2: (props) => <Typography variant="h4" component="h2" gutterBottom {...props} />,
  h3: (props) => <Typography variant="h5" component="h3" gutterBottom {...props} />,
  h4: (props) => <Typography variant="h6" component="h4" gutterBottom {...props} />,
  p: (props) => <Typography variant="body1" paragraph {...props} />,
  a: (props) => <MUILink {...props} />,                  // Use MUI Link
  img: (props) => (
    <Box sx={{ my: 2 }}>
      <Image style={{ width: '100%', height: 'auto' }} {...(props as any)} />
    </Box>
  ),
  // optionally ul, ol, li etc
  ul: (props) => <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props} />,
  li: (props) => <Box component="li" sx={{ mb: 1 }} {...props} />,
}

export function useMDXComponents(componentsArg: MDXComponents): MDXComponents {
  return {
    //...components,
    ...componentsArg,
  }
}
