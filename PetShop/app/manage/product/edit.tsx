import {
  IProductFEModel,
  useCategoryStore,
  useImageStore,
  useProductStore,
} from "@/api/store/Product.store";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import ListChooseModal from "@/components/List/ListChooseModal";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Avatar, Button, Card, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { IImageModel } from "@MyTypes/Product.Type";
import { BASE_URL } from "@/api/AxiosInstance";

export default function EditProduct() {
  const { ProductID } = useLocalSearchParams();
  const [product, setProduct] = useState<IProductFEModel>({
    ProductID: 0,
    Name: "",
    Description: "",
    Price: 0,
    CategoryID: 0,
    Path: "",
    Stock: 0,
  });
  const { Categorys, GetCategorys } = useCategoryStore();
  const { GetProduct, UpdateProduct } = useProductStore();
  const { setError } = useGlobalErrorStore();
  const handleChange = (key: keyof IProductFEModel) => {
    return (e: string) => {
      setProduct({
        ...product,
        [key]: typeof product[key] === "number" ? parseInt(e) || 0 : e,
      });
    };
  };
  const handleUpdate = () => {
    const ProductToUpdate = { ...product, Images: undefined };
    UpdateProduct(ProductToUpdate)
      .then(() => {
        setError("Product updated successfully");
        router.back();
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
      });
  };
  useEffect(() => {
    GetCategorys();
    GetProduct(ProductID as any)
      .then((p) => {
        setProduct(p);
      })
      .catch((error) => {
        router.back();
      });
  }, []);
  return (
    <DefaultView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ gap: 16 }}>
          <TextInput
            label='Product Path'
            value={product.Path}
            onChangeText={handleChange("Path")}
          />
          <TextInput
            label='Product Name'
            value={product.Name}
            onChangeText={handleChange("Name")}
          />
          <TextInput
            label='Product Price'
            value={product.Price.toString()}
            onChangeText={handleChange("Price")}
            keyboardType='number-pad'
          />
          <TextInput
            label='Product Stock'
            value={product.Stock.toString()}
            onChangeText={handleChange("Stock")}
            keyboardType='number-pad'
          />
          <ListChooseModal
            value={Categorys.find((c) => c.CategoryID === product.CategoryID)}
            data={Categorys.map((c) => ({
              key: c.CategoryID + "",
              text: c.CategoryName,
              render: (
                <Card>
                  <View style={{ padding: 8 }}>
                    <Text variant='bodyMedium'>{c.CategoryName}</Text>
                  </View>
                </Card>
              ),
              value: c,
            }))}
            onChoose={(e) => {
              handleChange("CategoryID")(e?.CategoryID + "");
            }}
          />
          <TextInput
            label='Product Description'
            value={product.Description}
            onChangeText={handleChange("Description")}
            multiline
            numberOfLines={4}
          />
          <UploadImageComponent
            ProductID={product.ProductID}
            Images={product.Images}
          />
          <Button mode='contained' onPress={handleUpdate}>
            Update
          </Button>
        </View>
      </ScrollView>
    </DefaultView>
  );
}

function UploadImageComponent({
  ProductID,
  Images,
}: {
  ProductID: number;
  Images?: IImageModel[];
}) {
  const [TempImages, setImages] = useState<IImageModel[]>();
  const { UploadImage } = useImageStore();
  const { setError } = useGlobalErrorStore();
  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (result.assets && result.assets.length > 0) {
      const base64 = result.assets[0].base64;
      const uri = `${base64}`;
      UploadImage({ ProductID, Uri: uri, ImageID: "" })
        .then((Image) => {
          TempImages?.push(Image);
          setError("Image uploaded successfully");
        })
        .catch((error) => {
          if (error?.response?.data?.message)
            setError(error.response.data.message);
        });
    }
  };
  useEffect(() => {
    setImages(Images ?? []);
  }, [Images]);
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <View style={{ padding: 8 }}>
        <Pressable onPress={handleChooseImage}>
          <Avatar.Icon
            icon='camera'
            size={64}
            style={{ backgroundColor: "#fff" }}
          />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          flex: 1,
          overflow: "scroll",
          alignItems: "center",
          padding: 8,
        }}
      >
        {TempImages?.map((Image, index) => (
          <Avatar.Image
            key={index}
            source={{ uri: `${BASE_URL}/image/${Image.ImageID}` }}
          />
        ))}
      </View>
    </View>
  );
}
