import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from '../../hooks/useTheme'

type Job = {
  id: number
  title: string
  company_name: string
  candidate_required_location: string
  url: string
}

const JobsInit = (): React.ReactNode => {
  const { colors } = useTheme()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://remotive.com/api/remote-jobs')
        setJobs(res.data.jobs)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const renderItem = ({ item }: { item: Job }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.company, { color: colors.textSecondary }]}>
        {item.company_name} — {item.candidate_required_location}
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <Text style={[styles.link, { color: colors.primary }]}>View Job</Text>
      </TouchableOpacity>
    </View>
  )

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Loading jobs...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={jobs}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.list}
      style={{ backgroundColor: colors.background }}
    />
  )
}

export const Jobs = memo(JobsInit)

const styles = StyleSheet.create({
  list: { padding: 10 },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  company: { fontSize: 14, marginBottom: 6 },
  link: { fontSize: 14, fontWeight: '500' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
