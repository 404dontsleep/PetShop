import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
export const QuantityCounterComponent = ({
  min,
  max,
  value,
  onValueChange,
  style,
}: {
  min?: number;
  max?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  style?: React.ComponentProps<typeof View>["style"];
}) => {
  const [quantity, setQuantity] = useState(value || 1);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.min(max || Number.MAX_VALUE, prevQuantity + 1);
      return newQuantity;
    });
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(min || 0, prevQuantity - 1);
      return newQuantity;
    });
  };
  useEffect(() => {
    if (onValueChange) onValueChange(quantity);
  }, [quantity]);
  return (
    <View
      style={[{ flexDirection: "row", alignItems: "center", gap: 8 }, style]}
    >
      <Pressable onPress={handleDecrement}>
        <Ionicons name='remove-outline' size={24} />
      </Pressable>
      <Text variant='bodyLarge'>{quantity}</Text>
      <Pressable onPress={handleIncrement}>
        <Ionicons name='add-outline' size={24} />
      </Pressable>
    </View>
  );
};
export const QuantityCounter = ({
  min,
  max,
  value,
}: {
  min?: number;
  max?: number;
  value?: number;
}) => {
  const [quantity, setQuantity] = useState(value || 1);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.min(max || Number.MAX_VALUE, prevQuantity + 1);
      return newQuantity;
    });
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(min || 0, prevQuantity - 1);
      return newQuantity;
    });
  };
  const handleReset = () => setQuantity(1);
  const Counter = ({
    style,
  }: {
    style?: React.ComponentProps<typeof View>["style"];
  }): React.ReactElement => (
    <View
      style={[{ flexDirection: "row", alignItems: "center", gap: 8 }, style]}
    >
      <Pressable onPress={handleDecrement}>
        <Ionicons name='remove-outline' size={24} />
      </Pressable>
      <Text variant='bodyLarge'>{quantity}</Text>
      <Pressable onPress={handleIncrement}>
        <Ionicons name='add-outline' size={24} />
      </Pressable>
    </View>
  );
  return { quantity, Counter, reset: handleReset };
};
