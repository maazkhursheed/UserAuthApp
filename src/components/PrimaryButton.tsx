import React from 'react';
import { Button } from 'react-native-paper';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
};

const PrimaryButton: React.FC<Props> = ({ label, onPress, loading }) => {
  return (
    <Button mode="contained" onPress={onPress} contentStyle={{ paddingVertical: 8 }} loading={loading}>
      {label}
    </Button>
  );
};

export default PrimaryButton;