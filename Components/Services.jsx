import { View, Text, Image, TouchableOpacity } from "react-native";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";
import React, { useContext, useEffect } from "react";

const Services = (props) => {
  const {
    setServiceName,
    setServiceId
  } = useContext(AppContext);

  const press = () => {
    setServiceId(props.serviceId)
    setServiceName(props.name)
    props.navigate("Choose Barber")
  }

  return (
    <TouchableOpacity onPress={press} > 
    <View 
      style={{
        margin: "0.5%",
        display: "flex",
        // borderColor: "green",
        alignItems:"center",
        // borderWidth:1,
        width:80
      }}
    >
      <Image
        source={{uri : props.imageURL}}
        style={{
          // marginLeft: 15,
          width: 55,
          height: 55,
          borderRadius: 35,
          borderWidth: 2,
          marginVertical:'0.5%',
        }}
      />
      <Text
        style={{
          color: Color.textColor,
          textAlign: "center",
          fontWeight:"bold",
        //   borderWidth: 1,
        //   borderColor: "red",
        //   width: "80%",
        }}
      >
        {props.name}
      </Text>
    </View>
    </TouchableOpacity>
  );
};

export default Services;
