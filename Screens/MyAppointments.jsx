import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Base from "../Components/Base";
import BookedAppointments from "../Components/BookedAppointments";
import Receipt from "../Components/Receipt";
import { AppContext } from "../Context/Context";
import axios from "axios";
import { BASE_URL } from "../Configuration/Helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyAppointments(props) {
  const { user, setUser, token } = useContext(AppContext);

  const [appointmentList, setAppointmentList] = useState(
    user["appointmentList"]
  );

  const [data, setData] = useState()

  useEffect(() => {
    if (user != null) {
      setAppointmentList(user["appointmentList"]);
    }
  }, [user]);

  const [open, setOpen] = React.useState(false);

  const submit = (data) => {
    setData(data)
    setOpen(!open);
  };

  const HandleReciept = () => {
    setOpen(false);
    props.navigation.navigate("Dashboard");
  };


  return (
    <Base>
    {
      open?
      <Receipt open={open} handleReciept={HandleReciept} data={data}  />
      :""
    }
      <ScrollView
        style={{
          marginTop: 10,
          paddingHorizontal:"3%"
        }}
        >
        {
          appointmentList?.map((i) => {
            return <View key={i.id} >
              <BookedAppointments func={submit} data={i}  image={i['service']['imgUrl']} barberName={i['barber']['barberName']} service={i['service']['name']} date={i['slotTime']} price={i['service']['price']+"$"} />
            </View>
          })
        }
      </ScrollView>
    </Base>
  );
}
