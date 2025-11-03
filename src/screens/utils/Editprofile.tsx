import AsyncStorage from '@react-native-async-storage/async-storage'

import { memo, useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppNavigation } from '../../navigation/hooks/useNavigation'

const EditProfileInit = (): JSX.Element => {
  const navigation = useAppNavigation()
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
  })

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value })
  }

  const handleSave = async () => {
    try {
      const userToSave = {
        ...user,
        name: `${user.firstName} ${user.lastName}`, // Add name
      }
      await AsyncStorage.setItem('userdata', JSON.stringify(userToSave))
      Alert.alert('Success', 'Profile updated successfully!')
      navigation.goBack() // go back to profile screen
    } catch (error) {
      console.error('Failed to save user data:', error)
      Alert.alert('Error', 'Failed to save profile. Please try again.')
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('userdata')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }
    loadUserData()
  }, [])

  const handleGoBack = () => {
    console.log('Going back')
    navigation.goBack()
  }

  const requestPhotoPermissions = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

      const result = await request(permission)

      if (result === RESULTS.GRANTED) {
        console.log('Photo library permission granted')
        openImagePicker()
      } else if (result === RESULTS.DENIED) {
        Alert.alert(
          'Permission Denied',
          'You need to allow access to your photo library to change your profile picture.',
        )
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Photo library permission is blocked. Please enable it in Settings.',
        )
      }
    } catch (error) {
      console.error('Permission request error:', error)
      Alert.alert('Error', 'Failed to request permission')
    }
  }

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage)
          Alert.alert('Error', 'Failed to pick image: ' + response.errorMessage)
        } else if (response.assets && response.assets[0].uri) {
          const imageUri = response.assets[0].uri
          console.log('Image URI:', imageUri)
          setUser({ ...user, avatar: imageUri })
        }
      },
    )
  }

  const handlePickImage = async () => {
    await requestPhotoPermissions()
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Edit Profile</Text>

        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handlePickImage}
          activeOpacity={0.7}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.changeAvatarText}>Change Photo</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={user.firstName}
          onChangeText={v => handleChange('firstName', v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={user.lastName}
          onChangeText={v => handleChange('lastName', v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={user.email}
          onChangeText={v => handleChange('email', v)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export const EditProfile = memo(EditProfileInit)

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#621717ff',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#2c2d2eff',
    borderRadius: 8,
    zIndex: 100,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  changeAvatarText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
})
