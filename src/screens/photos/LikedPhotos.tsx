import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'

const LikedPhotosInit = (): React.ReactNode => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Liked Photos - Coming Soon!
      </Text>
      <Text style={[styles.subtext, { color: colors.textSecondary }]}>
        Here we'll display your favorite photos
      </Text>
    </View>
  )
}

export const LikedPhotos = memo(LikedPhotosInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
  },
})
