import { memo, useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// ========================================
// 1. TYPE DEFINITIONS (Always at top)
// ========================================
interface Transaction {
  id: string
  amount: number
  description: string
  date: string
}

interface TransactionListProps {
  userId: string
}

// ========================================
// 2. MAIN COMPONENT (Clean structure)
// ========================================
const TransactionListInit = ({ userId }: TransactionListProps) => {
  // ----------------------------------------
  // A. STATE (Group related states together)
  // ----------------------------------------
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  // ----------------------------------------
  // B. LIFECYCLE (useEffect hooks)
  // ----------------------------------------

  // Mount: Fetch data when component loads
  useEffect(() => {
    fetchTransactions()
  }, []) // Runs once on mount

  // Update: Fetch when userId changes
  useEffect(() => {
    if (userId) {
      fetchTransactions()
    }
  }, [userId]) // Runs when userId updates

  // Cleanup: Cancel requests on unmount
  useEffect(() => {
    const abortController = new AbortController()

    return () => {
      abortController.abort() // Cleanup
      console.log('🔴 Component unmounted, requests cancelled')
    }
  }, [])

  // ----------------------------------------
  // C. FUNCTIONS (Business logic)
  // ----------------------------------------

  // Fetch transactions from API
  const fetchTransactions = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.example.com/transactions?userId=${userId}`,
      )
      const data = await response.json()
      setTransactions(data)
    } catch (err) {
      setError('Failed to load transactions')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchTransactions()
    setRefreshing(false)
  }, [userId])

  // Item click handler
  const handleItemPress = useCallback((transaction: Transaction) => {
    console.log('Transaction clicked:', transaction.id)
    // Navigate to details screen
  }, [])

  // ----------------------------------------
  // D. RENDER FUNCTIONS (UI components)
  // ----------------------------------------

  // Render each transaction item
  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleItemPress(item)}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.amount}>${item.amount}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </TouchableOpacity>
    ),
    [handleItemPress],
  )

  // Empty state
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No transactions yet</Text>
    </View>
  )

  // Loading state
  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    )
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchTransactions}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // ----------------------------------------
  // E. MAIN RENDER (JSX)
  // ----------------------------------------
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
          />
        }
      />
    </View>
  )
}

// ========================================
// 3. EXPORT WITH MEMO (Performance optimization)
// ========================================
export const TransactionList = memo(TransactionListInit)

// ========================================
// 4. STYLES (Always at bottom)
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
