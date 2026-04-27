import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { colors } from '@/constants/colors';
import { BANKS } from '@/constants/banks';
import { BankAccount } from '@/types';

interface AddAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onAddAccount: (account: Omit<BankAccount, 'id'>) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  visible,
  onClose,
  onAddAccount,
}) => {
  const [newAccountBank, setNewAccountBank] = useState('');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newAccountType, setNewAccountType] = useState<'Corriente' | 'Ahorros'>('Ahorros');
  const [newAccountCurrency, setNewAccountCurrency] = useState<'PEN' | 'USD'>('PEN');
  const [newAccountAlias, setNewAccountAlias] = useState('');
  const [acceptDeclaration, setAcceptDeclaration] = useState(false);

  const bankOptions = BANKS.map((bank) => ({ label: bank, value: bank }));

  const handleAddAccount = () => {
    if (!newAccountBank || !newAccountNumber || !newAccountAlias || !acceptDeclaration) return;

    onAddAccount({
      bankName: newAccountBank,
      accountNumber: newAccountNumber,
      accountType: newAccountType,
      currency: newAccountCurrency,
      alias: newAccountAlias,
      isOwn: true,
    });

    setNewAccountBank('');
    setNewAccountNumber('');
    setNewAccountAlias('');
    setAcceptDeclaration(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Agregar cuenta soles</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalSubtitle}>
              La cuenta que registres debe estar a tu nombre (titular en Kambista perfil en Kambista)
            </Text>

            <Dropdown
              label="Tipo de cuenta bancaria"
              placeholder="Selecciona"
              value={newAccountType}
              options={[
                { label: 'Ahorros', value: 'Ahorros' },
                { label: 'Corriente', value: 'Corriente' },
              ]}
              onSelect={(value) => setNewAccountType(value as 'Corriente' | 'Ahorros')}
            />

            <Dropdown
              label="Entidad Financiera"
              placeholder="Selecciona"
              value={newAccountBank}
              options={bankOptions}
              onSelect={setNewAccountBank}
            />

            <View style={styles.currencyToggle}>
              <Text style={styles.currencyLabel}>Moneda</Text>
              <View style={styles.toggleButtons}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    newAccountCurrency === 'PEN' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setNewAccountCurrency('PEN')}
                >
                  <Text
                    style={[
                      styles.toggleButtonText,
                      newAccountCurrency === 'PEN' && styles.toggleButtonTextActive,
                    ]}
                  >
                    SOLES
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    newAccountCurrency === 'USD' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setNewAccountCurrency('USD')}
                >
                  <Text
                    style={[
                      styles.toggleButtonText,
                      newAccountCurrency === 'USD' && styles.toggleButtonTextActive,
                    ]}
                  >
                    DÓLARES
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Input
              label="Número de cuenta"
              value={newAccountNumber}
              onChangeText={setNewAccountNumber}
              placeholder="Escribe tu cuenta de destino"
              keyboardType="numeric"
            />

            <Input
              label="Ponle nombre a tu cuenta"
              value={newAccountAlias}
              onChangeText={setNewAccountAlias}
              placeholder="Escribe tu cuenta de destino"
            />

            <TouchableOpacity
              style={styles.declarationCheck}
              onPress={() => setAcceptDeclaration(!acceptDeclaration)}
            >
              <View style={[styles.checkbox, acceptDeclaration && styles.checkboxChecked]}>
                {acceptDeclaration && <Ionicons name="checkmark" size={16} color={colors.white} />}
              </View>
              <Text style={styles.declarationText}>Declaro que esta cuenta es mía</Text>
            </TouchableOpacity>

            <Button
              title="GUARDAR CUENTA"
              onPress={handleAddAccount}
              disabled={!newAccountBank || !newAccountNumber || !newAccountAlias || !acceptDeclaration}
              style={styles.saveButton}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  modalScroll: {
    padding: 20,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  currencyToggle: {
    marginBottom: 16,
  },
  currencyLabel: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 8,
    fontWeight: '500',
  },
  toggleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  toggleButtonTextActive: {
    color: colors.white,
  },
  declarationCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  declarationText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  saveButton: {
    marginTop: 8,
  },
});
