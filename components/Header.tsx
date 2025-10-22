'use client';

import * as React from 'react';
import {
  AppBar, Box, Button, Container, Divider, Drawer, IconButton,
  List, ListItemButton, ListItemText, Toolbar, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { capture } from '@/lib/track';
import TrackedButton from './TrackedButton';

type NavLink = { label: string; href: string; external?: boolean; cta?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Case Study', href: '/case-studies/2m-scale-40-cost-cut' },
  //{ label: 'How I Work', href: '/how-i-work' },
  //{ label: 'Posts', href: '/posts' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

const CTA_LINK: NavLink = {
  label: 'Book 15-min',
  href: 'https://calendly.com/raycrutchfield/15min', 
  external: true,
  cta: true,
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  const handleNavClick = (href: string, label: string, external?: boolean) => {
    capture('nav_click', { href, label, location: 'header' });
    if (!external) setOpen(false);
  };

  return (
    <>
      {/* Sticky keeps height in flow (no spacer needed) */}
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
      >
        <Container maxWidth="lg">
          {/* Grid layout: brand left, centered nav, CTA right (desktop).
              On mobile: menu + brand row, CTA hides (in drawer). */}
          <Toolbar
            disableGutters
            sx={{
              display: 'grid',
              alignItems: 'center',
              gridTemplateColumns: { xs: 'auto 1fr auto', md: '1fr auto 1fr' },
              columnGap: 2,
              minHeight: { xs: 64, sm: 72 },
            }}
          >
            {/* Mobile menu button (left) */}
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Brand (left on desktop, centered on mobile by grid) */}
            <Typography
              component={Link}
              href="/"
              onClick={() => handleNavClick('/', 'Brand')}
              variant="h6"
              color="inherit"
              sx={{
                textDecoration: 'none',
                fontWeight: 800,
                letterSpacing: 0.2,
                justifySelf: { xs: 'center', md: 'start' },
              }}
            >
              Ray Crutchfield
            </Typography>

            {/* Centered desktop nav */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifySelf: 'center',
                gap: 1,
              }}
            >
              {NAV_LINKS.map((item) => (
  <TrackedButton
    key={item.href}
    asLink={true}
    href={item.href}
    event="headernav_button_click"
    eventProps={{ href: item.href, label: item.label }}
    color={isActive(item.href) ? 'primary' : 'inherit'}
    variant={isActive(item.href) ? 'outlined' : 'text'}
    sx={{ textTransform: 'none', fontWeight: 600 }}
  >
    {item.label}
  </TrackedButton>
))}
            </Box>

            {/* Desktop CTA (right) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifySelf: 'end' }}>
              <Button
                component={Link}
                href={CTA_LINK.href}
                target="_blank"
                rel="noopener"
                variant="contained"
                onClick={() => handleNavClick(CTA_LINK.href, CTA_LINK.label, true)}
                sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
              >
                {CTA_LINK.label}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
  anchor="left"
  open={open}
  onClose={() => setOpen(false)}
  PaperProps={{ sx: { width: 300 } }}
>
  <Box sx={{ p: 2 }}>
    <Typography variant="h6" fontWeight={800}>
      Ray Crutchfield
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Lead Software Developer / Solutions Architect
    </Typography>
  </Box>
  <Divider />
  <List sx={{ py: 0 }}>
    {NAV_LINKS.map((item) => (
      <TrackedButton
        key={item.href}
        asLink={true}
        href={item.href}
        event="sidenav_button_click"
        eventProps={{ href: item.href, label: item.label }}
        component={ListItemButton}
        //@ts-ignore
        selected={isActive(item.href)}
        sx={{
          width: '100%',           // full width of drawer
          justifyContent: 'flex-start',
          textAlign: 'left',
          py: 1.5,                 // vertical padding
          px: 2,                   // horizontal padding
        }}
      >
        <ListItemText primary={item.label} />
      </TrackedButton>
    ))}
  </List>
  <Box sx={{ p: 2 }}>
    <Button
      fullWidth
      component={Link}
      href={CTA_LINK.href}
      target="_blank"
      rel="noopener"
      variant="contained"
      onClick={() => handleNavClick(CTA_LINK.href, CTA_LINK.label, true)}
      sx={{
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: 2,
        mt: 1,                   // space from above list
      }}
    >
      {CTA_LINK.label}
    </Button>
  </Box>
</Drawer>

    </>
  );
}
