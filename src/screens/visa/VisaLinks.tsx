import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const VisaLinksInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Helpful Links</Text>
      <Text style={styles.text}>
        Useful visa-related links and resources will go here.
      </Text>
    </View>
  )
}

export const VisaLinks = memo(VisaLinksInit)

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
    color: '#00BCD4',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})
