import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { memo } from 'react'
import { Student } from '../screens/student'
import { Discounts } from '../screens/student/Discounts'
import { LifeAfterUni } from '../screens/student/LifeAfterUni'
import { StudentFAQ } from '../screens/student/StudentFAQ'
import { StudentForum } from '../screens/student/StudentForum'
import { StudentLife } from '../screens/student/StudentLife'
import { StudentMoneyTips } from '../screens/student/StudentMoneyTips'
import { Universities } from '../screens/student/Universities'
import { colors } from '../utils/master/colors'

export type StudentStackParams = {
  StudentHome: undefined
  StudentFAQ: undefined
  UniversitiesScreen: undefined
  DiscountsScreen: undefined
  LifeAfterUniScreen: undefined
  StudentForumScreen: undefined
  StudentLifeScreen: undefined
  StudentMoneyTipsScreen: undefined
}

const Stack = createNativeStackNavigator<StudentStackParams>()

const StudentNavigatorInit = (): React.ReactNode => {
  return (
    <Stack.Navigator
      initialRouteName="StudentHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: ' ',
        headerBackTitleStyle: {
          fontSize: 0,
        },
        presentation: 'card',
      }}>
      <Stack.Screen
        name="StudentHome"
        component={Student}
        options={{
          title: 'Student',
        }}
      />
      <Stack.Screen
        name="StudentFAQ"
        component={StudentFAQ}
        options={{
          title: 'Student FAQ',
        }}
      />
      <Stack.Screen
        name="UniversitiesScreen"
        component={Universities}
        options={{
          title: 'Universities',
        }}
      />
      <Stack.Screen
        name="DiscountsScreen"
        component={Discounts}
        options={{
          title: 'Discounts',
        }}
      />
      <Stack.Screen
        name="LifeAfterUniScreen"
        component={LifeAfterUni}
        options={{
          title: 'Life After Uni',
        }}
      />
      <Stack.Screen
        name="StudentForumScreen"
        component={StudentForum}
        options={{
          title: 'Student Forum',
        }}
      />
      <Stack.Screen
        name="StudentLifeScreen"
        component={StudentLife}
        options={{
          title: 'Student Life',
        }}
      />
      <Stack.Screen
        name="StudentMoneyTipsScreen"
        component={StudentMoneyTips}
        options={{
          title: 'Money-Saving Tips',
        }}
      />
    </Stack.Navigator>
  )
}

export const StudentNavigator = memo(StudentNavigatorInit)
