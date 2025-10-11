import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* to delete */}
      <Text>BURMESE IN UK</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // to delete
    justifyContent: 'center',
    alignItems: 'center',
  },
})
