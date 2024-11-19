import useAddressStore from "@/api/store/Address.store";
import SimpleAddressCard from "@/components/address/SimpleAddressCard";
import DefaultView from "@/components/DefaultView";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";

export default function index() {
  const { Address, GetAddress } = useAddressStore();
  useEffect(() => {
    GetAddress();
  }, []);
  return (
    <DefaultView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, gap: 16, padding: 2 }}>
          {Address.map((i) => (
            <SimpleAddressCard showDelete key={i.AddressID} Address={i} />
          ))}
        </View>
      </ScrollView>
      <View>
        <Link push href='/address/add' asChild>
          <Button mode='contained'>Add Address</Button>
        </Link>
      </View>
    </DefaultView>
  );
}
