import { ConditionId, LandingPageContent } from '../types';

export const LANDING_PAGES_DATA: Record<ConditionId, LandingPageContent> = {
  piles: {
    id: 'piles',
    path: '/piles-treatment',
    adKeyword: 'Piles Treatment in Bangalore',
    title: 'Piles Treatment in Bangalore | PUNYA Hospital',
    metaTitle: 'Piles Treatment in Bangalore | PUNYA Hospital',
    metaDescription: 'Get expert evaluation and personalised treatment for piles from qualified specialists at PUNYA Hospital, Bangalore. Modern clinical facilities and confidential care.',
    heroHeadline: 'Piles Treatment in Bangalore',
    heroSupportingText: 'Get expert evaluation and personalised treatment for piles from qualified specialists at PUNYA Hospital.',
    whatsappMessage: 'Hello PUNYA Hospital, I would like to consult a specialist regarding Piles treatment. Please help me with an appointment.',
    doctorSpeciality: 'Colorectal & General Surgery',
    symptoms: [
      {
        id: 'pain-stool',
        name: 'Pain while passing stool',
        description: 'Sharp or aching pain during bowel movements, often intensifying with strain.',
        iconName: 'Flame',
      },
      {
        id: 'bleeding',
        name: 'Bleeding',
        description: 'Bright red blood noticed on toilet tissue or in the bowl during evacuation.',
        iconName: 'Droplets',
      },
      {
        id: 'itching',
        name: 'Itching & Irritation',
        description: 'Persistent itching, soreness, or burning sensation around the perianal area.',
        iconName: 'AlertCircle',
      },
      {
        id: 'swelling',
        name: 'Swelling',
        description: 'Inflammation and tenderness of sensitive anal blood vessels.',
        iconName: 'Activity',
      },
      {
        id: 'discomfort-sitting',
        name: 'Discomfort while sitting',
        description: 'Uncomfortable pressure or tenderness when sitting for regular periods.',
        iconName: 'Armchair',
      },
      {
        id: 'lump-anus',
        name: 'Lump around the anus',
        description: 'A palpable soft or firm tissue mass at the anal opening requiring clinical check.',
        iconName: 'ShieldAlert',
      },
    ],
    diagramTitle: 'Understanding Piles (Hemorrhoids)',
    diagramDescription: 'Clear anatomical illustration showing the progression from normal vascular cushions to swollen venous clusters.',
    treatmentOptions: [
      {
        title: 'Conservative Treatment',
        subtitle: 'Early Clinical Management',
        description: 'Personalised dietary modifications, fiber supplementation, stool softeners, and topical medications under physician guidance.',
        suitableFor: 'Suitable for early-stage (Grade I & mild Grade II) cases after medical evaluation.',
        badge: 'Medical Management',
      },
      {
        title: 'Minimally Invasive Procedures',
        subtitle: 'Advanced Clinic & Daycare Care',
        description: 'Procedures such as rubber band ligation, infrared coagulation, or modern laser-assisted energy options depending on diagnosis.',
        suitableFor: 'Treatment options selected depending on diagnosis and detailed clinical assessment.',
        badge: 'Daycare Option',
      },
      {
        title: 'Surgical Treatment',
        subtitle: 'Definitive Clinical Intervention',
        description: 'Procedures like stapled hemorrhoidopexy or surgical excision to relieve persistent, prolapsed, or severe hemorrhoidal tissue.',
        suitableFor: 'Recommended when clinically appropriate for advanced grades or persistent symptoms.',
        badge: 'Specialist Surgery',
      },
    ],
    faqs: [
      {
        question: 'What causes piles?',
        answer: 'Piles (hemorrhoids) develop when vascular cushions in the anal canal become swollen. Common contributing factors include chronic constipation, excessive straining during bowel movements, prolonged sitting, low dietary fiber intake, heavy lifting, and increased abdominal pressure during pregnancy.',
      },
      {
        question: 'When should I see a doctor for piles?',
        answer: 'You should consult a doctor if you experience rectal bleeding, persistent pain, palpable lumps, or discomfort that does not improve after a few days. Rectal bleeding should always be evaluated by a qualified doctor to rule out other medical conditions.',
      },
      {
        question: 'Can piles be treated without surgery?',
        answer: 'Yes. Many early-stage piles respond well to non-surgical measures including high-fiber diet, adequate hydration, lifestyle modifications, and prescribed medical ointments. Your specialist will examine you first to determine if non-surgical treatment is suitable.',
      },
      {
        question: 'Is surgery always required?',
        answer: 'No, surgery is not always required. The decision depends on the grade of piles, severity of symptoms, and whether conservative treatments have brought relief. Surgery is typically considered only when clinically appropriate.',
      },
      {
        question: 'How long does recovery take?',
        answer: 'Recovery time depends on the specific treatment provided. Patients undergoing conservative or minimally invasive daycare procedures often resume light activities within 1–3 days, while surgical treatments may require 1–2 weeks for complete healing under specialist advice.',
      },
      {
        question: 'Can piles come back?',
        answer: 'While appropriate medical or surgical treatment addresses existing hemorrhoidal tissue, maintaining healthy bowel habits, drinking plenty of water, and avoiding chronic straining are essential to minimise future recurrence.',
      },
      {
        question: 'Which doctor treats piles?',
        answer: 'Piles are evaluated and treated by qualified General Surgeons, Proctologists, and Colorectal Specialists. At PUNYA Hospital, our Consultant General & Laparoscopic Surgeons conduct thorough assessments in a confidential setting.',
      },
      {
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment easily by submitting the consultation request form on this page, calling our dedicated hospital desk directly, or reaching out via WhatsApp for immediate appointment assistance.',
      },
    ],
  },

  gallstone: {
    id: 'gallstone',
    path: '/gallstone-treatment',
    adKeyword: 'Gallstone Treatment in Bangalore',
    title: 'Gallstone Treatment in Bangalore | PUNYA Hospital',
    metaTitle: 'Gallstone Treatment in Bangalore | PUNYA Hospital',
    metaDescription: 'Get expert evaluation and appropriate treatment options for gallstones at PUNYA Hospital, Bangalore. Specialist laparoscopic care and comprehensive diagnostics.',
    heroHeadline: 'Gallstone Treatment in Bangalore',
    heroSupportingText: 'Get expert evaluation and appropriate treatment options for gallstones at PUNYA Hospital.',
    whatsappMessage: 'Hello PUNYA Hospital, I would like to consult a specialist regarding Gallstone treatment. Please help me with an appointment.',
    doctorSpeciality: 'Hepato-Biliary & Laparoscopic Surgery',
    symptoms: [
      {
        id: 'ab-pain',
        name: 'Abdominal pain',
        description: 'Intense or cramping pain in the upper abdomen that may radiate toward the back or shoulder.',
        iconName: 'Activity',
      },
      {
        id: 'pain-eating',
        name: 'Pain after eating',
        description: 'Noticeable discomfort or heaviness occurring 30 to 60 minutes after consuming fatty or heavy meals.',
        iconName: 'Flame',
      },
      {
        id: 'nausea',
        name: 'Nausea',
        description: 'Persistent feeling of queasiness or stomach unease during acute abdominal episodes.',
        iconName: 'AlertCircle',
      },
      {
        id: 'vomiting',
        name: 'Vomiting',
        description: 'Bouts of vomiting accompanying sharp biliary colic episodes.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'right-ribs',
        name: 'Pain under the right ribs',
        description: 'Localized tenderness beneath the right rib cage where the gallbladder is situated.',
        iconName: 'Armchair',
      },
      {
        id: 'indigestion',
        name: 'Indigestion & Bloating',
        description: 'Frequent gas, acid reflux, or fullness even after modest meals.',
        iconName: 'Droplets',
      },
    ],
    diagramTitle: 'Understanding Gallstones (Cholelithiasis)',
    diagramDescription: 'Anatomical diagram depicting bile flow from the liver through the gallbladder and bile duct, showing where gallstones form and cause blockage.',
    treatmentOptions: [
      {
        title: 'Medical Evaluation & Observation',
        subtitle: 'Diagnostic Assessment',
        description: 'Comprehensive ultrasound imaging, liver function tests, and physician evaluation for asymptomatic or incidental gallstones.',
        suitableFor: 'Suitable for select silent stones with no active inflammation, subject to clinical judgment.',
        badge: 'Diagnostic Phase',
      },
      {
        title: 'Minimally Invasive Laparoscopy',
        subtitle: 'Laparoscopic Cholecystectomy',
        description: 'Standard surgical removal of the gallbladder using tiny keyhole incisions, high-definition camera guidance, and rapid recovery protocols.',
        suitableFor: 'Recommended for symptomatic gallstones to prevent recurring attacks, infection, or duct blockage.',
        badge: 'Gold Standard',
      },
      {
        title: 'Supportive & Post-Treatment Care',
        subtitle: 'Nutritional & Recovery Guidance',
        description: 'Structured dietary counseling, digestive monitoring, and systematic follow-up to ensure seamless transition back to daily nutrition.',
        suitableFor: 'Provided for all patients before and after treatment to safeguard digestive wellness.',
        badge: 'Complete Support',
      },
    ],
    faqs: [
      {
        question: 'What causes gallstones?',
        answer: 'Gallstones form when bile contains an imbalance of substances such as excess cholesterol, excess bilirubin, or insufficient bile salts, leading to crystallization within the gallbladder. Dietary patterns, genetics, age, and metabolic factors play key roles.',
      },
      {
        question: 'What are the symptoms of gallstones?',
        answer: 'Common symptoms include sharp or dull pain in the upper right abdomen, pain radiating to the shoulder blade after fatty meals, nausea, vomiting, indigestion, and bloating. Some people have silent gallstones with no symptoms.',
      },
      {
        question: 'When should I see a doctor?',
        answer: 'Seek medical evaluation if you have recurrent upper abdominal pain after meals, unprovoked nausea, or persistent discomfort. Immediate medical care is necessary if pain is accompanied by fever, chills, or yellowish tint in the eyes (jaundice).',
      },
      {
        question: 'Do all gallstones require surgery?',
        answer: 'Not all gallstones require immediate surgery. Asymptomatic stones discovered incidentally may be monitored under physician supervision. However, symptomatic gallstones that trigger biliary colic or inflammation generally require treatment to prevent complications.',
      },
      {
        question: 'What treatment options are available?',
        answer: 'Treatment options include medical evaluation with dietary modifications, supportive symptom relief, and minimally invasive laparoscopic cholecystectomy (gallbladder removal), which is the clinically established standard for symptomatic cases.',
      },
      {
        question: 'How is gallstone treatment decided?',
        answer: 'Treatment is decided based on a careful clinical examination, symptom severity, ultrasound findings, gallbladder wall thickness, and your overall health status evaluated by our surgical specialists.',
      },
      {
        question: 'How long does recovery take?',
        answer: 'Following laparoscopic gallbladder surgery, most patients are able to walk comfortably within hours, be discharged within 24 to 48 hours, and resume routine desk work and light activities within 5 to 7 days as advised by the doctor.',
      },
      {
        question: 'How can I book an appointment?',
        answer: 'You can book an appointment by filling out the online consultation form on this page, calling our Bangalore hospital helpline, or messaging us directly on WhatsApp.',
      },
    ],
  },

  hernia: {
    id: 'hernia',
    path: '/hernia-treatment',
    adKeyword: 'Hernia Treatment in Bangalore',
    title: 'Hernia Treatment in Bangalore | PUNYA Hospital',
    metaTitle: 'Hernia Treatment in Bangalore | PUNYA Hospital',
    metaDescription: 'Get evaluated by a qualified specialist and understand the right treatment option for your hernia at PUNYA Hospital, Bangalore. Advanced laparoscopic & open repair.',
    heroHeadline: 'Hernia Treatment in Bangalore',
    heroSupportingText: 'Get evaluated by a qualified specialist and understand the right treatment option for your hernia.',
    whatsappMessage: 'Hello PUNYA Hospital, I would like to consult a specialist regarding Hernia treatment. Please help me with an appointment.',
    doctorSpeciality: 'Hernia & Laparoscopic Surgery',
    symptoms: [
      {
        id: 'bulge',
        name: 'Bulge or swelling',
        description: 'A visible or palpable bulge in the groin, abdomen, or around the navel.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'pain-lifting',
        name: 'Pain while lifting',
        description: 'A dull ache or sharp strain felt when lifting heavy grocery bags or weights.',
        iconName: 'Flame',
      },
      {
        id: 'cough-discomfort',
        name: 'Discomfort while coughing',
        description: 'Pressure or sudden popping sensation in the hernia site during coughing or sneezing.',
        iconName: 'AlertCircle',
      },
      {
        id: 'heaviness',
        name: 'Heaviness in abdomen',
        description: 'A dragging sensation or fullness in the lower abdominal or groin area.',
        iconName: 'Activity',
      },
      {
        id: 'pain-standing',
        name: 'Pain while standing',
        description: 'Discomfort that builds up toward the end of the day after prolonged standing or walking.',
        iconName: 'Armchair',
      },
      {
        id: 'swelling-activity',
        name: 'Swelling that increases during activity',
        description: 'Bulge becomes more prominent when active and may reduce or disappear when lying down.',
        iconName: 'Droplets',
      },
    ],
    diagramTitle: 'Understanding Hernia (Abdominal Wall Defect)',
    diagramDescription: 'Anatomical illustration demonstrating the abdominal wall muscular layer, development of localized weakness, and tissue/bowel protrusion.',
    treatmentOptions: [
      {
        title: 'Observation & Supportive Care',
        subtitle: 'Early Clinical Supervision',
        description: 'Periodic clinical monitoring, activity adjustment guidance, and lifestyle counseling for small, asymptomatic reducible hernias.',
        suitableFor: 'Suitable for select patients under careful specialist evaluation before definitive repair.',
        badge: 'Clinical Monitoring',
      },
      {
        title: 'Minimally Invasive Laparoscopic Repair',
        subtitle: 'Keyhole Mesh Hernioplasty',
        description: 'Repair performed through miniature incisions using a laparoscopic camera and sterile synthetic mesh reinforcement.',
        suitableFor: 'Treatment options depending on diagnosis, clinical assessment, and hernia type (inguinal, umbilical, incisional).',
        badge: 'Minimally Invasive',
      },
      {
        title: 'Open Surgical Hernia Repair',
        subtitle: 'Targeted Mesh Repair',
        description: 'Direct anatomical repair with supportive tension-free mesh reinforcement for complex, recurrent, or large abdominal wall defects.',
        suitableFor: 'Recommended when clinically appropriate based on medical history and anatomical considerations.',
        badge: 'Conventional Option',
      },
    ],
    faqs: [
      {
        question: 'What causes a hernia?',
        answer: 'A hernia occurs when internal tissue or an organ pushes through a weakened spot in the surrounding muscle or connective tissue. Causes include congenital weakness, age-related tissue thinning, chronic cough, heavy weightlifting, straining from constipation, or prior surgical incisions.',
      },
      {
        question: 'What are the common symptoms?',
        answer: 'Common symptoms include a noticeable bulge in the groin, navel, or upper abdomen; aching pain or burning sensations at the bulge; increased discomfort when bending, lifting, or coughing; and a dragging feeling in the pelvis.',
      },
      {
        question: 'Can a hernia go away on its own?',
        answer: 'No, a hernia cannot heal or repair itself on its own because the underlying muscular defect requires structural closure. While symptoms may fluctuate, the physical defect remains until repaired.',
      },
      {
        question: 'Does every hernia require surgery?',
        answer: 'Not every hernia needs an immediate emergency procedure, but most symptomatic or expanding hernias are recommended for surgical repair to prevent complications such as obstruction or strangulation. A qualified doctor will evaluate your specific condition.',
      },
      {
        question: 'When should I consult a doctor?',
        answer: 'You should consult a doctor as soon as you notice a bulge or recurrent pain. Seek immediate emergency evaluation if the bulge becomes suddenly painful, firm, discolored, or cannot be gently pushed back, especially if accompanied by vomiting.',
      },
      {
        question: 'What treatment options are available?',
        answer: 'Treatment options at PUNYA Hospital include watchful observation for select early cases, advanced minimally invasive laparoscopic mesh repair (TAPP / TEP), and open mesh hernioplasty tailored to the patient’s anatomy.',
      },
      {
        question: 'How long does recovery take?',
        answer: 'With modern laparoscopic hernia repair, patients generally walk the same day, go home within 24 hours, and can resume desk-based work within 3 to 7 days. Strenuous lifting is usually resumed after 3 to 4 weeks under doctor guidance.',
      },
      {
        question: 'How do I book an appointment?',
        answer: 'You can book your consultation by completing the form on this page, calling our direct hospital line, or connecting with our team on WhatsApp for prompt assistance.',
      },
    ],
  },
};
