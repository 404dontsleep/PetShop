import { formatPrice } from "@/api/Helper";
import useCartStore from "@/api/store/Cart.store";
import {
  IProductFEModel,
  useCategoryStore,
  useProductStore,
} from "@/api/store/Product.store";
import ApiImage from "@/components/ApiImage";
import DefaultView from "@/components/DefaultView";
import { SimpleSearchBar } from "@/components/simple/SimpleSearchBar";
import { SimpleSegmenteButtons } from "@/components/simple/SimpleSegmentedButtons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Badge, Card, Chip, Text } from "react-native-paper";

export default function index() {
  const { Products, GetProducts } = useProductStore();
  const { Categorys, GetCategorys } = useCategoryStore();
  const { search, _SearchBar } = SimpleSearchBar();
  const { selected, _Segment } = SimpleSegmenteButtons({
    buttons: Categorys.map((c) => ({
      value: c.CategoryID + "",
      label: c.CategoryName,
      icon: (props) => (
        <Badge>
          {Products.reduce(
            (a, b) => a + (b.CategoryID === c.CategoryID ? 1 : 0),
            0
          )}
        </Badge>
      ),
    })),
  });
  useEffect(() => {
    GetProducts();
    GetCategorys();
  }, []);
  return (
    <DefaultView style={{ flex: 1 }}>
      {_SearchBar}
      <View style={{ gap: 8 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {_Segment}
        </ScrollView>
      </View>
      <ScrollView>
        <View
          style={{
            gap: 8,
            flex: 1,
            padding: 8,
          }}
        >
          {Products.filter(
            (p) => selected.length === 0 || selected.includes(p.CategoryID + "")
          )
            .filter((p) => p.Name.toLowerCase().includes(search.toLowerCase()))
            .map((Product) => (
              <Link
                key={Product.ProductID}
                href={{
                  pathname: "/app/product",
                  params: { ProductID: Product.ProductID },
                }}
                asChild
              >
                <Pressable>
                  <ProductCard Product={Product} />
                </Pressable>
              </Link>
            ))}
        </View>
      </ScrollView>
    </DefaultView>
  );
}
const ProductCard = ({ Product }: { Product: IProductFEModel }) => {
  return (
    <Card>
      <View style={{ flexDirection: "row", gap: 8, padding: 8 }}>
        <ApiImage
          ImageID={Product.Images?.[0].ImageID}
          style={{ width: 100, height: "100%", minHeight: 100 }}
        />
        <View style={{ flex: 1 }}>
          <Chip
            style={{ position: "absolute", top: 0, right: 0 }}
            icon={(props) => <Ionicons name='star' {...props} />}
          >
            1
          </Chip>
          <View style={{ flex: 1 }}>
            <Text variant='titleLarge' lineBreakMode='clip'>
              {Product.Name}
            </Text>
            <Text variant='bodyMedium' numberOfLines={2}>
              {Product.Description}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", gap: 8, justifyContent: "flex-end" }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                backgroundColor: "white",
                paddingHorizontal: 16,
                paddingVertical: 4,
                borderRadius: 20,
              }}
            >
              <Text variant='titleMedium'>{formatPrice(Product.Price)}</Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
