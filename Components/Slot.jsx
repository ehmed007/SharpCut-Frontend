import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../Colors/Color";


export default function Slot(props) {
  const [selected, setSelected] = useState(props.color);

  useEffect(() => {
    setSelected(props.color);
  });
  
  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        backgroundColor: selected,
        margin: 4.8,
        // borderWidth: 2,
        // borderColor: "white",
      }}
      onPress={() => props.func(props.title)}
      key={props.id}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 13,
          padding: 8,
          color: Color.textColor,
        }}
        key={props.id}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
