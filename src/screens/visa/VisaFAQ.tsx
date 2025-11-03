import { memo, useState } from 'react'
import {
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { visaFAQData } from '../../data/visaFAQData'
import { FeatherIcon } from '../../utils/icons/fontawesome'

const VisaFAQInit = (): React.ReactNode => {
  const [searchText, setSearchText] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredFAQs = visaFAQData.filter(
    item =>
      item.question.toLowerCase().includes(searchText.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchText.toLowerCase()),
  )
  const toggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  const renderItem = ({
    item,
  }: {
    item: { id: string; question: string; answer: string }
  }) => {
    const isExpanded = item.id === expandedId

    return (
      <View style={styles.faqWrap}>
        <TouchableOpacity
          onPress={() => toggle(item.id)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityState={{ expanded: isExpanded }}
          style={styles.questionRow}>
          <Text style={styles.question}>{item.question}</Text>
          <Text style={styles.chev}>{isExpanded ? '▾' : '▸'}</Text>
        </TouchableOpacity>

        {isExpanded && <Text style={styles.answer}>{item.answer}</Text>}
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Find answers to the most common visa questions.
      </Text>
      <View style={styles.searchContainer}>
        <FeatherIcon name="search" size={20} color="#999" />

        <TextInput
          autoFocus={true}
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredFAQs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matching questions found.</Text>
        }
      />
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>
          Can’t find the answer you’re looking for?
        </Text>

        <Pressable
          style={styles.helpButton}
          onPress={() =>
            Linking.openURL(
              'mailto:support@yourapp.com?subject=Visa FAQ Inquiry',
            )
          }>
          <Text style={styles.helpButtonText}>Contact Support</Text>
        </Pressable>
      </View>
    </View>
  )
}

export const VisaFAQ = memo(VisaFAQInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },

  // FAQ row styles
  faqWrap: {
    marginBottom: 12,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  chev: {
    fontSize: 18,
    color: '#999',
  },
  answer: {
    marginTop: 10,
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40,
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  helpText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  helpButton: {
    backgroundColor: '#cfb911ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  helpButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})
