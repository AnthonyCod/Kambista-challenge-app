import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility function to clear all AsyncStorage data
 * Use this for debugging or resetting the app state
 */
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('✅ AsyncStorage cleared successfully');
    return true;
  } catch (error) {
    console.error('❌ Error clearing AsyncStorage:', error);
    return false;
  }
};

/**
 * Clear only auth-related storage
 */
export const clearAuthStorage = async () => {
  try {
    await AsyncStorage.removeItem('@auth_data');
    console.log('✅ Auth data cleared successfully');
    return true;
  } catch (error) {
    console.error('❌ Error clearing auth data:', error);
    return false;
  }
};
