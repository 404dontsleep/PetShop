import { formatPrice } from "@/api/Helper";
import useCartStore from "@/api/store/Cart.store";
import { IProductFEModel, useProductStore } from "@/api/store/Product.store";
import ApiImage from "@/components/ApiImage";
import ProductDetailImageSlider from "@/components/app/product/ProductDetailImageSlider";
import ProductDetailReview from "@/components/app/product/ProductDetailReview";
import { QuantityCounter } from "@/components/app/product/QuantityCounter";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Chip, Divider, Text } from "react-native-paper";

export default function Product() {
  const [Product, setProduct] = useState<IProductFEModel>();
  const { GetProduct } = useProductStore();
  const { AddToCart } = useCartStore();
  const { quantity, Counter, reset } = QuantityCounter({
    min: 1,
    max: Product?.Stock || 0,
  });
  const { ProductID } = useLocalSearchParams();
  const { setError } = useGlobalErrorStore();
  const handleAddToCart = () => {
    if (!Product) return;
    AddToCart({
      ProductID: Product.ProductID,
      Quantity: quantity,
    })
      .then((res) => {
        setError("Item added to cart successfully");
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
        else setError(error.message);
      });
  };
  useEffect(() => {
    reset();
    if (!ProductID) return;
    const paramsID = parseInt(ProductID.toString());
    GetProduct(paramsID).then((res) => setProduct(res));
  }, [ProductID]);
  if (!Product) return <Text>Loading</Text>;
  return (
    <DefaultView style={{ flex: 1 }}>
      <View>
        <Text variant='headlineLarge' style={{ fontWeight: "bold" }}>
          {Product.Name}
        </Text>
        <Chip style={{}} icon={(props) => <Ionicons name='star' {...props} />}>
          1 (100 Review)
        </Chip>
      </View>
      <ScrollView>
        <View style={{ flex: 1, gap: 16 }}>
          <ProductDetailImageSlider Product={Product} />
          <Text variant='titleLarge'>Description</Text>
          <Text variant='bodyLarge'>{Product.Description}</Text>
          <Divider />
          <ProductDetailReview Product={Product} />
        </View>
      </ScrollView>
      <View style={styles.addToCartView}>
        <Text style={{ flex: 1 }} variant='bodyLarge'>
          {formatPrice(Product.Price || 0)}
        </Text>
        <Counter style={styles.addToCartCounter} />
        <Button
          mode='contained'
          icon={(props) => <Ionicons name='cart' {...props} />}
          onPress={handleAddToCart}
        >
          Add to Cart
        </Button>
      </View>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  addToCartView: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
  },
  addToCartCounter: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
});
