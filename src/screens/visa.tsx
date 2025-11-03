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
import { visaData, VisaItem } from '../data/visaData'
import { useRefresh } from '../hooks/useRefresh'
import { VisaStackParams } from '../navigation/VisaNavigator'
import { FontAwesome } from '../utils/icons/fontawesome'

const VisaInit = (): React.ReactNode => {
  const navigation = useNavigation<NativeStackNavigationProp<VisaStackParams>>()

  const { refreshing, onRefresh } = useRefresh(async () => {
    console.log('🔄 Refreshing Visa screen...')
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('✅ Visa screen refreshed!')
  })

  const renderItem = ({ item }: { item: VisaItem }) => (
    <TouchableOpacity
      style={styles.tile}
      onPress={() => {
        console.log('Navigating to:', item.screen)
        navigation.navigate(item.screen as keyof VisaStackParams)
      }}>
      <FontAwesome icon={item.icon} size={32} color={item.color} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={visaData}
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

export const Visa = memo(VisaInit)

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
