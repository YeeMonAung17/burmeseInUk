import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { RootNavigation } from './src/navigation/rootNavigation'
import { globalStyle } from './src/utils/master/globalStyles'

export const App = () => {
  return (
    <GestureHandlerRootView style={globalStyle.flex}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
