import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Swifty Companion' }} />
      <Stack.Screen name="profile/[login]" options={{ title: 'Profile' }} />
    </Stack>
  );
}
