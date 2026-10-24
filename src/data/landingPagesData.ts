import { ConditionId, LandingPageContent } from '../types';

export const LANDING_PAGES_DATA: Record<ConditionId, LandingPageContent> = {
  piles: {
    id: 'piles',
    path: '/piles-treatment',
    canonicalUrl: 'https://punyahospital.acquiresurgery.com/piles-treatment',
    adKeyword: 'Piles Treatment in Bangalore',
    title: 'Piles Treatment in Bangalore — Get the Right Guidance | PUNYA Hospital',
    metaTitle: 'Piles Treatment in Bangalore — Get the Right Guidance | PUNYA Hospital',
    metaDescription:
      'Looking for piles treatment in Bangalore? Explore suitable treatment options, daycare laser care, affordable cost guidance, and insurance assistance at PUNYA Hospital.',
    heroHeadline: 'Piles Treatment in Bangalore — Get the Right Guidance',
    heroSubheadline:
      'Looking for piles treatment? Explore suitable treatment options and get help understanding your next steps.',
    heroSupportingText:
      'We understand that piles discomfort can affect your daily work and peace of mind. Speak to Dr. Nagaraj B. Puttaswamy (30+ years surgical experience) for private, comfortable clinical care in Basaveshwar Nagar, Bangalore.',
    heroBadge: 'Laser Proctology & Daycare Care • Bangalore',
    heroCtaText: 'Call Now for Piles Treatment',
    whatsappMessage:
      'Hello PUNYA Hospital, I am looking for guidance on piles treatment options and insurance support. Please help me with an appointment.',
    doctorSpeciality: 'Senior Consultant – General, Laparoscopic & Colorectal Surgery',
    benefitCards: [
      {
        title: 'Comfortable Patient Care',
        description: 'Get guidance and warm support throughout your treatment journey from our senior doctor and caring nursing team.',
        iconName: 'Heart',
        badge: 'Gentle Care',
      },
      {
        title: 'Daycare Treatment Options',
        description: 'Ask whether same-day discharge is suitable for your procedure so you can recover in the comfort of your home.',
        iconName: 'Clock',
        badge: 'Same-Day Option',
      },
      {
        title: 'Friendly Hospital Staff',
        description: 'Get quick help with your appointment booking, timings, and treatment questions in simple language.',
        iconName: 'Users',
        badge: 'Helpful Staff',
      },
      {
        title: 'Affordable Treatment Guidance',
        description: 'Discuss expected costs and available options with our team openly before deciding on your care.',
        iconName: 'IndianRupee',
        badge: 'Clear Estimates',
      },
      {
        title: 'Insurance Assistance',
        description: 'Ask our team about insurance documentation and available support to make your claim process smooth.',
        iconName: 'ShieldCheck',
        badge: 'Insurance Desk',
      },
    ],
    symptoms: [
      {
        id: 'pain-stool',
        name: 'Pain or sharp burning while passing stool',
        description: 'Stinging sensation or aching pain during and after bowel movements that makes sitting uncomfortable.',
        iconName: 'Flame',
      },
      {
        id: 'bleeding',
        name: 'Fresh red blood during bowel movements',
        description: 'Bright red blood noticed on toilet paper, in the toilet bowl, or as drops while passing stool.',
        iconName: 'Droplets',
      },
      {
        id: 'swelling-lump',
        name: 'A small lump or swelling near the anal area',
        description: 'A soft tissue swelling that you can feel, which may come out during straining or stay outside.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'itching-discharge',
        name: 'Itching, irritation, or moisture',
        description: 'Persistent itching and soreness around the anal skin that causes continuous discomfort.',
        iconName: 'AlertCircle',
      },
      {
        id: 'discomfort-sitting',
        name: 'Discomfort while sitting or riding',
        description: 'A feeling of heaviness or pressure that makes two-wheeler rides and long desk hours difficult.',
        iconName: 'Armchair',
      },
      {
        id: 'incomplete-evacuation',
        name: 'Feeling that bowels are not fully empty',
        description: 'Feeling like you still need to pass stool even after using the washroom.',
        iconName: 'Activity',
      },
    ],
    warningSigns: {
      title: 'When Should You See a Doctor Promptly?',
      description:
        'Most piles can be managed comfortably when diagnosed early. Speak to our doctor right away if you notice:',
      signs: [
        'Continuous bleeding that makes you feel tired, dizzy, or weak',
        'Sudden, severe pain that stops you from sitting or walking comfortably',
        'A swollen lump that becomes hard, dark, and cannot be pushed back gently',
        'Fever, chills, or unusual discharge around the area',
      ],
    },
    diagramTitle: 'Understanding Piles (Hemorrhoids) in Simple Terms',
    diagramDescription:
      'This simple diagram shows healthy cushions, how swollen veins cause pain or bleeding, and how modern laser treatment gently reduces swelling.',
    treatmentOptions: [
      {
        title: 'Dietary & Medical Management',
        subtitle: 'Early Stage Care',
        description:
          'High-fiber diet plan, plenty of fluids, stool softeners, and soothing ointments prescribed by our doctor.',
        suitableFor: 'Suitable for early-stage piles after a careful checkup by our specialist.',
        badge: 'Medical Management',
      },
      {
        title: 'Modern Laser Proctology',
        subtitle: 'Gentle Daycare Procedure',
        description:
          'Focused diode laser energy gently closes swollen blood vessels from the inside without large cuts.',
        suitableFor: 'Ideal for symptomatic piles where medicines have not provided enough relief.',
        badge: 'Daycare Option',
      },
      {
        title: 'Specialist Surgical Care',
        subtitle: 'For Advanced Piles',
        description:
          'Stapler procedure (MIPH) or surgical repair carried out in our modern operation theatre for prolapsed piles.',
        suitableFor: 'Recommended when piles are advanced and require structural repair.',
        badge: 'Specialist Surgery',
      },
    ],
    daycareInfo: {
      headline: 'Ask About Same-Day Discharge Options',
      summary:
        'Some procedures allow patients to return home on the same day. Our team will explain the expected discharge time based on your treatment and medical condition.',
      bulletPoints: [
        'Ask about same-day discharge options for suitable laser procedures',
        'Explore daycare surgery for suitable conditions with minimal hospital stay',
        'Understand your expected recovery timeline: light desk work often resumed in 1 to 3 days',
        'Speak to our team about your treatment options and post-procedure care at home',
      ],
      recoveryTimeline:
        'Most patients can walk comfortably within a few hours after a daycare laser procedure. You can usually return to light office work and daily routines in 1 to 3 days with simple doctor instructions.',
      clinicalDisclaimer:
        'Clinical Note: Same-day discharge and recovery timelines depend on your individual checkup, the grade of piles, and your surgeon’s advice. Discharge timing is decided solely by your doctor for your safety.',
    },
    insuranceInfo: {
      title: 'Need Help With Insurance? Speak to Our Team',
      badge: 'Insurance Assistance',
      description:
        'Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      ctaText: 'Enquire About Insurance Support',
      coverageNote:
        'Cashless hospitalisation facility is available subject to verification of your specific insurer, active policy terms, and third-party administrator (TPA) approval.',
      points: [
        'Guidance on pre-authorization forms and claim paperwork',
        'Help with hospital bills, diagnostic records, and discharge summaries',
        'Support for corporate insurance policies and individual health plans',
        'Clear cost estimates explained upfront so there are no surprises',
      ],
    },
    faqs: [
      {
        question: 'What causes piles to form?',
        answer:
          'Piles develop when the normal blood vessels in the lower rectum swell. Common causes include chronic constipation, straining on the toilet, sitting for long hours, lack of dietary fiber, and lifting heavy weights.',
      },
      {
        question: 'Can piles be treated without surgery?',
        answer:
          'Yes. In the early stages, dietary changes, fiber supplements, drinking plenty of water, and prescribed ointments bring good relief. Our doctor will examine you first to see if surgery can be avoided.',
      },
      {
        question: 'Is laser piles treatment comfortable?',
        answer:
          'Yes. Modern laser proctology is designed for patient comfort. The laser treats the swollen tissue from within without making big incisions, so there is significantly less pain and bleeding compared to older methods.',
      },
      {
        question: 'Can I go home on the same day?',
        answer:
          'For many suitable laser procedures, patients are discharged on the same day after a short observation period. Your doctor will confirm your discharge after checking your comfort and walking ability.',
      },
      {
        question: 'How much does piles treatment cost at PUNYA Hospital?',
        answer:
          'Treatment costs depend on whether you need medical management, daycare laser treatment, or advanced surgical care. Our team provides clear, transparent cost guidance before you start treatment so your family can plan comfortably.',
      },
      {
        question: 'Does PUNYA Hospital offer insurance assistance?',
        answer:
          'Yes. Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      },
      {
        question: 'Who is the specialist doctor for piles?',
        answer:
          'You will be evaluated by Dr. Nagaraj B. Puttaswamy, our Chief Consultant Surgeon with over 30 years of clinical experience in proctology and laparoscopic surgery in Bangalore.',
      },
      {
        question: 'How do I book an appointment?',
        answer:
          'You can book by submitting the simple form on this page, calling our direct hospital number (+91 94038 90559), or sending a message on WhatsApp. Our friendly staff will assist you immediately.',
      },
    ],
  },

  gallstone: {
    id: 'gallstone',
    path: '/gallstone-treatment',
    canonicalUrl: 'https://punyahospital.acquiresurgery.com/gallstone-treatment',
    adKeyword: 'Gallstone Treatment in Bangalore',
    title: 'Gallstone Treatment in Bangalore — Explore Your Options | PUNYA Hospital',
    metaTitle: 'Gallstone Treatment in Bangalore — Explore Your Options | PUNYA Hospital',
    metaDescription:
      'Experiencing abdominal pain or diagnosed with gallstones? Speak to our team at PUNYA Hospital Bangalore about modern laparoscopic surgery, recovery plans, and insurance support.',
    heroHeadline: 'Gallstone Treatment in Bangalore — Explore Your Options',
    heroSubheadline:
      'Experiencing abdominal pain or diagnosed with gallstones? Speak to our team about assessment and treatment options.',
    heroSupportingText:
      'Get clear answers about your ultrasound scan and treatment choices from Dr. Nagaraj B. Puttaswamy (30+ years experience). We provide gentle keyhole surgery, comfortable daycare options, and clear cost guidance in Basaveshwar Nagar, Bangalore.',
    heroBadge: 'Single-Incision & Laparoscopic Care • Bangalore',
    heroCtaText: 'Enquire About Gallstone Treatment',
    whatsappMessage:
      'Hello PUNYA Hospital, I am looking for guidance on gallstone treatment options and insurance support. Please help me with an appointment.',
    doctorSpeciality: 'Chief Consultant – General, Laparoscopic & GI Surgery',
    benefitCards: [
      {
        title: 'Modern Surgical Options',
        description: 'Learn about laparoscopic keyhole surgery where clinically suitable, done with tiny incisions.',
        iconName: 'Cpu',
        badge: 'Keyhole Surgery',
      },
      {
        title: 'Recovery Guidance',
        description: 'Understand your expected recovery and discharge plan with clear steps from your healthcare team.',
        iconName: 'Compass',
        badge: 'Clear Pathway',
      },
      {
        title: 'Clear Cost Information',
        description: 'Discuss expected treatment costs with our team before proceeding, with no hidden surprises.',
        iconName: 'IndianRupee',
        badge: 'Clear Estimates',
      },
      {
        title: 'Insurance Support',
        description: 'Ask our team about available insurance assistance and required paperwork for your policy.',
        iconName: 'ShieldCheck',
        badge: 'Insurance Help',
      },
    ],
    symptoms: [
      {
        id: 'ab-pain',
        name: 'Pain in upper right side of stomach',
        description: 'A cramping or aching pain under your right ribs that may spread towards your right shoulder blade or back.',
        iconName: 'Activity',
      },
      {
        id: 'pain-eating',
        name: 'Stomach pain after having oily or heavy meals',
        description: 'Discomfort, heaviness, or sharp pain starting 30 to 60 minutes after lunch or dinner.',
        iconName: 'Flame',
      },
      {
        id: 'nausea',
        name: 'Feeling sick (nausea) and poor appetite',
        description: 'Frequent queasy stomach, fullness, or loss of interest in food during digestion.',
        iconName: 'AlertCircle',
      },
      {
        id: 'vomiting',
        name: 'Vomiting during severe pain attacks',
        description: 'Throwing up when the pain gets intense under your ribs.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'indigestion',
        name: 'Frequent gas, bloating, and acidity',
        description: 'Burping, sour taste in the throat, and heavy stomach even after eating a small meal.',
        iconName: 'Droplets',
      },
      {
        id: 'chest-confusion',
        name: 'Upper stomach ache often mistaken for acidity',
        description: 'Pain in the middle upper abdomen that people often confuse with simple gastric irritation.',
        iconName: 'Armchair',
      },
    ],
    warningSigns: {
      title: 'Warning Signs: When to Seek Medical Attention Immediately',
      description:
        'Symptomatic gallstones can cause swelling or blockage in the bile duct. Speak to a doctor immediately if you experience:',
      signs: [
        'Severe stomach pain that stays continuously for more than 4 hours without relief',
        'Fever with shivering or body chills (sign of gallbladder infection)',
        'Yellowing of your eyes or skin (jaundice), or high-colored dark urine',
        'Severe central stomach pain going straight to your back with repeated vomiting',
      ],
    },
    diagramTitle: 'Understanding Gallstones in the Gallbladder',
    diagramDescription:
      'This simple diagram shows where the gallbladder sits under the liver, how stones form inside it, and how keyhole surgery gently resolves the blockage.',
    treatmentOptions: [
      {
        title: 'Medical Review & Ultrasound Check',
        subtitle: 'For Silent Gallstones',
        description:
          'Careful ultrasound evaluation and doctor review for small stones discovered by chance that are not causing any pain.',
        suitableFor: 'Suitable for selected silent gallstones under doctor observation.',
        badge: 'Medical Review',
      },
      {
        title: 'Laparoscopic Keyhole Surgery',
        subtitle: 'Gold Standard Treatment',
        description:
          'Safe removal of the gallbladder through 3 or 4 tiny incisions (5mm to 10mm) using a mini camera.',
        suitableFor: 'Recommended for gallstones that cause pain attacks or digestion problems.',
        badge: 'Gold Standard',
      },
      {
        title: 'Single-Incision & Fast Track Care',
        subtitle: 'Minimally Invasive Care',
        description:
          'Advanced laparoscopic approach with minimal marks, reduced discomfort, and quick return to regular food.',
        suitableFor: 'Selected patients meeting clinical safety guidelines after surgeon assessment.',
        badge: 'Daycare Option',
      },
    ],
    daycareInfo: {
      headline: 'Ask About Same-Day Discharge Options',
      summary:
        'Some procedures allow patients to return home on the same day or within 24 hours. Our team will explain the expected discharge time based on your treatment and medical condition.',
      bulletPoints: [
        'Ask about same-day discharge or 24-hour observation options',
        'Explore daycare surgery for suitable conditions with keyhole incisions',
        'Understand your expected recovery timeline: walking within hours, desk work in 5 to 7 days',
        'Speak to our team about your treatment options and simple diet advice after surgery',
      ],
      recoveryTimeline:
        'Most patients walk comfortably and take light liquids within hours of keyhole surgery. You can usually return to desk work and everyday routine in about 5 to 7 days with simple dietary care.',
      clinicalDisclaimer:
        'Clinical Note: Same-day discharge and recovery timelines depend on individual clinical assessment, acute inflammation levels, and your surgeon’s guidance. Discharge timing is determined solely by your doctor for your safety.',
    },
    insuranceInfo: {
      title: 'Need Help With Insurance? Speak to Our Team',
      badge: 'Insurance Assistance',
      description:
        'Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      ctaText: 'Enquire About Insurance Support',
      coverageNote:
        'Cashless hospitalisation facility is available subject to verification of your specific insurer, active policy terms, and third-party administrator (TPA) approval.',
      points: [
        'Guidance on pre-authorization forms and claim paperwork',
        'Help with hospital bills, diagnostic records, and discharge summaries',
        'Support for corporate insurance policies and individual health plans',
        'Clear cost estimates explained upfront so there are no surprises',
      ],
    },
    faqs: [
      {
        question: 'Can gallstones be dissolved with medicines?',
        answer:
          'No, medicines cannot safely dissolve gallstones. Unlike kidney stones, gallstones sit in a small pouch with a narrow neck. Even if medicines are tried, stones almost always return once medication stops. Keyhole surgery is the proven, safe solution worldwide.',
      },
      {
        question: 'Why is the entire gallbladder removed instead of just the stones?',
        answer:
          'The gallbladder itself is where the imbalance occurs that makes stones form. If only the stones were taken out, new stones would form again in a few months. Removing the gallbladder solves the problem permanently.',
      },
      {
        question: 'Can I digest food normally without a gallbladder?',
        answer:
          'Yes, absolutely. The liver produces bile to digest food, not the gallbladder. The gallbladder is just a small storage pouch. Without it, bile flows directly into your intestines. After a few weeks of eating light food, most patients eat normally without issues.',
      },
      {
        question: 'What are the benefits of laparoscopic keyhole surgery?',
        answer:
          'Keyhole surgery uses tiny 5mm to 10mm cuts instead of a big cut. This means much less pain, very little blood loss, tiny scars, and a much faster return home and back to office work.',
      },
      {
        question: 'How much does gallstone surgery cost?',
        answer:
          'Our hospital team believes in clear cost guidance. The exact cost depends on your general health and room category chosen. Speak to our team before making any decision to get a clear estimate.',
      },
      {
        question: 'Does PUNYA Hospital assist with health insurance?',
        answer:
          'Yes. Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      },
      {
        question: 'Who performs the surgery at PUNYA Hospital?',
        answer:
          'Your procedure will be performed by Dr. Nagaraj B. Puttaswamy, our Chief Consultant Surgeon with 30+ years of laparoscopic surgical experience in Bangalore.',
      },
      {
        question: 'How do I book a consultation or second opinion?',
        answer:
          'Simply fill in the form on this page, call our hospital helpline (+91 94038 90559), or WhatsApp our team. Bring any ultrasound reports you already have.',
      },
    ],
  },

  hernia: {
    id: 'hernia',
    path: '/hernia-treatment',
    canonicalUrl: 'https://punyahospital.acquiresurgery.com/hernia-treatment',
    adKeyword: 'Hernia Treatment in Bangalore',
    title: 'Hernia Treatment in Bangalore — Get Expert Guidance | PUNYA Hospital',
    metaTitle: 'Hernia Treatment in Bangalore — Get Expert Guidance | PUNYA Hospital',
    metaDescription:
      'Have a hernia bulge or discomfort? Understand your treatment options, laparoscopic 3D mesh repair, clear cost guidance, and insurance support at PUNYA Hospital Bangalore.',
    heroHeadline: 'Hernia Treatment in Bangalore — Get Expert Guidance',
    heroSubheadline:
      'Have a hernia bulge or discomfort? Understand your treatment options and what to expect from consultation to recovery.',
    heroSupportingText:
      'Do not let an uncomfortable bulge stop you from your active life. Consult Dr. Nagaraj B. Puttaswamy (30+ years experience) for modern laparoscopic keyhole mesh repair with clear recovery guidance in Basaveshwar Nagar, Bangalore.',
    heroBadge: 'Advanced 3D Mesh Repair • Bangalore',
    heroCtaText: 'Enquire About Hernia Treatment',
    whatsappMessage:
      'Hello PUNYA Hospital, I am looking for guidance on hernia treatment options and insurance support. Please help me with an appointment.',
    doctorSpeciality: 'Senior Consultant – Hernia, General & Laparoscopic Surgery',
    benefitCards: [
      {
        title: 'Modern Hernia Repair',
        description: 'Learn about suitable repair options using modern keyhole techniques and lightweight 3D mesh.',
        iconName: 'Cpu',
        badge: 'Keyhole Repair',
      },
      {
        title: 'Patient-Friendly Care',
        description: 'Get clear information at each step without difficult medical jargon, with complete respect for your comfort.',
        iconName: 'Heart',
        badge: 'Supportive Care',
      },
      {
        title: 'Recovery Planning',
        description: 'Understand your expected recovery and discharge milestones clearly before your procedure.',
        iconName: 'Compass',
        badge: 'Fast Recovery',
      },
      {
        title: 'Cost and Insurance Guidance',
        description: 'Ask about expected costs and available insurance support openly with our friendly care desk.',
        iconName: 'IndianRupee',
        badge: 'Clear Estimates',
      },
    ],
    symptoms: [
      {
        id: 'bulge',
        name: 'Visible bulge in groin, belly button, or abdomen',
        description: 'A soft swelling that shows more clearly when you stand up, bend over, cough, or lift heavy items.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'pain-lifting',
        name: 'Pain or pulling sensation when lifting items',
        description: 'A dull ache, burning, or sharp tugging feeling during physical work or exercise.',
        iconName: 'Flame',
      },
      {
        id: 'cough-discomfort',
        name: 'Discomfort when coughing or sneezing',
        description: 'A noticeable impulse or sudden popping feeling at the bulge site when you cough.',
        iconName: 'AlertCircle',
      },
      {
        id: 'heaviness',
        name: 'Dragging sensation or heaviness in lower belly',
        description: 'A tired, heavy feeling in the groin area towards the evening after a busy day on your feet.',
        iconName: 'Activity',
      },
      {
        id: 'pain-standing',
        name: 'Pain that increases after standing for long hours',
        description: 'Growing discomfort after long standing at work, traveling, or carrying groceries.',
        iconName: 'Armchair',
      },
      {
        id: 'disappearing-bulge',
        name: 'Bulge that reduces when lying down flat',
        description: 'In early stages, the swelling often slips back inside smoothly when you lie down in bed.',
        iconName: 'Droplets',
      },
    ],
    warningSigns: {
      title: 'Warning Signs: When a Hernia Needs Emergency Care',
      description:
        'A hernia can get trapped or twist (strangulation). If this happens, seek emergency hospital care right away:',
      signs: [
        'The bulge suddenly becomes very painful, hard, or tender and will not go back in',
        'Feeling nauseous, vomiting, or unable to pass gas or motion',
        'The skin over the bulge turns red, bluish, or dark',
        'High fever with severe swelling in the stomach area',
      ],
    },
    diagramTitle: 'Understanding Hernia & How Mesh Strengthens the Muscle',
    diagramDescription:
      'This simple diagram shows the muscle weakness where tissue pushes through, and how a soft medical mesh reinforces the wall so the bulge does not return.',
    treatmentOptions: [
      {
        title: 'Clinical Checkup & Advice',
        subtitle: 'Specialist Examination',
        description:
          'Careful physical check and ultrasound scan to determine the exact type of hernia (inguinal, umbilical, or incisional).',
        suitableFor: 'Every patient presenting with a bulge to plan the safest treatment.',
        badge: 'Clinical Review',
      },
      {
        title: 'Laparoscopic Keyhole Mesh Repair',
        subtitle: 'TAPP & TEP Technique',
        description:
          'Repair done from behind the muscle wall through three tiny cuts, placing a supportive 3D mesh with minimal pain.',
        suitableFor: 'Recommended for most groin, navel, and bilateral hernias for quick healing.',
        badge: 'Minimally Invasive',
      },
      {
        title: 'Open Tension-Free Mesh Repair',
        subtitle: 'Targeted Open Repair',
        description:
          'Direct repair using comfortable local or regional anesthesia for very large or complex hernias.',
        suitableFor: 'Recommended when laparoscopic approach is not advisable based on patient health history.',
        badge: 'Conventional Option',
      },
    ],
    daycareInfo: {
      headline: 'Ask About Same-Day Discharge Options',
      summary:
        'Some procedures allow patients to return home on the same day or within 24 hours. Our team will explain the expected discharge time based on your treatment and medical condition.',
      bulletPoints: [
        'Ask about same-day discharge options for suitable keyhole repairs',
        'Explore daycare surgery for suitable conditions with gentle post-operative care',
        'Understand your expected recovery timeline: comfortable walking within hours, desk work in 3 to 5 days',
        'Speak to our team about your treatment options and safe activity milestones',
      ],
      recoveryTimeline:
        'Most patients walk comfortably on the day of surgery. You can usually return to desk work and light daily activities within 3 to 5 days. Heavy lifting is safely avoided for 3 to 4 weeks under doctor advice.',
      clinicalDisclaimer:
        'Clinical Note: Same-day discharge and recovery timelines depend on individual clinical assessment, hernia size, patient fitness, and your surgeon’s guidance. Discharge timing is determined solely by your doctor for your safety.',
    },
    insuranceInfo: {
      title: 'Need Help With Insurance? Speak to Our Team',
      badge: 'Insurance Assistance',
      description:
        'Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      ctaText: 'Enquire About Insurance Support',
      coverageNote:
        'Cashless hospitalisation facility is available subject to verification of your specific insurer, active policy terms, and third-party administrator (TPA) approval.',
      points: [
        'Guidance on pre-authorization forms and claim paperwork',
        'Help with hospital bills, diagnostic records, and discharge summaries',
        'Support for corporate insurance policies and individual health plans',
        'Clear cost estimates explained upfront so there are no surprises',
      ],
    },
    faqs: [
      {
        question: 'Can a hernia heal with exercise, belts, or medicines?',
        answer:
          'No. A hernia is a physical gap or tear in the muscle wall. No exercise, medicine, yoga, or hernia belt can close this muscular opening. In fact, heavy strain often makes the hole bigger.',
      },
      {
        question: 'What happens if I delay hernia treatment?',
        answer:
          'Over time, hernias gradually grow larger as daily stomach pressure pushes against the gap. Delaying also increases the chance of the intestine getting stuck inside (strangulation), which turns into an emergency.',
      },
      {
        question: 'Why is a mesh used in hernia repair?',
        answer:
          'The mesh acts like a gentle support net. It covers the weak spot without pulling the muscle tight. Over a few weeks, your natural tissue grows into the mesh, making the area strong and preventing the hernia from coming back.',
      },
      {
        question: 'Can I go home on the same day?',
        answer:
          'Yes, many eligible patients undergoing keyhole hernia repair are discharged on the same day after a short rest, or after an overnight 24-hour stay. Your doctor will check your comfort before confirming discharge.',
      },
      {
        question: 'How much does hernia surgery cost?',
        answer:
          'We understand treatment costs matter to every family. Speak to our team to understand the available treatment options and expected costs before making a decision.',
      },
      {
        question: 'Does PUNYA Hospital help with insurance claims?',
        answer:
          'Yes. Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      },
      {
        question: 'Who will examine my hernia?',
        answer:
          'You will be evaluated by Dr. Nagaraj B. Puttaswamy, our Chief Consultant Surgeon with over 30 years of surgical experience in Bangalore.',
      },
      {
        question: 'How do I book an appointment?',
        answer:
          'Fill out the form on this page, call our hospital desk directly (+91 94038 90559), or message us on WhatsApp for quick scheduling.',
      },
    ],
  },

  'uterine-fibroids': {
    id: 'uterine-fibroids',
    path: '/uterine-fibroids',
    canonicalUrl: 'https://punyahospital.acquiresurgery.com/uterine-fibroids',
    adKeyword: 'Uterine Fibroids Treatment in Bangalore',
    title: 'Uterine Fibroid Treatment in Bangalore — Understand Your Options | PUNYA Hospital',
    metaTitle: 'Uterine Fibroid Treatment in Bangalore — Understand Your Options | PUNYA Hospital',
    metaDescription:
      'Experiencing heavy periods, pelvic pressure, or fibroids? Speak to senior lady gynecologist Dr. Punyavathi C. Nagaraj at PUNYA Hospital Bangalore about treatment options and insurance support.',
    heroHeadline: 'Uterine Fibroid Treatment in Bangalore — Understand Your Options',
    heroSubheadline:
      'Experiencing heavy periods, pelvic pressure, or other symptoms? Speak to a specialist about assessment and suitable treatment options.',
    heroSupportingText:
      'Consult Dr. Punyavathi C. Nagaraj (20+ years experience, MD, Laparoscopy Diploma Germany) for compassionate women’s healthcare, fertility-preserving care, and clear cost guidance in Basaveshwar Nagar, Bangalore.',
    heroBadge: "Women's Health & Laparoscopy • Bangalore",
    heroCtaText: 'Request a Consultation',
    whatsappMessage:
      'Hello PUNYA Hospital, I am looking for guidance on uterine fibroids treatment options and insurance support. Please help me with an appointment.',
    doctorSpeciality: 'Senior Consultant – Obstetrics, Gynecology & Laparoscopic Surgeon',
    benefitCards: [
      {
        title: "Women's Health Support",
        description: 'Get patient, personal guidance for your individual health concerns in a private, comfortable setting.',
        iconName: 'Heart',
        badge: 'Lady Doctor',
      },
      {
        title: 'Treatment Options',
        description: 'Understand available medical and surgical approaches, including techniques that protect your uterus.',
        iconName: 'Cpu',
        badge: 'Fertility Focus',
      },
      {
        title: 'Recovery Guidance',
        description: 'Learn about the expected recovery process clearly with helpful milestones from your doctor.',
        iconName: 'Compass',
        badge: 'Clear Pathway',
      },
      {
        title: 'Cost and Insurance Support',
        description: 'Ask about expected costs and available insurance assistance openly with our hospital helpdesk.',
        iconName: 'IndianRupee',
        badge: 'Clear Estimates',
      },
    ],
    symptoms: [
      {
        id: 'heavy-bleeding',
        name: 'Heavy or prolonged periods with blood clots',
        description: 'Periods lasting more than 7 days, needing frequent pad changes, or passing thick clots.',
        iconName: 'Droplets',
      },
      {
        id: 'pelvic-pressure',
        name: 'Feeling of pressure or heaviness in lower belly',
        description: 'A constant fullness or bloated feeling in your lower stomach as if carrying extra weight.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'abdominal-pain',
        name: 'Painful cramps and lower stomach ache',
        description: 'Severe monthly period pain or a persistent ache radiating to your back and thighs.',
        iconName: 'Flame',
      },
      {
        id: 'frequent-urination',
        name: 'Needing to urinate frequently',
        description: 'Fibroids pressing on the bladder make you feel the urge to visit the washroom very often.',
        iconName: 'AlertCircle',
      },
      {
        id: 'back-pain',
        name: 'Dull, persistent lower back ache',
        description: 'Back stiffness and lower ache caused by fibroids pressing against pelvic muscles and nerves.',
        iconName: 'Activity',
      },
      {
        id: 'pain-intimacy',
        name: 'Pain or discomfort during intimacy',
        description: 'Discomfort during sexual intercourse caused by fibroids located near the lower uterus.',
        iconName: 'HeartHandshake',
      },
    ],
    warningSigns: {
      title: 'When Should You Consult a Gynecologist Promptly?',
      description:
        'While fibroids are non-cancerous, heavy bleeding can weaken your health over time. Speak to our lady gynecologist if:',
      signs: [
        'Heavy periods leave you feeling exhausted, pale, dizzy, or breathless (signs of low hemoglobin / anemia)',
        'Bleeding is so heavy that you soak through two or more thick pads every hour',
        'Sudden, severe pelvic pain that does not settle with standard pain relief tablets',
        'Difficulty passing urine or severe constipation caused by large pelvic swelling',
      ],
    },
    diagramTitle: 'Understanding Uterine Fibroids & Uterus-Preserving Options',
    diagramDescription:
      'This simple diagram shows the uterus, the different places fibroids can grow, and how keyhole myomectomy gently removes the fibroids while preserving the healthy uterus.',
    treatmentOptions: [
      {
        title: 'Ultrasound Check & Monitoring',
        subtitle: 'For Small Asymptomatic Fibroids',
        description:
          'Routine ultrasound scans and doctor review for small fibroids that do not cause heavy bleeding or pain.',
        suitableFor: 'Suitable for small fibroids in women nearing menopause with stable findings.',
        badge: 'Regular Checkups',
      },
      {
        title: 'Medication & Cycle Regulation',
        subtitle: 'Symptom Relief',
        description:
          'Simple medical therapies to reduce heavy menstrual blood flow, correct anemia, and ease period cramps.',
        suitableFor: 'Recommended for symptom management under senior gynecologist guidance.',
        badge: 'Medical Care',
      },
      {
        title: 'Uterus-Preserving Laparoscopic Myomectomy',
        subtitle: 'Keyhole Fibroid Removal',
        description:
          'Minimally invasive keyhole surgery to remove only the fibroids while reconstructing and preserving your uterus and fertility.',
        suitableFor: 'Ideal for women wanting relief from fibroids while protecting their fertility and natural uterus.',
        badge: 'Fertility Preserving',
      },
      {
        title: 'Definitive Surgical Care',
        subtitle: 'When Clinically Indicated',
        description:
          'Careful surgical options for very large or multiple fibroids in women who have completed their family.',
        suitableFor: 'Decided after thoughtful consultation and clear discussion of your personal health wishes.',
        badge: 'Definitive Option',
      },
    ],
    daycareInfo: {
      headline: 'Ask About Same-Day Discharge Options',
      summary:
        'Some procedures allow patients to return home on the same day or within 24 to 48 hours. Our team will explain the expected discharge time based on your treatment and medical condition.',
      bulletPoints: [
        'Ask about same-day discharge options for suitable minor or hysteroscopic procedures',
        'Explore daycare surgery for suitable conditions with gentle keyhole access',
        'Understand your expected recovery timeline: comfortable walking within 24 hours, desk work in 7 to 10 days',
        'Speak to our team about your treatment options and personalized care plan',
      ],
      recoveryTimeline:
        'Following keyhole laparoscopic fibroid removal, most women walk comfortably the next day. You can usually return to desk work and everyday social routines in 7 to 10 days with simple guidance.',
      clinicalDisclaimer:
        'Clinical Note: Same-day discharge and recovery timelines depend on individual clinical assessment, fibroid number, size, and surgical scope. Discharge timing is determined solely by your doctor for your safety.',
    },
    insuranceInfo: {
      title: 'Need Help With Insurance? Speak to Our Team',
      badge: 'Insurance Assistance',
      description:
        'Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      ctaText: 'Enquire About Insurance Support',
      coverageNote:
        'Cashless hospitalisation facility is available subject to verification of your specific insurer, active policy terms, and third-party administrator (TPA) approval.',
      points: [
        'Guidance on pre-authorization forms and claim paperwork',
        'Help with hospital bills, diagnostic records, and discharge summaries',
        'Support for corporate insurance policies and individual health plans',
        'Clear cost estimates explained upfront so there are no surprises',
      ],
    },
    faqs: [
      {
        question: 'Are uterine fibroids cancerous?',
        answer:
          'No. Uterine fibroids are benign (non-cancerous) muscle growths. Having fibroids does not mean you have cancer, and cancerous change is extremely rare. However, they should be checked because they can cause severe bleeding and anemia.',
      },
      {
        question: 'Can my uterus be saved if I have fibroid surgery?',
        answer:
          'Yes, certainly. At PUNYA Hospital, Dr. Punyavathi C. Nagaraj specializes in laparoscopic myomectomy—a gentle keyhole surgery that removes only the fibroids and carefully reconstructs the uterine muscle, keeping your uterus safe.',
      },
      {
        question: 'Do all fibroids require surgery?',
        answer:
          'No, not at all. If fibroids are small and not causing pain or heavy bleeding, they can often be monitored safely with periodic ultrasound scans and simple medicines.',
      },
      {
        question: 'Can fibroids cause tiredness and low hemoglobin?',
        answer:
          'Yes, very commonly. Continuous heavy periods lead to iron deficiency anemia, making you feel weak, dizzy, and exhausted. Treating fibroids stops excess blood loss so your energy can return.',
      },
      {
        question: 'How much does fibroid treatment cost?',
        answer:
          'We understand that treatment costs matter to every family. Speak to our team to understand the available treatment options and expected costs before making a decision.',
      },
      {
        question: 'Does PUNYA Hospital provide insurance assistance?',
        answer:
          'Yes. Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      },
      {
        question: 'Who will evaluate me at PUNYA Hospital?',
        answer:
          'You will be personally consulted by Dr. Punyavathi C. Nagaraj, Senior Consultant Gynecologist with over 20 years of experience and specialized laparoscopic training from Germany.',
      },
      {
        question: 'How do I book a confidential consultation?',
        answer:
          'Fill in the consultation form on this page, call our hospital helpline (+91 94038 90559), or message us on WhatsApp. Our women’s care team will assist you with complete privacy.',
      },
    ],
  },

  endometriosis: {
    id: 'endometriosis',
    path: '/endometriosis',
    canonicalUrl: 'https://punyahospital.acquiresurgery.com/endometriosis',
    adKeyword: 'Endometriosis Treatment in Bangalore',
    title: 'Endometriosis Treatment in Bangalore — Get the Right Guidance | PUNYA Hospital',
    metaTitle: 'Endometriosis Treatment in Bangalore — Get the Right Guidance | PUNYA Hospital',
    metaDescription:
      'Living with pelvic pain or painful periods? Learn about assessment and treatment options with guidance from a healthcare professional at PUNYA Hospital Bangalore.',
    heroHeadline: 'Endometriosis Treatment in Bangalore — Get the Right Guidance',
    heroSubheadline:
      'Living with pelvic pain or painful periods? Learn about assessment and treatment options with guidance from a healthcare professional.',
    heroSupportingText:
      'Severe menstrual pain that stops your daily life is not normal. Consult Dr. Punyavathi C. Nagaraj (20+ years experience, German fellowship in laparoscopy) for clear diagnosis, gentle pain management, and empathetic care in Basaveshwar Nagar, Bangalore.',
    heroBadge: 'Pelvic Pain & Advanced Laparoscopy • Bangalore',
    heroCtaText: 'Enquire About Endometriosis Care',
    whatsappMessage:
      'Hello PUNYA Hospital, I am looking for guidance on endometriosis care options and insurance support. Please help me with an appointment.',
    doctorSpeciality: 'Senior Consultant – Gynecology, Endometriosis & Laparoscopy',
    benefitCards: [
      {
        title: 'Care That Understands Your Needs',
        description: 'Discuss your symptoms and concerns openly with a senior lady doctor who listens with patience.',
        iconName: 'Heart',
        badge: 'Empathetic Care',
      },
      {
        title: 'Treatment Guidance',
        description: 'Explore options based on your clinical assessment, from hormonal balance to keyhole surgery.',
        iconName: 'Compass',
        badge: 'Clear Options',
      },
      {
        title: 'Recovery and Follow-Up',
        description: 'Understand the next steps in your care clearly, including long-term lifestyle and pain relief support.',
        iconName: 'Clock',
        badge: 'Ongoing Support',
      },
      {
        title: 'Insurance Assistance',
        description: 'Ask our team about available insurance support and paperwork guidance for your hospital visit.',
        iconName: 'ShieldCheck',
        badge: 'Insurance Desk',
      },
    ],
    symptoms: [
      {
        id: 'painful-periods',
        name: 'Severe period cramps that disrupt your routine',
        description: 'Period pain that begins days before bleeding, worsens during the cycle, and does not settle with standard pain tablets.',
        iconName: 'Flame',
      },
      {
        id: 'pelvic-pain',
        name: 'Chronic lower stomach ache between periods',
        description: 'A constant dull ache or heaviness in your lower belly that persists throughout the month.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'pain-intercourse',
        name: 'Deep pain during or after intimacy',
        description: 'Deep discomfort felt during sexual intercourse or a lingering ache in the pelvic area afterwards.',
        iconName: 'AlertCircle',
      },
      {
        id: 'pain-bowel',
        name: 'Pain while passing motion during periods',
        description: 'Sharp pain or difficulty when using the washroom, especially during menstrual days.',
        iconName: 'Activity',
      },
      {
        id: 'pain-urination',
        name: 'Pain or burning while urinating during cycle',
        description: 'Frequent urge to urinate or bladder discomfort coinciding with your menstrual cycle.',
        iconName: 'Droplets',
      },
      {
        id: 'fertility-issues',
        name: 'Difficulty conceiving or delayed pregnancy',
        description: 'Endometriosis is often discovered when evaluating difficulties in getting pregnant naturally.',
        iconName: 'HeartHandshake',
      },
    ],
    warningSigns: {
      title: 'When Should You Speak to a Specialist Doctor?',
      description:
        'Period pain that forces you to stay in bed or miss work is a medical sign that needs gentle evaluation. Speak to our team if:',
      signs: [
        'Menstrual pain causes you to take leave from college or office regularly',
        'Over-the-counter painkillers no longer bring adequate relief',
        'Pelvic pain has become a daily or weekly problem rather than just on cycle days',
        'You have been trying for a baby for over a year without success alongside painful cycles',
      ],
    },
    diagramTitle: 'Understanding Endometriosis in Simple Words',
    diagramDescription:
      'This simple diagram explains how tissue similar to the uterine lining grows outside the uterus on ovaries and pelvic areas, and how gentle keyhole surgery clears the implants to bring relief.',
    treatmentOptions: [
      {
        title: 'Diagnostic Scan & Assessment',
        subtitle: 'Thorough Specialist Review',
        description:
          'Expert pelvic checkup, high-definition ultrasound, and MRI scan to clearly map out areas of irritation.',
        suitableFor: 'The first essential step for any woman experiencing chronic period or pelvic pain.',
        badge: 'Diagnostic Review',
      },
      {
        title: 'Hormonal & Medical Management',
        subtitle: 'Symptom Relief',
        description:
          'Targeted hormonal therapies and anti-inflammatory medicines to calm tissue irritation and reduce monthly pain.',
        suitableFor: 'Effective for regulating periods and managing pain under careful clinical oversight.',
        badge: 'Medical Care',
      },
      {
        title: 'Laparoscopic Excision Surgery',
        subtitle: 'Gentle Keyhole Care',
        description:
          'Careful keyhole removal of endometriotic implants and ovarian chocolate cysts while safeguarding your healthy ovaries.',
        suitableFor: 'Recommended for persistent pain or when fertility optimization is needed.',
        badge: 'Advanced Laparoscopy',
      },
      {
        title: 'Lifestyle & Nutritional Guidance',
        subtitle: 'Holistic Support',
        description:
          'Simple anti-inflammatory diet tips and pelvic health counseling to help you feel your best every day.',
        suitableFor: 'Included in all care plans to support your overall energy and wellbeing.',
        badge: 'Holistic Support',
      },
    ],
    daycareInfo: {
      headline: 'Ask About Same-Day Discharge Options',
      summary:
        'Some procedures allow patients to return home on the same day or within 24 hours. Our team will explain the expected discharge time based on your treatment and medical condition.',
      bulletPoints: [
        'Ask about same-day discharge options for diagnostic or minor keyhole procedures',
        'Explore daycare surgery for suitable conditions with gentle care protocols',
        'Understand your expected recovery timeline: light activities often resumed in 3 to 7 days',
        'Speak to our team about your treatment options and long-term pelvic comfort support',
      ],
      recoveryTimeline:
        'Following laparoscopic keyhole care, most women mobilize on the same day. You can usually return to desk work and regular light activities in 3 to 7 days, with ongoing improvement in cycle comfort.',
      clinicalDisclaimer:
        'Clinical Note: Same-day discharge and recovery timelines depend on individual clinical assessment, the stage of endometriosis, and your surgeon’s guidance. Discharge timing is determined solely by your doctor for your safety.',
    },
    insuranceInfo: {
      title: 'Need Help With Insurance? Speak to Our Team',
      badge: 'Insurance Assistance',
      description:
        'Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      ctaText: 'Enquire About Insurance Support',
      coverageNote:
        'Cashless hospitalisation facility is available subject to verification of your specific insurer, active policy terms, and third-party administrator (TPA) approval.',
      points: [
        'Guidance on pre-authorization forms and claim paperwork',
        'Help with hospital bills, diagnostic records, and discharge summaries',
        'Support for corporate insurance policies and individual health plans',
        'Clear cost estimates explained upfront so there are no surprises',
      ],
    },
    faqs: [
      {
        question: 'What is endometriosis and why does it cause so much pain?',
        answer:
          'Endometriosis happens when tissue similar to the lining inside the uterus grows outside—on ovaries, tubes, or pelvic walls. During each period, this tissue swells and bleeds. Because the blood cannot leave the body, it creates inflammation and pain.',
      },
      {
        question: 'Is severe period pain normal?',
        answer:
          'No. Mild discomfort that goes away with simple home remedies is common, but pain that disrupts your studies, job, or routine life is not normal and should be checked by a specialist doctor.',
      },
      {
        question: 'Can endometriosis affect my chances of getting pregnant?',
        answer:
          'It can make conceiving more difficult in some women by causing tissue adhesions or ovarian inflammation. However, with early checkup and proper treatment from our specialist, many women conceive naturally or with simple medical guidance.',
      },
      {
        question: 'Can endometriosis be treated without surgery?',
        answer:
          'Yes. Many women get good relief with hormonal medicines, pain-relieving tablets, and dietary adjustments without needing immediate surgery. Our doctor will explain all your options.',
      },
      {
        question: 'How much does endometriosis treatment cost?',
        answer:
          'We understand that treatment costs matter to every family. Speak to our team to understand the available treatment options and expected costs before making a decision.',
      },
      {
        question: 'Does PUNYA Hospital offer insurance assistance?',
        answer:
          'Yes. Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      },
      {
        question: 'Who will evaluate me at PUNYA Hospital?',
        answer:
          'You will be evaluated by Dr. Punyavathi C. Nagaraj, Senior Consultant Gynecologist with 20+ years of dedicated experience and specialized laparoscopic training in Germany.',
      },
      {
        question: 'How do I book a private consultation?',
        answer:
          'Fill in the appointment form on this page, call our direct hospital desk (+91 94038 90559), or message us on WhatsApp. Our friendly team will assist you with complete privacy.',
      },
    ],
  },
};
