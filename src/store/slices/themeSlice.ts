import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the shape of our theme state
interface ThemeState {
  darkMode: boolean
}

// Initial state
const initialState: ThemeState = {
  darkMode: false,
}

// Create the slice
export const themeSlice = createSlice({
  name: 'theme', // Name of the slice
  initialState,
  reducers: {
    // Action to toggle dark mode on/off
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
    },
    // Action to set dark mode to a specific value
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
  },
})

// Export actions (you'll use these in components)
export const { toggleDarkMode, setDarkMode } = themeSlice.actions

// Export reducer (you'll use this in store)
export default themeSlice.reducer
