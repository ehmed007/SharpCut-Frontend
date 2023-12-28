import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";
import StarRating from "react-native-star-rating";

const Barber = (props) => {

  const { barberId, setBarberId, serviceId,
    setServiceId,
    serviceName,
    setServiceName,
  } = useContext(AppContext)

  const [name, setName] = useState()
  const [rating, setRating] = useState()

  useEffect(() => {
    let name1 = props.name.split(' ')
    setName(name1[0].charAt(0).toUpperCase() + name1[0].slice(1))
    let rate = props.ratings.toString().split('.')
    setRating(rate[0])
  })

  return (
    <TouchableOpacity
      onPress={() => {
        setBarberId(props.id)
        props.navigate("Choose Service")
      }}
      style={{
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: Color.textColor,
        borderRadius: 5,
        alignItems: "center",
        padding: "5%",
        margin: "1.5%",
        // backgroundColor:Color.lightColor
      }}
    >
      <Image
        source={{ uri: props.imgURL }}
        style={{
          //   marginLeft: 15,
          width: 60,
          height: 60,
          borderRadius: 35,
          marginVertical: "0.5%",
        }}
      />

      <Text
        style={{
          textAlign: "center",
          fontSize: 19,
          color: Color.textColor,
          fontWeight: "bold",
          paddingVertical: 1,
          width: 115,
        }}
      >
        Mr {" "+name}
      </Text>
      <Text style={{ color: "white" }}>{rating} Rating</Text>
      <StarRating
        maxStars={5}
        rating={props.ratings}
        starSize={15}
        fullStarColor={Color.textColor}
      />
    </TouchableOpacity>
  );
};

export default Barber;
