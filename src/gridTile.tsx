import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { memo } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useTheme } from './hooks/useTheme'
import { FontAwesome } from './utils/icons/fontawesome'

type GridTileProps = {
  icon: IconProp
  title: string
  color: string
  onPress: () => void
}

const GridTileInit = ({
  icon,
  title,
  color,
  onPress,
}: GridTileProps): React.ReactNode => {
  const { colors } = useTheme()
  const { surface, text } = colors

  return (
    <Pressable
      style={[styles.tile, { backgroundColor: surface }]}
      onPress={onPress}>
      <FontAwesome icon={icon} size={32} color={color} />
      <Text style={[styles.title, { color: text }]}>{title}</Text>
    </Pressable>
  )
}

export const GridTile = memo(GridTileInit)

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    height: 140,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
