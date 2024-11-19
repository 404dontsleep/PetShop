import { ScrollView, View } from "react-native";
import SimpleDashboardCard from "@/components/SimpleDashboardCard";
import { Card, Divider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
export default function index() {
  return (
    <View style={{ padding: 16, gap: 16, flex: 1 }}>
      {/* <View style={{ flexDirection: "row", gap: 16 }}>
        <SimpleDashboardCard iconName='card-outline' subtitle='Total Order' />
        <SimpleDashboardCard
          iconName='accessibility'
          subtitle='Card Subtitle'
        />
        <SimpleDashboardCard
          iconName='accessibility'
          subtitle='Card Subtitle'
        />
      </View> */}
      <Divider />
      <ScrollView>
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
          <Link href='/manage/category' asChild>
            <Card>
              <Card.Title
                left={(props) => (
                  <Ionicons name='storefront-outline' {...props} />
                )}
                title='Category'
                subtitle='Manage Category'
              />
            </Card>
          </Link>
          <Link href='/manage/product' asChild>
            <Card>
              <Card.Title
                left={(props) => (
                  <Ionicons name='storefront-outline' {...props} />
                )}
                title='Product'
                subtitle='Manage Product'
              />
            </Card>
          </Link>
          <Link href='/manage/user' asChild>
            <Card>
              <Card.Title
                left={(props) => <Ionicons name='person-outline' {...props} />}
                title='User'
                subtitle='Manage User'
              />
            </Card>
          </Link>
          <Link href='/manage/order' asChild>
            <Card>
              <Card.Title
                left={(props) => (
                  <Ionicons name='clipboard-outline' {...props} />
                )}
                title='Order'
                subtitle='Manage Order'
              />
            </Card>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
