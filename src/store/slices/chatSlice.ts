import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Message } from '../../types/chat'

interface ChatState {
  messages: Message[]
}

const initialState: ChatState = {
  messages: [],
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Set all messages (for loading initial data)
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },

    // Add a single message
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },

    // Clear all messages
    clearMessages: state => {
      state.messages = []
    },
  },
})

// Export actions
export const { setMessages, addMessage, clearMessages } = chatSlice.actions

// Export reducer
export default chatSlice.reducer
