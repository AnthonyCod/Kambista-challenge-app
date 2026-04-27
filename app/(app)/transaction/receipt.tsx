import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useTransactionStore } from '@/stores/transactionStore';
import { Button } from '@/components/ui/Button';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { colors } from '@/constants/colors';

export default function TransactionReceiptScreen() {
  const { currentTransaction, uploadReceipt, reset } = useTransactionStore();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await uploadReceipt(selectedFile);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error uploading receipt:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGoHome = () => {
    reset();
    setShowSuccess(false);
    router.replace('/(app)');
  };

  const steps = [
    { label: 'Completa', completed: true, active: false },
    { label: 'Transfiere', completed: true, active: false },
    { label: 'Constancia', completed: false, active: true },
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
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('@/assets/images/document.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>
          Adjunta la constancia de tu transferencia para poder verificar tu
          operación
        </Text>

        {/* Upload Section */}
        <View style={styles.uploadCard}>
          <Text style={styles.uploadLabel}>
            Sube el archivo de tu constancia
          </Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handlePickDocument}
          >
            <Ionicons name="image-outline" size={24} color={colors.accent} />
            <Text style={styles.uploadButtonText}>Selecciona archivo</Text>
          </TouchableOpacity>

          {selectedFile && (
            <View style={styles.selectedFile}>
              <Ionicons
                name="document-outline"
                size={20}
                color={colors.accent}
              />
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <TouchableOpacity onPress={() => setSelectedFile(null)}>
                <Ionicons name="close-circle" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.uploadHint}>
            *Tamaño máximo permitido del archivo 10 Mb
          </Text>
        </View>

        {/* Reminders */}
        <View style={styles.remindersCard}>
          <Text style={styles.remindersTitle}>Recuerda:</Text>
          <View style={styles.reminderItem}>
            <Text style={styles.reminderBullet}>•</Text>
            <Text style={styles.reminderText}>
              El voucher enviado debe tener el beneficiario, fecha y hora.
            </Text>
          </View>
          <View style={styles.reminderItem}>
            <Text style={styles.reminderBullet}>•</Text>
            <Text style={styles.reminderText}>
              El voucher debe ser legible (no borroso).
            </Text>
          </View>
          <View style={styles.reminderItem}>
            <Text style={styles.reminderBullet}>•</Text>
            <Text style={styles.reminderText}>
              Se permite archivos con formato permitido: imágenes, word y PDF.
            </Text>
          </View>
        </View>

        {/* Send Button */}
        <Button
          title="ENVIAR CONSTANCIA"
          onPress={handleUpload}
          disabled={!selectedFile}
          loading={isUploading}
          style={styles.sendButton}
        />
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={handleGoHome}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Success Icon */}
            <Image
              source={require('@/assets/images/piggy-bank.png')}
              style={styles.successIllustration}
              resizeMode="contain"
            />

            <Text style={styles.successTitle}>¡Constancia enviada!</Text>

            {/* Transaction Details */}
            <View style={styles.successDetails}>
              <Text style={styles.successLabel}>Código de operación</Text>
              <Text style={styles.successCode}>
                {currentTransaction?.operationCode || 'km20ttff'}
              </Text>

              <View style={styles.successRow}>
                <View style={styles.successCol}>
                  <Text style={styles.successLabel}>*Lista en:</Text>
                  <Text style={styles.successValue}>
                    {currentTransaction?.fromCurrency === 'USD' ? '$' : 'S/'}{' '}
                    {currentTransaction?.amount.toLocaleString() || '1,000.00'}
                  </Text>
                </View>
                <View style={styles.successCol}>
                  <Text style={styles.successLabel}>Recibes:</Text>
                  <Text style={styles.successValue}>
                    {currentTransaction?.toCurrency === 'USD' ? '$' : 'S/'}{' '}
                    {currentTransaction?.calculatedAmount.toLocaleString() ||
                      '3,433.00'}
                  </Text>
                </View>
              </View>

              <View style={styles.successRow}>
                <Text style={styles.successLabel}>
                  Tiempo estimado de espera
                </Text>
                <Text style={styles.successTime}>20h 15min</Text>
              </View>
            </View>

            {/* Discount Banner */}
            <View style={styles.discountBanner}>
              <View style={styles.discountIcon}>
                <Ionicons name="gift-outline" size={40} color={colors.accent} />
              </View>
              <View style={styles.discountContent}>
                <Text style={styles.discountTitle}>
                  Disfruta de descuentos en los mejores
                </Text>
                <Text style={styles.discountSubtitle}>
                  comercios del Perú
                </Text>
              </View>
            </View>

            <Text style={styles.verificationNote}>
              Verificaremos tu operación. Puedes ver su estado en "Mis
              operaciones"
            </Text>

            {/* Home Button */}
            <Button
              title="VOLVER A INICIO"
              onPress={handleGoHome}
              style={styles.homeButton}
            />
          </View>
        </View>
      </Modal>
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
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  illustration: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  uploadCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 20,
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
  selectedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blueInfo,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  uploadHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
  remindersCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  remindersTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  reminderItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reminderBullet: {
    fontSize: 14,
    color: colors.textPrimary,
    marginRight: 8,
  },
  reminderText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  sendButton: {
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  successIllustration: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  successDetails: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  successLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  successCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 16,
  },
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  successCol: {
    flex: 1,
  },
  successValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  successTime: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },
  discountBanner: {
    flexDirection: 'row',
    backgroundColor: colors.orangeWarning,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  discountIcon: {
    marginRight: 12,
  },
  discountContent: {
    flex: 1,
  },
  discountTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  discountSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  verificationNote: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  homeButton: {
    marginTop: 8,
  },
});
