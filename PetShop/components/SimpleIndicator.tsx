import { ActivityIndicator } from "react-native-paper";
import DefaultView from "./DefaultView";

export default function SimpleIndicator() {
  return (
    <DefaultView>
      <ActivityIndicator animating size={"large"} />
    </DefaultView>
  );
}
