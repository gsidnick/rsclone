import React from 'react';

export interface IInputProps {
  name: string;
  type: string;
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
