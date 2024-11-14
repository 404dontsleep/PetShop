import { isValidatedEmail } from "@/api/Helper";
import useUserStore from "@/api/store/User.store";
import Logo from "@/components/Logo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
export default function SignUp() {
  const { Register } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const isValidateEmail = isValidatedEmail(email);
  const HandleSignUp = () => {
    setError("");
    setLoading(true);
    Register(email, password)
      .then(() => {
        setLoading(false);
        router.replace("/auth/sign-in");
      })
      .catch((e) => {
        setError(e.response.data.message);
        setLoading(false);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ gap: 16, padding: 16 }}>
        <Logo />
        <TextInput
          label='Email'
          autoFocus
          value={email}
          error={email !== "" && !isValidateEmail}
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <TextInput
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        <TextInput
          label='Re-Password'
          value={rePassword}
          onChange={(e) => setRePassword(e.nativeEvent.text)}
          error={password !== rePassword}
        />
        <Button
          mode='contained'
          onPress={HandleSignUp}
          loading={loading}
          disabled={!isValidateEmail || loading || password !== rePassword}
        >
          Sign In
        </Button>
        <Text style={{ textAlign: "center" }} variant='bodySmall'>
          Already have an account?{" "}
          <Link href='/auth/sign-in' asChild>
            <Text style={{ color: "blue" }}>Sign In</Text>
          </Link>
        </Text>
      </View>
      <Snackbar onDismiss={() => setError("")} visible={error !== ""}>
        {error}
      </Snackbar>
    </View>
  );
}
