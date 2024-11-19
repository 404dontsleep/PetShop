import React from "react";
import { View, ViewProps } from "react-native";

const DefaultView: React.FC<ViewProps> = ({ children, style, ...props }) => (
  <View
    style={[
      style,
      {
        padding: 16,
        gap: 16,
      },
    ]}
    {...props}
  >
    {children}
  </View>
);

export default DefaultView;
