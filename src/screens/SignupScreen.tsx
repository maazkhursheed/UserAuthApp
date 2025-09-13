import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/validators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    const res = await signup(name, email, password);
    if (!res.ok) {
      Alert.alert('Error', res.error || 'Signup failed');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <InputField label="Name" value={name} onChangeText={setName} />
      <InputField label="Email" value={email} onChangeText={setEmail} />
      <InputField label="Password" value={password} onChangeText={setPassword} secure showToggle />
      <PrimaryButton title="Signup" onPress={handleSignup} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Go to Login
      </Text>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  link: { marginTop: 20, textAlign: 'center', color: 'blue' },
});