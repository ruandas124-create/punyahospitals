import React from 'react';

interface PunyaLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white-text';
  size?: 'sm' | 'md' | 'lg';
}

export const PunyaLogo: React.FC<PunyaLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  // Height and scale adjustments with mobile-friendly responsiveness
  const sizeClasses = {
    sm: 'h-8 sm:h-9 md:h-10',
    md: 'h-10 sm:h-12 md:h-14',
    lg: 'h-12 sm:h-16 md:h-20',
  }[size];

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`} id="punya-hospital-logo">
      {/* Botanical / Floral Crest Emblem */}
      <svg
        className={`${sizeClasses} w-auto flex-shrink-0`}
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="PUNYA Hospital Emblem"
      >
        {/* Outer Green Leaf Petals */}
        {/* Top-Right green leaf */}
        <path
          d="M 52 14 C 42 10 28 20 34 36 C 39 42 50 36 53 28 C 55 22 56 16 52 14 Z"
          fill="#579B35"
        />
        {/* Top-Left green leaf */}
        <path
          d="M 28 22 C 16 18 10 32 18 45 C 24 51 34 46 36 38 C 38 30 34 24 28 22 Z"
          fill="#579B35"
        />
        {/* Mid-Left green leaf */}
        <path
          d="M 15 48 C 6 48 5 66 18 74 C 27 77 34 70 33 60 C 32 52 24 48 15 48 Z"
          fill="#579B35"
        />
        {/* Bottom-Left green leaf */}
        <path
          d="M 22 74 C 15 82 24 96 38 92 C 47 88 47 78 40 73 C 34 68 27 68 22 74 Z"
          fill="#579B35"
        />
        {/* Bottom-Right small leaf accent */}
        <path
          d="M 52 74 C 48 84 58 95 72 90 C 80 86 78 75 70 72 C 63 69 55 68 52 74 Z"
          fill="#579B35"
        />

        {/* Central Bold Purple Drop Petal */}
        <path
          d="M 44 32 C 34 36 36 60 52 70 C 66 78 78 68 76 52 C 74 38 56 28 44 32 Z"
          fill="#7B4FA3"
        />

        {/* Purple curved upper accent swoosh */}
        <path
          d="M 38 25 C 48 20 62 26 66 32 C 64 34 56 29 48 30 C 42 31 39 28 38 25 Z"
          fill="#7B4FA3"
        />

        {/* Purple bottom swirl stroke */}
        <path
          d="M 18 78 C 14 86 20 96 32 98 C 34 98 32 95 24 93 C 18 90 17 84 18 78 Z"
          fill="#7B4FA3"
        />

        {/* Delicate green accent swoosh */}
        <path
          d="M 64 24 C 74 30 78 42 74 50 C 72 48 74 40 68 34 C 64 29 62 26 64 24 Z"
          fill="#579B35"
        />
      </svg>

      {/* Typography: PUNYA Hospital + Health care par Excellence */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1">
          <span
            className="font-extrabold tracking-tight text-lg sm:text-2xl md:text-[28px] uppercase"
            style={{ color: '#7B4FA3', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            PUNYA
          </span>
          <span
            className="font-bold tracking-tight text-lg sm:text-2xl md:text-[28px]"
            style={{ color: '#579B35', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Hospital
          </span>
        </div>

        {variant !== 'compact' && (
          <span
            className="italic text-[10px] sm:text-xs md:text-[14px] -mt-0.5 tracking-wide font-medium whitespace-nowrap"
            style={{
              color: '#7B4FA3',
              fontFamily: "'Playfair Display', 'Caveat', Georgia, serif",
            }}
          >
            Health care par Excellence
          </span>
        )}
      </div>
    </div>
  );
};
