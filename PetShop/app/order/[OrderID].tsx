import { formatPrice } from "@/api/Helper";
import useAuthStore from "@/api/store/Auth.store";
import useOrderStore from "@/api/store/Order.store";
import SimpleAddressCard from "@/components/address/SimpleAddressCard";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import SimpleIndicator from "@/components/SimpleIndicator";
import { IOrderItemModel, IOrderModel } from "@MyTypes/Cart.Type";
import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, ButtonProps, Card, Divider, Text } from "react-native-paper";

export default function view() {
  const { OrderID } = useGlobalSearchParams();
  const { User } = useAuthStore();
  const { GetOrder, DeleteOrder, UpdateOrder } = useOrderStore();
  const [Order, setOrder] = useState<IOrderModel>();
  const { setError } = useGlobalErrorStore();
  useEffect(() => {
    GetOrder(Number(OrderID)).then(setOrder).catch(console.error);
  }, []);
  if (!Order) return <SimpleIndicator />;
  const handleCancel = () => {
    DeleteOrder({ OrderID: Order.OrderID })
      .then(() => {
        setError("Order cancelled successfully");
        GetOrder(Number(OrderID)).then(setOrder).catch(console.error);
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
        else setError("Failed to cancel order");
      });
  };
  const handleReceived = () => {
    UpdateOrder({ OrderID: Order.OrderID, Status: "Delivered" })
      .then(() => {
        setError("Order received successfully");
        GetOrder(Number(OrderID)).then(setOrder).catch(console.error);
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
        else setError("Failed to receive order");
      });
  };
  const handleApprove = () => {
    UpdateOrder({ OrderID: Order.OrderID, Status: "Shipped" })
      .then(() => {
        setError("Order approved successfully");
        GetOrder(Number(OrderID)).then(setOrder).catch(console.error);
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
        else setError("Failed to approve order");
      });
  };
  return (
    <DefaultView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, gap: 8, padding: 2 }}>
          {Order.Items.map((item, index) => (
            <SimpleItemCard key={index} Item={item} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
          gap: 8,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant='bodyLarge'>Order Date: </Text>
          <Text variant='bodyLarge' style={{ fontWeight: "bold" }}>
            {new Date(Order.OrderDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant='bodyLarge'>Total: </Text>
          <Text variant='bodyLarge' style={{ fontWeight: "bold" }}>
            {formatPrice(Order.Total)}
          </Text>
        </View>
        <Divider />
        <Text variant='bodyLarge' style={{ fontWeight: "bold" }}>
          Shipping Address
        </Text>
        <SimpleAddressCard Address={Order.Address} />
        <Divider />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant='bodyLarge'>Status: </Text>
          <Text variant='bodyLarge' style={{ fontWeight: "bold" }}>
            {Order.Status}
          </Text>
        </View>
        <Divider />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <SimpleActionButton
            buttonColor='pink'
            visible={Order.Status === "Pending"}
            onPress={handleCancel}
            children='Cancel Order'
          />
          <SimpleActionButton
            visible={Order.Status === "Pending" && User?.Role === "Admin"}
            onPress={handleApprove}
            children='Approve Order'
          />
          <SimpleActionButton
            buttonColor='lightblue'
            visible={Order.Status === "Shipped"}
            onPress={handleReceived}
            children='Confirm Received'
          />
          <SimpleActionButton
            buttonColor='lightblue'
            visible={Order.Status === "Delivered"}
            children='Review'
          />
          <SimpleActionButton
            buttonColor='pink'
            visible={Order.Status === "Cancelled"}
            children='Cancelled'
          />
        </View>
      </View>
    </DefaultView>
  );
}
function SimpleActionButton({
  visible,
  onPress,
  children,
  ...props
}: ButtonProps & { visible: boolean; onPress?: () => void; children: string }) {
  if (!visible) return null;
  return (
    <Button
      style={{ flex: 1 }}
      mode='contained'
      onPress={() => onPress?.()}
      {...props}
    >
      {children}
    </Button>
  );
}
function SimpleItemCard({ Item }: { Item: IOrderItemModel }) {
  return (
    <Card>
      <View style={{ flexDirection: "row", padding: 16, gap: 8 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontWeight: "bold" }}>{Item.Product.Name}</Text>
          <Text>x{Item.Quantity}</Text>
        </View>
        <View style={{ justifyContent: "flex-end" }}>
          <Text style={{ fontWeight: "bold" }}>
            {formatPrice(Item.Quantity * Item.Product.Price)}
          </Text>
        </View>
      </View>
    </Card>
  );
}
