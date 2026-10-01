import React, { useState } from 'react';

interface PunyaLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white-text';
  size?: 'sm' | 'md' | 'lg';
}

export const PunyaLogo: React.FC<PunyaLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);

  // Responsive height classes for the logo
  const heightClasses = {
    sm: 'h-8 sm:h-9 md:h-10',
    md: 'h-10 sm:h-12 md:h-14',
    lg: 'h-12 sm:h-16 md:h-20',
  }[size];

  if (imageError) {
    return (
      <div className={`flex items-center gap-2 select-none ${className}`} id="punya-hospital-logo">
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-1">
            <span
              className="font-extrabold tracking-tight text-lg sm:text-2xl uppercase"
              style={{ color: '#7B4FA3', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              PUNYA
            </span>
            <span
              className="font-bold tracking-tight text-lg sm:text-2xl"
              style={{ color: '#579B35', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Hospital
            </span>
          </div>
          <span
            className="italic text-[10px] sm:text-xs tracking-wide font-medium"
            style={{ color: '#7B4FA3' }}
          >
            Health care par Excellence
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center select-none ${className}`} id="punya-hospital-logo">
      <img
        src="/logo.png"
        alt="PUNYA Hospital - Health care par Excellence"
        className={`${heightClasses} w-auto object-contain transition-all`}
        onError={() => setImageError(true)}
      />
    </div>
  );
};
