import type { ReactNode } from 'react';
import Header from '@/components/Header';


export const metadata = {
  title: 'Ray Crutchfield — Lead Software Developer / Solutions Architect',
  description:
    'AWS Serverless • Data Platforms • LLM Automation — Open to FTE or Contract. US Remote.',
  openGraph: {
    title: 'Ray Crutchfield — Lead Software Developer / Solutions Architect',
    description:
      '2M/mo scale • 40% AWS cost ↓ • +112% appointments. Case studies, resume, contact.',
    url: 'https://raycrutchfield.com/',
    siteName: 'Ray Crutchfield',
    images: [{ url: '/og/ray-og.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

/* eslint-disable react/prop-types */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body>
    {/* <Providers> */}
      <Header />

      {children}
    {/* </Providers> */}
    </body>
    </html>);
}
