import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';

interface LoginFormProps {
  email: string;
  onChangeEmail: (value: string) => void;
  password: string;
  onChangePassword: (value: string) => void;
  rememberMe: boolean;
  onChangeRememberMe: (value: boolean) => void;
  onLogin: () => void;
  isFormValid: boolean;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  rememberMe,
  onChangeRememberMe,
  onLogin,
  isFormValid,
  isLoading,
}) => {
  return (
    <View style={styles.formContainer}>
      <Input
        label="Correo electrónico"
        value={email}
        onChangeText={onChangeEmail}
        placeholder="Escribe tu correo"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <Input
        label="Contraseña"
        value={password}
        onChangeText={onChangePassword}
        placeholder="Escribe tu contraseña"
        isPassword
        autoCapitalize="none"
      />

      <View style={styles.optionsRow}>
        <Checkbox
          checked={rememberMe}
          onChange={onChangeRememberMe}
          label="Recordarme"
        />
      </View>

      <Button
        title="INICIA SESIÓN"
        onPress={onLogin}
        disabled={!isFormValid}
        loading={isLoading}
        style={styles.loginButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 8,
  },
});
