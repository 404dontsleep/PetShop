import useAddressStore from "@/api/store/Address.store";
import { IAddressModel } from "@MyTypes/User.Type";
import { useGlobalErrorStore } from "../GlobalError";
import { Card, Text } from "react-native-paper";
import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SimpleAddressCard({
  Address,
  showDelete = false,
}: {
  Address: IAddressModel;
  showDelete?: boolean;
}) {
  const { DeleteAddress } = useAddressStore();
  const { setError } = useGlobalErrorStore();
  const handleDelete = () => {
    DeleteAddress(Address.AddressID)
      .then(() => {
        setError("Address deleted successfully");
      })
      .catch(() => {
        setError("Failed to delete address");
      });
  };
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          padding: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>
            Address: {Address.Street}, {Address.City}, {Address.State}
          </Text>
          <Text>Contact: {Address.ContactNumber}</Text>
        </View>
        {showDelete && (
          <Pressable onPress={handleDelete}>
            <Ionicons color={"#f89"} name='trash-outline' size={24} />
          </Pressable>
        )}
      </View>
    </Card>
  );
}
