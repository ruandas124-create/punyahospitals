import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles,
  Quote
} from 'lucide-react';
import { ConditionId } from '../types';
import { 
  GoogleReview, 
  GOOGLE_BUSINESS_PROFILE_URL, 
  getStoredGoogleReviews 
} from '../data/googleReviewsData';

interface PatientTrustSectionProps {
  condition: ConditionId;
}

// Official 4-color Google 'G' icon component
const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const PatientTrustSection: React.FC<PatientTrustSectionProps> = ({ condition: _condition }) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Determine items per view responsively
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load reviews on mount
  useEffect(() => {
    const loaded = getStoredGoogleReviews();
    setReviews(loaded);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  // Auto-scroll carousel every 6 seconds when not paused
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Avatar initial color generator
  const getAvatarBg = (name: string) => {
    const colors = [
      'bg-[#5D367F] text-white',
      'bg-[#579B35] text-white',
      'bg-[#7B4FA3] text-white',
      'bg-blue-600 text-white',
      'bg-emerald-600 text-white',
      'bg-amber-600 text-white',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <section id="testimonials-section" className="py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-[#F5F0F8]/25 to-white border-b border-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official Google Branding */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Google Reviews Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-xs mb-3.5">
            <GoogleIcon className="w-4 h-4" />
            <span className="text-xs font-bold text-gray-800 tracking-wide uppercase">
              Google Business Profile Reviews
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#579B35]" />
            <span className="text-xs font-extrabold text-[#579B35]">Verified 4.8 Rating</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            What Our Patients Say on Google
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Real experiences and verified reviews from patients and families treated by our senior medical faculty at PUNYA Hospital, Basaveshwar Nagar, Bangalore.
          </p>

          {/* Aggregate Rating Scoreboard */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-5 py-3 rounded-2xl bg-white border border-purple-100 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#252525]">4.8</span>
              <div className="flex flex-col text-left">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-gray-500">Overall Google Rating</span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <ShieldCheck className="w-4 h-4 text-[#579B35]" />
              <span>420+ Genuine Reviews on Google</span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            <a
              href={GOOGLE_BUSINESS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B4FA3] hover:text-[#5D367F] hover:underline transition-colors"
            >
              <span>View Google Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Top Care Photo + Highlights Banner */}
        <div className="max-w-6xl mx-auto mb-10 bg-gradient-to-r from-[#5D367F] via-[#7B4FA3] to-[#5D367F] rounded-3xl p-6 sm:p-8 text-white shadow-lg overflow-hidden relative">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#EAF4E5] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#579B35]" />
                <span>Patient Trust & Clinical Excellence</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Ethical Healthcare, Transparent Cost Guidance
              </h3>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed max-w-xl">
                Every review represents a real family who placed their trust in PUNYA Hospital. We uphold complete transparency, clear recovery planning, and friendly patient care across all procedures.
              </p>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <a
                href={GOOGLE_BUSINESS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#5D367F] hover:bg-gray-50 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>Read All Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span>Showing Genuine Reviews</span>
              <span className="text-gray-300">•</span>
              <span className="text-[#579B35] font-semibold">Latest First</span>
            </div>

            {/* Left / Right Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous reviews"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#F5F0F8] border border-gray-200 text-gray-700 hover:text-[#5D367F] flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next reviews"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#F5F0F8] border border-gray-200 text-gray-700 hover:text-[#5D367F] flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cards Track with Touch Swipe */}
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {reviews.map((review) => {
                const isExpanded = expandedReviews[review.id];
                const shouldTruncate = review.text.length > 180;
                const displayText = shouldTruncate && !isExpanded 
                  ? `${review.text.slice(0, 180)}...` 
                  : review.text;

                return (
                  <div
                    key={review.id}
                    className="flex-shrink-0 px-2 sm:px-3"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="h-full bg-white border border-purple-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group">
                      
                      {/* Quote Watermark Icon */}
                      <Quote className="absolute right-4 top-4 w-8 h-8 text-purple-100/70 pointer-events-none group-hover:text-purple-200 transition-colors" />

                      <div>
                        {/* Top Reviewer Info & Google Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs ${getAvatarBg(review.authorName)}`}>
                              {review.authorName.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#252525] leading-tight">
                                {review.authorName}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[11px] text-gray-400 font-medium">
                                  {review.relativeTimeDescription}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#4285F4] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/60 flex-shrink-0">
                            <GoogleIcon className="w-3.5 h-3.5" />
                            <span>Google</span>
                          </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mb-2.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'fill-gray-200 text-gray-200'
                              }`} 
                            />
                          ))}
                          <span className="text-xs font-bold text-gray-600 ml-1">
                            {review.rating}.0
                          </span>
                        </div>

                        {/* Treatment Tag Badge */}
                        <div className="inline-block mb-3 px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7B4FA3] text-[11px] font-bold">
                          {review.treatmentTag}
                        </div>

                        {/* Review Content */}
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                          "{displayText}"
                        </p>

                        {shouldTruncate && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(review.id)}
                            className="mt-1 text-xs font-bold text-[#7B4FA3] hover:text-[#5D367F] hover:underline cursor-pointer"
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>

                      {/* Card Footer: Verified Record Badge */}
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1 text-[#579B35] font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Verified Patient Review</span>
                        </div>

                        <a
                          href={GOOGLE_BUSINESS_PROFILE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#4285F4] transition-colors"
                          title="Verify on Google Business Profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Pagination */}
          {maxIndex > 0 && (
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === index 
                      ? 'w-6 bg-[#7B4FA3]' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA Bar: View All Reviews + Write a Review on Google */}
        <div className="mt-10 pt-6 border-t border-purple-100/80 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white border border-gray-300 hover:border-[#4285F4] text-[#252525] hover:text-[#4285F4] font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98"
            id="view-all-google-reviews-btn"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>View All Google Reviews (4.8 ★)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#579B35] hover:bg-[#48822B] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
            id="write-google-review-btn"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Write a Review on Google</span>
          </a>
        </div>

      </div>
    </section>
  );
};
