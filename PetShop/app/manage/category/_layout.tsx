import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: true, headerTitle: "Category Management" }}
      />
      <Stack.Screen
        name='add'
        options={{ headerShown: true, headerTitle: "Add Category" }}
      />
      <Stack.Screen
        name='edit'
        options={{ headerShown: true, headerTitle: "Edit Category" }}
      />
    </Stack>
  );
}
