import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { HelperText } from 'react-native-paper';

type FormValues = { email: string; password: string };

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const onSubmit = async (data: FormValues) => {
    setAuthError(null);
    const res = await login(data.email.trim(), data.password);
    if (!res.ok) setAuthError(res.error || 'Login failed');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Welcome Back</Title>

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <InputField label="Email" value={value} onChangeText={onChange} error={errors.email?.message} keyboardType="email-address" />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <InputField label="Password" value={value} onChangeText={onChange} secure showToggle error={errors.password?.message} />
              )}
            />

            <HelperText type="error" visible={!!authError}>
              {authError}
            </HelperText>

            <PrimaryButton label="Login" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />

            <View style={styles.linkWrap}>
              <PrimaryButton label="Go to Signup" onPress={() => navigation.navigate('Signup')} />
            </View>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: { padding: 8, borderRadius: 12 },
  title: { marginBottom: 8, textAlign: 'center' },
  linkWrap: { marginTop: 12 }
});