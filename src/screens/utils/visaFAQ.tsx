import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const VisaFAQInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text>VisaFAQ</Text>
    </View>
  )
}

export const VisaFAQ = memo(VisaFAQInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
