import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Logo from "@/components/Logo";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
        <Text variant='bodyLarge' style={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          laboriosam fugit aliquam cum, repudiandae tempore modi qui facere
          totam architecto ipsum ab quisquam sequi, maxime excepturi explicabo
          quod libero aperiam.
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        <Link href='/auth/sign-in' asChild>
          <Button mode='contained'>Sign In</Button>
        </Link>
        <Link href='/app' asChild>
          <Button mode='contained'>App</Button>
        </Link>
      </View>
    </View>
  );
}
