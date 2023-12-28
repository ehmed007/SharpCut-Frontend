import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import Base from '../Components/Base'
import { FontAwesome5 } from "@expo/vector-icons";
import Color from '../Colors/Color';
import axios from 'axios';
import { BASE_URL } from '../Configuration/Helper';
import { AppContext } from '../Context/Context';
import Spinner from 'react-native-loading-spinner-overlay';


const ResetPassword = () => {
    const {token} = useContext(AppContext)
    const [loading, setLoading] = useState(false)

    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmNewPassword] = useState(null)


    const resetPassword = () => {
        setLoading(true)
        if (newPassword !== confirmNewPassword) {
            ToastAndroid.show("Password does not match!",ToastAndroid.BOTTOM);
            setLoading(false)
            return
        }
        if (currentPassword == null || newPassword == null) {
            ToastAndroid.show("Password does not match!",ToastAndroid.BOTTOM);
            setLoading(false)
            return
        }
        console.log("hello")
        let data = {
            "currentPassword":currentPassword,
            "newPassword":newPassword
        }
        axios
        .post(BASE_URL + "/profile/resetPassword",data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
            setLoading(false)
            ToastAndroid.show(response.message, ToastAndroid.BOTTOM);
        })
        .catch((error) => {
            setLoading(false)
            ToastAndroid.show(error.response.data.message, ToastAndroid.BOTTOM);
        });
    }

    return (
        <Base>
        {
            loading?
            <Spinner visible={loading} />
            :""
        }
            <View style={{ alignItems: "center", marginVertical: '5%' }}>
                <View style={{ borderWidth: 2, borderColor: Color.textColor, borderRadius: 100, paddingVertical: 15, paddingHorizontal:18 }} >
                    <FontAwesome5 name="lock" size={30} color={Color.textColor} />
                </View>
                <Text style={{fontSize:26, fontWeight:"bold", color:Color.textColor, marginTop:10}} >
                    Reset Password
                </Text>
            </View>
            <View style={{ marginHorizontal: "8%" }}>
                <Text
                    style={{ color: Color.textColor, fontSize: 20, fontWeight: "bold" }}
                >
                    Current Password
                </Text>
                <TextInput
                    secureTextEntry
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                    style={{ color: Color.textColor2, fontSize: 18, paddingLeft: 5 }}
                />
                <Text style={{ color: "white", marginTop: -5 }}>
                    _______________________________________________
                </Text>

                <Text
                    style={{
                        color: Color.textColor,
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 8,
                    }}
                >
                    New Password
                </Text>
                <TextInput
                    // secureTextEntry
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.nativeEvent.text)}
                    style={{ color: Color.textColor2, fontSize: 18, paddingLeft: 5 }}
                />
                <Text style={{ color: "white", marginTop: -5 }}>
                    _______________________________________________
                </Text>

                <Text
                    style={{
                        color: Color.textColor,
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 8,
                    }}
                >
                    Confirm New Password
                </Text>
                <TextInput
                    secureTextEntry
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.nativeEvent.text)}
                    style={{ color: Color.textColor2, fontSize: 18, paddingLeft: 5 }}
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
                    onPress={resetPassword}
                >
                    <Text style={{ fontSize: 20, color: Color.textColor }}  >Reset Password</Text>
                </TouchableOpacity>



            </View>
        </Base>
    )
}

export default ResetPassword;