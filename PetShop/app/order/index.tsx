import { formatPrice } from "@/api/Helper";
import useAuthStore from "@/api/store/Auth.store";
import useOrderStore from "@/api/store/Order.store";
import ApiImage from "@/components/ApiImage";
import DefaultView from "@/components/DefaultView";
import { SimpleSegmenteButtons } from "@/components/simple/SimpleSegmentedButtons";
import SimpleIndicator from "@/components/SimpleIndicator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IOrderModel } from "@MyTypes/Cart.Type";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Badge, Card, Chip, Text } from "react-native-paper";
const Status = ["Pending", "Shipped", "Delivered", "Cancelled"];
export default function index({ isAdmin = false }: { isAdmin: boolean }) {
  const { Orders, GetOrders } = useOrderStore();
  const { User } = useAuthStore();
  const { selected, _Segment } = SimpleSegmenteButtons({
    buttons: Status.map((c) => ({
      value: c,
      label: c,
      style: { minWidth: 140 },
      icon: (props) => (
        <Badge>
          {Orders.reduce((a, b) => a + (b.Status === c ? 1 : 0), 0)}
        </Badge>
      ),
    })),
  });
  useEffect(() => {
    GetOrders();
  }, []);
  if (!User) return <SimpleIndicator />;
  return (
    <DefaultView style={{ flex: 1 }}>
      <View style={{ gap: 8 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {_Segment}
        </ScrollView>
      </View>
      <ScrollView>
        <View style={{ flex: 1, gap: 16, padding: 2 }}>
          {Orders.filter(
            (order) => selected.length === 0 || selected.includes(order.Status)
          )
            .filter((order) => isAdmin || order.UserID === User.UserID)
            .map((order) => (
              <Link
                push
                href={{
                  pathname: `/order/[OrderID]`,
                  params: {
                    OrderID: order.OrderID,
                  },
                }}
                asChild
                key={order.OrderID}
              >
                <Pressable>
                  <SimpleOrderCard Order={order} />
                </Pressable>
              </Link>
            ))}
        </View>
      </ScrollView>
    </DefaultView>
  );
}

function SimpleOrderCard({ Order }: { Order: IOrderModel }) {
  return (
    <Card>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <ApiImage
          ImageID={Order.Items[0]?.Product.Image}
          style={{ width: 100, height: "100%", minHeight: 100 }}
        />
        <Card.Content style={{ flex: 1 }}>
          {Order.Items.slice(0, 3).map((item, index) => (
            <Text
              key={index}
              variant='titleSmall'
              style={{ fontWeight: "bold" }}
            >
              {item.Product.Name}
            </Text>
          ))}
          {Order.Items.length > 3 && (
            <Text variant='titleSmall'>and {Order.Items.length - 3} more</Text>
          )}
        </Card.Content>
        <View style={{}}>
          <View style={{ flex: 1 }}>
            <OrderStatus Status={Order.Status} />
          </View>
          <Text style={{ fontWeight: "bold", textAlign: "right" }}>
            {formatPrice(Order.Total)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

function OrderStatus({ Status }: { Status: IOrderModel["Status"] }) {
  const status: Record<
    IOrderModel["Status"],
    { Icon: React.ComponentProps<typeof Ionicons>["name"]; corlor?: string }
  > = {
    Pending: {
      Icon: "time-outline",
    },
    Shipped: {
      Icon: "train-outline",
      corlor: "#8cffa3",
    },
    Delivered: {
      Icon: "checkmark-circle-outline",
      corlor: "#fff09e",
    },
    Cancelled: {
      Icon: "close-circle-outline",
      corlor: "#ffdddd",
    },
  };
  const style = status[Status] || status.Pending;
  return (
    <Chip
      style={{ backgroundColor: style.corlor }}
      icon={(props) => <Ionicons name={style.Icon} {...props} />}
    >
      {Status}
    </Chip>
  );
}
