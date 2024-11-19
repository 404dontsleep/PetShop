import { useCategoryStore } from "@/api/store/Product.store";
import CategoryCard from "@/components/manage/category/CategoryCard";
import { Link } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";

export default function Category() {
  const { Categorys, GetCategorys } = useCategoryStore();
  useEffect(() => {
    GetCategorys();
  }, []);
  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Link push={false} href='/manage/category/add' asChild>
        <Button mode='contained'>Add Category</Button>
      </Link>
      <ScrollView>
        <View style={{ flex: 1, gap: 8, padding: 2 }}>
          {Categorys.map((c) => (
            <CategoryCard
              key={c.CategoryID}
              CategoryID={c.CategoryID}
              CategoryName={c.CategoryName}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
