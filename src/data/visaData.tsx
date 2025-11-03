import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faClock,
  faExclamationTriangle,
  faFileAlt,
  faLink,
  faPassport,
  faQuestionCircle,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'

export type VisaItem = {
  id: string
  title: string
  screen: string
  icon: IconDefinition
  color: string
}

export const visaData: VisaItem[] = [
  {
    id: '1',
    title: 'Visa Types',
    screen: 'VisaTypes',
    icon: faPassport,
    color: '#4CAF50',
  },
  {
    id: '2',
    title: 'How to Apply',
    screen: 'VisaApply',
    icon: faFileAlt,
    color: '#2196F3',
  },
  {
    id: '3',
    title: 'Processing Times & Fees',
    screen: 'VisaFees',
    icon: faClock,
    color: '#FF9800',
  },
  {
    id: '4',
    title: 'Common Issues',
    screen: 'VisaIssues',
    icon: faExclamationTriangle,
    color: '#F44336',
  },
  {
    id: '5',
    title: 'Helpful Links',
    screen: 'VisaLinks',
    icon: faLink,
    color: '#00BCD4',
  },
  {
    id: '6',
    title: 'FAQ',
    screen: 'VisaFAQ',
    icon: faQuestionCircle,
    color: '#9C27B0',
  },
  {
    id: '7',
    title: 'Legal & Work Rights',
    screen: 'VisaLegal',
    icon: faUserTie,
    color: '#607D8B',
  },
]
