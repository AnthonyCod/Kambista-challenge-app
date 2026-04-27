import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { SuccessModal } from '@/components/modals/SuccessModal';
import { RegisterForm, RegisterFormData } from '@/components/forms/RegisterForm';
import { colors } from '@/constants/colors';

export default function RegisterScreen() {
  const { register, isLoading } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  const { formData, handleChange } = useForm<RegisterFormData>({
    fullName: '',
    documentType: null,
    documentNumber: '',
    phoneNumber: '',
    dateOfBirth: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const isFormValid =
    formData.fullName.trim() !== '' &&
    formData.documentType !== null &&
    formData.documentNumber.trim() !== '' &&
    formData.phoneNumber.trim() !== '' &&
    formData.dateOfBirth.trim() !== '' &&
    formData.acceptTerms &&
    formData.acceptPrivacy;

  const handleRegister = async () => {
    if (!isFormValid || !formData.documentType) return;

    const success = await register({
      email: 'ejemplo@gmail.com', // Should come from a previous step
      password: 'password123', // Should come from a previous step
      fullName: formData.fullName,
      documentType: formData.documentType,
      documentNumber: formData.documentNumber,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      acceptTerms: formData.acceptTerms,
      acceptPrivacy: formData.acceptPrivacy,
    });

    if (success) {
      setShowSuccess(true);
    }
  };

  const handleSuccess = () => {
    setShowSuccess(false);
    router.replace('/(app)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScreenHeader title="Completa tus datos" showLogout />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <RegisterForm
            formData={formData}
            onChangeForm={handleChange}
            onSubmit={handleRegister}
            isLoading={isLoading}
            isFormValid={isFormValid}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccess}
        title={`¡Felicitaciones ${formData.fullName.split(' ')[0] || ''}, tu perfil ha sido creado!`}
        message="Ya puedes empezar a Kambiar con la mejor casa de cambio"
        imageSource={require('@/assets/images/hand-phone.png')}
        onContinue={handleSuccess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
});
