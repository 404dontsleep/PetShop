import { useCategoryStore } from "@/api/store/Product.store";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";

export default function AddCategory() {
  const { CreateCategory } = useCategoryStore();
  const [categoryName, setCategoryName] = useState("");
  const { setError } = useGlobalErrorStore();
  const handleCreateCategory = () => {
    console.log(categoryName);
    CreateCategory(categoryName)
      .then(() => {
        setError("Category created successfully");
        router.back();
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
      });
  };
  return (
    <DefaultView style={{ flex: 1 }}>
      <Text variant='displaySmall'>Add Category</Text>
      <TextInput
        label={"Category Name"}
        value={categoryName}
        onChange={(e) => setCategoryName(e.nativeEvent.text)}
      />
      <Button mode='contained' onPress={handleCreateCategory}>
        Create
      </Button>
    </DefaultView>
  );
}
