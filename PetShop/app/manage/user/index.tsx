import useUserStore from "@/api/store/User.store";
import DefaultView from "@/components/DefaultView";
import { useGlobalErrorStore } from "@/components/GlobalError";
import SimpleTable from "@/components/manage/user/SimpleTable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IUserModel } from "@MyTypes/User.Type";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  DataTable,
  Modal,
  Portal,
  RadioButton,
  Searchbar,
  Text,
  TouchableRipple,
} from "react-native-paper";

export default function index() {
  const { GetUsers, Users } = useUserStore();
  const [search, setSearch] = useState("");
  const Items: (IUserModel & { key: string })[] = Users.map((user) => ({
    ...user,
    key: user.UserID.toString(),
  })).sort((a, b) => a.UserID - b.UserID);
  useEffect(() => {
    GetUsers();
  }, []);
  return (
    <DefaultView>
      <Searchbar value={search} onChangeText={setSearch} placeholder='Search' />
      <SimpleTable
        Items={Items}
        Filter={(user) =>
          user.Email.toLowerCase().includes(search.toLowerCase())
        }
        Headers={["UserID", "Email", "Role"]}
        RenderRow={(user) => <UserRow key={user.UserID} user={user} />}
      />
    </DefaultView>
  );
}

function UserRow({ user }: { user: IUserModel }) {
  const [visible, setVisible] = useState(false);
  const { UpdateUser } = useUserStore();
  const { setError } = useGlobalErrorStore();

  const handleRoleChange = (role: IUserModel["Role"]) => {
    UpdateUser({ UserID: user.UserID, Role: role })
      .then(() => {
        setVisible(false);
        setError("User updated successfully");
      })
      .catch(() => {
        setError("Failed to update user");
      });
  };
  return (
    <>
      <DataTable.Row>
        <DataTable.Cell>{user.UserID}</DataTable.Cell>
        <DataTable.Cell>{user.Email}</DataTable.Cell>
        <DataTable.Cell>
          <TouchableRipple
            style={{
              padding: 4,
              marginRight: 8,
              borderRadius: 8,
              backgroundColor: "#CCF",
            }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Ionicons name='pencil' />
          </TouchableRipple>
          {user.Role}
        </DataTable.Cell>
      </DataTable.Row>
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={{
            padding: 16,
            backgroundColor: "#FFF",
            margin: 16,
          }}
          onDismiss={() => {
            setVisible(false);
          }}
        >
          <View>
            <Text variant='headlineSmall'>Edit Role of {user.Email}</Text>
            <RadioButton.Group
              value={user.Role}
              onValueChange={(role) => {
                if (role === "Admin" || role === "User") {
                  handleRoleChange(role);
                }
              }}
            >
              <RadioButton.Item label='Admin' value='Admin' />
              <RadioButton.Item label='User' value='User' />
            </RadioButton.Group>
          </View>
        </Modal>
      </Portal>
    </>
  );
}
