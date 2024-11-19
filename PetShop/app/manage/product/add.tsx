import {
  IProductFEModel,
  useCategoryStore,
  useProductStore,
} from "@/api/store/Product.store";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import ListChooseModal from "@/components/List/ListChooseModal";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SectionList, View } from "react-native";
import {
  Button,
  Card,
  Modal,
  Portal,
  Searchbar,
  Text,
  TextInput,
} from "react-native-paper";

export default function add() {
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
  const { CreateProduct } = useProductStore();
  const { setError } = useGlobalErrorStore();
  const handleChange = (key: keyof IProductFEModel) => {
    return (e: string) => {
      setProduct({
        ...product,
        [key]: typeof product[key] === "number" ? parseInt(e) || 0 : e,
      });
    };
  };
  const handleAdd = () => {
    CreateProduct(product)
      .then(() => {
        setError("Product created successfully");
        router.back();
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
      });
  };
  useEffect(() => {
    GetCategorys();
  }, []);
  return (
    <DefaultView>
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
      </View>
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
      <Button mode='contained' onPress={handleAdd}>
        Add
      </Button>
    </DefaultView>
  );
}
