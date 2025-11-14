import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { memo } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { studentData, StudentItem } from '../data/studentPageData'
import { GridTile } from '../gridTile'
import { useRefresh } from '../hooks/useRefresh'
import { useTheme } from '../hooks/useTheme'
import { StudentStackParams } from '../navigation/StudentNavigator'
import { News } from './home/News'

const StudentInit = (): React.ReactNode => {
  const { colors } = useTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<StudentStackParams>>()

  const { refreshing, onRefresh } = useRefresh(async () => {
    console.log('🔄 Refreshing Student screen...')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('✅ Student screen refreshed!')
  })

  const renderItem = ({ item }: { item: StudentItem }) => {
    const { icon, title, color, screen } = item

    return (
      <GridTile
        icon={icon}
        title={title}
        color={color}
        onPress={() => {
          console.log('Navigating to:', screen)
          navigation.navigate(screen as keyof StudentStackParams)
        }}
      />
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={studentData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <News topic="UK student university" title="� Student News" />
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

export const Student = memo(StudentInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
})
