import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import StarRating from "react-native-star-rating";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";


const Barber2 = (props) => {

  const {
    setBarberId
  } = useContext(AppContext);

  const [name, setName] = useState()

  useEffect(() => {
    let name1 = props.name.split(' ')
    // setName(name1[0].charAt(0).toUpperCase() + name1[0].slice(1))
    setName(props.name.charAt(0).toUpperCase()+props.name.slice(1))
  })

  const press = () => {
    setBarberId(props.id)
    props.navigate('Appointment')
  }

  return (
    <TouchableOpacity onPress={press} >
      <View
        style={{
          marginBottom: 6,
          marginHorizontal:4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: Color.lightColor,
          padding:6,
          paddingLeft:13
        }}
      >
        <Image
          source={{uri : props.imageURL}}
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            borderWidth: 2,
            // marginVertical: "0.5%",
          }}
        />
        <View
          style={{ marginLeft: 10, display: "flex", flexDirection: "column" }}
        >
          <Text
            style={{
              color: Color.textColor,
              fontWeight: "bold",
              width:145,
              fontSize:20,
            }}
          >
            {name}
          </Text>
          <Text style={{ color: Color.textColor }}>{props.bio}</Text>
          <View
            style={{
              width:85
            }}
          >
            <StarRating
              maxStars={5}
              rating={props.rating}
              starSize={15}
              fullStarColor={Color.textColor}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Barber2;
