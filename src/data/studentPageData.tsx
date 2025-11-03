import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBook,
  faBriefcase,
  faCircleQuestion,
  faGraduationCap,
  faPiggyBank,
  faTag,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
export type StudentItem = {
  id: string
  title: string
  screen: string
  icon: IconDefinition
  color: string
}

export const studentData: StudentItem[] = [
  {
    id: '1',
    title: 'Universities',
    screen: 'UniversitiesScreen',
    icon: faGraduationCap,
    color: '#2196F3',
  },
  {
    id: '2',
    title: 'Discounts',
    screen: 'DiscountsScreen',
    icon: faTag,
    color: '#FF5722',
  },
  {
    id: '3',
    title: 'Life After Uni',
    screen: 'LifeAfterUniScreen',
    icon: faBriefcase,
    color: '#9C27B0',
  },
  {
    id: '4',
    title: 'Student Forum',
    screen: 'StudentForumScreen',
    icon: faUsers,
    color: '#00BCD4',
  },
  {
    id: '5',
    title: 'Student Life',
    screen: 'StudentLifeScreen',
    icon: faBook,
    color: '#4CAF50',
  },
  {
    id: '6',
    title: 'Money-Saving Tips',
    screen: 'StudentMoneyTipsScreen',
    icon: faPiggyBank,
    color: '#FFC107',
  },
  {
    id: '7',
    title: 'FAQ',
    screen: 'StudentFAQ',
    icon: faCircleQuestion,
    color: '#FF9800',
  },
]
