import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: true }} />
      <Stack.Screen
        name='[OrderID]'
        options={{ headerShown: true, headerTitle: "Order Details" }}
      />
    </Stack>
  );
}
