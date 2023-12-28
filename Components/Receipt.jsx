import { View, Text, Modal, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Color from "../Colors/Color";
import Barber from "./Barber";
import { AntDesign } from "@expo/vector-icons";
import ReceiptText from "./ReceiptText";
import { TouchableOpacity } from "react-native";
import { AppContext } from "../Context/Context";

export default function Receipt(props) {
  const {user} = useContext(AppContext)
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(props.data)
  useEffect(() => {
    setData(props.data)
    setVisible(props.open);
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      style={{}}
      onRequestClose={() => props.handleReciept()}
    >
      <View
        style={{
          backgroundColor: Color.textColor2,
          // borderRadius: 20,
          // marginVertical: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => props.handleReciept()}
          style={{ margin: 10, display: "flex", alignItems: "flex-end" }}
        >
          <AntDesign name="close" size={32} color={Color.lightColor} />
        </TouchableOpacity>
        <View style={{ marginTop: 10, marginBottom: 100 }}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <AntDesign name="checkcircle" size={70} color={Color.lightColor} />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: Color.lightColor,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              Successfully Booked!
            </Text>
          </View>

          <Text style={{ color: Color.backgroundColor, marginLeft: 26 }}>
          _________________________________________________
          </Text>
          <ReceiptText
            leftText={"Customer"}
            leftTextColor={Color.lightColor}
            rightText={user?.firstName+" "+user?.lastName}
            rightTextColor={"green"}
          />

          <ReceiptText
            leftText={"Barber"}
            leftTextColor={Color.lightColor}
            rightText={data?.barber?.barberName}
            rightTextColor={"orange"}
          />

          <ReceiptText
            leftText={"Service"}
            leftTextColor={Color.lightColor}
            rightText={data?.service?.name}
            rightTextColor={"orange"}
          />

          <Text style={{ color: Color.backgroundColor, marginLeft: 26 }}>
          _________________________________________________
          </Text>

          <ReceiptText
            leftText={"Appointment Date"}
            leftTextColor={Color.lightColor}
            rightText={data?.slotTime}
            rightTextColor={"brown"}
          />

          <Text style={{ color: Color.backgroundColor, marginLeft: 26 }}>
          _________________________________________________
          </Text>

          <ReceiptText
            leftText={"Slot"}
            leftTextColor={Color.lightColor}
            rightText={data?.appointmentTime}
            rightTextColor={"brown"}
          />

          <Text style={{ color: Color.backgroundColor, marginLeft: 26 }}>
          _________________________________________________
          </Text>

          <ReceiptText
            leftText={"Service Price"}
            leftTextColor={Color.lightColor}
            rightText={data?.service?.price+"$"}
            rightTextColor={"brown"}
          />
        </View>
      </View>
    </Modal>
  );
}
