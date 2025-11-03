import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const VisaLegalInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Legal & Work Rights</Text>
      <Text style={styles.text}>
        Information about legal rights and work permissions will go here.
      </Text>
    </View>
  )
}

export const VisaLegal = memo(VisaLegalInit)

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
    color: '#607D8B',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})
