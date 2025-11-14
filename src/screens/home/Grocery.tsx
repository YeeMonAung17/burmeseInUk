import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo, useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { groceryData, GroceryStore } from '../../data/groceryData'
import { useTheme } from '../../hooks/useTheme'
import { AppNavigationParams, Screen } from '../../navigation/navigation'

type GroceryNavigationProp = NativeStackNavigationProp<AppNavigationParams>

const GroceryInit = (): React.ReactNode => {
  const { colors } = useTheme()
  const navigation = useNavigation<GroceryNavigationProp>()
  const [groceries, setGroceries] = useState<GroceryStore[]>([])

  useEffect(() => {
    setGroceries(groceryData)
  }, [])

  const renderItem = ({ item }: { item: GroceryStore }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.name, { color: colors.text }]}>
        {item.name} ({item.priceLevel})
      </Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {item.description}
      </Text>
      <Text style={[styles.tips, { color: colors.textSecondary }]}>
        Tips: {item.tips}
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Screen.URL_VIEW, { url: item.website })
        }>
        <Text style={[styles.website, { color: colors.primary }]}>
          Visit website
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <FlatList
      data={groceries}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      style={{ backgroundColor: colors.background }}
    />
  )
}

export const Grocery = memo(GroceryInit)

const styles = StyleSheet.create({
  list: { padding: 10 },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  description: { fontSize: 14, marginBottom: 6 },
  tips: { fontSize: 13, fontStyle: 'italic', marginBottom: 6 },
  website: { fontSize: 14, fontWeight: '500' },
})
