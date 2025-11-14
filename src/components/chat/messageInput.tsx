import { memo, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

type MessageInputProps = {
  onSend: (text: string) => void
}

const MessageInputInit = ({ onSend }: MessageInputProps): React.ReactNode => {
  const [text, setText] = useState('')
  const handleSend = () => {
    if (text.trim()) {
      onSend(text)
      setText('')
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message"
      />
      <Pressable style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  )
}

export const MessageInput = memo(MessageInputInit)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E8E8ED',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#2B3674',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
