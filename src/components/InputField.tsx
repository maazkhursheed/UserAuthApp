import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  secure?: boolean;
  showToggle?: boolean;
  error?: string | undefined;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};

const InputField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  secure,
  showToggle,
  error,
  placeholder,
  keyboardType
}) => {
  const [visible, setVisible] = useState(!secure);

  return (
    <>
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure && !visible}
        right={
           secure && showToggle ? (
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={visible ? 'eye-off' : 'eye'}
                  size={20}
                />
              )}
              onPress={() => setVisible((v) => !v)}
            />
          ) : undefined
        }
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        autoCorrect={false}
        error={!!error}
        style={styles.input}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    marginBottom: 4,
  },
});