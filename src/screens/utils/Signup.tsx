import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { memo, useEffect, useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSignup } from '../../hooks/login/useSignup'
import { AppNavigationParams, Screen } from '../../navigation/navigation'

const SignupInit = (): React.ReactNode => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigationParams>>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const { signup, loading, error, user } = useSignup()

  // Navigate to home when signup is successful
  useEffect(() => {
    if (user) {
      console.log('🎉 User created successfully, navigating to home...')
      navigation.navigate(Screen.HOME as any)
    }
  }, [user, navigation])

  // Show error alert when signup fails
  useEffect(() => {
    if (error) {
      Alert.alert('Signup Failed', error)
    }
  }, [error])

  const handleSignup = async () => {
    console.log('Sign up pressed:', email)

    if (!/\S+@\S+\.\S+/.test(email)) {
      setConfirmPasswordError('Please enter a valid email address')
      return
    }

    if (password.length < 8) {
      setConfirmPasswordError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      return
    }

    setConfirmPasswordError('')

    // Call Firebase signup
    await signup(email, password)
  }

  const handleGoBack = () => {
    console.log('Going back to Welcome')
    navigation.goBack()
  }

  const isDisabled =
    email.length === 0 ||
    password.length < 8 ||
    password !== confirmPassword ||
    loading

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to Burmese in UK 🇬🇧</Text>

      <TextInput
        keyboardType="email-address"
        style={styles.input}
        placeholder="Please type your email"
        value={email}
        onChangeText={text => {
          setEmail(text)
          setConfirmPasswordError('')
        }}
      />

      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Please type your password"
        value={password}
        onChangeText={text => {
          setPassword(text)
          setConfirmPasswordError('')
        }}
      />

      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Please confirm your password"
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text)
          setConfirmPasswordError('')
        }}
      />

      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.button, isDisabled && styles.disabledButton]}
        disabled={isDisabled}
        onPress={handleSignup}>
        <Text style={styles.buttonText}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <View style={styles.loginPrompt}>
        <Text>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screen.LOGIN as any)}>
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const Signup = memo(SignupInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fb',
    padding: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginPrompt: {
    flexDirection: 'row',
    marginTop: 15,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    alignSelf: 'center',
  },
})
