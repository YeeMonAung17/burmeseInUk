import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ChatInit = (): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  )
}

export const Chat = memo(ChatInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
