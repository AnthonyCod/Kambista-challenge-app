import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface InfoBannerProps {
  message: string;
  variant?: 'info' | 'warning';
  icon?: boolean;
}

export const InfoBanner = ({
  message,
  variant = 'info',
  icon = true,
}: InfoBannerProps) => {
  return (
    <View
      style={[
        styles.container,
        variant === 'info' && styles.infoContainer,
        variant === 'warning' && styles.warningContainer,
      ]}
    >
      {icon && (
        <Ionicons
          name="information-circle-outline"
          size={20}
          color={variant === 'info' ? colors.primary : '#FF8C00'}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          variant === 'info' && styles.infoText,
          variant === 'warning' && styles.warningText,
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  infoContainer: {
    backgroundColor: colors.blueInfo,
  },
  warningContainer: {
    backgroundColor: colors.orangeWarning,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  infoText: {
    color: colors.primary,
  },
  warningText: {
    color: '#8B4000',
  },
});
