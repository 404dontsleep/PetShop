import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: true, headerTitle: "User Management" }}
      />
      {/* <Stack.Screen
        name='add'
        options={{ headerShown: true, headerTitle: "Add Product" }}
      />

      <Stack.Screen
        name='edit'
        options={{ headerShown: true, headerTitle: "Edit Product" }}
      /> */}
    </Stack>
  );
}
