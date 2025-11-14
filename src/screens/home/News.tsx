import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { AppNavigationParams, Screen } from '../../navigation/navigation'

interface NewsArticle {
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
}

interface NewsProps {
  topic: string
  title: string
}

type NewsNavigationProp = NativeStackNavigationProp<AppNavigationParams>

const NewsInit = ({ topic, title }: NewsProps): React.ReactNode => {
  const { colors } = useTheme()
  const navigation = useNavigation<NewsNavigationProp>()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(false)

  const fetchNews = async () => {
    if (loading) return

    setLoading(true)
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${topic}&language=en&apiKey=f35f590f68d9488ab793be65fe6b53ea&pageSize=5&sortBy=publishedAt`,
      )
      setNews(response.data.articles)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {news.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() =>
              navigation.navigate(Screen.URL_VIEW, { url: article.url })
            }>
            <Image
              source={{
                uri:
                  article.urlToImage || 'https://via.placeholder.com/300x200',
              }}
              style={styles.newsImage}
            />
            <Text
              style={[styles.newsTitle, { color: colors.text }]}
              numberOfLines={2}>
              {article.title}
            </Text>
            <Text
              style={[styles.newsDescription, { color: colors.textSecondary }]}
              numberOfLines={3}>
              {article.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
export const News = memo(NewsInit)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollView: {
    paddingLeft: 16,
  },
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    width: 200,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 100,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
    paddingBottom: 6,
  },
  newsDescription: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
})
