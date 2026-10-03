import { ConditionId } from '../types';

export const TREATMENT_URLS: Record<ConditionId, string> = {
  piles: '/piles-treatment',
  gallstone: '/gallstone-treatment',
  hernia: '/hernia-treatment',
  'uterine-fibroids': '/uterine-fibroids',
  endometriosis: '/endometriosis',
};

export interface TreatmentMeta {
  id: ConditionId;
  name: string;
  shortName: string;
  tag: string;
  url: string;
  doctor: string;
  description: string;
  badge: string;
}

export const ALL_TREATMENTS: TreatmentMeta[] = [
  {
    id: 'piles',
    name: 'Piles Treatment',
    shortName: 'Piles',
    tag: 'Laser Proctology & Daycare Care',
    url: '/piles-treatment',
    doctor: 'Dr. Nagaraj B. Puttaswamy',
    description: 'Advanced laser hemorrhoidoplasty and modern daycare treatment for painful or bleeding piles with minimal recovery time.',
    badge: 'Treatment Page 1',
  },
  {
    id: 'gallstone',
    name: 'Gallstone Treatment',
    shortName: 'Gallstones',
    tag: 'Single-Incision & Laparoscopic Care',
    url: '/gallstone-treatment',
    doctor: 'Dr. Nagaraj B. Puttaswamy',
    description: 'Precision laparoscopic cholecystectomy for symptomatic gallbladder stones and acute biliary colic.',
    badge: 'Treatment Page 2',
  },
  {
    id: 'hernia',
    name: 'Hernia Treatment',
    shortName: 'Hernia',
    tag: 'Advanced 3D Mesh Repair',
    url: '/hernia-treatment',
    doctor: 'Dr. Nagaraj B. Puttaswamy',
    description: 'TAPP & TEP laparoscopic repair for inguinal, umbilical, and incisional hernias with high patient comfort.',
    badge: 'Treatment Page 3',
  },
  {
    id: 'uterine-fibroids',
    name: 'Uterine Fibroids Care',
    shortName: 'Fibroids',
    tag: "Women's Health & Laparoscopy",
    url: '/uterine-fibroids',
    doctor: 'Dr. Punyavathi C. Nagaraj',
    description: 'Fertility-preserving laparoscopic myomectomy and specialized fibroid management by senior lady gynecologist.',
    badge: 'Treatment Page 4',
  },
  {
    id: 'endometriosis',
    name: 'Endometriosis Care',
    shortName: 'Endometriosis',
    tag: 'Pelvic Pain & Advanced Laparoscopy',
    url: '/endometriosis',
    doctor: 'Dr. Punyavathi C. Nagaraj',
    description: 'Expert excision of deep infiltrating endometriosis and comprehensive chronic pelvic pain relief.',
    badge: 'Treatment Page 5',
  },
];

export function resolveConditionFromPath(pathname: string): ConditionId {
  const path = pathname.toLowerCase();
  if (path.includes('uterine-fibroids') || path.includes('fibroid')) {
    return 'uterine-fibroids';
  }
  if (path.includes('endometriosis')) {
    return 'endometriosis';
  }
  if (path.includes('gallstone')) {
    return 'gallstone';
  }
  if (path.includes('hernia')) {
    return 'hernia';
  }
  if (path.includes('piles')) {
    return 'piles';
  }
  // Default to piles if on root
  return 'piles';
}
