import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

// Export Firebase services
export { auth, firestore }

// Helper to get current user
export const getCurrentUser = () => {
  return auth().currentUser
}

// Helper to get users collection
export const getUsersCollection = () => {
  return firestore().collection('users')
}

// Helper to get messages collection
export const getMessagesCollection = () => {
  return firestore().collection('messages')
}
