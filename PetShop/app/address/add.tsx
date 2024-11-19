import useAddressStore from "@/api/store/Address.store";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import { IAddressModel } from "@MyTypes/User.Type";
import { router } from "expo-router";
import React from "react";
import { Button, TextInput } from "react-native-paper";

export default function add() {
  const { AddAddress } = useAddressStore();
  const [Address, setAddress] = React.useState<IAddressModel>({
    AddressID: 0,
    Street: "",
    City: "",
    State: "",
    ContactNumber: "",
    UserID: 0,
  });
  const { setError } = useGlobalErrorStore();
  const handleChange = (key: keyof IAddressModel) => {
    return (e: string) => {
      setAddress({
        ...Address,
        [key]: typeof Address[key] === "number" ? parseInt(e) || 0 : e,
      });
    };
  };
  const handleAdd = () => {
    AddAddress(Address)
      .then(() => {
        setError("Address added successfully");
        router.back();
      })
      .catch((error) => {
        if (error?.response?.data?.message)
          setError(error.response.data.message);
        else setError("Failed to add address");
      });
  };
  return (
    <DefaultView>
      <TextInput
        label='Contact Number'
        error={/^0\d{9,10}$/.test(Address.ContactNumber) === false}
        value={Address.ContactNumber}
        onChangeText={handleChange("ContactNumber")}
      />
      <TextInput
        label='City'
        value={Address.City}
        onChangeText={handleChange("City")}
      />
      <TextInput
        label='State'
        value={Address.State}
        onChangeText={handleChange("State")}
      />
      <TextInput
        label='Street'
        value={Address.Street}
        onChangeText={handleChange("Street")}
      />
      <Button mode='contained' onPress={handleAdd}>
        Add Address
      </Button>
    </DefaultView>
  );
}
