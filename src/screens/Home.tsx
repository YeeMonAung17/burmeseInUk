import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { memo } from 'react'
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { homeData, HomeItem } from '../data/homeData'
import { useRefresh } from '../hooks/useRefresh'
import { AppNavigationParams } from '../navigation/navigation'
import { FontAwesome } from '../utils/icons/fontawesome'

const HomeInit = (): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigationParams>>()

  const { refreshing, onRefresh } = useRefresh(async () => {
    console.log('🔄 Refreshing Home screen...')
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('✅ Home screen refreshed!')
  })

  const renderItem = ({ item }: { item: HomeItem }) => (
    <TouchableOpacity
      style={styles.tile}
      onPress={() => {
        console.log('Navigating to:', item.screen)
      }}>
      <FontAwesome icon={item.icon} size={32} color={item.color} />

      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={homeData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
      />
    </View>
  )
}

export const Home = memo(HomeInit)

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  tile: {
    flex: 1,
    margin: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    height: 140,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
