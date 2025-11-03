import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const VisaTypesInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visa Types</Text>
      <Text style={styles.text}>
        Information about different UK visa types will go here.
      </Text>
    </View>
  )
}

export const VisaTypes = memo(VisaTypesInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})
