import { Stack, Tabs } from "expo-router";
import useAuthStore from "@/api/store/Auth.store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import useCartStore from "@/api/store/Cart.store";
import useAddressStore from "@/api/store/Address.store";
import useOrderStore from "@/api/store/Order.store";
import { useProductStore } from "@/api/store/Product.store";
import SimpleIndicator from "@/components/SimpleIndicator";
export default function RootLayout() {
  const { User } = useAuthStore();
  const { Cart } = useCartStore();
  const { GetAuthUser } = useAuthStore();
  const { GetCart } = useCartStore();
  const { GetAddress } = useAddressStore();
  const { GetOrders } = useOrderStore();
  const { GetProducts } = useProductStore();
  useEffect(() => {
    GetAuthUser();
    GetCart();
    GetAddress();
    GetOrders();
    GetProducts();
  }, []);
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name='home-sharp' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          tabBarBadge: Cart?.length,
          tabBarLabel: "Cart",
          headerTitle: "Cart",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name='cart' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='admin'
        options={{
          href: User?.Role === "Admin" ? "/app/admin" : null,
          tabBarLabel: "Admin",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name='person' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: "Profile",
          headerShown: true,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name='person-circle-sharp' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='product'
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
