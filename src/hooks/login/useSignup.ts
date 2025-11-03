import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useState } from 'react'

interface UseSignupResult {
  signup: (email: string, password: string) => Promise<void>
  loading: boolean
  error: string | null
  user: FirebaseAuthTypes.User | null
}

export const useSignup = (): UseSignupResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  const signup = async (email: string, password: string): Promise<void> => {
    setLoading(true)
    setError(null)

    console.log('📝 Attempting signup with email:', email)

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      )
      setUser(userCredential.user)

      console.log('✅ Signup successful! User ID:', userCredential.user.uid)
      console.log('📧 User email:', userCredential.user.email)

      // Optionally send email verification
      if (userCredential.user && !userCredential.user.emailVerified) {
        await userCredential.user.sendEmailVerification()
        console.log('📬 Verification email sent')
      }
    } catch (err: any) {
      let errorMessage = 'An error occurred during signup'

      console.log('❌ Signup error code:', err.code)
      console.log('❌ Signup error message:', err.message)

      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled'
          break
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Use at least 6 characters'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection'
          break
        default:
          errorMessage = err.message || errorMessage
      }

      setError(errorMessage)
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    signup,
    loading,
    error,
    user,
  }
}
