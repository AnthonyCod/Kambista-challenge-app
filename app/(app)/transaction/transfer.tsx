import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTransactionStore } from '@/stores/transactionStore';
import { useClipboard } from '@/hooks/useClipboard';
import { Button } from '@/components/ui/Button';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';

export default function TransactionTransferScreen() {
  const { currentTransaction, setStep } = useTransactionStore();

  const bankDetails = {
    bankName: 'Interbank',
    amount: currentTransaction?.amount || 1000,
    currency: currentTransaction?.fromCurrency || 'USD',
    accountNumber: '201010000000000',
    ruc: '20601708141',
    accountHolder: 'Kambista SAC',
    accountType: 'Corriente',
  };

  const { isCopied, copyToClipboard } = useClipboard();

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text, label);
  };

  const handleContinue = () => {
    setStep(3);
    router.push('/(app)/transaction/receipt');
  };

  const steps = [
    { label: 'Completa', completed: true, active: false },
    { label: 'Transfiere', completed: false, active: true },
    { label: 'Constancia', completed: false, active: false },
  ];

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

      {/* Step Indicator */}
      <StepIndicator steps={steps} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Exchange Rate Timer */}
        <View style={styles.timerCard}>
          <Ionicons
            name="time-outline"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={styles.timerText}>
            El tipo de cambio podría actualizarse a las: <Text style={styles.timerValue}>13:15</Text>
          </Text>
        </View>

        {/* Transfer Instructions */}
        <View style={styles.instructionsCard}>
          <Image
            source={require('@/assets/images/card-transfer.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.instructionsTitle}>
            Transfiere a Kambista
          </Text>
          <Text style={styles.instructionsSubtitle}>
            guarda el{' '}
            <Text style={styles.highlight}>número o código de operación</Text>{' '}
            para el siguiente paso
          </Text>
        </View>

        {/* Bank Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Detalles de transferencia</Text>

          {/* Bank */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Banco:</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>{bankDetails.bankName}</Text>
            </View>
          </View>

          {/* Amount */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monto:</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>
                {bankDetails.currency === 'USD' ? '$' : 'S/'}{' '}
                {formatCurrency(bankDetails.amount, bankDetails.currency as any)}
              </Text>
              <TouchableOpacity
                onPress={() => handleCopy(bankDetails.amount.toString(), 'amount')}
              >
                <Ionicons
                  name={isCopied['amount'] ? 'checkmark-outline' : 'copy-outline'}
                  size={20}
                  color={colors.accent}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Number */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Número de cuenta:</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>
                {bankDetails.accountNumber}
              </Text>
              <TouchableOpacity
                onPress={() => handleCopy(bankDetails.accountNumber, 'accountNumber')}
              >
                <Ionicons
                  name={isCopied['accountNumber'] ? 'checkmark-outline' : 'copy-outline'}
                  size={20}
                  color={colors.accent}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* RUC */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>RUC:</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>{bankDetails.ruc}</Text>
              <TouchableOpacity
                onPress={() => handleCopy(bankDetails.ruc, 'ruc')}
              >
                <Ionicons
                  name={isCopied['ruc'] ? 'checkmark-outline' : 'copy-outline'}
                  size={20}
                  color={colors.accent}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Holder */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Titular de cuenta:</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>
                {bankDetails.accountHolder}
              </Text>
            </View>
          </View>

          {/* Account Type */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo de cuenta:</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>{bankDetails.accountType}</Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <Button
          title="YA HICE MI TRANSFERENCIA"
          onPress={handleContinue}
          style={styles.continueButton}
        />
      </ScrollView>
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
  timerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  timerText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  timerValue: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  instructionsCard: {
    backgroundColor: colors.blueInfo,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  illustration: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionsSubtitle: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 20,
  },
  highlight: {
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  continueButton: {
    marginTop: 8,
  },
});
