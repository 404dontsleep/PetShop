import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Modal, Portal, Searchbar, TextInput } from "react-native-paper";

export default function ListChooseModal<T>({
  data,
  onChoose,
  style,
  value,
}: {
  data: {
    key: string;
    text: string;
    render: JSX.Element;
    value: T;
  }[];
  value: T;
  onChoose: (item: T) => void;
  style?: any;
}) {
  const [search, setSearch] = useState("");
  const filteredData =
    search === ""
      ? data
      : data.filter((item) =>
          JSON.stringify(item.text.toLowerCase()).includes(search.toLowerCase())
        );
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<T>(value);
  useEffect(() => {
    setSelected(value);
  }, [value]);
  return (
    <>
      <TextInput
        placeholder='Select Item'
        value={data.find((d) => d.value === selected)?.text || ""}
        onFocus={() => setVisible(true)}
        right={
          <TextInput.Icon
            icon={"chevron-down"}
            onPress={() => setVisible(true)}
          />
        }
      />
      <Portal>
        <Modal
          onDismiss={() => setVisible(false)}
          visible={visible}
          contentContainerStyle={{
            padding: 16,
            backgroundColor: "white",
            borderRadius: 16,
            margin: 16,
            maxHeight: "60%",
          }}
        >
          <View style={{ gap: 16 }}>
            <View>
              <Searchbar
                value={search}
                placeholder='Search'
                onChangeText={setSearch}
              />
            </View>
            <View style={[{ gap: 8 }, style]}>
              {filteredData.map((item) =>
                React.cloneElement(item.render, {
                  key: item.key,
                  onPress: () => {
                    onChoose(item.value);
                    setSelected(item.value);
                    setVisible(false);
                  },
                })
              )}
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
}
