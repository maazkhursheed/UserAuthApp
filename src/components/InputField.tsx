import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props extends TextInputProps {
  label: string;
  error?: string;
  secure?: boolean;
  showToggle?: boolean;
}

const InputField: React.FC<Props> = ({ label, error, secure, showToggle, ...props }) => {
  const [secureText, setSecureText] = useState(secure);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          secureTextEntry={secureText}
          placeholder={label}
          {...props}
        />
        {showToggle && (
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Icon name={secureText ? 'eye-off' : 'eye'} size={22} color="#333" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { marginBottom: 5, fontSize: 14, color: '#444' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 16 },
  error: { marginTop: 4, color: 'red', fontSize: 12 },
});