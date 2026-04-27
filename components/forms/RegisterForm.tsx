import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DateInput } from '@/components/ui/DateInput';
import { Dropdown } from '@/components/ui/Dropdown';
import { Checkbox } from '@/components/ui/Checkbox';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { colors } from '@/constants/colors';
import { DOCUMENT_TYPES } from '@/constants/banks';
import { DocumentType } from '@/types';

export interface RegisterFormData {
  fullName: string;
  documentType: DocumentType | null;
  documentNumber: string;
  phoneNumber: string;
  dateOfBirth: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

interface RegisterFormProps {
  formData: RegisterFormData;
  onChangeForm: (data: Partial<RegisterFormData>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isFormValid: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  onChangeForm,
  onSubmit,
  isLoading,
  isFormValid,
}) => {
  const documentOptions = DOCUMENT_TYPES.map((type) => ({
    label: type,
    value: type,
  }));

  return (
    <View style={styles.formContainer}>
      <Text style={styles.subtitle}>
        Completa tus datos como figuran en tu documento de identidad
      </Text>

      {/* Full Name */}
      <Input
        label="Nombres completos"
        value={formData.fullName}
        onChangeText={(val) => onChangeForm({ fullName: val })}
        placeholder="Escribe tus nombres y apellidos"
      />

      {/* Document Type & Number */}
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Dropdown
            label="Documento"
            placeholder="Tipo"
            value={formData.documentType}
            options={documentOptions}
            onSelect={(val) => onChangeForm({ documentType: val as DocumentType })}
          />
        </View>
        <View style={styles.halfWidth}>
          <Input
            label="N° de documento"
            value={formData.documentNumber}
            onChangeText={(val) => onChangeForm({ documentNumber: val })}
            placeholder="N° de documento"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Info Banner */}
      <InfoBanner
        variant="info"
        message="Tu documento de identidad debe coincidir con los datos para abrir nuevas cuentas y, posteriormente, transferir el dinero a tu cuenta."
      />

      {/* Phone & Date of Birth */}
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Input
            label="Celular"
            value={formData.phoneNumber}
            onChangeText={(val) => onChangeForm({ phoneNumber: val })}
            placeholder="N° de celular"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.halfWidth}>
          <DateInput
            label="Fecha de nacimiento"
            value={formData.dateOfBirth}
            onChangeDate={(val) => onChangeForm({ dateOfBirth: val })}
            placeholder="DD/MM/AAAA"
          />
        </View>
      </View>

      {/* Terms and Privacy */}
      <Checkbox
        checked={formData.acceptTerms}
        onChange={(val) => onChangeForm({ acceptTerms: val })}
        label={
          <Text style={styles.checkboxLabel}>
            He leído y acepto los{' '}
            <Text style={styles.link}>Términos y condiciones</Text>
          </Text>
        }
      />

      <Checkbox
        checked={formData.acceptPrivacy}
        onChange={(val) => onChangeForm({ acceptPrivacy: val })}
        label={
          <Text style={styles.checkboxLabel}>
            Acepto de manera expresa e informada la{' '}
            <Text style={styles.link}>Política de Tratamiento de datos personales de Kambista</Text>
          </Text>
        }
      />

      {/* Register Button */}
      <Button
        title="REGISTRARME"
        onPress={onSubmit}
        disabled={!isFormValid}
        loading={isLoading}
        style={styles.registerButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 24,
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  link: {
    color: colors.accent,
    textDecorationLine: 'underline',
  },
  registerButton: {
    marginTop: 24,
  },
});
