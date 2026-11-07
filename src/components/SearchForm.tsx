import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import { isValidLogin, normalizeLogin } from '@/utils/validators';

type SearchFormProps = {
  onSubmit: (login: string) => void;
};

export function SearchForm({ onSubmit }: SearchFormProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange: NonNullable<TextInputProps['onChangeText']> = (nextValue) => {
    setValue(nextValue);
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = () => {
    const login = normalizeLogin(value);

    if (!login) {
      setError('Please enter a login.');
      return;
    }

    if (!isValidLogin(login)) {
      setError("This doesn't look like a valid login.");
      return;
    }

    setValue(login);
    setError(null);
    onSubmit(login);
  };

  return (
    <View style={styles.form}>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>42 login</Text>
        <TextInput
          accessibilityLabel="42 login"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          placeholder="Enter a 42 login"
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          style={[styles.input, error && styles.inputError]}
          value={value}
        />
        {error ? (
          <Text accessibilityLiveRegion="polite" style={styles.error}>
            {error}
          </Text>
        ) : (
          <Text style={styles.hint}>Letters, numbers, hyphens, and underscores.</Text>
        )}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleSubmit}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.lg,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: typography.body,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: typography.caption,
  },
  hint: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
  },
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: '700',
  },
});
