import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { useTransactionFlow } from '@/hooks/useTransactionFlow';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { AddAccountModal } from '@/components/modals/AddAccountModal';
import { colors } from '@/constants/colors';
import { BANKS, FUND_ORIGINS } from '@/constants/banks';
import { FundOrigin } from '@/types';
import { formatCurrency } from '@/utils/formatters';

export default function TransactionCompleteScreen() {
  const { amount, fromCurrency, toCurrency, rates, couponCode } = useCalculatorStore();
  const {
    bankFrom,
    accountTo,
    fundOrigin,
    accounts,
    setBankFrom,
    setAccountTo,
    setFundOrigin,
    addAccount,
  } = useTransactionStore();

  const { handleCreateTransaction, isLoading } = useTransactionFlow();
  const [showAddAccount, setShowAddAccount] = useState(false);

  const bankOptions = BANKS.map((bank) => ({ label: bank, value: bank }));
  const fundOriginOptions = FUND_ORIGINS.map((origin) => ({ label: origin, value: origin }));
  const accountOptions = accounts.map((acc) => ({
    label: `${acc.alias} - ${acc.bankName} - ${acc.currency}`,
    value: acc.id,
  }));

  const isFormValid = bankFrom !== null && accountTo !== null && fundOrigin !== null;

  const onContinue = async () => {
    if (!isFormValid || !bankFrom || !accountTo || !fundOrigin) return;

    const success = await handleCreateTransaction({
      amount,
      fromCurrency,
      toCurrency,
      originBank: bankFrom,
      destinationAccountId: accountTo.id,
      fundOrigin,
      couponCode: couponCode || undefined,
    });

    if (success) {
      router.push('/(app)/transaction/transfer');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Completa los datos</Text>
        <View style={{ width: 24 }} />
      </View>

      <StepIndicator steps={[
        { label: 'Completa', completed: false, active: true },
        { label: 'Transfiere', completed: false, active: false },
        { label: 'Constancia', completed: false, active: false },
      ]} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tú envías</Text>
            <Text style={styles.summaryValue}>
              {fromCurrency === 'USD' ? '$' : 'S/'} {formatCurrency(amount, fromCurrency)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tú recibes</Text>
            <Text style={styles.summaryValue}>
              {toCurrency === 'USD' ? '$' : 'S/'} {formatCurrency(rates?.calculatedAmount || 0, toCurrency)}
            </Text>
          </View>
          {couponCode && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Cupón aplicado</Text>
              <Text style={[styles.summaryValue, styles.couponValue]}>{couponCode}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tipo de cambio utilizado</Text>
            <Text style={styles.rateChange}>
              <Text style={styles.oldRate}>3.422</Text> {rates?.sellRate || 3.433}
            </Text>
          </View>
        </View>

        <InfoBanner variant="info" message="Tiempo estimado de espera BCP, Interbank, Banbif, Scotiabank, Falabella, Pichincha. Otros bancos: 1 día hábil." />

        <Dropdown
          label="¿Desde qué banco nos envías tu dinero?"
          placeholder="Selecciona"
          value={bankFrom}
          options={bankOptions}
          onSelect={setBankFrom}
        />

        <View style={styles.accountSection}>
          <Dropdown
            label="¿En qué cuenta deseas recibir tu dinero?"
            placeholder="Selecciona"
            value={accountTo?.id || null}
            options={accountOptions}
            onSelect={(id) => {
              const account = accounts.find((acc) => acc.id === id);
              if (account) setAccountTo(account);
            }}
          />
          <TouchableOpacity style={styles.addAccountButton} onPress={() => setShowAddAccount(true)}>
            <Ionicons name="add-circle-outline" size={20} color={colors.accent} />
            <Text style={styles.addAccountText}>Agregar cuenta</Text>
          </TouchableOpacity>
        </View>

        <InfoBanner variant="warning" message="Recuerda que las cuentas deben estar a tu nombre. Kambista no transferirá a cuentas de terceros." />

        <Dropdown
          label="Origen de fondos"
          placeholder="Selecciona"
          value={fundOrigin}
          options={fundOriginOptions}
          onSelect={(value) => setFundOrigin(value as FundOrigin)}
        />

        <Button
          title="CONTINUAR"
          onPress={onContinue}
          disabled={!isFormValid}
          loading={isLoading}
          style={styles.continueButton}
        />
      </ScrollView>

      <AddAccountModal
        visible={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        onAddAccount={(acc) => {
          addAccount(acc);
          setShowAddAccount(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  couponValue: {
    color: colors.accent,
  },
  rateChange: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  oldRate: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
    marginRight: 4,
  },
  accountSection: {
    marginBottom: 16,
  },
  addAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addAccountText: {
    fontSize: 14,
    color: colors.accent,
    marginLeft: 8,
    fontWeight: '600',
  },
  continueButton: {
    marginTop: 24,
  },
});
