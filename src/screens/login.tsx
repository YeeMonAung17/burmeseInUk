import { memo, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useLogin } from '../hooks/login/useLogin'
import { useAppNavigation } from '../navigation/hooks/useNavigation'
import { Screen } from '../navigation/navigation'

const LoginInit = (): React.ReactNode => {
  const navigation = useAppNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')
  const { login, loading, error, user } = useLogin()

  useEffect(() => {
    if (user) {
      // Navigate to home on successful login
      navigation.navigate(Screen.HOME)
    }
  }, [user, navigation])

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error)
    }
  }, [error])

  const handleLogin = async () => {
    await login(email, password)
  }

  const handleGoBack = () => {
    console.log('Going back')
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Welcome to Burmese in UK 🇬🇧</Text>
      <TextInput
        keyboardType="email-address"
        style={styles.input}
        placeholder="Please Type your Email Here"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Please Type your PassWord Here"
        value={password}
        onChangeText={setPassWord}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={email.length === 0 || password.length < 8 || loading}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export const Login = memo(LoginInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#471616ff',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    padding: 40,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
})
