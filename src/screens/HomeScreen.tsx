import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Welcome, {user?.name}</Title>
          <Paragraph>{user?.email}</Paragraph>
          <View style={{ marginTop: 16 }}>
            <PrimaryButton label="Logout" onPress={logout} />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: { borderRadius: 12, padding: 8 }
});