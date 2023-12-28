import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Base from "../Components/Base";
import Services from "../Components/Services";
import Barber from "../Components/Barber";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";
import Spinner from "react-native-loading-spinner-overlay";

const Home = (props) => {
  const { loadUser, loadServices, services, loadBarbers, barbers, setBarbers, user } =
    useContext(AppContext);


  useEffect(() => {
    loadServices();
    loadBarbers();
    loadUser();
  },[]);

  return (
    <Base>
      <View style={{ alignItems: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 20,
              backgroundColor: Color.lightColor,
              borderRadius: 10,
              marginVertical: 8,
              padding: 5,
              color: Color.textColor,
              paddingLeft: 10,
            }}
          >
            Services
          </Text>
          <View style={{ alignSelf: "center" }}>
            <View
              style={{
                //   borderWidth: 2,
                //   borderColor: "red",
                width: "100%",
                minWidth: "90%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {
                  services?.map((i) => {
                    return (
                      <View key={i.id}>
                        <Services
                          name={i.name}
                          imageURL={i.imgUrl}
                          navigate={props.navigation.navigate}
                          serviceId={i.id}
                        />
                      </View>
                    );
                  })
              }
            </View>
          </View>

          <Text
            style={{
              fontSize: 20,
              backgroundColor: Color.lightColor,
              borderRadius: 10,
              marginVertical: 5,
              padding: 5,
              color: Color.textColor,
              paddingLeft: 10,
            }}
          >
            Barbers
          </Text>

          <View style={{ alignSelf: "center" }}>
            <View
              style={{
                // borderWidth: 2,
                // borderColor: "red",
                width: "100%",
                minWidth: "90%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {
                  barbers?.map((i) => {
                    return (
                      <View key={i.id}>
                        <Barber
                          id = {i.id}
                          name={i.barberName}
                          ratings={i.barberRating}
                          imgURL={i.imgUrl}
                          navigate={props.navigation.navigate}
                        />
                      </View>
                    );
                  })
              }
            </View>
          </View>
        </ScrollView>
      </View>
    </Base>
  );
};

export default Home;
