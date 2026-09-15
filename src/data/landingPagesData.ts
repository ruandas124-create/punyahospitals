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
  'uterine-fibroids': {
    id: 'uterine-fibroids',
    path: '/uterine-fibroids',
    adKeyword: 'Uterine Fibroids Treatment in Bangalore',
    title: 'Uterine Fibroids Treatment in Bangalore | PUNYA Hospital',
    metaTitle: 'Uterine Fibroids Treatment in Bangalore | PUNYA Hospital',
    metaDescription: 'Get expert evaluation and personalised treatment options for uterine fibroids at PUNYA Hospital Bangalore. Modern diagnostics and compassionate women’s healthcare.',
    heroHeadline: 'Uterine Fibroids Treatment in Bangalore',
    heroSupportingText: 'Get expert evaluation and personalised treatment options for uterine fibroids at PUNYA Hospital.',
    whatsappMessage: 'Hello PUNYA Hospital, I would like to consult a specialist regarding uterine fibroids. Please help me with an appointment.',
    doctorSpeciality: 'Gynecology & Women’s Health',
    symptoms: [
      {
        id: 'heavy-bleeding',
        name: 'Heavy or prolonged menstrual bleeding',
        description: 'Excessive menstrual flow, passing blood clots, or bleeding episodes lasting longer than usual.',
        iconName: 'Droplets',
      },
      {
        id: 'pelvic-pressure',
        name: 'Pelvic pressure or discomfort',
        description: 'A constant feeling of heaviness, fullness, or chronic ache deep in the lower abdomen.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'abdominal-pain',
        name: 'Abdominal pain',
        description: 'Recurrent cramping or localized tenderness in the lower abdomen and pelvic area.',
        iconName: 'Flame',
      },
      {
        id: 'frequent-urination',
        name: 'Frequent urination',
        description: 'Need to urinate frequently caused by fibroids exerting pressure against the urinary bladder.',
        iconName: 'AlertCircle',
      },
      {
        id: 'back-pain',
        name: 'Lower back pain',
        description: 'Persistent dull lower back or posterior pelvic ache radiating toward the hips or legs.',
        iconName: 'Activity',
      },
      {
        id: 'period-discomfort',
        name: 'Period-related discomfort',
        description: 'Severe menstrual cramps (dysmenorrhea) and pain that interferes with day-to-day routines.',
        iconName: 'HeartHandshake',
      },
    ],
    diagramTitle: 'Understanding Uterine Fibroids',
    diagramDescription: 'Clear, non-graphic anatomical illustration explaining the normal uterus, fibroid positions, and classification: Submucosal, Intramural, and Subserosal.',
    treatmentOptions: [
      {
        title: 'Observation & Monitoring',
        subtitle: 'Watchful Clinical Waiting',
        description: 'For suitable patients who may not require immediate active intervention, with routine ultrasound check-ups to track growth.',
        suitableFor: 'Suitable for small, asymptomatic fibroids in patients approaching menopause or with stable clinical findings.',
        badge: 'Regular Monitoring',
      },
      {
        title: 'Medication-Based Management',
        subtitle: 'Symptom Relief & Medical Therapy',
        description: 'Treatment may be considered to help manage certain symptoms such as heavy bleeding and cramps, depending on the clinical situation.',
        suitableFor: 'Recommended for managing bleeding irregularities or reducing discomfort under specialist guidance.',
        badge: 'Medical Therapy',
      },
      {
        title: 'Minimally Invasive Treatment',
        subtitle: 'Organ-Preserving Advanced Care',
        description: 'Appropriate modern procedures (e.g. hysteroscopic resection or laparoscopic myomectomy) may be considered for selected patients.',
        suitableFor: 'Considered for patients wishing to preserve uterine anatomy with targeted fibroid removal.',
        badge: 'Minimally Invasive',
      },
      {
        title: 'Surgical Treatment',
        subtitle: 'Definitive Surgical Care',
        description: 'Surgery may be recommended depending on fibroid size, number, location, severity of symptoms, and individual health circumstances.',
        suitableFor: 'Decided after proper clinical evaluation by a qualified specialist based on individual patient health.',
        badge: 'Specialist Surgery',
      },
    ],
    faqs: [
      {
        question: 'What are uterine fibroids?',
        answer: 'Uterine fibroids (leiomyomas) are non-cancerous muscular growths that develop within or on the muscular wall of the uterus. They vary in size from microscopic nodules to larger masses, and a woman may have a single fibroid or multiple fibroids.',
      },
      {
        question: 'What causes uterine fibroids?',
        answer: 'The exact cause is not fully understood, but clinical research indicates that reproductive hormones (estrogen and progesterone), genetic predispositions, and cellular growth factors influence their development and growth during reproductive years.',
      },
      {
        question: 'What are the common symptoms?',
        answer: 'Common symptoms include heavy or prolonged menstrual bleeding, pelvic pressure or chronic fullness, lower abdominal pain, frequent urination, difficulty emptying the bladder, and lower back ache. However, many women have fibroids with no symptoms at all.',
      },
      {
        question: 'Can fibroids cause heavy periods?',
        answer: 'Yes. Fibroids that press against or distort the uterine lining (particularly submucosal and intramural fibroids) frequently lead to heavy menstrual bleeding, presence of blood clots, and prolonged menstrual cycles, which may lead to iron-deficiency anemia if left unaddressed.',
      },
      {
        question: 'Do all fibroids require treatment?',
        answer: 'No, not every fibroid requires treatment. Small, asymptomatic fibroids that do not interfere with daily life or fertility can often be monitored safely through periodic ultrasound imaging and specialist check-ups.',
      },
      {
        question: 'Can fibroids be treated without surgery?',
        answer: 'Yes, medication-based management can help regulate heavy bleeding and relieve pain for many patients. Your gynecologist will evaluate your symptoms, age, fertility preferences, and ultrasound scans to recommend whether medical management or observation is suitable.',
      },
      {
        question: 'When should I consult a gynecologist?',
        answer: 'You should consult a gynecologist if you experience unusually heavy bleeding, severe menstrual pain, pelvic fullness or pain, bleeding between periods, or symptoms that affect your quality of life or energy levels.',
      },
      {
        question: 'What tests are used to diagnose fibroids?',
        answer: 'A pelvic examination by a gynecologist along with a pelvic ultrasound (abdominal or transvaginal) is the standard diagnostic tool. In certain complex cases, an MRI or saline infusion sonogram (SIS) may be recommended for detailed mapping of the fibroids.',
      },
      {
        question: 'What treatment options are available?',
        answer: 'Treatment options at PUNYA Hospital include clinical observation & monitoring, medical symptom management, minimally invasive endoscopic or laparoscopic procedures (such as myomectomy), and definitive surgical options tailored to your specific clinical findings.',
      },
      {
        question: 'How do I book an appointment at PUNYA Hospital?',
        answer: 'You can easily book your consultation by submitting the quick form on this page, calling our direct hospital helpline, or messaging us on WhatsApp to speak with our women’s healthcare team.',
      },
    ],
  },
  endometriosis: {
    id: 'endometriosis',
    path: '/endometriosis',
    adKeyword: 'Endometriosis Treatment in Bangalore',
    title: 'Endometriosis Treatment in Bangalore | PUNYA Hospital',
    metaTitle: 'Endometriosis Treatment in Bangalore | PUNYA Hospital',
    metaDescription: 'Get expert evaluation and personalised care for endometriosis at PUNYA Hospital Bangalore. Comprehensive women’s healthcare with experienced gynecologists.',
    heroHeadline: 'Endometriosis Treatment in Bangalore',
    heroSupportingText: 'Get expert evaluation and personalised care for endometriosis at PUNYA Hospital.',
    whatsappMessage: 'Hello PUNYA Hospital, I would like to consult a specialist regarding endometriosis. Please help me with an appointment.',
    doctorSpeciality: 'Gynecology & Endometriosis Care',
    symptoms: [
      {
        id: 'painful-periods',
        name: 'Painful periods',
        description: 'Severe menstrual cramps and pelvic pain (dysmenorrhea) that may begin before and extend several days into your period.',
        iconName: 'Flame',
      },
      {
        id: 'pelvic-pain',
        name: 'Pelvic pain',
        description: 'Chronic pelvic pain and lower abdominal aching that may persist outside of the menstrual cycle.',
        iconName: 'ShieldAlert',
      },
      {
        id: 'pain-intercourse',
        name: 'Pain during or after intercourse',
        description: 'Deep pelvic pain experienced during or immediately following sexual intercourse (dyspareunia).',
        iconName: 'AlertCircle',
      },
      {
        id: 'pain-bowel',
        name: 'Pain during bowel movements',
        description: 'Painful bowel movements, particularly noticeable during or immediately around menstrual periods.',
        iconName: 'Activity',
      },
      {
        id: 'pain-urination',
        name: 'Pain during urination',
        description: 'Discomfort, urinary urgency, or burning sensations, particularly experienced around menstrual cycles.',
        iconName: 'Droplets',
      },
      {
        id: 'fertility-issues',
        name: 'Difficulty becoming pregnant',
        description: 'Challenges with fertility; endometriosis is sometimes first identified during clinical evaluation for conception difficulties.',
        iconName: 'HeartHandshake',
      },
    ],
    diagramTitle: 'Understanding Endometriosis',
    diagramDescription: 'Professional, non-graphic medical diagram showing the uterus, ovaries, fallopian tubes, and ectopic endometrial-like tissue implants.',
    treatmentOptions: [
      {
        title: 'Medical Management',
        subtitle: 'Targeted Clinical Therapy',
        description: 'Medication may be recommended depending on symptoms, age, and individual health circumstances to help manage inflammation and discomfort.',
        suitableFor: 'Suitable for initial clinical care and symptom regulation under specialist oversight.',
        badge: 'Medical Care',
      },
      {
        title: 'Pain & Symptom Management',
        subtitle: 'Multimodal Comfort Care',
        description: 'A personalised approach may be used to help manage symptoms and improve daily quality of life through tailored medical therapies.',
        suitableFor: 'Designed to relieve chronic pelvic discomfort and cycle-related pain effectively.',
        badge: 'Personalised Relief',
      },
      {
        title: 'Hormonal Treatment',
        subtitle: 'Endocrine Therapy Options',
        description: 'May be considered for suitable patients based on thorough medical evaluation to help slow the progression of endometrial-like tissue.',
        suitableFor: 'Evaluated individually taking reproductive plans and health history into account.',
        badge: 'Hormone Therapy',
      },
      {
        title: 'Surgical Treatment',
        subtitle: 'Laparoscopic Care in Selected Cases',
        description: 'Surgery may be considered in selected cases when clinically appropriate (e.g. diagnostic laparoscopy or targeted excision of lesions).',
        suitableFor: 'Recommended by qualified specialists when non-surgical approaches require definitive evaluation or intervention.',
        badge: 'Specialist Surgery',
      },
    ],
    faqs: [
      {
        question: 'What is endometriosis?',
        answer: 'Endometriosis is a condition in which tissue similar to the lining inside the uterus (the endometrium) grows outside the uterus—such as on the ovaries, fallopian tubes, outer uterine surface, and pelvic peritoneum. This ectopic tissue responds to hormonal changes, causing localized inflammation and pain.',
      },
      {
        question: 'What are the symptoms of endometriosis?',
        answer: 'Common symptoms include severe menstrual cramps, chronic pelvic pain, deep pain during or after intercourse, pain with bowel movements or urination around periods, fatigue, and difficulty becoming pregnant.',
      },
      {
        question: 'Why are periods painful with endometriosis?',
        answer: 'Endometrial-like tissue outside the uterus thickens, breaks down, and bleeds during each menstrual cycle just like normal uterine lining. Because this tissue has no exit route from the body, it becomes trapped, triggering inflammation, swelling, and nerve irritation.',
      },
      {
        question: 'Can endometriosis cause pelvic pain?',
        answer: 'Yes. Chronic pelvic pain is one of the hallmark characteristics of endometriosis. The ongoing inflammation and formation of internal scar tissue (adhesions) can cause persistent discomfort even between menstrual periods.',
      },
      {
        question: 'Can endometriosis affect fertility?',
        answer: 'Endometriosis can impact fertility in some women by causing pelvic adhesions, altering anatomical relationships between fallopian tubes and ovaries, or creating an inflammatory environment. However, many women with endometriosis do conceive successfully with proper medical evaluation and management.',
      },
      {
        question: 'How is endometriosis diagnosed?',
        answer: 'Diagnosis begins with a thorough clinical history and pelvic examination by a gynecologist. High-resolution ultrasound and pelvic MRI can identify endometriomas ("chocolate cysts") and deep infiltrating lesions. In select cases, minimally invasive laparoscopy provides definitive visualization and treatment.',
      },
      {
        question: 'Can endometriosis be managed without surgery?',
        answer: 'Yes. Many women achieve significant symptom relief through medical and hormonal therapies, including anti-inflammatory medications, oral contraceptives, progestin therapies, or hormonal IUDs, avoiding the immediate need for surgery.',
      },
      {
        question: 'When should I consult a gynecologist?',
        answer: 'You should consult a gynecologist if your period pain is severe enough to interfere with work, school, or daily life, if over-the-counter pain relievers do not provide adequate relief, or if you experience pain during intercourse or difficulty conceiving.',
      },
      {
        question: 'What treatment options are available?',
        answer: 'PUNYA Hospital provides comprehensive endometriosis care including medical pain management, hormonal therapies, nutritional and lifestyle guidance, and advanced laparoscopic surgery when clinically indicated.',
      },
      {
        question: 'How do I book an appointment at PUNYA Hospital?',
        answer: 'You can book your consultation by completing the quick appointment form on this page, calling our direct hospital line, or sending us a message on WhatsApp for personalized support.',
      },
    ],
  },
};
