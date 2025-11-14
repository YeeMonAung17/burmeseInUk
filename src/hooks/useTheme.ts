import { useAppSelector } from '../store/hooks'

export const useTheme = () => {
  const darkMode = useAppSelector(state => state.theme.darkMode)

  return {
    darkMode,
    colors: {
      // Backgrounds
      background: darkMode ? '#000000' : '#ffffff',
      card: darkMode ? '#1c1c1e' : '#f8f8f8',
      surface: darkMode ? '#2c2c2e' : '#f0f0f0',

      // Text
      text: darkMode ? '#ffffff' : '#0c0c0c',
      textSecondary: darkMode ? '#aaaaaa' : '#777777',

      // UI Elements
      border: darkMode ? '#2c2c2e' : '#e0e0e0',
      primary: darkMode ? '#0a84ff' : '#007AFF',
      success: darkMode ? '#30d158' : '#4CAF50',
      warning: darkMode ? '#ff9f0a' : '#FF9800',
      error: darkMode ? '#ff453a' : '#f44336',

      // Tab bar / Navigation
      tabBar: darkMode ? '#1c1c1e' : '#f8f8f8',
      header: darkMode ? '#000000' : '#ffffff',
    },
  }
}
