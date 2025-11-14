import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import chatReducer from './slices/chatSlice'
import themeReducer from './slices/themeSlice'

// Configure the Redux store
export const store = configureStore({
  reducer: {
    theme: themeReducer, // Add theme slice to store
    chat: chatReducer, // Add chat slice to store
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for React Native AsyncStorage
    }),
})

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
