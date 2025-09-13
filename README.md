# React Native User Authentication App (TypeScript)

## Overview
This project implements a **User Authentication App** with **Login, Signup, and Home screens** using:
- React Native (TypeScript, bare workflow — non-Expo)
- React Context API for authentication state management
- React Navigation v6
- AsyncStorage for persistence
- Reusable UI components
- Password visibility toggle (bonus feature)

---

## Features
1. **AuthContext**
   - `login(email, password)`
   - `signup(name, email, password)`
   - `logout()`
   - `user` state and persistence with AsyncStorage

2. **Screens**
   - Login (with validation and error messages)
   - Signup (with validation for missing fields, email format, password length)
   - Home (displays user info, logout button)

3. **UI**
   - Reusable `InputField` with error handling + password toggle
   - Reusable `PrimaryButton`
   - Consistent styling, keyboard handling, safe areas

4. **Persistence**
   - AsyncStorage keeps the user logged in even after restart

---

## Installation & Setup

```bash
# Create project (bare RN with TypeScript)
npx react-native init UserAuthApp --template react-native-template-typescript

# Navigate
cd UserAuthApp

# Install dependencies
npm install @react-navigation/native @react-navigation/native-stack
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons

# iOS specific
cd ios && pod install && cd ..
