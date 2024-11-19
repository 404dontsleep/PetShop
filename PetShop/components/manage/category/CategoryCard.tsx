import { useCategoryStore } from "@/api/store/Product.store";
import { useGlobalErrorStore } from "@/components/GlobalError";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function CategoryCard({
  CategoryID,
  CategoryName,
}: {
  CategoryID: number;
  CategoryName: string;
}) {
  const { DeleteCategory } = useCategoryStore();
  const { setError } = useGlobalErrorStore();
  const handleDeleteCategory = () => {
    DeleteCategory(CategoryID)
      .then(() => {
        setError("Category deleted");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 8,
        }}
      >
        <Text variant='bodyLarge' style={{ flex: 1 }}>
          {CategoryName}
        </Text>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Button
            mode='elevated'
            onPress={() => {
              router.push({
                pathname: "/manage/category/edit",
                params: { CategoryID },
              });
            }}
          >
            <Ionicons name='pencil' size={16} />
          </Button>
          <Button mode='elevated' onPress={handleDeleteCategory}>
            <Ionicons name='trash' size={16} />
          </Button>
        </View>
      </View>
    </Card>
  );
}
