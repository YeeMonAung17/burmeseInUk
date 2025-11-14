import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'
import type { User } from '../../types/chat'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const currentUser = auth().currentUser
        if (!currentUser) throw new Error('Not logged in')

        const snapshot = await firestore().collection<User>('users').get()

        const list = snapshot.docs
          .map(
            doc =>
              ({
                id: doc.id,
                ...doc.data(),
              } as User),
          )
          .filter(user => user.id !== currentUser.uid)

        setUsers(list)
      } catch (err: any) {
        console.error('Error fetching users:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return { users, loading, error }
}
