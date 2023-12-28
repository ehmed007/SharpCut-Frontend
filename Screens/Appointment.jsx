import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  ToastAndroid,
  SectionList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Base from "../Components/Base";
import Barber2 from "../Components/Barber2";
import StarRating from "react-native-star-rating";
import { FontAwesome } from "@expo/vector-icons";
import Slot from "../Components/Slot";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import Color from "../Colors/Color";
import Receipt from "../Components/Receipt";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { BASE_URL } from "../Configuration/Helper";
import { AppContext } from "../Context/Context";
import SelectDropdown from "react-native-select-dropdown";
import Spinner from "react-native-loading-spinner-overlay";

const arr = [
  "08:00 AM to 10:00 AM",
  "11:00 AM to 01:00 PM",
  "02:00 PM to 03:00 PM",
  "04:00 PM to 06:00 PM",
  "07:00 PM to 09:00 PM",
  "10:00 PM to 11:00 PM",
];

const months = [
  "Zero",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Appointment = (props) => {
  const {
    token,
    serviceName,
    setServiceName,
    setServiceId,
    serviceId,
    barberId,
    loadUser
  } = useContext(AppContext);

  const [visible, setVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [appointmentTime, setAppointmentTime] = React.useState(null);
  const [slot, setSlot] = React.useState();
  const [barber, setBarber] = useState();
  const [data1, setData1] = useState();

  const [appointmentData, setAppointmentData] = useState()

  const [localServiceId, setLocalServiceId] = useState()

  const [loading, setLoading] = useState(false)

  const clicked = () => {
    setVisible(!visible);
  };

  const getDate = (day) => {
    setVisible(false);
    setAppointmentTime(day);
  };

  const func = (data) => {
    setSlot(data);
  };

  useEffect(() => {
    axios
      .get(BASE_URL + `/barber/getOneBarber/${barberId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        setBarber(response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(BASE_URL + "/service/getAllService", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        let data1 = [];
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          data1.push({
            key: element.id,
            value: element.name,
          });
        }
        setData1(data1);
      });
  }, []);




  const submit = () => {

    setLoading(true)
    let payload = {
      "appointmentTime": slot,
      "slotTime": appointmentTime.dateString
    };

    axios.post(BASE_URL + `/appointment/checkAppointment/${localServiceId}/${barberId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.data).then((response) => {
      if (!response['message']) {
        setLoading(false)
        ToastAndroid.show("Slot is Already Booked", ToastAndroid.BOTTOM);
      } else {
        bookAppointment()
      }
    }).catch((error) => {
      setLoading(false)
      console.log("This is an " + error);
    })

  };

  const bookAppointment = () => {
    let payload = {
      "appointmentTime": slot,
      "slotTime": appointmentTime.dateString
    };


    axios.post(BASE_URL + `/appointment/addAppointment/${serviceId}/${barberId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.data).then((response) => {
      setLoading(false)
      setOpen(true);
      setAppointmentData(response)
      loadUser()
      ToastAndroid.show("Slot is Booked successfully", ToastAndroid.BOTTOM);
    }).catch((error) => {
      setLoading(false)
      ToastAndroid.show(error.response.data.message, ToastAndroid.BOTTOM);
    })
  }


  const HandleReciept = () => {
    setOpen(false);
    props.navigation.navigate("Dashboard");
  };

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

      {
        loading ?
          <Spinner visible={loading} />
          : ""
      }

      {
        open ?
          <Receipt open={open} handleReciept={HandleReciept} data={appointmentData} />
          : ""
      }
      <View
        style={{
          backgroundColor: Color.lightColor,
          width: "500",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          display: "flex",
          flexDirection: "row",
          paddingBottom: "6%",
          paddingTop: "3%",
        }}
      >
        <View style={{ marginLeft: "8%" }}>
          <Image
            source={{ uri: barber?.imgUrl }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              borderWidth: 2,
              marginVertical: "0.5%",
            }}
          />
        </View>
        <View
          style={{ justifyContent: "center", marginLeft: 15, marginTop: "-2%" }}
        >
          <Text
            style={{ fontSize: 23, color: Color.textColor, fontWeight: "bold" }}
          >
            {barber?.barberName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "normal",
              color: Color.textColor,
            }}
          >
            {barber?.bio}
          </Text>
          <View
            style={{
              marginTop: 2,
              width: 85,
            }}
          >
            <StarRating
              maxStars={5}
              rating={barber?.barberRating}
              starSize={15}
              fullStarColor={Color.textColor}
            />
          </View>
        </View>
      </View>

      <Modal
        visible={visible}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
        }}
        transparent={true}
        onRequestClose={clicked}
      >
        <View
          style={{
            marginVertical: "20%",
            marginHorizontal: "8%",
            backgroundColor: Color.textColor,
            borderRadius: 20,
            padding: 10,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Calendar
            theme={{
              backgroundColor: "red",
              calendarBackground: Color.textColor,
              textSectionTitleColor: "black",
              textMonthFontSize: 20,
              todayTextColor: "red",
              monthTextColor: Color.lightColor,
            }}
            onDayPress={(day) => getDate(day)}
          />
        </View>
      </Modal>

      <View
        style={{
          backgroundColor: Color.lightColor,
          marginTop: 10,
          marginHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <SelectList
          defaultOption={{
            key: serviceId,
            value: serviceName === null ? "Select Service" : serviceName,
          }}
          setSelected={setLocalServiceId}
          data={data1}
          save="key"
          boxStyles={{ backgroundColor: Color.textColor }}
          dropdownStyles={{ backgroundColor: "white" }}
          dropdownTextStyles={{ fontSize: 20, color: Color.lightColor }}
        />
      </View>

      <View>
        {appointmentTime ? (
          <Text
            style={{
              backgroundColor: "brown",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 23,
              marginHorizontal: 10,
              borderRadius: 10,
              marginTop: 10,
              fontSize: 20,
              color: Color.textColor,
            }}
          >
            {months[appointmentTime.month]} {appointmentTime.day},{" "}
            {appointmentTime.year}
          </Text>
        ) : (
          ""
        )}
        <TouchableOpacity
          style={{
            backgroundColor: Color.lightColor,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 23,
            margin: 10,
            borderRadius: 10,
          }}
          onPress={clicked}
        >
          {/* <Ionicons name="add" size={28} color="white" /> */}
          <FontAwesome name="calendar" size={24} color={Color.textColor} />
          <Text
            style={{
              fontSize: 16,
              color: Color.textColor,
              paddingLeft: 15,
              fontWeight: "bold",
            }}
          >
            Book Appointments
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: Color.lightColor,
          paddingVertical: 10,
          marginHorizontal: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: Color.textColor }}
        >
          Choose your Slot
        </Text>
      </View>
      <ScrollView>
        <View style={{ alignSelf: "center" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              margin: 12,
              borderWidth: 2,
              borderColor: Color.lightColor,
              borderRadius: 10,
              padding: 5,
            }}
          >
            {arr.map((i) => {
              return i == slot ? (
                <View key={i} >
                  <Slot title={i} color={"brown"} id={i} func={func} />
                </View>
              ) : (
                <View key={i} >
                  <Slot title={i} color={Color.lightColor} id={i} func={func} />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      {localServiceId ? (
        appointmentTime ? (
          slot ? (
            <TouchableOpacity
              style={{
                backgroundColor: "darkgreen",
                paddingVertical: 10,
                marginHorizontal: 13,
                paddingHorizontal: 20,
                borderRadius: 10,
                marginBottom: 10,
              }}
              onPress={submit}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: Color.textColor,
                }}
              >
                Confirm Booking
              </Text>
            </TouchableOpacity>
          ) : (
            ""
          )
        ) : (
          ""
        )
      ) : ""
      }
    </Base>
  );
};

export default Appointment;
