import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { memo } from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { homeData, HomeItem } from '../data/homeData'
import { GridTile } from '../gridTile'
import { useRefresh } from '../hooks/useRefresh'
import { useTheme } from '../hooks/useTheme'
import { AppNavigationParams } from '../navigation/navigation'
import { News } from './home/News'

const HomeInit = (): React.ReactNode => {
  const { colors } = useTheme()
  const { background } = colors
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigationParams>>()

  const { refreshing, onRefresh } = useRefresh(async () => {
    console.log('🔄 Refreshing Home screen...')
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('✅ Home screen refreshed!')
  })

  const renderItem = ({ item }: { item: HomeItem }) => {
    const { icon, title, color, screen } = item

    return (
      <GridTile
        icon={icon}
        title={title}
        color={color}
        onPress={() => {
          console.log('Navigating to:', screen)
          navigation.navigate(screen as any)
        }}
      />
    )
  }

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

export const Home = memo(HomeInit)

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
})
