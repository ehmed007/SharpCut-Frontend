import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    ToastAndroid,
    View,
  } from "react-native";
  import React, { useContext, useEffect } from "react";
  import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
  import { useState } from "react";
  import Base from "../Components/Base";
  import { Feather } from "@expo/vector-icons";
  import Color from "../Colors/Color";
  import { AppContext } from "../Context/Context";
  import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { BASE_URL } from "../Configuration/Helper";
  
  export default function ForgetPassword(props) {
  
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
  

    const forgetPassword = () => {
        setLoading(true)
        let data = {
            "email":email
        }
        axios.post(BASE_URL+"/auth/forgetPassword",data).then(response => response.data).then((response) => {
            setEmail("")
            console.log(response)
            ToastAndroid.show(response.message,ToastAndroid.BOTTOM);
            setLoading(false)
        }).catch((error) => {
            ToastAndroid.show(error.response.data.message,ToastAndroid.BOTTOM);
            setLoading(false)            
        })
    }

    return (
      <Base>
        <View style={{ alignItems: "center" }} >
  
          <KeyboardAvoidingView>
            <View style={{ marginTop: "6%" }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: 300, marginTop: "25%" }}>
                  <Image
                    source={require("../assets/img2.png")}
                    style={{
                      display: "flex",
                      alignSelf: "center",
                      width: 205,
                      height: 100,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 30,
                    color: Color.textColor,
                    marginBottom: 10,
                    marginTop: 15,
                    display: "flex",
                    alignSelf: "center",
                  }}
                >
                  Forget Password?
                </Text>
  
                  <>
                  {
                    loading?
                    <Spinner visible={loading} />
                    :""
                  }
                    <Text
                      style={{
                        fontSize: 18,
                        color: Color.textColor,
                        alignSelf: "flex-start",
                        marginLeft: 10,
                        marginBottom: 3,
                      }}
                    >
                      Email
                    </Text>
  
                    <View
                      style={{
                        backgroundColor: Color.lightColor,
                        flexDirection: "row",
                        paddingVertical: 10,
                        gap: 8,
                        paddingLeft: 15,
                        borderRadius: 20,
                      }}
                    >
                      <Feather name="user" size={24} color={Color.textColor} />
                      <TextInput
                        editable
                        multiline
                        value={email}
                        onChange={(e) => setEmail(e.nativeEvent.text)}
                        placeholder="example@example.com"
                        style={{ color: Color.textColor, width: 200 }}
                      />
                    </View>
  
                     
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("signup")}
                      style={styles.lnk}
                    >
                      <Text style={styles.nestlnk}>
                        Don't have an account? Register
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={forgetPassword} >
                      <Text style={{ color: Color.textColor, fontSize: 18 }}>Submit</Text>
                    </TouchableOpacity>
                  </>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Base>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.backgroundColor,
      // backgroundColor: '#4B5D65',
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      marginTop: 15,
      // width: 270,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
      height: 45,
      borderRadius: 20,
      marginBottom: 30,
    },
    lnk: {
      marginTop: 10,
      alignSelf: "flex-end",
      marginRight: 10,
    },
    nestlnk: {
      color: Color.textColor,
    },
    img: {
      marginTop: "28%",
      display: "flex",
      alignSelf: "center",
    },
  });
  