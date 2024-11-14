import { isValidatedEmail } from "@/api/Helper";
import useUserStore from "@/api/store/User.store";
import Logo from "@/components/Logo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
export default function SignIn() {
  const { Login } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isValidateEmail = isValidatedEmail(email);
  const handleSignIn = () => {
    setError("");
    setLoading(true);
    Login(email, password)
      .then(() => {
        setLoading(false);
        router.replace("/app");
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
        <View>
          <Link href='/auth/reset-password' asChild>
            <Text
              style={{ textAlign: "right", color: "blue" }}
              variant='bodySmall'
            >
              Forgot Password?
            </Text>
          </Link>
        </View>
        <Button
          mode='contained'
          onPress={handleSignIn}
          loading={loading}
          disabled={!isValidateEmail || loading}
        >
          Sign In
        </Button>
        <Text style={{ textAlign: "center" }} variant='bodySmall'>
          Don't have an account?{" "}
          <Link href='/auth/sign-up' asChild>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </Link>
        </Text>
      </View>
      <Snackbar onDismiss={() => setError("")} visible={error !== ""}>
        {error}
      </Snackbar>
    </View>
  );
}
