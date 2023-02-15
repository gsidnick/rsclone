import './ProgressBar.css';
import React from 'react';
import IProgressProps from '../../../interfaces/IProgressProps';

function ProgressBar({ value = 0 }: IProgressProps) {
  return (
    <div className="progress">
      {/*<span style={{ width: (library.length > 0 ? ((currentIndex + 1) * 100) / library.length : 0) + '%' }}></span>*/}
      <span className="progress_bar" style={{ width: `${value}%` }}></span>
    </div>
  );
}

export default ProgressBar;
