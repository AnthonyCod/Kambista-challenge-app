# 💱 Kambista - Aplicación de Cambio de Divisas

> Aplicación móvil desarrollada con React Native + Expo para la gestión de cambio de divisas.

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-2.0.11-38bdf8.svg)](https://www.nativewind.dev/)

## 📱 Descripción del Proyecto

Kambista es una aplicación móvil que permite a los usuarios realizar operaciones de cambio de divisas (PEN ↔ USD) de manera rápida y segura. La aplicación incluye un calculador en tiempo real, gestión de cuentas bancarias, y un flujo completo de transacciones con validación de comprobantes.

### ✨ Características Principales

- 🔐 **Autenticación** - Sistema de login y registro de usuarios
- 💰 **Calculadora de Divisas** - Conversión en tiempo real PEN/USD
- 🔄 **Intercambio de Monedas** - Cambio rápido entre divisas
- 🎟️ **Códigos de Cupón** - Aplicación de cupones promocionales
- 🏦 **Gestión de Cuentas** - Agregar y administrar cuentas bancarias
- 📤 **Carga de Comprobantes** - Upload de vouchers de transferencia
- 📊 **Historial de Operaciones** - Seguimiento de transacciones
- 🎨 **UI/UX Moderna** - Diseño limpio y responsive basado en Figma

## 🎨 Diseño

El diseño de la aplicación está basado en el siguiente prototipo de Figma:

👉 [Ver diseño en Figma](https://www.figma.com/design/0r7lOY04Vv3Ht9UJItO7yX/Prueba?node-id=0-1&node-type=canvas&t=xY3A9Vp4Xe4zmQCW-0)

## 🛠️ Stack Tecnológico

### Core
- **React Native** 0.81.5 - Framework móvil
- **Expo** ~54.0.0 - Plataforma de desarrollo
- **TypeScript** 5.3.3 - Tipado estático
- **Expo Router** 6.0.23 - Navegación file-based

### UI/Styling
- **NativeWind** 2.0.11 - Tailwind CSS para React Native
- **React Native Reanimated** 4.1.1 - Animaciones
- **React Native SVG** 15.12.1 - Gráficos vectoriales

### Estado y Datos
- **Zustand** 4.4.7 - Gestión de estado global
- **React Query** 5.17.19 - Manejo de datos asíncronos
- **Axios** 1.6.5 - Cliente HTTP

### Utilidades
- **Expo Secure Store** - Almacenamiento seguro de tokens
- **Expo Image Picker** - Selección de imágenes
- **Expo Document Picker** - Selección de documentos
- **Expo Clipboard** - Copiar al portapapeles
- **AsyncStorage** - Almacenamiento local

## 📁 Estructura del Proyecto

```
Kambista-challenge-app/
│
├── app/                          # Expo Router - File-based routing
│   ├── (auth)/                   # Grupo de autenticación
│   │   ├── login.tsx             # Pantalla de login
│   │   ├── register.tsx          # Pantalla de registro
│   │   └── _layout.tsx           # Layout de autenticación
│   │
│   ├── (app)/                    # Grupo de app autenticada
│   │   ├── index.tsx             # Home/Calculadora
│   │   ├── accounts.tsx          # Gestión de cuentas
│   │   ├── history.tsx           # Historial de operaciones
│   │   ├── koins.tsx             # Sistema de puntos
│   │   ├── profile.tsx           # Perfil de usuario
│   │   ├── transaction/          # Flujo de transacción
│   │   │   ├── complete.tsx      # Paso 1: Completar datos
│   │   │   ├── transfer.tsx      # Paso 2: Transferir fondos
│   │   │   ├── receipt.tsx       # Paso 3: Subir comprobante
│   │   │   └── _layout.tsx       # Layout de transacción
│   │   └── _layout.tsx           # Layout principal con tabs
│   │
│   ├── index.tsx                 # Redirección inicial
│   └── _layout.tsx               # Layout raíz de la app
│
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes UI base
│   │   ├── Button.tsx            # Botón personalizado
│   │   ├── Input.tsx             # Input de texto
│   │   ├── Dropdown.tsx          # Select/Dropdown
│   │   ├── Checkbox.tsx          # Checkbox
│   │   ├── DateInput.tsx         # Selector de fecha
│   │   ├── StepIndicator.tsx    # Indicador de pasos
│   │   └── InfoBanner.tsx        # Banner informativo
│   │
│   ├── forms/                    # Formularios
│   │   ├── LoginForm.tsx         # Formulario de login
│   │   └── RegisterForm.tsx      # Formulario de registro
│   │
│   └── layout/                   # Componentes de layout
│       └── ScreenHeader.tsx      # Header de pantallas
│
├── stores/                       # Zustand stores
│   ├── authStore.ts              # Estado de autenticación
│   ├── exchangeStore.ts          # Estado del calculador
│   └── transactionStore.ts       # Estado de transacciones
│
├── services/                     # Servicios y APIs
│   ├── api.ts                    # Cliente Axios configurado
│   ├── exchangeService.ts        # Servicio de cambio de divisas
│   └── authService.ts            # Servicio de autenticación
│
├── types/                        # TypeScript types
│   └── index.ts                  # Definiciones de tipos
│
├── constants/                    # Constantes de la app
│   └── Colors.ts                 # Paleta de colores
│
├── hooks/                        # Custom hooks
│   └── useExchangeRate.ts        # Hook para tasas de cambio
│
├── utils/                        # Utilidades
│   └── formatters.ts             # Funciones de formateo
│
├── assets/                       # Assets estáticos
│   ├── images/                   # Imágenes
│   └── fonts/                    # Fuentes
│
├── .env                          # Variables de entorno
├── app.config.ts                 # Configuración de Expo
├── tailwind.config.js            # Configuración de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
├── eas.json                      # Configuración de EAS Build
└── package.json                  # Dependencias del proyecto
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18 o superior
- **npm** o **yarn**
- **Expo Go** app en tu dispositivo móvil (opcional)
- **Android Studio** (para emulador Android)
- **Xcode** (para simulador iOS - solo Mac)

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/AnthonyCod/Kambista-challenge-app.git
cd Kambista-challenge-app
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

El archivo `.env` ya está configurado con los valores por defecto:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.kambista.com/v1
EXPO_PUBLIC_APP_ENV=development
```

Puedes modificar estos valores según tu entorno.

4. **Iniciar el servidor de desarrollo**

```bash
npm start
# o
npx expo start
```

### Ejecutar en Dispositivo/Emulador

#### Opción 1: Dispositivo Físico (Recomendado para pruebas rápidas)

1. Instala **Expo Go** en tu dispositivo:
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Escanea el código QR que aparece en la terminal:
   - **iOS**: Usa la app de Cámara
   - **Android**: Usa la app Expo Go

#### Opción 2: Emulador Android

```bash
npm run android
# o
npx expo start --android
```

#### Opción 3: Simulador iOS (Solo Mac)

```bash
npm run ios
# o
npx expo start --ios
```

## 📱 Guía de Uso

### 1. Autenticación

La aplicación usa autenticación simulada (mock). Puedes usar cualquier credencial:

```
Email: test@example.com
Password: password123
```

### 2. Calculadora de Divisas

- La pantalla principal muestra un calculador de divisas
- Valor por defecto: $10,000 USD → PEN
- Usa el botón de intercambio (🔄) para cambiar la dirección
- La tasa de cambio se actualiza automáticamente

### 3. Aplicar Cupón

- Ingresa el código de cupón: `MICASA21`
- Click en **APLICAR**
- El descuento se aplicará automáticamente

### 4. Flujo de Transacción

#### Paso 1: Completar Datos
1. Selecciona tu banco de origen (ej: BCP, Interbank)
2. Agrega una cuenta bancaria o selecciona una existente
3. Selecciona el origen de fondos (Ahorros, Corriente, etc.)
4. Click en **CONTINUAR**

#### Paso 2: Transferir
1. Visualiza los datos bancarios de Kambista
2. Usa los botones de copiar para copiar la información
3. Realiza la transferencia desde tu banco
4. Click en **YA HICE MI TRANSFERENCIA**

#### Paso 3: Subir Comprobante
1. Click en el área de upload
2. Selecciona una imagen o documento
3. Click en **ENVIAR CONSTANCIA**
4. Verás un modal de confirmación

### 5. Navegación

La app incluye un tab bar inferior con las siguientes secciones:

- 🏠 **Inicio** - Calculadora de divisas
- 📊 **Historial** - Operaciones realizadas
- 👤 **Perfil** - Información del usuario
- 🏦 **Cuentas** - Gestión de cuentas bancarias
- 🪙 **Koins** - Sistema de puntos (próximamente)

## 🔧 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web

# Verificación de tipos
npm run type-check

# Linting
npm run lint
```

## 📦 Generar APK/IPA

### Generar APK (Android)

1. **Instalar EAS CLI** (si no lo tienes)

```bash
npm install -g eas-cli
```

2. **Iniciar sesión en Expo**

```bash
npx eas-cli login
```

Ingresa tu email y contraseña de Expo. Si no tienes cuenta, créala en [expo.dev](https://expo.dev/signup)

3. **Generar APK**

```bash
npx eas build --platform android --profile preview
```

Este comando:
- Creará un build en los servidores de Expo
- Generará un APK instalable
- Te proporcionará un link de descarga cuando termine

**Tiempo estimado:** 10-15 minutos

4. **Descargar APK**

Una vez que el build termine, recibirás un link como:
```
https://expo.dev/artifacts/eas/...
```

Descarga el APK y compártelo o instálalo en tu dispositivo Android.

### Generar IPA (iOS)

```bash
npx eas build --platform ios --profile production
```

**Nota:** Para iOS necesitas una cuenta de Apple Developer ($99/año)

### Build Local (Sin cuenta de Expo)

Si prefieres no usar EAS Build, puedes generar el APK localmente:

```bash
# Requiere Android Studio instalado
npx expo prebuild
cd android
./gradlew assembleRelease
```

El APK estará en: `android/app/build/outputs/apk/release/app-release.apk`

## 🔑 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `EXPO_PUBLIC_API_BASE_URL` | URL base de la API de Kambista | `https://api.kambista.com/v1` |
| `EXPO_PUBLIC_APP_ENV` | Entorno de la app | `development` |

## 🏗️ Arquitectura

### Gestión de Estado

La aplicación utiliza **Zustand** para el manejo del estado global, organizado en tres stores principales:

1. **authStore** - Autenticación y usuario
   - Login/Logout
   - Información del usuario
   - Token de sesión

2. **exchangeStore** - Calculadora de divisas
   - Monedas seleccionadas
   - Monto a cambiar
   - Tasa de cambio
   - Cupón aplicado

3. **transactionStore** - Transacciones
   - Datos de transacción actual
   - Historial de operaciones
   - Estado del flujo

### Navegación

La navegación está implementada con **Expo Router**, que utiliza un sistema de routing basado en archivos:

- `app/(auth)/*` - Rutas de autenticación
- `app/(app)/*` - Rutas de la aplicación principal
- `app/(app)/transaction/*` - Flujo de transacción

### Servicios API

Los servicios están organizados en módulos separados:

- `authService.ts` - Autenticación (login, registro, logout)
- `exchangeService.ts` - Cálculo de tasas de cambio
- `api.ts` - Cliente Axios configurado con interceptors

**Nota:** Actualmente la app usa datos simulados (mock). Para producción, conecta con los endpoints reales de Kambista.

### Endpoint de la API

La aplicación simula llamadas al siguiente endpoint:

```
https://api.kambista.com/v1/exchange/calculates?originCurrency=PEN&destinationCurrency=USD&amount={cantidad}&active=S
```

## 🧪 Testing

### Flujo de Prueba Sugerido

1. ✅ Login con credenciales mock
2. ✅ Cambiar cantidad en calculadora
3. ✅ Intercambiar monedas (PEN → USD y viceversa)
4. ✅ Aplicar cupón `MICASA21`
5. ✅ Iniciar operación
6. ✅ Completar datos bancarios
7. ✅ Agregar nueva cuenta
8. ✅ Confirmar transferencia
9. ✅ Subir comprobante
10. ✅ Ver modal de éxito
11. ✅ Navegar entre tabs
12. ✅ Logout

## 🐛 Solución de Problemas

### El servidor de Metro no inicia

```bash
npx expo start -c
```

### Errores de TypeScript

```bash
npm run type-check
```

### Módulos no encontrados

```bash
rm -rf node_modules package-lock.json
npm install
```

### Cache corrupto

```bash
npx expo start -c --reset-cache
```

### Problemas con NativeWind

```bash
rm -rf node_modules/.cache
npx expo start -c
```

## 📝 Próximos Pasos y Mejoras

- [ ] Conectar con API real de Kambista
- [ ] Implementar validación de formularios con Zod
- [ ] Agregar notificaciones push
- [ ] Implementar biometría (FaceID/TouchID)
- [ ] Agregar modo oscuro
- [ ] Implementar internacionalización (i18n)
- [ ] Agregar tests unitarios con Jest
- [ ] Agregar tests E2E con Detox
- [ ] Implementar analytics
- [ ] Mejorar animaciones y transiciones

## 👨‍💻 Desarrollo

### Autor

**Anthony Atiro**
- GitHub: [@AnthonyCod](https://github.com/AnthonyCod)

### Contribuciones

Este es un proyecto de prueba técnica para Kambista. Si tienes sugerencias o encuentras bugs, por favor contacta a:

📧 talentohumano@kambista.com

## 📄 Licencia

Este proyecto es parte de una prueba técnica para Kambista.

## 🙏 Agradecimientos

- [Kambista](https://kambista.com) - Por la oportunidad
- [Expo](https://expo.dev) - Por la excelente plataforma
- [NativeWind](https://nativewind.dev) - Por Tailwind en React Native
- [Zustand](https://zustand-demo.pmnd.rs) - Por la simplicidad en state management

---

**Desarrollado con ❤️ usando React Native + Expo**

Para más información sobre la implementación técnica, revisa el archivo [SETUP.md](./SETUP.md)
