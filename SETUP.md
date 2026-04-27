# Kambista App - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (will be installed with dependencies)
- For iOS: Xcode and iOS Simulator
- For Android: Android Studio and Android Emulator

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Expo SDK 51
- React Native
- TypeScript
- NativeWind (Tailwind CSS)
- Zustand (state management)
- React Query
- Axios
- All UI dependencies

### 2. Environment Setup

The `.env` file is already created with default values:

```
EXPO_PUBLIC_API_BASE_URL=https://api.kambista.com/v1
EXPO_PUBLIC_APP_ENV=development
```

You can modify these values as needed for your environment.

### 3. Start Development Server

```bash
npx expo start
```

This will start the Metro bundler and show a QR code in your terminal.

### 4. Run on Device/Simulator

#### Option A: Run on iOS Simulator (Mac only)

```bash
npx expo start --ios
```

Or press `i` in the terminal after running `npx expo start`

#### Option B: Run on Android Emulator

```bash
npx expo start --android
```

Or press `a` in the terminal after running `npx expo start`

#### Option C: Run on Physical Device

1. Install Expo Go app on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Scan the QR code shown in the terminal with:
   - iOS: Camera app
   - Android: Expo Go app

## Project Structure Overview

```
Kambista-challenge-app/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Login & Register
│   └── (app)/             # Main app (Home, Transactions, Tabs)
├── components/ui/         # Reusable components
├── stores/                # Zustand state management
├── services/              # API services
├── types/                 # TypeScript definitions
└── constants/             # App constants
```

## Available Scripts

```bash
# Start development server
npm start

# Start on iOS
npm run ios

# Start on Android
npm run android

# Type checking
npm run type-check

# Linting
npm run lint
```

## Testing the App

### Default Credentials (Mock)

Since the app uses mock authentication, you can log in with any email and password:

- Email: `test@example.com`
- Password: `password123`

### Test Flow

1. **Login Screen**
   - Enter any email and password
   - Click "INICIA SESIÓN"

2. **Home/Calculator**
   - Default shows $10,000 USD → PEN conversion
   - Try changing the amount
   - Click swap button to reverse currencies
   - Enter coupon code "MICASA21" and click APLICAR
   - Click "INICIAR OPERACIÓN" to start a transaction

3. **Transaction Flow**
   - Step 1: Complete data
     - Select origin bank (e.g., BCP)
     - Add a new account or select existing
     - Select fund origin (e.g., Ahorros)
     - Click CONTINUAR

   - Step 2: Transfer
     - View bank details
     - Use copy buttons to copy account info
     - Click "YA HICE MI TRANSFERENCIA"

   - Step 3: Receipt
     - Upload a file/image
     - Click "ENVIAR CONSTANCIA"
     - View success modal
     - Click "VOLVER A INICIO"

## Troubleshooting

### Issue: Metro bundler fails to start

**Solution:**
```bash
# Clear cache and restart
npx expo start -c
```

### Issue: TypeScript errors

**Solution:**
```bash
# Run type check to see all errors
npm run type-check
```

### Issue: Module not found errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: iOS build fails

**Solution:**
```bash
# Clear iOS build cache
cd ios
pod install
cd ..
npx expo start -c
```

### Issue: Android build fails

**Solution:**
```bash
# Clear gradle cache
cd android
./gradlew clean
cd ..
npx expo start -c
```

## Building for Production

### Generate APK (Android)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build APK
eas build -p android --profile preview

# Or build AAB for Play Store
eas build -p android --profile production
```

### Generate IPA (iOS)

```bash
# Build for iOS
eas build -p ios --profile production
```

## Key Features to Test

- ✅ Login/Logout flow
- ✅ Calculator with real-time conversion
- ✅ Currency swap
- ✅ Coupon code application
- ✅ Transaction 3-step flow
- ✅ Add bank account modal
- ✅ File upload for receipt
- ✅ Success/error states
- ✅ Navigation between screens
- ✅ Tab bar navigation

## Next Steps

1. Replace mock API with real Kambista API endpoints
2. Add actual images/logos (currently using placeholders)
3. Implement proper error handling with toast notifications
4. Add form validation
5. Implement loading states
6. Add animations
7. Write tests

## Support

For issues or questions:
- Check the [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for detailed documentation
- Review the [APP_README.md](./APP_README.md) for architecture details
- Contact: talentohumano@kambista.com
