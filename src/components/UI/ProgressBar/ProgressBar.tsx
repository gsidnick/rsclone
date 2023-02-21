import './ProgressBar.css';
import React from 'react';
import IProgressProps from '../../../interfaces/IProgressProps';

function ProgressBar({ value = 0 }: IProgressProps) {
  return (
    <div className="progress">
      <span className="progress__bar" style={{ width: `${value}%` }}></span>
    </div>
  );
}

export default ProgressBar;
