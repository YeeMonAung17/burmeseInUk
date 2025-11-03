import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const VisaApplyInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Apply</Text>
      <Text style={styles.text}>
        Step-by-step visa application guide will go here.
      </Text>
    </View>
  )
}

export const VisaApply = memo(VisaApplyInit)

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
    color: '#2196F3',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})
