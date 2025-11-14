import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { memo } from 'react'
import { Home } from '../screens/Home'
import { Grocery } from '../screens/home/Grocery'
import { Jobs } from '../screens/home/Jobs'
import { MoneyTransfer } from '../screens/home/moneyTransfer'
import { PhotoGallery } from '../screens/PhotoGallery'
import { HeaderProfileButton } from '../screens/utils/HeaderProfileButton'
import { colors } from '../utils/master/colors'

export type HomeStackParams = {
  HomeMain: undefined
  GroceryScreen: undefined
  PhotoGalleryScreen: undefined
  MoneyTransferScreen: undefined
}

const Stack = createNativeStackNavigator<HomeStackParams>()

const HomeNavigatorInit = (): React.ReactNode => {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.offBlack,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}>
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{
          title: 'Home',
          headerRight: () => <HeaderProfileButton />,
        }}
      />
      <Stack.Screen
        name="GroceryScreen"
        component={Grocery}
        options={{ title: 'UK Groceries' }}
      />
      <Stack.Screen
        name="PhotoGalleryScreen"
        component={PhotoGallery}
        options={{ title: 'Photo Gallery' }}
      />
      <Stack.Screen
        name="MoneyTransferScreen"
        component={MoneyTransfer}
        options={{ title: 'Money Transfer' }}
      />
      <Stack.Screen
        name="JobScreen"
        component={Jobs}
        options={{ title: 'Jobs' }}
      />
    </Stack.Navigator>
  )
}

export const HomeNavigator = memo(HomeNavigatorInit)
