import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

/**
 * Component Lifecycle Example
 * Shows: Mount → Update → Unmount phases
 */
export const LifecycleExample = () => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<string[]>([])

  // ========================================
  // PHASE 1: MOUNT (runs once when component appears)
  // ========================================
  useEffect(() => {
    console.log('🟢 MOUNT: Component mounted!')

    // Fetch data from API
    const fetchData = async () => {
      console.log('📡 Fetching data...')
      const response = await fetch('https://api.example.com/data')
      const result = await response.json()
      setData(result)
    }

    fetchData()

    // This runs ONLY ONCE (empty dependency array [])
  }, []) // ← Empty array = mount only

  // ========================================
  // PHASE 2: UPDATE (runs when 'count' changes)
  // ========================================
  useEffect(() => {
    console.log('🟡 UPDATE: Count changed to:', count)

    // Track analytics when count changes
    // analytics.logEvent('counter_updated', { count })

    // This runs every time 'count' changes
  }, [count]) // ← Runs when count updates

  // ========================================
  // PHASE 3: UNMOUNT (cleanup when component disappears)
  // ========================================
  useEffect(() => {
    // Setup: Subscribe to WebSocket
    const socket = new WebSocket('wss://example.com')
    console.log('🔌 WebSocket connected')

    // Cleanup: Unsubscribe when component unmounts
    return () => {
      socket.close()
      console.log('🔴 UNMOUNT: WebSocket closed')
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>Count: {count}</Text>
      <Text>Data: {data.length} items</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
