import useAddressStore from "@/api/store/Address.store";
import useAuthStore from "@/api/store/Auth.store";
import useCartStore from "@/api/store/Cart.store";
import useOrderStore from "@/api/store/Order.store";
import DefaultView from "@/components/DefaultView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { Avatar, Badge, Button, Card, Divider, Text } from "react-native-paper";

export default function Profile() {
  const { User } = useAuthStore();
  const { Cart } = useCartStore();
  const { Address } = useAddressStore();
  const { Orders } = useOrderStore();
  return (
    <DefaultView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Avatar.Icon
          size={64}
          icon='account'
          style={{ backgroundColor: "white" }}
        />
        <View>
          <Text variant='titleLarge'>{User?.Email}</Text>
          <Text variant='bodyMedium'>{User?.Role}</Text>
        </View>
      </View>
      <Divider />
      <View style={{ gap: 16, flex: 1 }}>
        <Link href='/order' asChild>
          <Pressable>
            <ProfileCard
              badge={Orders.length}
              title='Order'
              subtitle='View Order'
              icon='clipboard-outline'
            />
          </Pressable>
        </Link>
        <Link href='/app/cart' asChild>
          <Pressable>
            <ProfileCard
              badge={Cart.length}
              title='Cart'
              subtitle='View Cart'
              icon='cart-outline'
            />
          </Pressable>
        </Link>
        <Link href='/address' asChild>
          <Pressable>
            <ProfileCard
              badge={Address.length}
              title='Address'
              subtitle='View Address'
              icon='home-outline'
            />
          </Pressable>
        </Link>
      </View>
      <Button
        icon={(props) => <Ionicons name='log-out-outline' {...props} />}
        mode='elevated'
      >
        Logout
      </Button>
    </DefaultView>
  );
}

function ProfileCard({
  badge,
  title,
  subtitle,
  icon,
}: {
  badge: number;
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}) {
  return (
    <Card>
      <Card.Title
        left={(props) => (
          <>
            <Ionicons name={icon} {...props}></Ionicons>
            <Badge style={{ position: "absolute", top: -5, right: -5 }}>
              {badge}
            </Badge>
          </>
        )}
        title={title}
        subtitle={subtitle}
      />
    </Card>
  );
}
