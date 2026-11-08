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
  const [isFocused, setIsFocused] = useState(false);

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
        <Text style={styles.label}>Intra login</Text>
        <TextInput
          accessibilityHint="Enter a student login from 42 Intra"
          accessibilityLabel="42 login"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onSubmitEditing={handleSubmit}
          placeholder="student-login"
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          style={[styles.input, isFocused && styles.inputFocused, error && styles.inputError]}
          underlineColorAndroid="transparent"
          value={value}
        />
        {error ? (
          <Text accessibilityLiveRegion="polite" style={styles.error}>
            {error}
          </Text>
        ) : (
          <Text style={styles.hint}>Use the login shown on the student&apos;s Intra profile.</Text>
        )}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleSubmit}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>View student profile</Text>
        <Text aria-hidden style={styles.buttonArrow}>
          →
        </Text>
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
    fontSize: typography.caption,
    fontWeight: '800',
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: typography.body,
    outlineColor: 'transparent',
    outlineWidth: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryFaint,
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
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
  buttonArrow: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
});
