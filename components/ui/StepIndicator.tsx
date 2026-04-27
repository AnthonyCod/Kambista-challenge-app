import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface Step {
  label: string;
  completed: boolean;
  active: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.stepContent}>
            <View
              style={[
                styles.stepCircle,
                step.completed && styles.stepCircleCompleted,
                step.active && styles.stepCircleActive,
              ]}
            >
              {step.completed && !step.active ? (
                <Text style={styles.checkmark}>✓</Text>
              ) : (
                <View style={styles.innerCircle} />
              )}
            </View>
            <Text
              style={[
                styles.stepLabel,
                (step.active || step.completed) && styles.stepLabelActive,
              ]}
            >
              {step.label}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.connector,
                step.completed && styles.connectorCompleted,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepContent: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  stepCircleCompleted: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
    marginBottom: 20,
  },
  connectorCompleted: {
    backgroundColor: colors.accent,
  },
});
