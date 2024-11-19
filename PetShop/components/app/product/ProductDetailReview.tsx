import { IProductFEModel } from "@/api/store/Product.store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IReviewModel } from "@MyTypes/Review.Type";
import { View } from "react-native";
import { Avatar, Card, Chip, Text } from "react-native-paper";

function SimpleReview({ Review }: { Review: IReviewModel }) {
  return (
    <Card>
      <Card.Title
        left={(props) => (
          <Avatar.Text {...props} label={Review.UserID.toString()} />
        )}
        title={`User ${Review.UserID}`}
        subtitle={Review.Comment}
      />
      <Chip
        style={{ position: "absolute", top: 8, right: 8 }}
        icon={(props) => <Ionicons name='star' {...props} />}
      >
        {Review.Rating}
      </Chip>
      <Card.Content>
        <Text variant='bodyLarge'>{Review.Comment}</Text>
      </Card.Content>
    </Card>
  );
}

export default function ProductDetailReview({
  Product,
}: {
  Product: IProductFEModel;
}) {
  return (
    <View style={{ gap: 16, padding: 8 }}>
      <Text variant='titleLarge'>Reviews</Text>
      <SimpleReview
        Review={{
          UserID: 1,
          ReviewID: 1,
          Rating: 4,
          Comment: "Good Product",
          ProductID: 1,
        }}
      />
    </View>
  );
}
