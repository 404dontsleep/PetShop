import { ALERT, isValidatedEmail, isValidateOTP } from "@/api/Helper";
import useAuthStore from "@/api/store/Auth.store";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import {
  Button,
  HelperText,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";

export default function ResetPassword() {
  const { ResetPassword } = useAuthStore();
  const [email, setEmail] = useState("");
  const isValidateEmail = isValidatedEmail(email);
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [OTPSave, setOTPSave] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    setLoading(true);
    setError("");
    ResetPassword(email)
      .then((data) => {
        setLoading(false);
        setVisible(true);
        setOTPSave(data.OTP || "");
      })
      .catch((data) => {
        setLoading(false);
        setError(data.response.data.message);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ gap: 16, padding: 16 }}>
        <Text variant='headlineLarge'>Reset Password</Text>
        <Text variant='bodySmall'>
          Enter your email and we will send you a link to reset your password.
        </Text>
        <TextInput
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
          error={email !== "" && !isValidateEmail}
        />
        <Button
          mode='contained'
          onPress={() => {
            handleResetPassword();
          }}
        >
          Reset Password
        </Button>
        <HelperText
          type='error'
          visible={error !== "" || (email !== "" && !isValidateEmail)}
        >
          Invalid email
        </HelperText>
      </View>
      <ResetPasswordOTPModal
        visible={visible}
        OTPSave={OTPSave}
        onDismiss={() => {
          setVisible(false);
          router.replace("/auth/sign-in");
        }}
      />
    </View>
  );
}

function ResetPasswordOTPModal({
  OTPSave,
  visible,
  onDismiss,
}: {
  OTPSave: string;
  visible: boolean;
  onDismiss: () => void;
}) {
  const [OTP, setOTP] = useState("");
  const { ResetPasswordOTP } = useAuthStore();
  const [error, setError] = useState("");
  const handleVerifyOTP = () => {
    ResetPasswordOTP(OTP)
      .then((data) => {
        if (data.NewPassword) {
          ALERT.prompt("New Password", data.NewPassword);
        }
        onDismiss();
      })
      .catch((data) => {
        console.log(data);
        setError(data.response.data.message);
      });
  };
  return (
    <Portal>
      <Modal
        style={{ padding: 16 }}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
      >
        <View style={{ gap: 16 }}>
          <Text variant='headlineLarge'>Verify OTP</Text>
          <Text variant='bodySmall'>
            Check your email and enter the OTP sent to your email. ({OTPSave})
          </Text>
          <TextInput
            label='OTP'
            value={OTP}
            onChange={(e) => setOTP(e.nativeEvent.text)}
            error={OTP !== "" && !isValidateOTP(OTP)}
            keyboardType='phone-pad'
            autoFocus
          />
          {error !== "" && (
            <HelperText type='error' visible={error !== ""}>
              {error}
            </HelperText>
          )}
          <Button mode='contained' onPress={handleVerifyOTP}>
            Verify OTP
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
