import { IProductFEModel } from "@/api/store/Product.store";
import ApiImage from "@/components/ApiImage";
import { ScrollView, View } from "react-native";

export default function ProductDetailImageSlider({
  Product,
}: {
  Product: IProductFEModel;
}) {
  return (
    <ScrollView
      style={{ width: "100%" }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        {Product.Images?.map((image) => (
          <ApiImage
            style={{ width: 300, height: 300 }}
            ImageID={image.ImageID}
            key={image.ImageID}
          />
        ))}
      </View>
    </ScrollView>
  );
}
