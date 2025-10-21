'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';
import { capture } from '@/lib/track';

type Props = ButtonProps & {
  href?: string;
  target?: string;
  event: string;
  eventProps?: Record<string, any>;
  asLink?: boolean; // internal link via Next <Link>
};

export default function TrackedButton({
  event,
  eventProps,
  asLink = false,
  href,
  target,
  children,
  ...btnProps
}: Props) {
  const onClick = React.useCallback(() => {
    capture(event, eventProps);
  }, [event, eventProps]);

  if (asLink && href) {
    return (
      <Button component={Link} href={href} onClick={onClick} {...btnProps}>
        {children}
      </Button>
    );
  }

  return (
    <Button component="a" href={href} target={target} onClick={onClick} {...btnProps}>
      {children}
    </Button>
  );
}
