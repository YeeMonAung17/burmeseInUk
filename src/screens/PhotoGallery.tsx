import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../hooks/useTheme'
import { AllPhotos } from './photos/AllPhotos'
import { LikedPhotos } from './photos/LikedPhotos'

const Tab = createMaterialTopTabNavigator()

const PhotoGalleryInit = (): React.ReactNode => {
  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.card,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },
        }}>
        <Tab.Screen
          name="AllPhotos"
          component={AllPhotos}
          options={{ tabBarLabel: 'All Photos' }}
        />
        <Tab.Screen
          name="LikedPhotos"
          component={LikedPhotos}
          options={{ tabBarLabel: 'Liked Photos' }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export const PhotoGallery = memo(PhotoGalleryInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
