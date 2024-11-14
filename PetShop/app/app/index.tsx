import useUserStore from "@/api/store/User.store";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function index() {
  const { User, GetAuthUser, Refresh, Logout } = useUserStore();
  useEffect(() => {
    GetAuthUser();
  }, [GetAuthUser, Refresh]);
  return (
    <View>
      <Text>{JSON.stringify(User, null, 2)}</Text>
      <Button
        mode='contained'
        onPress={() => {
          Logout();
          router.replace("/auth/sign-in");
        }}
      >
        Logout
      </Button>
    </View>
  );
}
