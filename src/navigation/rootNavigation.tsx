import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Chat } from '../screens/chat'
import { ChatList } from '../screens/chatlist'
import { Grocery } from '../screens/home/Grocery'
import { Jobs } from '../screens/home/Jobs'
import { Login } from '../screens/login'
import { PhotoGallery } from '../screens/PhotoGallery'
import { Profile } from '../screens/profile'
import { Student } from '../screens/student'
import { EditProfile } from '../screens/utils/Editprofile'
import { Signup } from '../screens/utils/Signup'
import { UrlView } from '../screens/utils/urlView'
import { Welcome } from '../screens/utils/Welcome'
import {
  FontAwesome,
  fasAddressCard,
  fasComment,
  fasGraduationCap,
  fasHouse,
  fasPassport,
} from '../utils/icons/fontawesome'
import { colors } from '../utils/master/colors'
import { SPACE } from '../utils/master/constants'
import { globalStyle } from '../utils/master/globalStyles'
import { getSize } from '../utils/master/globalUtilityFunctionsAndConstants'
import { HomeNavigator } from './HomeNavigator'
import { AppNavigationParams, Screen, TabParams, TabRoute } from './navigation'
import { StudentNavigator } from './StudentNavigator'
import { VisaNavigator } from './VisaNavigator'

export const AppStack = createNativeStackNavigator<AppNavigationParams>()

const AppTabs = createBottomTabNavigator<TabParams>()

export const TabsNavigation = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={globalStyle.flex}>
      <AppTabs.Navigator
        initialRouteName={TabRoute.HOME_TAB}
        detachInactiveScreens
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            backgroundColor: colors.offBlack,
            borderTopWidth: 0,
            elevation: 0,
            paddingBottom: insets.bottom,
            zIndex: 1000,
            paddingTop: SPACE[12],
          },

          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.white50,
        }}>
        <AppTabs.Screen
          name={TabRoute.VISA_TAB}
          component={VisaNavigator}
          listeners={{
            tabPress: () => {},
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome
                icon={fasPassport}
                color={color}
                size={getSize(24)}
              />
            ),
            tabBarLabel: () => {
              return null // This hides the tab label
            },
          }}
        />
        <AppTabs.Screen
          name={TabRoute.STUDENT_TAB}
          component={StudentNavigator}
          listeners={{
            tabPress: () => {},
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome
                icon={fasGraduationCap}
                color={color}
                size={getSize(24)}
              />
            ),
            tabBarLabel: () => {
              return null // This hides the tab label
            },
          }}
        />
        <AppTabs.Screen
          name={TabRoute.HOME_TAB}
          component={HomeNavigator}
          listeners={{
            tabPress: () => {},
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome icon={fasHouse} color={color} size={getSize(24)} />
            ),
            tabBarLabel: () => {
              return null // This hides the tab label
            },
          }}
        />

        <AppTabs.Screen
          name={TabRoute.PROFILE_TAB}
          component={Profile}
          listeners={{
            tabPress: () => {},
          }}
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome
                icon={fasAddressCard}
                color={color}
                size={getSize(24)}
              />
            ),
            tabBarLabel: () => {
              return null // This hides the tab label
            },
          }}
        />
        <AppTabs.Screen
          name={TabRoute.CHAT_TAB}
          component={ChatList}
          listeners={{
            tabPress: () => {},
          }}
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome icon={fasComment} color={color} size={getSize(24)} />
            ),
            tabBarLabel: () => {
              return null
            },
          }}
        />
      </AppTabs.Navigator>
      {/* <LinearGradient
        colors={[colors.offBlack01, colors.offBlack]}
        style={[styles.gradientOverlay, { bottom: 45 + insets.bottom }]}
      /> */}
    </View>
  )
}

export const RootNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName={Screen.WELCOME}
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.transparent, // --- for android bar (to keep the original color)
        header: () => null, // --- for customize the header (we do not use it for now)
        gestureEnabled: false,
        animation: 'fade',
        orientation: 'portrait',
        headerBackTitle: '', // Global setting for all screens - just show arrow
      }}>
      {/* Welcome */}
      <AppStack.Screen name={Screen.WELCOME} component={Welcome} />
      {/* Login */}
      <AppStack.Screen name={Screen.LOGIN} component={Login} />

      {/* Sign Up*/}
      <AppStack.Screen name={Screen.SIGNUP} component={Signup} />

      {/* TabScreens */}
      <AppStack.Screen name={Screen.HOME} component={TabsNavigation} />

      <AppStack.Screen name={Screen.STUDENT} component={Student} />
      <AppStack.Screen name={Screen.CHAT_LIST} component={ChatList} />
      <AppStack.Screen name={Screen.CHAT} component={Chat} />
      <AppStack.Screen name={Screen.PROFILE} component={Profile} />
      <AppStack.Screen name={Screen.EDIT_PROFILE} component={EditProfile} />

      {/* Photo Gallery */}
      <AppStack.Screen name={Screen.PHOTO_GALLERY} component={PhotoGallery} />

      {/* Home Screens */}
      <AppStack.Screen
        name={Screen.GROCERY}
        component={Grocery}
        options={{
          header: undefined,
          headerShown: true,
          headerTitle: 'Grocery Stores',
          headerStyle: { backgroundColor: colors.offBlack },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '600', fontSize: 18 },
          headerBackTitle: '',
          gestureEnabled: true,
        }}
      />

      <AppStack.Screen
        name={Screen.JOBS}
        component={Jobs}
        options={{ title: 'Job List' }}
      />

      {/* Utils */}
      <AppStack.Screen
        name={Screen.URL_VIEW}
        component={UrlView}
        options={{
          header: undefined,
          headerShown: true,
          headerTitle: 'Website',
          headerStyle: { backgroundColor: colors.offBlack },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '600', fontSize: 18 },
          headerBackTitle: '', // Just show arrow, no text
          gestureEnabled: true,
        }}
      />
    </AppStack.Navigator>
  )
}
