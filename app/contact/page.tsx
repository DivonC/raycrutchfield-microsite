// app/contact/page.tsx
'use client';

import Link from 'next/link';
import {
  Box, Container, Stack, Typography, Button, TextField, Grid, Divider, Chip
} from '@mui/material';

export default function ContactPage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Let’s talk
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ mb: 3 }}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          component={Link}
          href="https://calendly.com/raycrutchfield/15min"
          prefetch={false}
          variant="contained"
          size="large"
        >
          Book Intro Call
        </Button>
        <Button
          component={Link}
          href="mailto:ray@iterloop.com?subject=Intro%20Call%20re:%20AWS%20Serverless%20%2F%20Data%20Platforms&body=Hi%20Ray,%0A%0AWe%E2%80%99re%20interested%20in%20[Discovery%20|%20Co-Build%20|%20Build%20%26%20Scale].%0ATimeline:%20%0ABudget:%20%0AContext:%20%0A%0AThanks,"
          prefetch={false}
          variant="outlined"
          size="large"
        >
          Email Ray
        </Button>
      </Stack>

      <Box sx={{ width: '100%', maxWidth: 700, my: 2 }}>
        <Divider textAlign="center">
          <Chip label="Send a message" size="small" />
        </Divider>
      </Box>

      <Grid container justifyContent="center" id="message" sx={{ width: '100%' }}>
        <Grid item xs={12} sm={10} md={8}>
          <Box component="form" action="/api/contact" method="POST" noValidate>
            <Stack spacing={2} alignItems="center">
              <TextField name="name" label="Name" autoComplete="name" required fullWidth />
              <TextField type="email" name="email" label="Work email" autoComplete="email" required fullWidth />
              <TextField name="company" label="Company (optional)" autoComplete="organization" fullWidth />
              <TextField
                name="purpose"
                label="Purpose (Discovery, Co-Build Retainer, Build & Scale, FTE)"
                placeholder="Discovery"
                fullWidth
              />
              <TextField
                name="budget"
                label="Rough budget (<$10k, $10–30k, $30–75k, $75k+)"
                placeholder="$10–30k"
                fullWidth
              />
              <TextField name="message" label="What are you trying to do?" multiline rows={4} fullWidth />

              {/* Honeypot for spam bots */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} aria-hidden="true" />

              <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
                Send
              </Button>
              <Typography variant="caption" color="text.secondary">
                LLC • Insurance • MSA/SOW/DPA • Security questionnaires • NDA available
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
