import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='order' options={{ headerShown: false }} />
      <Stack.Screen name='user' options={{ headerShown: false }} />
      <Stack.Screen name='product' options={{ headerShown: false }} />
      <Stack.Screen name='category' options={{ headerShown: false }} />
    </Stack>
  );
}
