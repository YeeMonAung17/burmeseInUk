import { memo } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useUsers } from '../hooks/login/useUsers'
import { useTheme } from '../hooks/useTheme'
import { useAppNavigation } from '../navigation/hooks/useNavigation'
import { Screen } from '../navigation/navigation'

const ChatListInit = (): React.ReactNode => {
  const { users, loading, error } = useUsers()
  const navigation = useAppNavigation()
  const { colors } = useTheme()

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2B3674" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    )
  }

  if (users.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No users found</Text>
        <Text style={styles.emptySubtext}>
          Other users need to sign up first!
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactRow}
            onPress={() =>
              navigation.navigate(Screen.CHAT, {
                contactId: item.id,
                contactName: item.displayName,
              })
            }>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{item.avatar || '👤'}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.displayName}</Text>
              <Text style={styles.contactEmail}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export const ChatList = memo(ChatListInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8ED',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B3674',
    marginBottom: 4,
  },
  contactEmail: {
    fontSize: 14,
    color: '#989898',
  },
})
