import React from 'react';

export interface IButtonProps {
  children?: React.ReactElement | string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  to?: string;
}
