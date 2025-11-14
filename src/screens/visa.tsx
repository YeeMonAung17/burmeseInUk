import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { memo } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { visaData, VisaItem } from '../data/visaData'
import { GridTile } from '../gridTile'
import { useRefresh } from '../hooks/useRefresh'
import { useTheme } from '../hooks/useTheme'
import { VisaStackParams } from '../navigation/VisaNavigator'
import { News } from './home/News'

const VisaInit = (): React.ReactNode => {
  const { colors } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<VisaStackParams>>()

  const { refreshing, onRefresh } = useRefresh(async () => {
    console.log('🔄 Refreshing Visa screen...')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('✅ Visa screen refreshed!')
  })

  const renderItem = ({ item }: { item: VisaItem }) => {
    const { icon, title, color, screen } = item

    return (
      <GridTile
        icon={icon}
        title={title}
        color={color}
        onPress={() => {
          console.log('Navigating to:', screen)
          navigation.navigate(screen as keyof VisaStackParams)
        }}
      />
    )
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={visaData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <News topic="UK visa immigration" title="🛂 Visa News" />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
      />
    </View>
  )
}

export const Visa = memo(VisaInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
})
