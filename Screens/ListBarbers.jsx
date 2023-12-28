import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Services from "../Components/Services";
import Base from "../Components/Base";
import Barber2 from "../Components/Barber2";
import axios from "axios";
import { AppContext } from "../Context/Context";
import { BASE_URL } from "../Configuration/Helper";
import Color from "../Colors/Color";
import { AntDesign } from '@expo/vector-icons';


const ListBarbers = (props) => {
  const { barbers, setBarbers } = useContext(AppContext);

  const [val, setVal] = useState("up")
  
  useEffect(() => {
    props.navigation.setOptions({ headerShown: true });
  });

  const sortByRating = () => {
    if (val == "up") {
        setVal("down")
        setBarbers(barbers.sort((a,b) => a.barberRating - b.barberRating))
    } else {
        setVal("up")
        setBarbers(barbers.sort((a,b) => b.barberRating - a.barberRating))
    }
}


  return (
    <Base>
      <View style={{
        alignItems: "center", backgroundColor: Color.lightColor, display: "flex", flexDirection: "row", borderRadius: 10,
        marginVertical: 8,
        padding: 5,
        color: Color.textColor,
        paddingLeft: 10, 
        marginHorizontal: 8,
        columnGap:40
      }}>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 4,
            color: Color.textColor,
          }}
        >
          Barbers{"                "}
        </Text>
        <TouchableOpacity onPress={sortByRating} ><Text style={{ padding: 3, fontSize: 15, color: Color.textColor, fontWeight:"bold" }} >Sort by Rating<AntDesign name={val} size={15} color="white" /></Text></TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 5, marginBottom: 5 }}>
        {barbers?.map((i) => {
          return (
            <View key={i.id}>
              <Barber2
                name={i.barberName}
                imageURL={i.imgUrl}
                rating={i.barberRating}
                bio={i.bio}
                navigate={props.navigation.navigate}
                id={i.id}
              />
            </View>
          );
        })}
      </View>
    </Base>
  );
};

export default ListBarbers;
