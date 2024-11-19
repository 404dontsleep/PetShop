import { useCategoryStore } from "@/api/store/Product.store";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import { ICategoryModel } from "@MyTypes/Product.Type";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";

export default function EditCategory() {
  const { CategoryID } = useLocalSearchParams();
  const { Categorys, UpdateCategory } = useCategoryStore();
  const { setError } = useGlobalErrorStore();
  const isExist = Categorys.find((c) => c.CategoryID + "" === CategoryID);
  const [category, setCategory] = useState<ICategoryModel>(
    isExist || { CategoryID: 0, CategoryName: "" }
  );
  const handleUpdateCategory = () => {
    UpdateCategory(category)
      .then(() => {
        setError("Updated Successfully");
        router.back();
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
      });
  };
  if (!isExist) return <Redirect href='/manage/category' />;
  return (
    <DefaultView style={{ flex: 1 }}>
      <Text variant='displaySmall'>Edit Category</Text>
      <TextInput
        label={"Category Name"}
        value={category.CategoryName}
        onChange={(e) =>
          setCategory((state) => ({
            ...state,
            CategoryName: e.nativeEvent.text,
          }))
        }
      />
      <Button mode='contained' onPress={handleUpdateCategory}>
        Update
      </Button>
    </DefaultView>
  );
}
