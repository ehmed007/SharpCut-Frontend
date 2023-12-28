import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import Home from './Home';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import MyAppointments from "./MyAppointments";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Color from "../Colors/Color";
import { AppContext } from "../Context/Context";
import { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import ChangePassword from "./ResetPassword";
import { MaterialIcons } from '@expo/vector-icons';
import ListBarberRating from "./ListBarberRating";


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {
    user,
    setUser,
    token,
    setToken,
    doLogout,
  } = useContext(AppContext);

  const [image, setImage] = useState(null)
  const [mail, setMail] = useState(null)
  const [name, setName] = useState(null)

  useEffect(() => {
    try {
      if (user.username != undefined || user.firstName != undefined) {
        if (user.firstName == null) {
          setMail(user.username.substring(0, user.username.indexOf('@')))
        } else {
          setMail(user.firstName)
        }

        if (user.firstName != null && user.lastName != null) {
          setName(user.firstName + " " + user.lastName)
        } else {
          setName(user.username.substring(0, user.username.indexOf('@')))
        }
      }
    } catch (error) {

    }
    if (user != null) {
      setImage(user.imgUrl)
    } else {
      // props.navigation.navigate('login')
    }
  }, [user])

  return (
    <>

      <TouchableOpacity onPress={() => props.navigation.navigate("Profile")} >
        <View
          style={{
            display: "flex",
            alignItems: "start",
            marginTop: 40,
            marginBottom: -20,
            flexDirection: "row",
          }}
        >
          <Image
            source={image ? { uri: image } : require("../assets/download1.jpg")}
            style={{
              marginLeft: 15,
              width: 60,
              height: 60,
              borderRadius: 35,
              borderWidth: 2,
            }}
          />
          <View>
            <Text
              style={{
                width: 180,
                fontSize: 18,
                marginLeft: 10,
                marginTop: 10,
                fontWeight: "bold",
                color: Color.textColor
              }}
            >
              {name}
            </Text>
            <Text style={{ width: 180, fontSize: 15, marginLeft: 10, marginTop: 0, color: Color.textColor }}>
              @{mail}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label={() => (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign Out</Text>
        )}
        style={{ marginBottom: 10 }}
        icon={() => <FontAwesome name="sign-out" size={24} color="maroon" />}
        onPress={() => doLogout()}
      />
    </>
  );
}

export default function AppDashboard(props) {

  const [image, setImage] = useState(null)
  const [name, setName] = useState(null)

  const {
    user,
  } = useContext(AppContext);

  useEffect(() => {
    if (user != null) {
      if (user.imgUrl !== null) {
        setImage(user.imgUrl)
      }
      if (user.firstName === null) {
        setName(user.username.substring(0, user.username.indexOf('@')))
      } else {
        setName(user.firstName)
      }
    }
  }, [user])

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.lightColor,
        },
        headerTitleStyle: {
          color: Color.textColor,
        },
        // headerTransparent:"true",
        headerRight: () => (
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 6 }} >
            <Text style={{ paddingTop: 8, marginRight: -8, color: Color.textColor, fontWeight: 'bold' }} >{name},</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} >
              <Image
                source={image ? { uri: image } : require("../assets/download1.jpg")}
                // source={require("../assets/mypic1.jpeg")}
                style={{
                  marginLeft: 15,
                  width: 35,
                  height: 35,
                  borderRadius: 35,
                  borderWidth: 2,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        ),
        drawerStyle: {
          backgroundColor: Color.lightColor,
        },
        drawerActiveBackgroundColor: Color.backgroundColor,
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "black",
        drawerLabelStyle: {
          fontSize: 18,
          color: Color.textColor
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="home" size={20} color={Color.textColor} />
          ),
        }}
        component={Home}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="user-alt" size={22} color={Color.textColor} />
          ),
        }}
        component={Profile}
      />
      <Drawer.Screen
        name="Appointments"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="clock" size={22} color={Color.textColor} />
          )
        }}
        component={MyAppointments}
      />
      <Drawer.Screen
        name="Rate a Barber"
        options={{
          drawerIcon: () => (
            <MaterialIcons name="rate-review" size={22} color={Color.textColor} />
          )
        }}
        component={ListBarberRating}
      />
      <Drawer.Screen
        name="Reset Password"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="lock" size={22} color={Color.textColor} />
          )
        }}
        component={ChangePassword}
      />
    </Drawer.Navigator>
  );
}
