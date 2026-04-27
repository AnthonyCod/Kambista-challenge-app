import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { Button } from '@/components/ui/Button';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { colors } from '@/constants/colors';
import { Currency } from '@/types';
import { formatCurrency, parseCurrencyString } from '@/utils/formatters';

export default function HomeScreen() {
  const {
    amount,
    fromCurrency,
    toCurrency,
    rates,
    couponCode,
    setAmount,
    setCouponCode,
    swap,
    fetchRates,
  } = useCalculatorStore();

  const [localAmount, setLocalAmount] = useState('');
  const [localCoupon, setLocalCoupon] = useState(couponCode);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const handleAmountChange = (text: string) => {
    setLocalAmount(text);
    const numValue = parseCurrencyString(text);
    setAmount(numValue);
  };

  const handleApplyCoupon = () => {
    setCouponCode(localCoupon);
  };

  const handleSwap = () => {
    swap();
    setLocalAmount('');
  };

  const handleStartOperation = () => {
    router.push('/(app)/transaction/complete');
  };


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo-kambista.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Rate Tabs */}
        <View style={styles.rateCard}>
          <View style={styles.rateTabs}>
            <TouchableOpacity
              style={[styles.rateTab, activeTab === 'buy' && styles.rateTabActive]}
              onPress={() => setActiveTab('buy')}
            >
              <Text
                style={[
                  styles.rateTabText,
                  activeTab === 'buy' && styles.rateTabTextActive,
                ]}
              >
                Compra: {rates?.buyRate.toFixed(3) || '3.321'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rateTab, activeTab === 'sell' && styles.rateTabActive]}
              onPress={() => setActiveTab('sell')}
            >
              <Text
                style={[
                  styles.rateTabText,
                  activeTab === 'sell' && styles.rateTabTextActive,
                ]}
              >
                Venta: {rates?.sellRate.toFixed(3) || '3.321'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calculator */}
        <View style={styles.calculatorCard}>
          {/* Amount You Send */}
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>¿Cuánto envías?</Text>
            <View style={styles.amountInputRow}>
              <TextInput
                style={styles.amountInput}
                value={localAmount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
              />
              <TouchableOpacity
                style={styles.currencyButton}
                onPress={() => {
                  /* Show currency picker */
                }}
              >
                <Text style={styles.currencyText}>
                  {fromCurrency === 'USD' ? 'Dólares' : 'Soles'} ▼
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Swap Button */}
          <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <Ionicons name="swap-vertical" size={24} color={colors.white} />
          </TouchableOpacity>

          {/* Amount You Receive */}
          <View style={[styles.amountContainer, styles.receiveContainer]}>
            <Text style={styles.receiveLabel}>Entonces recibes</Text>
            <View style={styles.amountInputRow}>
              <Text style={styles.receiveAmount}>
                {formatCurrency(rates?.calculatedAmount || 37000, toCurrency)}
              </Text>
              <TouchableOpacity
                style={styles.currencyButton}
                onPress={() => {
                  /* Show currency picker */
                }}
              >
                <Text style={styles.receiveCurrencyText}>
                  {toCurrency === 'USD' ? 'Dólares' : 'Soles'} ▼
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Savings & Koins */}
        <View style={styles.savingsRow}>
          <Text style={styles.savingsText}>
            Ahorro estimado:{' '}
            <Text style={styles.savingsAmount}>
              S/ {formatCurrency(rates?.estimatedSaving || 555, 'PEN')}
            </Text>
          </Text>
          <Text style={styles.koinsText}>Koins: {rates?.koins || 10000}</Text>
        </View>

        {/* Coupon */}
        <View style={styles.couponContainer}>
          <TextInput
            style={styles.couponInput}
            value={localCoupon}
            onChangeText={setLocalCoupon}
            placeholder="Ingresa tu cupón"
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity
            style={styles.couponButton}
            onPress={handleApplyCoupon}
          >
            <Text style={styles.couponButtonText}>APLICAR</Text>
          </TouchableOpacity>
        </View>

        {/* Preferential Rate Banner */}
        <InfoBanner
          variant="warning"
          message="¿Monto mayor a $5,000 o S/18,000? ¡Obtén un Tipo de Cambio Preferencial!"
          icon={false}
        />

        {/* Start Operation Button */}
        <Button
          title="INICIAR OPERACIÓN"
          onPress={handleStartOperation}
          style={styles.startButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 180,
    height: 60,
  },
  rateCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  rateTabs: {
    flexDirection: 'row',
  },
  rateTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  rateTabActive: {
    backgroundColor: colors.primary,
  },
  rateTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  rateTabTextActive: {
    color: colors.white,
  },
  calculatorCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  amountContainer: {
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountInput: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 1,
  },
  currencyButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  currencyText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  swapButton: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  receiveContainer: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 0,
  },
  receiveLabel: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 8,
  },
  receiveAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
  },
  receiveCurrencyText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  savingsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  savingsAmount: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  koinsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  couponContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: colors.white,
  },
  couponButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  couponButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  startButton: {
    marginTop: 8,
  },
});
