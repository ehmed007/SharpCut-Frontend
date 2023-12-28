import { View, Text } from "react-native";
import React from "react";

export default function ReceiptText(props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 30,
        marginVertical:5
      }}
    >
      <View style={{ width: "50%", display: "flex", alignItems: "flex-start" }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "bold",
            color: props.leftTextColor,
          }}
        >
          {props.leftText}
        </Text>
      </View>

      <View style={{ width: "50%", display: "flex", alignItems: "flex-end" }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            color: props.rightTextColor,
          }}
        >
          {props.rightText}
        </Text>
      </View>
    </View>
  );
}
