import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Services from "../Components/Services";
import Base from "../Components/Base";
import Barber2 from "../Components/Barber2";
import axios from "axios";
import { AppContext } from "../Context/Context";
import { BASE_URL } from "../Configuration/Helper";
import Service2 from "../Components/Service2";
import Color from "../Colors/Color";
import { AntDesign } from '@expo/vector-icons';

const ListServices = (props) => {

    const {
        services,
        setServices
    } = useContext(AppContext);

    const [val, setVal] = useState("up")

    useEffect(() => {
        props.navigation.setOptions({ headerShown: true });
    });

    const sortByPrice = () => {
        if (val == "up") {
            setVal("down")
            setServices(services.sort((a,b) => a.price - b.price))
        } else {
            setVal("up")
            setServices(services.sort((a,b) => b.price - a.price))
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
                columnGap: 40
            }}>
                <Text
                    style={{
                        fontSize: 20,
                        paddingLeft: 4,
                        color: Color.textColor,
                    }}
                >
                    Services{"                "}
                </Text>
                <TouchableOpacity onPress={sortByPrice} ><Text style={{ padding: 3, fontSize: 15, color: Color.textColor, fontWeight: "bold" }} >Sort by Price <AntDesign name={val} size={15} color="white" /></Text></TouchableOpacity>

            </View>

            <View style={{ paddingHorizontal: 5, marginBottom: 5 }}>
                {services?.map((i) => {
                    return (
                        <View key={i.id}>
                            <Service2
                                id={i.id}
                                name={i.name}
                                price={i.price}
                                imageURL={i.imgUrl}
                                navigate={props.navigation.navigate}
                                description={i.description}
                            />
                        </View>
                    );
                })}
            </View>
        </Base>
    );
};

export default ListServices;
