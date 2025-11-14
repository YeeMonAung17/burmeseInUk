import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type MessageBubbleProps = {
  text: string
  isMe: boolean
  userName?: string
}

const MessageBubbleInit = ({
  text,
  isMe,
  userName,
}: MessageBubbleProps): React.ReactNode => {
  return (
    <View
      style={[styles.container, isMe ? styles.myMessage : styles.theirMessage]}>
      {!isMe && userName && <Text style={styles.userName}>{userName}</Text>}
      <Text style={[styles.text, { color: isMe ? '#fff' : '#2B3674' }]}>
        {text}
      </Text>
    </View>
  )
}

export const MessageBubble = memo(MessageBubbleInit)

const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e5c61bff',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8ED',
  },
  userName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
})
