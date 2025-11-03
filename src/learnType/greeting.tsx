import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  name: string
  age: number
}

const GreetingInit = ({ name, age }: Props): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text>
        Hello {name} are you {age} years old?
      </Text>
    </View>
  )
}

export const Greeting = memo(GreetingInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
