import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Visa } from '../screens/visa'
import { VisaApply } from '../screens/visa/VisaApply'
import { VisaFAQ } from '../screens/visa/VisaFAQ'
import { VisaFees } from '../screens/visa/VisaFees'
import { VisaIssues } from '../screens/visa/VisaIssues'
import { VisaLegal } from '../screens/visa/VisaLegal'
import { VisaLinks } from '../screens/visa/VisaLinks'
import { VisaTypes } from '../screens/visa/VisaTypes'
import { colors } from '../utils/master/colors'

export type VisaStackParams = {
  VisaHome: undefined
  VisaTypes: undefined
  VisaApply: undefined
  VisaFees: undefined
  VisaIssues: undefined
  VisaLinks: undefined
  VisaFAQ: undefined
  VisaLegal: undefined
}

const VisaStack = createNativeStackNavigator<VisaStackParams>()

export const VisaNavigator = () => {
  return (
    <VisaStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.offBlack,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerBackTitle: ' ',
        headerBackTitleStyle: {
          fontSize: 0,
        },
        presentation: 'card',
      }}>
      <VisaStack.Screen
        name="VisaHome"
        component={Visa}
        options={{
          title: 'Visa',
        }}
      />
      <VisaStack.Screen
        name="VisaTypes"
        component={VisaTypes}
        options={{ title: 'Visa Types' }}
      />
      <VisaStack.Screen
        name="VisaApply"
        component={VisaApply}
        options={{ title: 'How to Apply' }}
      />
      <VisaStack.Screen
        name="VisaFees"
        component={VisaFees}
        options={{ title: 'Processing Times & Fees' }}
      />
      <VisaStack.Screen
        name="VisaIssues"
        component={VisaIssues}
        options={{ title: 'Common Issues' }}
      />
      <VisaStack.Screen
        name="VisaLinks"
        component={VisaLinks}
        options={{ title: 'Helpful Links' }}
      />
      <VisaStack.Screen
        name="VisaFAQ"
        component={VisaFAQ}
        options={{ title: 'Visa FAQ' }}
      />
      <VisaStack.Screen
        name="VisaLegal"
        component={VisaLegal}
        options={{ title: 'Legal & Work Rights' }}
      />
    </VisaStack.Navigator>
  )
}
