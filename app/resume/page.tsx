'use client';

import {
  Box, Container, Stack, Typography, Divider, Chip, Button, Link as MUILink,
  Grid, Paper
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import Link from 'next/link';
import Head from 'next/head';

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Ray Crutchfield — Resume</title>
        <meta name="description" content="Principal/Hands-on Solutions Architect resume: AWS Serverless, Data Platforms, LLM Automation." />
        {/* JSON-LD for richer snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ray Crutchfield',
              url: 'https://raycrutchfield.com',
              jobTitle: 'Solutions Architect',
              email: 'ray@iterloop.com',
              telephone: '+1-615-669-8371',
              sameAs: [
                'https://www.linkedin.com/in/d-ray-crutchfield-cpa-925b77ab/'
              ]
            })
          }}
        />
      </Head>

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        {/* Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h3" component="h1">Ray Crutchfield</Typography>
          <Stack direction="row" spacing={1} sx={{ '@media print': { display: 'none' } }}>
            <Button
              component={Link}
              href="/resume/Ray-Crutchfield-Resume.pdf"
              prefetch={false}
              variant="contained"
              startIcon={<DownloadIcon />}
            >
              Download PDF
            </Button>
            <Button
              component={Link}
              href="/resume/Ray-Crutchfield-Resume.docx"
              prefetch={false}
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              DOCX
            </Button>
            <Button variant="text" startIcon={<PrintIcon />} onClick={() => window.print()}>
              Print
            </Button>
          </Stack>
        </Stack>

        {/* Subheadline */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Solutions Architect (Hands-on) — AWS Serverless, Data Platforms, LLM Automation
        </Typography>

        {/* Contact */}
        <Typography sx={{ mb: 3 }}>
          Memphis, TN • <MUILink href="tel:+16156698371">615-669-8371</MUILink> • <MUILink href="mailto:ray@iterloop.com">ray@iterloop.com</MUILink> •{' '}
          <MUILink href="https://www.linkedin.com/in/d-ray-crutchfield-cpa-925b77ab/" target="_blank" rel="noopener">linkedin.com/in/d-ray-crutchfield-cpa-925b77ab/</MUILink>
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* SUMMARY */}
        <Section title="SUMMARY">
          <Typography>
            Software developer and solutions architect specializing in AWS serverless/microservices, data platforms, and ML/LLM-enabled automation.
            Led end-to-end delivery of scalable systems, cost-optimized architectures, and data products that drove multi-million-dollar client impact.
          </Typography>
        </Section>

        {/* SKILLS */}
        <Section title="SKILLS">
          <Stack spacing={1}>
            <Typography><strong>Cloud:</strong> AWS (Lambda, API Gateway, Step Functions, ECS, S3, RDS/Aurora, DynamoDB, CloudWatch, CloudFormation)</Typography>
            <Typography><strong>Backend:</strong> Node.js/TypeScript, Python (FastAPI), REST/GraphQL, Event-driven, Microservices</Typography>
            <Typography><strong>Data/ML:</strong> ETL/ELT, Postgres, DynamoDB, PyTorch, scikit-learn, Feature pipelines, BI (QuickSight)</Typography>
            <Typography><strong>DevOps:</strong> Docker, CI/CD (GitHub Actions), IaC, Observability (Sentry, CloudWatch), Security (IAM, VPC)</Typography>
            <Typography><strong>AI/LLM:</strong> OpenAI/ChatGPT integration, prompt/guardrails, text-to-JSON extraction, data validation</Typography>
          </Stack>
        </Section>

        {/* EXPERIENCE */}
        <Section title="EXPERIENCE">
          <Job
            company="IterLoop"
            role="Principal Solutions Architect (Owner)"
            dates="Nov 2018–Present"
          >
            <Bullet>Built a scalable outreach platform and automation layer expanding from ~100k → 2M prospects/month; increased sales appointments by 112%.</Bullet>
            <Bullet>Integrated LLM services (OpenAI/ChatGPT) to personalize outreach, validate/cleanse data, and convert unstructured text to structured records, reducing manual QA and accelerating lead flow.</Bullet>
            <Bullet>Reduced cloud spend by 40% through architectural redesign and right-sizing across AWS services.</Bullet>
            <Bullet>Developed ML models (PyTorch, scikit-learn) to identify decision-makers to support marketing efforts; implemented nightly retraining and feedback loop for continuous lift.</Bullet>
            <Bullet>Designed database and ETL to support large-scale operations and real-time BI with AWS QuickSight.</Bullet>
            <Bullet>Redesigned and automated a data collection process, increasing data volume by 18x by scaling from 3 manual workers to the equivalent of 54 through cloud-based automation.</Bullet>
            <Bullet>Designed and managed end-to-end cloud infrastructure on AWS and Azure, including infrastructure as code, cost optimization, and system monitoring, ensuring high availability and performance for mission-critical systems.</Bullet>
          </Job>

          <Job
            company="Tennessee Comptroller of the Treasury"
            role="Audit Lead (Legislative Auditor 4)"
            dates="Jan 2011–Nov 2018"
          >
            <Bullet>Led audit teams across financial/compliance audits; built Python/SQL/VB/ACL automations to streamline procedures and reporting.</Bullet>
            <Bullet>Developed KPIs and automated tooling to monitor auditor productivity and efficiency.</Bullet>
            <Bullet>Chaired the data analysis committee; documented best practices and led training; contributed to detection of adverse opinions and material noncompliance.</Bullet>
          </Job>
        </Section>

        {/* EDUCATION */}
        <Section title="EDUCATION">
          <Typography>Middle Tennessee State University — B.B.A., Accounting | Dec 2010</Typography>
        </Section>

        {/* Light footer note for recruiters */}
        <Box sx={{ mt: 4, color: 'text.secondary', fontSize: 13, '@media print': { display: 'none' } }}>
          Last updated: Oct 2025 
        </Box>
      </Container>

      {/* Print styles */}
      <style>{`
        @media print {
          a[href]:after { content: "" !important; }
          button, .MuiButton-root { display: none !important; }
          header, footer, nav { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ---------- Helpers ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ letterSpacing: 0.5 }}>{title}</Typography>
      <Divider sx={{ my: 1 }} />
      <Box>{children}</Box>
    </Box>
  );
}

function Job({ company, role, dates, children }: { company: string; role: string; dates: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {company} — {role} | {dates}
      </Typography>
      <Box component="ul" sx={{ pl: 3, mt: 1, mb: 0 }}>
        {children}
      </Box>
    </Box>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <Box component="li" sx={{ mb: 0.5 }}>
      <Typography component="span">{children}</Typography>
    </Box>
  );
}
