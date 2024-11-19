import Ionicons from "@expo/vector-icons/Ionicons";
import { Card, Text } from "react-native-paper";

export default function SimpleDashboardCard({
  iconName,
  subtitle,
}: {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  subtitle: React.ReactNode;
}) {
  return (
    <Card>
      <Card.Title
        title={
          <Text style={{ textAlign: "center" }}>
            <Ionicons name={iconName} size={24} color='black' />
          </Text>
        }
        subtitle={subtitle}
      />
    </Card>
  );
}
