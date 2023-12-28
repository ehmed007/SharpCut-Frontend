import {
  Image,
  KeyboardAvoidingView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import Toast from "react-native-root-toast";
import Base from "../Components/Base";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";
import Spinner from "react-native-loading-spinner-overlay";

export default function Signup(props) {

  const {doSignup} = useContext(AppContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false)

  const signup = () => {
    setLoading(true)
    doSignup(email, password).then(response => response.data).then((response) => {
      setEmail("")
      setPassword("")
      setLoading(false)
      ToastAndroid.show("User registered successfully!", ToastAndroid.SHORT);
    }).catch((error) => {
      setLoading(false)
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
    })
  }

  return (
    <Base>
      <Spinner visible={loading} />
      <View style={{alignItems:"center"}} >
      <KeyboardAvoidingView >
        <View style={{marginTop:"6%"}}>

        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{width:300,marginTop:"25%"}} >
              <Image
                source={require("../assets/img2.png")}
                style={{ display: "flex", alignSelf: "center",width:205,height:100}}
              />
            </View>
            <Text
              style={{
                fontSize: 25,
                color: Color.textColor,
                marginBottom: "1%",
                marginTop: "3%",
                display: "flex",
                alignSelf: "center",
              }}
            >
              Create An Account
            </Text>

            {/* <Text
              style={{
                fontSize: 18,
                color: Color.textColor,
                alignSelf: "flex-start",
                marginLeft: 10,
                marginBottom: 3,
              }}
            >
              Name
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
                value={name}
                onChange={(e) => setName(e.nativeEvent.text)}
                placeholder="Enter your name"
                style={{ color: Color.textColor, width: 200 }}
              />
            </View> */}

            <Text
              style={{
                fontSize: 18,
                color: Color.textColor,
                alignSelf: "flex-start",
                marginLeft: 10,
                marginBottom: 3,
                marginTop: 10,
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
              <Feather name="mail" size={24} color={Color.textColor} />
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                placeholder="example@example.com"
                style={{ color: Color.textColor, width: 200 }}
              />
            </View>

            <Text
              style={{
                fontSize: 18,
                color: Color.textColor,
                alignSelf: "flex-start",
                marginLeft: 10,
                marginBottom: 3,
                marginTop: 10,
              }}
            >
              Password
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
              <Feather name="lock" size={24} color={Color.textColor} />

              <TextInput
                secureTextEntry
                value={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                placeholder="********"
                style={{ color: Color.textColor, width: 200 }}
              />
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("login")}
              style={styles.lnk}
            >
              <Text style={styles.nestlnk}>Already have an Account? Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={signup}>
              <Text style={{ color: Color.textColor, fontSize: 18 }}>Sign Up</Text>
            </TouchableOpacity>
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
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    // width: 270,
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
});
