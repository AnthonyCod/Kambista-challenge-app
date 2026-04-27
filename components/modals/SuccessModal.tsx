import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';

interface SuccessModalProps {
  visible: boolean;
  title: string;
  message: string;
  imageSource: ImageSourcePropType;
  buttonText?: string;
  onContinue: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  title,
  message,
  imageSource,
  buttonText = 'CONTINUAR',
  onContinue,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onContinue}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image
            source={imageSource}
            style={styles.successIllustration}
            resizeMode="contain"
          />
          <Text style={styles.successTitle}>{title}</Text>
          <Text style={styles.successMessage}>{message}</Text>
          <Button
            title={buttonText}
            onPress={onContinue}
            style={styles.continueButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 24,
    maxWidth: 400,
  },
  successIllustration: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    width: '100%',
  },
});
