import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LifeAfterUniInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Life After Uni</Text>
      <Text style={styles.subtitle}>Coming soon...</Text>
    </View>
  )
}

export const LifeAfterUni = memo(LifeAfterUniInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
})
