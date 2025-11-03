import { StackNavigationProp } from '@react-navigation/stack'
import { AppNavigationParams } from '../navigation'
import { useNavigation } from '@react-navigation/native'

export const useAppNavigation = () =>
  useNavigation<StackNavigationProp<AppNavigationParams>>()
