import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../AuthContext';
import { Text, Button } from 'react-native';

// Note: AsyncStorage is mocked via react-native preset transformIgnorePatterns; if required,
// add the following mock at top-level jest setup: jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

const TestComponent = () => {
  const { user, signup, login, logout } = useAuth();

  return (
    <>
      <Text testID="name">{user ? user.name : 'no-user'}</Text>
      <Button title="signup" onPress={() => signup('Test User', 'test@example.com', 'password')} />
      <Button title="login" onPress={() => login('test@example.com', 'password')} />
      <Button title="logout" onPress={() => logout()} />
    </>
  );
};

describe('AuthContext', () => {
  it('allows signup, login and logout', async () => {
    const { getByText, getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('name').props.children).toBe('no-user');

    fireEvent.press(getByText('signup'));

    await waitFor(() => {
      expect(getByTestId('name').props.children).toBe('Test User');
    });

    // logout
    fireEvent.press(getByText('logout'));

    await waitFor(() => {
      expect(getByTestId('name').props.children).toBe('no-user');
    });

    // login again
    fireEvent.press(getByText('login'));

    await waitFor(() => {
      expect(getByTestId('name').props.children).toBe('Test User');
    });
  });
});