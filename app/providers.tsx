'use client';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { initPosthog } from '@/lib/track';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1f4adb' },
    secondary: { main: '#111827' }
  },
  shape: { borderRadius: 14 }
});

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPosthog(); // safe no-op if already initialized
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
