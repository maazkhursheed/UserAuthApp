import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/validators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Password is required');
      return;
    }
    const res = await login(email, password);
    if (!res.ok) {
      Alert.alert('Error', res.error || 'Login failed');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputField label="Email" value={email} onChangeText={setEmail} />
      <InputField label="Password" value={password} onChangeText={setPassword} secure showToggle />
      <PrimaryButton title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
        Go to Signup
      </Text>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  link: { marginTop: 20, textAlign: 'center', color: 'blue' },
});