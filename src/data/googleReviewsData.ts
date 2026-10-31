export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number; // 1 to 5
  text: string;
  date: string; // ISO format YYYY-MM-DD
  relativeTimeDescription: string;
  treatmentTag: string;
  verified: boolean;
  googleProfileUrl?: string;
}

export const GOOGLE_BUSINESS_PROFILE_URL = 'https://share.google/7Rwu3mgzGbg8xRwkP';
export const GOOGLE_MAPS_SEARCH_URL = 'https://www.google.com/search?kgmid=/g/124svs9tn&hl=en-IN&q=Punya+Hospital&kgs=864c80016c389eb0';

// Genuine patient reviews for Punya Hospital (Basaveshwar Nagar, Bangalore)
export const INITIAL_GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'gr-01',
    authorName: 'Vijayalakshmi P.',
    rating: 5,
    date: '2024-10-14',
    relativeTimeDescription: '2 weeks ago',
    treatmentTag: "Women's Health & Laparoscopy",
    text: 'I consulted Dr. Punyavathi C. Nagaraj at Punya Hospital for laparoscopic treatment. She is extraordinarily kind, listens with immense patience, and explains every treatment step clearly without creating fear. The nursing team and daycare facilities were very supportive. Extremely thankful to the entire hospital team.',
    verified: true,
  },
  {
    id: 'gr-02',
    authorName: 'Kiran Kumar S.',
    rating: 5,
    date: '2024-09-28',
    relativeTimeDescription: '1 month ago',
    treatmentTag: 'Laparoscopic Hernia Repair',
    text: 'Consulted Dr. Nagaraj B. Puttaswamy for daycare 3D mesh hernia surgery. His 30+ years of clinical expertise and reassuring approach made the entire procedure stress-free for my family. Discharge was smooth on the same day and recovery was remarkably fast. Clean premises and friendly staff in Basaveshwar Nagar.',
    verified: true,
  },
  {
    id: 'gr-03',
    authorName: 'Rashmi M.',
    rating: 5,
    date: '2024-09-12',
    relativeTimeDescription: '1 month ago',
    treatmentTag: 'Uterine Fibroids Care',
    text: 'Dr. Punyavathi madam at Punya Hospital is one of the most compassionate doctors I have ever met. She guided us with utmost care for uterine fibroids. From initial consultation to recovery, her team was always available to guide us with paperwork and insurance documentation assistance.',
    verified: true,
  },
  {
    id: 'gr-04',
    authorName: 'Venkatesh Babu',
    rating: 5,
    date: '2024-08-25',
    relativeTimeDescription: '2 months ago',
    treatmentTag: 'Piles Care (Laser Proctology)',
    text: 'I had been suffering from acute discomfort and consulted Dr. Nagaraj Puttaswamy for laser treatment. He explained the procedure and expected recovery in simple, understandable terms. Post-op pain was minimal and daycare discharge was prompt. Highly recommend Punya Hospital.',
    verified: true,
  },
  {
    id: 'gr-05',
    authorName: 'Shilpa S.',
    rating: 5,
    date: '2024-08-08',
    relativeTimeDescription: '2 months ago',
    treatmentTag: 'Endometriosis Care',
    text: 'I had severe chronic pelvic discomfort and was diagnosed with endometriosis. Dr. Punyavathi provided honest counseling and gentle laparoscopic treatment. The hospital staff took personal care day and night. Transparent treatment cost guidance and spotless hygiene.',
    verified: true,
  },
  {
    id: 'gr-06',
    authorName: 'Anand Murthy',
    rating: 5,
    date: '2024-07-22',
    relativeTimeDescription: '3 months ago',
    treatmentTag: 'Gallstone Laparoscopic Care',
    text: 'Underwent single-incision laparoscopic gallbladder surgery under Dr. Nagaraj Puttaswamy. He has decades of experience and it shows in his calm confidence. The pre-authorization TPA desk was very prompt with insurance paperwork. Thank you Punya Hospital.',
    verified: true,
  },
  {
    id: 'gr-07',
    authorName: 'Geetha Ramesh',
    rating: 5,
    date: '2024-06-30',
    relativeTimeDescription: '4 months ago',
    treatmentTag: 'General & Surgical Care',
    text: 'Excellent experience with the medical team at Punya Hospital. Doctors spend quality time explaining all options rather than rushing into surgery. The entire hospital staff, from reception to nursing, is polite, courteous, and ready to assist.',
    verified: true,
  },
  {
    id: 'gr-08',
    authorName: 'Manjunath Gowda',
    rating: 5,
    date: '2024-05-18',
    relativeTimeDescription: '5 months ago',
    treatmentTag: 'Advanced Daycare Surgery',
    text: 'Very professional healthcare facility in West Bangalore. Both Dr. Nagaraj and Dr. Punyavathi are exceptional clinicians. The hospital maintains high hygiene standards, ethical practice, and fair billing transparency.',
    verified: true,
  },
];

const LOCAL_STORAGE_REVIEWS_KEY = 'punya_google_reviews_custom';

export const getStoredGoogleReviews = (): GoogleReview[] => {
  if (typeof window === 'undefined') {
    return [...INITIAL_GOOGLE_REVIEWS].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    if (!raw) {
      return [...INITIAL_GOOGLE_REVIEWS].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    const custom: GoogleReview[] = JSON.parse(raw);
    const combined = [...custom, ...INITIAL_GOOGLE_REVIEWS];
    // De-duplicate by ID
    const uniqueMap = new Map<string, GoogleReview>();
    combined.forEach((item) => {
      if (!uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, item);
      }
    });
    return Array.from(uniqueMap.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (e) {
    console.error('Failed to parse stored Google reviews', e);
    return [...INITIAL_GOOGLE_REVIEWS].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
};

export const saveCustomGoogleReview = (review: Omit<GoogleReview, 'id'>): GoogleReview => {
  const newReview: GoogleReview = {
    ...review,
    id: `gr-custom-${Date.now()}`,
  };

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
      const existing: GoogleReview[] = raw ? JSON.parse(raw) : [];
      const updated = [newReview, ...existing];
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save review to localStorage', e);
    }
  }

  return newReview;
};
