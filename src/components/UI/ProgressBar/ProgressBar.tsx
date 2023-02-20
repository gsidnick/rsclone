import './ProgressBar.css';
import React, { useEffect } from 'react';
import IProgressProps from '../../../interfaces/IProgressProps';

function ProgressBar({ value = 0 }: IProgressProps) {

  useEffect(() => {

    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress__bar');

    if(localStorage.getItem('theme') === 'dark') {
        progress?.classList.remove('light');
        progress?.classList.add('dark');

        progressBar?.classList.remove('light');
        progressBar?.classList.add('dark');
      } else {
        progress?.classList.remove('dark');
        progress?.classList.add('light');

        progressBar?.classList.remove('dark');
        progressBar?.classList.add('light');
      }
  }, []);

  return (
    <div className="progress">
      <span className="progress__bar" style={{ width: `${value}%` }}></span>
    </div>
  );
}

export default ProgressBar;
