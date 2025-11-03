import { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from './Button'

interface Props {
  label: string
  onTab: () => void
}

const AppButtonInit = ({ label, onTab }: Props): React.ReactNode => {
  return (
    <View style={styles.container}>
      <Button title={label} onPress={onTab} />
    </View>
  )
}

export const AppButton = memo(AppButtonInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
