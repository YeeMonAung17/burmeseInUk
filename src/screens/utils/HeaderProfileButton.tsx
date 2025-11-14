import { memo } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppNavigation } from '../../navigation/hooks/useNavigation'
import { Screen } from '../../navigation/navigation'

const HeaderProfileButtonInit = (): React.ReactNode => {
  const navigation = useAppNavigation()

  // Local image - stored in assets folder
  const avatarImage = require('../../../assets/avatar.jpg')
  const size = 32

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(Screen.PROFILE)}
      style={styles.container}
      activeOpacity={0.7}>
      <Image
        source={avatarImage}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    </TouchableOpacity>
  )
}

export const HeaderProfileButton = memo(HeaderProfileButtonInit)

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    padding: 0,
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#f0f0f0',
  },
})
