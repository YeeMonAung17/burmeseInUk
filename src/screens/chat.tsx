import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { memo, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { MessageBubble } from '../components/chat/messageBubble'
import { MessageInput } from '../components/chat/messageInput'
import { useTheme } from '../hooks/useTheme'

import { Message } from '../types/chat'

type ChatProps = {
  route: {
    params: {
      contactId: string
      contactName: string
    }
  }
}

const ChatInit = ({ route }: ChatProps): React.ReactNode => {
  const { colors } = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const currentUser = auth().currentUser

  // Always get contactId after hooks
  const contactId = route?.params?.contactId

  useEffect(() => {
    if (!currentUser || !contactId) return

    const chatId =
      currentUser.uid < contactId
        ? `${currentUser.uid}_${contactId}`
        : `${contactId}_${currentUser.uid}`

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map((doc: any) => doc.data() as Message)
        setMessages(data)
        setLoading(false)
      })

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [contactId, currentUser?.uid])

  if (!contactId) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}>
        <MessageBubble text="No contact selected." isMe={false} />
      </View>
    )
  }

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <MessageBubble text="Loading..." isMe={false} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            isMe={item.userId === currentUser?.uid}
            userName={item.userName}
          />
        )}
        contentContainerStyle={styles.messageList}
      />
      <MessageInput onSend={handleSend} />
    </View>
  )
}

export const Chat = memo(ChatInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    padding: 8,
    paddingBottom: 16,
  },
})
