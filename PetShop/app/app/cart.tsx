import { formatPrice } from "@/api/Helper";
import useAddressStore from "@/api/store/Address.store";
import useCartStore from "@/api/store/Cart.store";
import useOrderStore from "@/api/store/Order.store";
import { useProductStore } from "@/api/store/Product.store";
import SimpleAddressCard from "@/components/address/SimpleAddressCard";
import ApiImage from "@/components/ApiImage";
import { QuantityCounterComponent } from "@/components/app/product/QuantityCounter";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import ListChooseModal from "@/components/List/ListChooseModal";
import { IItemModel } from "@MyTypes/Cart.Type";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function cart() {
  const { Cart } = useCartStore();
  return (
    <DefaultView style={{ flex: 1 }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ gap: 8, padding: 2 }}>
          {Cart.map((item) => (
            <SimpleItemCard key={item.ItemID} Item={item} />
          ))}
        </View>
      </ScrollView>
      <SimpleCheckoutArea />
    </DefaultView>
  );
}
function SimpleCheckoutArea() {
  const { Cart, GetCart } = useCartStore();
  const { Address } = useAddressStore();
  const { Products } = useProductStore();
  const { CreateOrder } = useOrderStore();
  const [AddressID, setAddressID] = useState(0);
  const { setError } = useGlobalErrorStore();
  const handleCheckout = () => {
    const ItemIDs = Cart.map((c) => c.ItemID);
    CreateOrder(ItemIDs, AddressID)
      .then(() => {
        setError("Checkout successful");
        GetCart();
      })
      .catch(() => {
        setError("Failed to checkout");
      });
  };
  const handleChooseAddress = (AddressID: number) => {
    setAddressID(AddressID);
  };
  return (
    <View
      style={{
        gap: 16,
        padding: 16,
        backgroundColor: "white",
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Total:</Text>
        <Text style={{ textAlign: "right", fontWeight: "bold" }}>
          {formatPrice(
            Cart.reduce(
              (a, b) =>
                a +
                (Products.find((p) => p.ProductID === b.ProductID)?.Price ??
                  0) *
                  b.Quantity,
              0
            )
          )}
        </Text>
      </View>
      {Address.length === 0 ? (
        <Link href='/address' asChild>
          <Button mode='elevated'>Add Address</Button>
        </Link>
      ) : (
        <ListChooseModal
          value={Address[0]}
          data={Address.map((c) => ({
            key: c.AddressID + "",
            text: [c.Street, c.City, c.State].join(", "),
            render: (
              <Pressable>
                <SimpleAddressCard Address={c} showDelete={false} />
              </Pressable>
            ),
            value: c,
          }))}
          onChoose={(e) => {
            handleChooseAddress(e.AddressID);
          }}
        />
      )}
      <Button
        mode='contained'
        disabled={Address.length === 0 || AddressID === 0 || Cart.length === 0}
        onPress={handleCheckout}
      >
        Checkout
      </Button>
    </View>
  );
}

function SimpleItemCard({ Item }: { Item: IItemModel }) {
  const { RemoveFromCart, UpdateCart } = useCartStore();
  const { Products } = useProductStore();
  const { setError } = useGlobalErrorStore();
  const Product = Products.find((p) => p.ProductID === Item.ProductID);
  if (!Product) return null;
  const handleValueChange = (value: number) => {
    if (value === Item.Quantity) return;
    if (value === 0) {
      RemoveFromCart(Item)
        .then(() => {
          setError("Removed Successfully");
        })
        .catch((error) => {
          if (error?.response?.data?.message)
            setError(error.response.data.message);
          else setError("Failed to remove");
        });
    } else
      UpdateCart({ ItemID: Item.ItemID, Quantity: value })
        .then(() => {
          setError("Updated Successfully");
        })
        .catch((error) => {
          if (error?.response?.data?.message)
            setError(error.response.data.message);
          setError("Failed to update");
        });
  };
  return (
    <Card>
      <View style={{ flexDirection: "row", gap: 8, padding: 8 }}>
        <ApiImage
          ImageID={Product.Images?.[0].ImageID}
          style={{ width: 100, height: "100%", minHeight: 100 }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} variant='titleLarge'>
              {Product.Name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <QuantityCounterComponent
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
              min={0}
              max={Product.Stock}
              value={Item.Quantity}
              onValueChange={handleValueChange}
            />
            <Text
              variant='bodyLarge'
              style={{ textAlign: "right", fontWeight: "bold" }}
            >
              {formatPrice(Item.Quantity * Product.Price)}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
