import { useNavigation } from '@react-navigation/native'
import { Button, StyleSheet, Text, View } from 'react-native'

export const UrlView = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text>This is the UrlView screen!</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
