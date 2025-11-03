import { memo } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

interface Props {
  title: string
  firstName: string
  lastName?: string
  yearsOfStudy?: number
  addYearsOfStudy?: () => void
  removeYearsOfStudy: () => void
}

const PersonInit = ({
  title,
  firstName,
  lastName = '',
  yearsOfStudy = 0,
  addYearsOfStudy = () => {},
  removeYearsOfStudy,
}: Props): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{firstName}</Text>
      {!!lastName && <Text>{lastName}</Text>}
      <Text>Years of study: {yearsOfStudy}</Text>
      <Button title="removeYearsOfStudy" onPress={removeYearsOfStudy} />
      <Button title="addYears" onPress={addYearsOfStudy} />
    </View>
  )
}

export const Person = memo(PersonInit)

const styles = StyleSheet.create({
  container: {},
})
