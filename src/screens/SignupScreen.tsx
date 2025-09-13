import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Title, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type FormValues = { name: string; email: string; password: string };

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', password: '' } });

  const onSubmit = async (data: FormValues) => {
    setAuthError(null);
    const res = await signup(data.name.trim(), data.email.trim(), data.password);
    if (!res.ok) setAuthError(res.error || 'Signup failed');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Create account</Title>

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => <InputField label="Name" value={value} onChangeText={onChange} error={errors.name?.message} />}
            />

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

            <PrimaryButton label="Signup" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />

            <View style={styles.linkWrap}>
              <PrimaryButton label="Go to Login" onPress={() => navigation.navigate('Login')} />
            </View>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: { padding: 8, borderRadius: 12 },
  title: { marginBottom: 8, textAlign: 'center' },
  linkWrap: { marginTop: 12 }
});