import { Stack } from "expo-router";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import GlobalError from "@/components/GlobalError";
import { useEffect } from "react";
import useAuthStore from "@/api/store/Auth.store";
export default function RootLayout() {
  const { GetAuthUser } = useAuthStore();
  useEffect(() => {
    GetAuthUser();
  }, []);
  return (
    <PaperProvider
      theme={{
        ...MD3LightTheme,
      }}
    >
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='app' options={{ headerShown: false }} />
        <Stack.Screen name='manage' options={{ headerShown: false }} />
        <Stack.Screen name='order' options={{ headerShown: false }} />
      </Stack>
      <GlobalError />
    </PaperProvider>
  );
}
