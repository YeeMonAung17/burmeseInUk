import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { Provider } from 'react-redux'
import { RootNavigation } from './src/navigation/rootNavigation'
import { useAppSelector } from './src/store/hooks'
import { store } from './src/store/store'
import { globalStyle } from './src/utils/master/globalStyles'

const AppWrapper = () => {
  const darkMode = useAppSelector(state => state.theme.darkMode)

  return (
    <GestureHandlerRootView style={globalStyle.flex}>
      <BottomSheetModalProvider>
        <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
          <RootNavigation />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  )
}
