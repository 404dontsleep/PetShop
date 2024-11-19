import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Logo() {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <Ionicons name='paw' size={40} color='black' />
      <Text style={{ color: "black" }} variant='headlineLarge'>
        Pet Shop
      </Text>
    </View>
  );
}
