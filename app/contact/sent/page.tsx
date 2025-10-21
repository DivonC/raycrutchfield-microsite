// app/contact/sent/page.tsx
'use client';
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function SentPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Thanks — got it!</Typography>
      <Typography sx={{ mb: 3 }}>
        I’ll get back to you soon. If it’s urgent, email <a href="mailto:ray@iterloop.com">ray@iterloop.com</a>.
      </Typography>
      <Button component={Link} href="/" variant="contained">Back to home</Button>
    </Container>
  );
}
