import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBriefcase,
  faBuildingColumns,
  faBus,
  faCartShopping,
  faHouse,
  faHouseMedical,
  faMoneyBillTransfer,
} from '@fortawesome/free-solid-svg-icons'

export type HomeItem = {
  id: string
  title: string
  screen: string
  icon: IconDefinition
  color: string
}

export const homeData: HomeItem[] = [
  {
    id: '1',
    title: 'Bank',
    screen: 'BankScreen',
    icon: faBuildingColumns,
    color: '#4CAF50',
  },
  {
    id: '2',
    title: 'Job',
    screen: 'JobScreen',
    icon: faBriefcase,
    color: '#2196F3',
  },
  {
    id: '3',
    title: 'Money Transfer',
    screen: 'TransferScreen',
    icon: faMoneyBillTransfer,
    color: '#FF9800',
  },
  {
    id: '4',
    title: 'Transport',
    screen: 'TransportScreen',
    icon: faBus,
    color: '#9C27B0',
  },
  {
    id: '5',
    title: 'Health',
    screen: 'HealthScreen',
    icon: faHouseMedical,
    color: '#F44336',
  },
  {
    id: '6',
    title: 'Accommodation',
    screen: 'AccommodationScreen',
    icon: faHouse,
    color: '#607D8B',
  },
  {
    id: '7',
    title: 'Grocery',
    screen: 'GroceryScreen',
    icon: faCartShopping,
    color: '#4CAF50',
  },
]
