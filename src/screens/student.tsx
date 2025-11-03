import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { memo } from 'react'
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { studentData, StudentItem } from '../data/studentPageData'
import { useRefresh } from '../hooks/useRefresh'
import { StudentStackParams } from '../navigation/StudentNavigator'
import { FontAwesome } from '../utils/icons/fontawesome'

const StudentInit = (): React.ReactNode => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StudentStackParams>>()

  const { refreshing, onRefresh } = useRefresh(async () => {
    console.log('🔄 Refreshing Student screen...')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('✅ Student screen refreshed!')
  })

  const renderItem = ({ item }: { item: StudentItem }) => (
    <TouchableOpacity
      style={styles.tile}
      onPress={() => {
        console.log('Navigating to:', item.screen)
        navigation.navigate(item.screen as keyof StudentStackParams)
      }}>
      <FontAwesome icon={item.icon} size={32} color={item.color} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={studentData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
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
