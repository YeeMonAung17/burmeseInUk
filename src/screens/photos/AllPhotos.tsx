import axios from 'axios'
import { memo, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'

interface Photo {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

const AllPhotosInit = (): React.ReactNode => {
  const { colors } = useTheme()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const fetchPhotos = async () => {
    if (loading) return
    try {
      setLoading(true)
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=8`,
      )
      setPhotos(prev => [...prev, ...response.data])
      setPage(prev => prev + 1)
    } catch (error) {
      console.log('Error fetching photos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  const renderItem = ({ item }: { item: Photo }) => (
    <View style={styles.photoCard}>
      <Image
        source={{ uri: item.download_url }}
        style={styles.photo}
        resizeMode="cover"
      />
      <Text style={[styles.author, { color: colors.text }]}>
        Photo by {item.author}
      </Text>
    </View>
  )

  return (
    <FlatList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      contentContainerStyle={styles.list}
      style={{ backgroundColor: colors.background }}
      onEndReached={fetchPhotos}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <Text style={{ textAlign: 'center', padding: 10 }}>Loading...</Text>
        ) : null
      }
    />
  )
}

export const AllPhotos = memo(AllPhotosInit)

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  photoCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  photo: {
    width: '100%',
    height: 300,
  },
  author: {
    padding: 12,
    fontSize: 14,
    fontWeight: '500',
  },
})
