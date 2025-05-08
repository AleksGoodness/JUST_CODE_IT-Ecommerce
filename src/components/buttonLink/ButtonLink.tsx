// src/components/UI/ButtonLink.tsx
import Button, { ButtonProps } from '@mui/material/Button';
import { PropsWithChildren } from 'react';
import { Link, LinkProps } from 'react-router';

type ButtonLinkProps = ButtonProps &
  Omit<LinkProps, 'color' | 'style' | 'className'> & {
    to: string;
  };

const ButtonLink = ({
  to,
  children,
  ...props
}: PropsWithChildren<ButtonLinkProps>) => {
  return (
    <Button component={Link} to={to} {...props}>
      {children}
    </Button>
  );
};

export default ButtonLink;
