import React from 'react';

interface Button01Props {
  className?: string;
}

export const Button01: React.FC<Button01Props> = ({ className = '' }) => {
  return (
    <a
      href="#join"
      className={`h-[58px] px-[24px] bg-[#005de0] hover:bg-[#004bb8] text-[#fffef8] font-['DM_Sans'] text-[16px] font-normal leading-[0.86] tracking-[-0.01em] inline-flex items-center justify-center transition-colors focus:outline-none cursor-pointer select-none ${className}`}
    >
      Join Now
    </a>
  );
};

