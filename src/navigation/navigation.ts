export enum Screen {
  //Welcome
  WELCOME = 'Welcome',

  //Login
  LOGIN = 'Login',

  //SignUP
  SIGNUP = 'Signup',

  //TabScreens
  HOME = 'Home',
  VISA = 'Visa',
  STUDENT = 'Student',
  CHAT = 'Chat',
  CHAT_LIST = 'ChatList',
  PROFILE = 'Profile',
  EDIT_PROFILE = 'EditProfile',

  //Photo Gallery
  PHOTO_GALLERY = 'PhotoGallery',

  //Home Screens
  GROCERY = 'Grocery',

  //Job
  JOBS = 'Jobs',

  //Utils
  URL_VIEW = 'Url view',
}

export type AppNavigationParams = {
  //Welcome
  [Screen.WELCOME]: undefined
  //Login
  [Screen.LOGIN]: undefined
  //SignUp
  [Screen.SIGNUP]: undefined

  //TabScreens
  [Screen.HOME]: undefined
  [Screen.VISA]: undefined
  [Screen.STUDENT]: undefined
  [Screen.CHAT]: { contactId: string; contactName: string }
  [Screen.CHAT_LIST]: undefined

  [Screen.PROFILE]: undefined
  [Screen.EDIT_PROFILE]: undefined

  //Photo Gallery
  [Screen.PHOTO_GALLERY]: undefined

  //Home Screens
  [Screen.GROCERY]: undefined
  [Screen.JOBS]: undefined

  //Utils
  [Screen.URL_VIEW]: { url: string }
}

export enum TabRoute {
  HOME_TAB = 'Home tab',
  VISA_TAB = 'Visa tab',
  STUDENT_TAB = 'Student tab',
  CHAT_TAB = 'Chat tab',
  PROFILE_TAB = 'Profile tab',
}

export type TabParams = {
  [TabRoute.HOME_TAB]: undefined
  [TabRoute.VISA_TAB]: undefined
  [TabRoute.STUDENT_TAB]: undefined
  [TabRoute.CHAT_TAB]: undefined
  [TabRoute.PROFILE_TAB]: undefined
}
