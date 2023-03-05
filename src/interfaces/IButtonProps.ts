import React from 'react';

export interface IButtonProps {
  children?: React.ReactElement | string;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  to?: string;
  disabled?: boolean | undefined;
}
