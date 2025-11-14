import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { memo, useCallback, useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useAppNavigation } from '../navigation/hooks/useNavigation'
import { Screen } from '../navigation/navigation'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleDarkMode } from '../store/slices/themeSlice'
import { FeatherIcon } from '../utils/icons/fontawesome'

const ProfileInit = (): React.ReactNode => {
  const navigation = useAppNavigation()

  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
  })

  useFocusEffect(
    useCallback(() => {
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
    }, []),
  )
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
    language: 'en',
  })
  const darkMode = useAppSelector(state => state.theme.darkMode)
  const dispatch = useAppDispatch()

  const editProfile = () => {
    navigation.navigate(Screen.EDIT_PROFILE)
  }

  // 🎨 Dark mode colors
  const isDark = darkMode
  const bgColor = isDark ? '#000000' : '#ffffff'
  const sectionBg = isDark ? '#121212' : '#f8f8f8'
  const rowBg = isDark ? '#1c1c1e' : '#f2f2f2'
  const textColor = isDark ? '#ffffff' : '#0c0c0c'
  const subTextColor = isDark ? '#aaaaaa' : '#777777'

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <ScrollView>
        {/* Profile Section */}
        <View style={[styles.profile, { backgroundColor: sectionBg }]}>
          <View style={styles.profileAvatarWrapper}>
            <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />

            <TouchableOpacity onPress={editProfile}>
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={[styles.profileName, { color: textColor }]}>
            {user.name}
          </Text>
          <Text style={[styles.profileEmail, { color: subTextColor }]}>
            {user.email}
          </Text>
          <Text style={[styles.profileBio, { color: subTextColor }]}>
            {user.bio}
          </Text>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: subTextColor }]}>
            Preferences
          </Text>

          {/* Language */}
          <TouchableOpacity
            onPress={() => {
              const newLanguage = form.language === 'en' ? 'my' : 'en'
              setForm({ ...form, language: newLanguage })
            }}
            style={[styles.row, { backgroundColor: rowBg }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
              <FeatherIcon color="#fff" name="globe" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: textColor }]}>
              Language
            </Text>
            <View style={styles.rowSpacer} />
            <Text style={[styles.languageText, { color: textColor }]}>
              {form.language === 'en' ? 'English' : 'ဗမာ'}
            </Text>
            <FeatherIcon
              color={isDark ? '#888' : '#C6C6C6'}
              name="chevron-right"
              size={20}
            />
          </TouchableOpacity>

          {/* Dark Mode */}
          <View style={[styles.row, { backgroundColor: rowBg }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: textColor }]}>
              Dark Mode
            </Text>
            <View style={styles.rowSpacer} />
            <Switch
              value={darkMode}
              onValueChange={() => {
                dispatch(toggleDarkMode())
              }}
            />
          </View>

          {/* Email Notifications */}
          <View style={[styles.row, { backgroundColor: rowBg }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: textColor }]}>
              Email Notifications
            </Text>
            <View style={styles.rowSpacer} />
            <Switch
              value={form.emailNotifications}
              onValueChange={emailNotifications =>
                setForm({ ...form, emailNotifications })
              }
            />
          </View>

          {/* Push Notifications */}
          <View style={[styles.row, { backgroundColor: rowBg }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: textColor }]}>
              Push Notifications
            </Text>
            <View style={styles.rowSpacer} />
            <Switch
              value={form.pushNotifications}
              onValueChange={pushNotifications =>
                setForm({ ...form, pushNotifications })
              }
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: subTextColor }]}>
            Support
          </Text>

          <TouchableOpacity style={[styles.row, { backgroundColor: rowBg }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
              <FeatherIcon color="#fff" name="flag" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: textColor }]}>
              Report a Bug
            </Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color={isDark ? '#888' : '#C6C6C6'}
              name="chevron-right"
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.row, { backgroundColor: rowBg }]}>
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon color="#fff" name="mail" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: textColor }]}>
              Contact Us
            </Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color={isDark ? '#888' : '#C6C6C6'}
              name="chevron-right"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export const Profile = memo(ProfileInit)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profile: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  profileAvatarWrapper: { position: 'relative' },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileAction: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  profileEmail: {
    marginTop: 4,
    fontSize: 16,
    color: '#777',
  },
  profileBio: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: { paddingHorizontal: 24, marginTop: 20 },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { fontSize: 16, color: '#0c0c0c' },
  rowSpacer: { flexGrow: 1 },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 8,
  },
})
