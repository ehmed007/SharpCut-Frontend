import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import StarRating from "react-native-star-rating";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";


const Service2 = (props) => {

  const {
    user,
    setUser,
    token,
    setToken,
    serviceName,
    setServiceName,
    serviceId,
    setServiceId,
    barberId,
    setBarberId
  } = useContext(AppContext);

  const [name, setName] = useState()

  useEffect(() => {
    setName(props.name)
  })

  const press = () => {
    setServiceId(props.id)
    setServiceName(props.name)
    props.navigate('Appointment')
  }

  return (
    <TouchableOpacity onPress={press} >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: Color.lightColor,
          borderRadius: 10,
          marginBottom:8,
          marginHorizontal:4,
        }}
      >
        <Image
          source={{uri:props.imageURL}}
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
                {props.name}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  marginTop: 2,
                  fontWeight: "bold",
                }}
              >
                {props.description}
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
              <Text style={{ color: Color.textColor, fontSize: 18, fontWeight:"bold" }}>{props.price+"$"}</Text>
            </View>
          </View>
          <View></View>
        </View>
      </View>
    </TouchableOpacity>  );
};

export default Service2;
