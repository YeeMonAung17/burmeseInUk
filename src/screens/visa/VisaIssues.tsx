import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const VisaIssuesInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Common Issues</Text>
      <Text style={styles.text}>
        Common visa problems and solutions will go here.
      </Text>
    </View>
  )
}

export const VisaIssues = memo(VisaIssuesInit)

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
    color: '#F44336',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})
