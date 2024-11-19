import { IProductFEModel, useProductStore } from "@/api/store/Product.store";
import ApiImage from "@/components/ApiImage";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Avatar, Button, Card, Searchbar, Text } from "react-native-paper";

export default function ManageProduct() {
  const { GetProducts, Products } = useProductStore();
  const [search, setSearch] = useState("");
  const filteredProducts = Products.filter((Product) => {
    return Product.Name.toLowerCase().includes(search.toLowerCase());
  });
  useEffect(() => {
    GetProducts();
  }, []);
  return (
    <DefaultView style={{ flex: 1 }}>
      <View style={{ gap: 8 }}>
        <Searchbar
          placeholder='Search'
          value={search}
          onChangeText={setSearch}
        />
        <Link push href='/manage/product/add' asChild>
          <Button mode='contained'>Add Product</Button>
        </Link>
      </View>
      <ScrollView>
        <View style={{ flex: 1, gap: 16, padding: 2 }}>
          {filteredProducts.map((Product) => (
            <ProductCard
              key={Product.ProductID}
              Product={{
                ...Product,
                Rating: Math.round(Math.random() * 5),
              }}
            />
          ))}
        </View>
      </ScrollView>
    </DefaultView>
  );
}

function ProductCard({ Product }: { Product: IProductFEModel }) {
  const { DeleteProduct } = useProductStore();
  const { setError } = useGlobalErrorStore();
  const handleDelete = () => {
    DeleteProduct(Product.ProductID)
      .then(() => {
        setError("Product deleted successfully");
      })
      .catch(() => {
        setError("Failed to delete product");
      });
  };
  return (
    <Card style={{ overflow: "hidden" }}>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <View>
          <ApiImage
            style={{ width: 100, height: 100 }}
            ImageID={Product.Images?.[0].ImageID}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Card.Title title={`${Product.Name}`} />
          <Card.Content>
            <Text numberOfLines={2}>{Product.Description}</Text>
          </Card.Content>
        </View>
        <View style={{ justifyContent: "space-around", padding: 8 }}>
          <Link
            push
            href={{
              pathname: "/manage/product/edit",
              params: { ProductID: Product.ProductID },
            }}
          >
            <Avatar.Icon icon='pencil' size={32} />
          </Link>
          <Pressable onPress={handleDelete}>
            <Avatar.Icon
              icon='delete'
              size={32}
              style={{ backgroundColor: "pink" }}
            />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}
