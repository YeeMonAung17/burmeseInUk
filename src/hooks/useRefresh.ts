import { useCallback, useState } from 'react'

export const useRefresh = (onRefreshCallback?: () => Promise<void>) => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)

    try {
      // Execute the callback if provided
      if (onRefreshCallback) {
        await onRefreshCallback()
      } else {
        // Default: just wait 1 second
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (error) {
      console.error('Refresh error:', error)
    } finally {
      setRefreshing(false)
    }
  }, [onRefreshCallback])

  return { refreshing, onRefresh }
}
