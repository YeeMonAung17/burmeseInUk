import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const VisaFeesInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Processing Times & Fees</Text>
      <Text style={styles.text}>
        Visa processing times and fee information will go here.
      </Text>
    </View>
  )
}

export const VisaFees = memo(VisaFeesInit)

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
    color: '#FF9800',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})
