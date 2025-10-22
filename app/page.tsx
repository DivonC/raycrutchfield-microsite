import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import TrackedButton from '@/components/TrackedButton';

export default function Home() {
  return (
     <Container
       maxWidth="md"
       sx={{
         pt: { xs: 6, sm: 8 },   // ↑ was 4/6
         pb: { xs: 10, sm: 12 }  // ↑ was 8/10
       }}
     >

    <Stack spacing={5} alignItems="center" textAlign="center"> {/* ↑ was 4 */}
      {/* <Typography variant="h6" color="text.secondary">
        Ray Crutchfield
      </Typography> */}

      <Typography variant="overline" color="text.secondary" sx={{ mb: 0.5 }}>
        US Remote • Immediate Start
      </Typography>

      <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
        Lead Software Developer / Solutions Architect
      </Typography>

      <Typography color="text.secondary" maxWidth={720} sx={{ mb: 1 }}>
        AWS Serverless • Data Platforms • LLM Automation. I design and build event-driven systems with measurable outcomes.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 1 }}> {/* ↑ spacing, added mt */}
        {/* <Button ...>View Case Study</Button> */}
        <TrackedButton
          variant="contained"
          size="large"
          component={Link}
          href="/case-studies/2m-scale-40-cost-cut"
          event="cs_page_from_home"
        >
          View Case Study
        </TrackedButton>

        {/* <Button ...>Book 15-min Call</Button> */}
        <TrackedButton
          variant="outlined"
          size="large"
          href="https://calendly.com/raycrutchfield/15min"
          target="_blank"
          event="book_call_click"
          eventProps={{ source: 'home' }}
        >
          Book 15-min Call
        </TrackedButton>
      </Stack>

      <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 2, sm: 4 }}            /* less spacing on mobile, more on desktop */
  useFlexGap
  flexWrap="wrap"
  sx={{
    mt: { xs: 1, sm: 1.5 },
    rowGap: { xs: 0.8, sm: 1 },
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Metric label="2M/mo scale" />
  <Metric label="40% AWS cost ↓" />
  <Metric label="+112% appts" />
</Stack>

      <Box sx={{ mt: 1.5 }}> {/* added mt */}
        {/* <Button ...>Download 1-Pager (PDF)</Button> */}
        <TrackedButton
          size="medium"
          href="/assets/case-studies/ray-2m-40pct.pdf"
          target="_blank"
          event="cs_pdf_download"
          eventProps={{ page: 'home' }}
        >
          Download 2-Pager (PDF)
        </TrackedButton>
      </Box>

      {/* <Typography variant="body2" color="text.secondary">
        Need a team? Visit my studio → <Link href="https://iterloop.com" target="_blank">iterloop.com</Link>
      </Typography> */}
    </Stack>
    {/* <PostsTeaser /> */}
  </Container>
  );
}

function Metric({ label }: { label: string }) {
  return (
    <Box sx={{ px: 2, py: 1.25, bgcolor: 'grey.100', borderRadius: 2 }}> {/* ↑ py */}
      <Typography fontWeight={600}>{label}</Typography>
    </Box>
  );
}
