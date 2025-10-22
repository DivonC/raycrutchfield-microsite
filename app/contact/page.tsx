// app/contact/page.tsx
'use client';

import Link from 'next/link';
import { Grid, Box, Stack, TextField, Button, Typography, CircularProgress, Container, Divider, Chip } from '@mui/material';
import { Formik, Form } from 'formik';
import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { capture } from '@/lib/track';
import { useRouter } from 'next/navigation';

const contactSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.email({ message: 'Invalid email address' }),
    company: z.string().optional(),
    purpose: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(1, { message: 'Message is required' }),
    _gotcha: z.string().max(0, { message: 'Spam field must be empty' }).optional(),
  });
  
  type ContactFormValues = z.infer<typeof contactSchema>;
  
  const initialValues: ContactFormValues = {
    name: '',
    email: '',
    company: '',
    purpose: '',
    budget: '',
    message: '',
    _gotcha: '',
  };
  
  const ContactForm: React.FC = () => {
    const router = useRouter();
    const handleSubmit = async (
      values: ContactFormValues,
      { setSubmitting, resetForm }
    ) => {
      try {
        // Optionally: capture event here with your posthog capture
        // await capture('contact_form_submitted', { …values });
  
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error('Submission failed');
        }
        //resetForm();
        router.push('/contact/sent'); 
      } catch (error) {
        console.error(error);
        // handle/display error
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <Grid container justifyContent="center" id="message" sx={{ width: '100%' }}>
            {/* @ts-ignore */}
        <Grid item xs={12} sm={10} md={8}>
          <Formik<ContactFormValues>
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(contactSchema)}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form noValidate>
                <Stack spacing={2} alignItems="center">
                  <TextField
                    name="name"
                    label="Name"
                    autoComplete="name"
                    required
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
  
                  <TextField
                    type="email"
                    name="email"
                    label="Work email"
                    autoComplete="email"
                    required
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
  
                  <TextField
                    name="company"
                    label="Company"
                    autoComplete="organization"
                    fullWidth
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                  />
  
                  <TextField
                    name="purpose"
                    label="Purpose"
                    placeholder="Discovery"
                    fullWidth
                    value={values.purpose}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.purpose && errors.purpose)}
                    helperText={touched.purpose && errors.purpose}
                  />
  
                  <TextField
                    name="budget"
                    label="Rough budget"
                    placeholder="$10–30k"
                    fullWidth
                    value={values.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.budget && errors.budget)}
                    helperText={touched.budget && errors.budget}
                  />
  
                  <TextField
                    name="message"
                    label="What are you trying to do?"
                    multiline
                    rows={4}
                    fullWidth
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.message && errors.message)}
                    helperText={touched.message && errors.message}
                  />
  
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                    value={values._gotcha}
                    onChange={handleChange}
                  />
  
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: 'center' }}
                    disabled={isSubmitting}
                    startIcon={isSubmitting && <CircularProgress size={20} />}
                  >
                    Send
                  </Button>
  
                  <Typography variant="caption" color="text.secondary">
                    LLC • Insurance • MSA/SOW/DPA • Security questionnaires • NDA available
                  </Typography>
                </Stack>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    );
  };

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
          onClick={() => {
            capture('book_intro_call_clicked', { source: 'contact_page' });
          }}
        >
          Book Intro Call
        </Button>
        <Button
          component={Link}
          href="mailto:ray@iterloop.com?subject=Intro%20Call%20re:%20AWS%20Serverless%20%2F%20Data%20Platforms&body=Hi%20Ray,%0A%0AWe%E2%80%99re%20interested%20in%20[Discovery%20|%20Co-Build%20|%20Build%20%26%20Scale].%0ATimeline:%20%0ABudget:%20%0AContext:%20%0A%0AThanks,"
          prefetch={false}
          variant="outlined"
          size="large"
          onClick={() => {
            capture('email_button_clicked', { source: 'contact_page' });
          }}
        >
          Email Ray
        </Button>
      </Stack>

      <Box sx={{ width: '100%', maxWidth: 700, my: 2 }}>
        <Divider textAlign="center">
          <Chip label="Send a message" size="small" />
        </Divider>
      </Box>

      {/* <Grid container justifyContent="center" id="message" sx={{ width: '100%' }}>
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

              <input type="text" name="_gotcha" style={{ display: 'none' }} aria-hidden="true" />

              <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }} disabled={isSubmitting}
                      startIcon={isSubmitting && <CircularProgress size={20} />}>
                Send
              </Button>
              <Typography variant="caption" color="text.secondary">
                LLC • Insurance • MSA/SOW/DPA • Security questionnaires • NDA available
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid> */}
      <ContactForm />
    </Container>
  );
}
