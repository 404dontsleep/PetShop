import { Stack } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
export default function RootLayout() {
  return (
    <PaperProvider
      theme={{
        ...MD3LightTheme,
      }}
    >
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
