import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { memo, useMemo, useRef, useState } from 'react'
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AppNavigationParams, Screen } from '../../navigation/navigation'

const WelcomeInit = (): JSX.Element => {
  const backgroundUrl =
    'https://www.myanmar-responsiblebusiness.org/media/images/articles/2015-04-02-britain-burma.jpg'

  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigationParams>>()

  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['40%'], [])

  // State to track whether user pressed Sign Up or Login (to change sheet content)
  const [authMode, setAuthMode] = useState<'signup' | 'login' | null>(null)

  const openProviderSheet = (mode: 'signup' | 'login') => {
    setAuthMode(mode)
    bottomSheetRef.current?.present()
  }

  // Handlers for when user selects an auth provider
  const handleEmail = () => {
    bottomSheetRef.current?.dismiss()
    if (authMode === 'signup') {
      navigation.navigate(Screen.SIGNUP as any)
    } else if (authMode === 'login') {
      navigation.navigate(Screen.LOGIN as any)
    }
  }

  const handleGoogle = () => {
    // TODO: Implement Google OAuth flow here
    bottomSheetRef.current?.dismiss()
    console.log(`Google ${authMode} pressed`)
  }

  return (
    <ImageBackground source={{ uri: backgroundUrl }} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Burmese in UK</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => openProviderSheet('signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => openProviderSheet('login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}>
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>
            {authMode === 'signup' ? 'Sign Up' : 'Login'}
          </Text>

          <TouchableOpacity style={styles.providerButton} onPress={handleEmail}>
            <Text style={styles.providerText}>Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.providerButton}
            onPress={handleGoogle}>
            <Text style={styles.providerText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* You can add more providers here */}
        </BottomSheetView>
      </BottomSheetModal>
    </ImageBackground>
  )
}

export const Welcome = memo(WelcomeInit)

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#471616ff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sheetContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  providerButton: {
    backgroundColor: '#ededed',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  providerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
