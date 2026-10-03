import React, { useEffect } from 'react';
import { LandingPageContent } from '../types';

interface SeoStructuredDataProps {
  content: LandingPageContent;
}

export const SeoStructuredData: React.FC<SeoStructuredDataProps> = ({ content }) => {
  useEffect(() => {
    // 1. Update document title
    document.title = content.metaTitle;

    // 2. Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', content.metaDescription);

    // 3. Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', content.metaTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', content.metaDescription);
  }, [content]);

  // Schema 1: Hospital & MedicalOrganization Schema (Local SEO Bangalore)
  const hospitalSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: 'PUNYA Hospital',
    alternateName: 'Punya Speciality Hospital Bangalore',
    url: window.location.origin,
    logo: `${window.location.origin}/logo.png`,
    image: `${window.location.origin}/src/assets/images/indian_doctor_consultation_1789457537922.jpg`,
    description: 'Premier surgical and multi-speciality hospital in Bangalore specializing in minimally invasive proctology, gallbladder surgery, and hernia repair.',
    telephone: '+919403890559',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '52/10, 80 Feet Ring Rd, A D Halli, 2nd Stage, KHB Colony, Basaveshwar Nagar',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560079',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    medicalSpecialty: [
      'GeneralSurgery',
      'Gastroenterology',
      'ColorectalSurgery',
    ],
  };

  // Schema 2: MedicalWebPage & Condition Schema
  const medicalConditionSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: content.title,
    description: content.metaDescription,
    url: `${window.location.origin}${content.path}`,
    about: {
      '@type': 'MedicalCondition',
      name: content.heroHeadline,
      signOrSymptom: content.symptoms.map((s) => ({
        '@type': 'MedicalSignOrSymptom',
        name: s.name,
      })),
      possibleTreatment: content.treatmentOptions.map((t) => ({
        '@type': 'MedicalTherapy',
        name: t.title,
        description: t.description,
      })),
    },
  };

  // Schema 3: FAQ Schema (JSON-LD)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalConditionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
