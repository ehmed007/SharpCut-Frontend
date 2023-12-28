import { View, Text, TouchableOpacity, Image } from "react-native";
import Color from "../Colors/Color";
import React, { useEffect } from "react";

export default function BookedAppointments(props) {

  return (
    <TouchableOpacity onPress={() => props.func(props.data)} >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: Color.lightColor,
          borderRadius: 10,
          marginBottom:8
        }}
      >
        <Image
          source={{uri:props.image}}
          style={{
            width: 65,
            height: 65,
            borderRadius: 10,
          }}
        />
        <View>
          <View
            style={{
              paddingLeft: 10,
              paddingTop: 4,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ width: '69%', borderWidth:0, borderColor:"red" }}>
              <Text
                style={{
                  color: Color.textColor,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {props.service}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  marginTop: 2,
                  fontWeight: "bold",
                }}
              >
                By {props.barberName}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  marginTop: 2,
                  fontWeight: "bold",
                }}
              >
                {props.date}
              </Text>
            </View>

            <View style={{display:"flex", alignItems:"flex-end", width:55}} >
              <Text style={{ color: Color.textColor, fontSize: 18, fontWeight:"bold" }}>{props.price}</Text>
            </View>
          </View>
          <View></View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
