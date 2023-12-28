import { View, Text, Image, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";
import StarRating from "react-native-star-rating";
import axios from "axios";
import { BASE_URL } from "../Configuration/Helper";
import Spinner from "react-native-loading-spinner-overlay";

const Barber3 = (props) => {


    const { token,loadUser,
        loadBarbers,
        loadServices } = useContext(AppContext)
    

    const [name, setName] = useState()
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let name1 = props.name.split(' ')
        setName(name1[0].charAt(0).toUpperCase() + name1[0].slice(1))
        // setName(props.name)
    })

    const submitRating = () => {
        setLoading(true)
        let data = {
            "rating": rating
        }
        axios.post(BASE_URL + `/barber/rateBarber/${props.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => response.data).then((response) => {
            console.log(response)
            setRating(0)
            loadUser()
            loadBarbers()
            setTimeout(() => {
                setLoading(false)
            }, 4000);
        }).catch((error) => {
            console.log(error.response)
            setLoading(false)
        })
        setOpen(false)
    }

    return (
        <>
            {
                loading?
                <Spinner visible={loading} />
                :""
            }
                <View
                    style={{
                        width:'98%',
                        paddingVertical: '2%',
                        borderColor: Color.textColor,
                        borderRadius: 5,
                        alignItems: "center",
                        paddingLeft: "5%",
                        margin: "1%",
                        marginLeft:16,
                        backgroundColor: Color.lightColor,
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Image
                        source={{ uri: props.imgURL }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 35,
                            marginVertical: "0.5%",
                        }}
                    />

                    <View style={{ marginLeft: 10 }} >
                        <Text
                            style={{
                                fontSize: 19,
                                color: Color.textColor,
                                fontWeight: "bold",
                                paddingVertical: 1,
                            }}
                        >
                            {name + " "}
                        </Text>
                        <View style={{ alignSelf: "center" }} >
                            <StarRating
                                maxStars={5}
                                rating={props.ratings}
                                starSize={20}
                                fullStarColor={Color.textColor}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setOpen(true)} style={{ marginLeft: '17.8%', borderWidth: 1, borderColor: Color.textColor, borderRadius: 5 }} >
                        <Text style={{ padding: 10, color: Color.textColor }} >Rate Me</Text>
                    </TouchableOpacity>


                    <Modal visible={open} style={{ height: '10%' }} animationType="slide" transparent={true} >

                        <TouchableWithoutFeedback onPress={() => setOpen(false)} >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ paddingHorizontal: "10%", paddingVertical: '5%', backgroundColor: 'white', borderRadius: 10, }}>
                                    <View style={{ display: "flex", flexDirection: "row" }} >
                                        <Image
                                            source={{ uri: props.imgURL }}
                                            style={{
                                                //   marginLeft: 15,
                                                width: 65,
                                                height: 65,
                                                borderRadius: 50,
                                            }}
                                        />
                                        <View>
                                            <Text
                                                style={{
                                                    // textAlign: "center",
                                                    fontSize: 20,
                                                    marginLeft: 10,
                                                    marginTop: 8,
                                                    color: Color.lightColor,
                                                    fontWeight: "bold",
                                                    // paddingVertical: 1,
                                                    // width: 115,
                                                }}
                                            >
                                                {name + " "}
                                            </Text>
                                            <Text style={{ marginLeft: 11, marginTop: -3, fontSize: 13, color: Color.lightColor, fontWeight: "bold" }} >Professional</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: Color.lightColor }} >Would you like to Rate?</Text>
                                        <StarRating
                                            containerStyle={{ marginTop: 5 }}
                                            selectedStar={(rating) => setRating(rating)}
                                            maxStars={5}
                                            rating={rating}
                                            starSize={30}
                                            fullStarColor={Color.lightColor}
                                            starStyle={{ margin: 5 }}
                                        />

                                    </View>
                                    <View style={{ alignItems: "flex-end", marginTop: 10 }} >
                                        <TouchableOpacity onPress={submitRating} style={{ borderWidth: 1, borderColor: Color.lightColor, borderRadius: 5 }} >
                                            <Text style={{ padding: 10, color: Color.lightColor, fontSize: 16, fontWeight: "bold" }} >Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                    </Modal>
                </View>
        </>
    );
};

export default Barber3;
