import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Services from "../Components/Services";
import Base from "../Components/Base";
import Barber2 from "../Components/Barber2";
import axios from "axios";
import { AppContext } from "../Context/Context";
import { BASE_URL } from "../Configuration/Helper";
import Barber from "../Components/Barber";
import Color from "../Colors/Color";
import Barber3 from "../Components/Barber3";

const ListBarberRating = (props) => {

    const {
        barbers,
    } = useContext(AppContext);


    useEffect(() => {
        props.navigation.setOptions({ headerShown: true });
    });

    

    return (
        <Base>
            <View style={{ alignSelf: "center", marginTop: 2 }} >
                <Text
                    style={{
                        margin:10,
                        fontSize: 20,
                        backgroundColor: Color.lightColor,
                        borderRadius: 10,
                        marginVertical: 5,
                        padding: 5,
                        color: Color.textColor,
                        paddingLeft: 10,
                    }}
                >
                    Choose Barber for Rating
                </Text>
                <View style={{
                    width: "100%",
                    minWidth: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}>
                    {barbers?.map((i) => {
                        return (
                            <View key={i.id}>
                                <Barber3
                                    id={i.id}
                                    name={i.barberName}
                                    ratings={i.barberRating}
                                    imgURL={i.imgUrl}
                                    navigate={props.navigation.navigate}
                                />
                            </View>
                        );
                    })}
                </View>
            </View>
        </Base>
    );
};

export default ListBarberRating;
