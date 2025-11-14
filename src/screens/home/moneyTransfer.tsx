import axios from 'axios'
import { memo, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { useNoti } from '../../hooks/useNoti'

const MoneyTransferInit = (): React.ReactNode => {
  // State
  const [exchangeRate, setExchangeRate] = useState(5000) // 1 GBP = 5000 MMK (placeholder)
  const [amount, setAmount] = useState('')
  const [isGBPtoMMK, setIsGBPtoMMK] = useState(true)
  const [loading, setLoading] = useState(true) // Add loading state

  const { showNoti } = useNoti()

  const handleSwap = () => {
    setIsGBPtoMMK(!isGBPtoMMK)
  }

  const fetchExchangeRate = async () => {
    setLoading(true) // Start loading
    try {
      const response = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/GBP',
      )
      const newRate = response.data.rates.MMK

      setExchangeRate(response.data.rates.MMK)
      console.log('✅ Rate loaded:', response.data.rates.MMK)
      await showNoti(
        '💱 Exchange Rate Update',
        `1 GBP = ${newRate.toLocaleString()} MMK`,
      )
    } catch (error) {
      console.log('❌ Error loading rate:', error)
    } finally {
      setLoading(false) // Stop loading
    }
  }

  useEffect(() => {
    fetchExchangeRate()
  }, [])

  // Calculate converted amount
  const convertedAmount = amount
    ? (isGBPtoMMK
        ? parseFloat(amount) * exchangeRate
        : parseFloat(amount) / exchangeRate
      ).toFixed(2)
    : '0'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <Text style={styles.subtitles}>
        Simple and fast conversion for your money transfers
      </Text>
      <View style={styles.card}>
        {/* Amount Input */}
        <Text style={styles.label}>Amount</Text>
        <View style={styles.currencyRow}>
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>{isGBPtoMMK ? '🇬🇧' : '🇲🇲'}</Text>
          </View>
          <Text style={styles.currencyCode}>{isGBPtoMMK ? 'GBP' : 'MMK'}</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Divider Line with Swap Button */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <Text style={styles.swapIcon}>⇅</Text>
          </TouchableOpacity>
          <View style={styles.dividerLine} />
        </View>

        {/* Converted Amount Result */}
        <Text style={styles.label}>Converted Amount</Text>
        <View style={styles.currencyRow}>
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>{isGBPtoMMK ? '🇲🇲' : '🇬🇧'}</Text>
          </View>
          <Text style={styles.currencyCode}>{isGBPtoMMK ? 'MMK' : 'GBP'}</Text>
          <Text style={styles.amountInput}>
            {convertedAmount
              ? parseFloat(convertedAmount).toLocaleString()
              : '0'}
          </Text>
        </View>
      </View>

      {/* Exchange Rate - Below the card */}
      <Text style={styles.exchangeRateLabel}>Indicative Exchange Rate</Text>
      <Text style={styles.exchangeRateText}>
        {loading
          ? 'Loading...'
          : isGBPtoMMK
          ? `1 GBP = ${exchangeRate.toLocaleString()} MMK`
          : `1 MMK = ${(1 / exchangeRate).toFixed(6)} GBP`}
      </Text>
    </View>
  )
}

export const MoneyTransfer = memo(MoneyTransferInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#E8E8ED',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1F2261',
  },
  subtitles: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: '#808080',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20, // 20px from left and right
    marginTop: 30,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  label: {
    color: '#989898',
    fontSize: 15,
    fontWeight: '400',
  },
  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: 24, // Makes it circular
    backgroundColor: '#F5F5F7', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  flag: {
    fontSize: 28,
  },
  currencyRow: {
    flexDirection: 'row', // ← This makes everything horizontal!
    alignItems: 'center', // Vertically center items
    marginTop: 16,
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B3674',
    marginRight: 'auto', // Pushes amount to the right
  },
  amountInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B3674',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  swapButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2B3674',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  swapIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  exchangeRateLabel: {
    fontSize: 14,
    color: '#989898',
    textAlign: 'center',
    marginTop: 24,
    fontWeight: '400',
  },
  exchangeRateText: {
    fontSize: 18,
    color: '#2B3674',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
})
