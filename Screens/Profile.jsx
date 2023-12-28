import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Base from "../Components/Base";
import * as ImagePicker from "expo-image-picker";
import Color from "../Colors/Color";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AppContext } from "../Context/Context";
import Spinner from "react-native-loading-spinner-overlay";

export default function Profile(props) {

  const {
    user,
    setUser,
    token,
    updateProfile
  } = useContext(AppContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setPhone(user.phoneNumber)
    setAddress(user.address)
    if (user.age != null) {
      setAge(user.age.toString(10))
    }
    setImage(user.imgUrl)
    setImageData(user.imgUrl)
  }, [user])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
      setImageData(result?.assets[0].uri);
    }
  };

  const save = async () => {
    setLoading(true)
    let data1 = {
      "firstName": firstName,
      "lastName": lastName,
      "phoneNumber": phone,
      "age": age.toString(),
      "address": address
    }
    let data = new FormData();
    data.append("image", {
      uri: imageData,
      type: 'image/jpeg',
      name: 'profile_image.jpg',
    });
    updateProfile(data, data1, setLoading)
  }

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Color.lightColor,
      },
    });
  });

  return (
    <Base>
      <>
        <Spinner visible={loading} />

        <View style={{ alignItems: "center", padding: 20 }}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={image ? { uri: image } : require("../assets/download1.jpg")}
              style={{
                width: 110,
                height: 110,
                borderRadius: 100,
                borderWidth: 2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                display: "flex",
                backgroundColor: Color.lightColor,
                alignItems: "center",
                borderRadius: 30,
                padding: 7,
                marginLeft: 88,
                marginTop: -32,
              }}
            >
              <FontAwesome name="camera" size={12} color={Color.textColor} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: "8%" }}>
          <Text
            style={{ color: Color.textColor, fontSize: 22, fontWeight: "bold" }}
          >
            First Name
          </Text>
          <TextInput
            editable
            multiline
            value={firstName}
            onChange={(e) => setFirstName(e.nativeEvent.text)}
            style={{ color: Color.textColor2, fontSize: 20, paddingLeft: 5 }}
          />
          <Text style={{ color: "white", marginTop: -5 }}>
            _______________________________________________
          </Text>

          <Text
            style={{
              color: Color.textColor,
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            Last Name
          </Text>
          <TextInput
            editable
            multiline
            value={lastName}
            onChange={(e) => setLastName(e.nativeEvent.text)}
            style={{ color: Color.textColor2, fontSize: 20, paddingLeft: 5 }}
          />
          <Text style={{ color: "white", marginTop: -5 }}>
            _______________________________________________
          </Text>

          <Text
            style={{
              color: Color.textColor,
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            Age
          </Text>
          <TextInput
            editable
            multiline
            value={age}
            onChange={(e) => setAge(e.nativeEvent.text)}
            style={{ color: Color.textColor2, fontSize: 20, paddingLeft: 5 }}
          />
          <Text style={{ color: "white", marginTop: -5 }}>
            _______________________________________________
          </Text>

          <Text
            style={{
              color: Color.textColor,
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            Phone
          </Text>
          <TextInput
            editable
            multiline
            value={phone}
            onChange={(e) => setPhone(e.nativeEvent.text)}
            style={{ color: Color.textColor2, fontSize: 20, paddingLeft: 5 }}
          />
          <Text style={{ color: "white", marginTop: -5 }}>
            _______________________________________________
          </Text>

          <Text
            style={{
              color: Color.textColor,
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            Address
          </Text>
          <TextInput
            editable
            multiline
            value={address}
            onChange={(e) => setAddress(e.nativeEvent.text)}
            style={{ color: Color.textColor2, fontSize: 20, paddingLeft: 5 }}
          />
          <Text style={{ color: "white", marginTop: -5 }}>
            _______________________________________________
          </Text>

          <TouchableOpacity
            style={{
              marginVertical: 15,
              backgroundColor: Color.lightColor,
              padding: 10,
              borderRadius: 45,
              alignItems: "center"
            }}
            onPress={save}
          >
            <Text style={{ fontSize: 20, color: Color.textColor }}  >Save</Text>
          </TouchableOpacity>
        </View>
      </>
    </Base>
  );
}
