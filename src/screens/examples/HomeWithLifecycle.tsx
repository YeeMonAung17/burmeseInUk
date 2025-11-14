import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { memo, useCallback, useEffect, useState } from 'react'
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
import { useTheme } from '../hooks/useTheme'
import { AppNavigationParams } from '../navigation/navigation'
import { FontAwesome } from '../utils/icons/fontawesome'
import { News } from './home/News'

/**
 * Home Screen Component
 * Shows: News feed + Navigation tiles
 * Lifecycle: Logs mount/unmount, tracks screen views
 */
const HomeInit = (): React.ReactNode => {
  // ========================================
  // STATE & HOOKS
  // ========================================
  const { colors } = useTheme()
  const { background, text, surface } = colors
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigationParams>>()

  const { refreshing, onRefresh } = useRefresh(async () => {
    console.log('🔄 Refreshing Home screen...')
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('✅ Home screen refreshed!')
  })

  const [viewCount, setViewCount] = useState(0)

  // ========================================
  // LIFECYCLE HOOKS
  // ========================================

  // MOUNT: Component appears
  useEffect(() => {
    console.log('🟢 HOME MOUNTED: Screen loaded')
    setViewCount(prev => prev + 1)

    // Track screen view in analytics
    // analytics().logScreenView({ screen_name: 'Home' })

    return () => {
      // UNMOUNT: Component disappears
      console.log('🔴 HOME UNMOUNTED: User left screen')
    }
  }, []) // Empty array = runs once on mount

  // UPDATE: Track when user returns to screen
  useEffect(() => {
    if (viewCount > 0) {
      console.log(`👀 Home viewed ${viewCount} times`)
    }
  }, [viewCount])

  // ========================================
  // EVENT HANDLERS
  // ========================================

  // Handle tile press (wrapped in useCallback for performance)
  const handleTilePress = useCallback(
    (item: HomeItem) => {
      console.log('🎯 Tile pressed:', item.title)

      // Track tile click in analytics
      // analytics().logEvent('tile_click', { tile_name: item.title })

      navigation.navigate(item.screen as any)
    },
    [navigation],
  )

  // ========================================
  // RENDER FUNCTIONS
  // ========================================

  // Render each tile (memoized for performance)
  const renderItem = useCallback(
    ({ item }: { item: HomeItem }) => {
      const { screen, icon, color, title } = item

      return (
        <TouchableOpacity
          style={[styles.tile, { backgroundColor: surface }]}
          onPress={() => handleTilePress(item)}>
          <FontAwesome icon={icon} size={32} color={color} />
          <Text style={[styles.title, { color: text }]}>{title}</Text>
        </TouchableOpacity>
      )
    },
    [surface, text, handleTilePress],
  )

  // ========================================
  // MAIN RENDER
  // ========================================
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <FlatList
        data={homeData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<News topic="UK" title="📰 Latest UK News" />}
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

// ========================================
// EXPORT WITH MEMO (Prevents unnecessary re-renders)
// ========================================
export const Home = memo(HomeInit)

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  tile: {
    flex: 1,
    margin: 12,
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
