import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useState } from 'react'

interface UseLoginResult {
  login: (email: string, password: string) => Promise<void>
  loading: boolean
  error: string | null
  user: FirebaseAuthTypes.User | null
}

export const useLogin = (): UseLoginResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true)
    setError(null)

    console.log('🔐 Attempting login with email:', email)

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email.trim(),
        password,
      )
      setUser(userCredential.user)
      console.log('✅ Login successful! User ID:', userCredential.user.uid)
      console.log('📧 User email:', userCredential.user.email)
    } catch (err: any) {
      let errorMessage = 'An error occurred during login'

      console.log('❌ Login error code:', err.code)
      console.log('❌ Login error message:', err.message)

      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled'
          break
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password'
          break
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later'
          break
        default:
          errorMessage = err.message || errorMessage
      }

      setError(errorMessage)
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    loading,
    error,
    user,
  }
}
