import { RouteProp, useRoute } from '@react-navigation/native'
import { memo } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { useTheme } from '../../hooks/useTheme'
import { AppNavigationParams, Screen } from '../../navigation/navigation'

type UrlViewRouteProp = RouteProp<AppNavigationParams, Screen.URL_VIEW>

const UrlViewInit = () => {
  const route = useRoute<UrlViewRouteProp>()
  const { colors } = useTheme()
  const { url } = route.params

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color={colors.primary}
            size="large"
            style={styles.loading}
          />
        )}
      />
    </View>
  )
}

export const UrlView = memo(UrlViewInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
})
