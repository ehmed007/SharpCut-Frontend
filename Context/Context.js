import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { React, useState, createContext, useEffect } from "react";
import { BASE_URL } from "../Configuration/Helper";
import { ToastAndroid } from "react-native";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [services, setServices] = useState(null);
  const [barbers, setBarbers] = useState(null)

  const [serviceName, setServiceName] = useState();
  const [serviceId, setServiceId] = useState();
  const [barberId, setBarberId] = useState();

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token !== null) {
        setToken(token)
        console.log("token is not null")
      } else {
        console.log("token is null")
        console.log(token)
        setToken(token)
      }
    })
  }, [])

  const doSignup = async (email, password) => {
    let data = {
      email: email,
      password: password,
    };
    const response = await axios.post(BASE_URL+"/auth/signup", data)
    return response.data
  }

  const doLogin = (email, password, setLoading) => {
    let data = {
      email: email,
      password: password,
    };

    axios
      .post(BASE_URL + "/auth/login", data)
      .then((response) => response.data)
      .then((response) => {
        AsyncStorage.setItem("token", response["token"])
        setToken(response["token"]);
        setLoading(true);
        loadUser()
      })
      .catch((error) => {
        console.log(error.response.status === 403)
        if (error.response.status == 403) {
          ToastAndroid.show("Username/Password is incorrect!", ToastAndroid.TOP)
        }
        setToken(null);
        setLoading(true);
        console.log(error.response);
      });

  };

  const doLogout = () => {
    AsyncStorage.removeItem("token")
    setToken(null);
    setUser(null);
    setBarbers(null)
    setServices(null)
  };

  const isAuthenticated = () => {
    if(token !== null) {
      return true;
    }
    return false
  }


  const loadUser = () => {
    if (token) {
      axios
        .get(BASE_URL + "/profile/getProfile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          // AsyncStorage.setItem("user", JSON.stringify(response))
          setUser(response);
        })
        .catch((error) => {
          console.log("user")
          console.log(error);
          setUser(null);
        });
    }
  };

  const loadServices = () => {
    if (token) {
      axios
        .get(BASE_URL + "/service/getAllService", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          // AsyncStorage.setItem("services", JSON.stringify(response))
          setServices(response);
        })
        .catch((error) => {
          console.log("service")
          console.log(error);
          setServices(null);
        });
    }
  };

  const loadBarbers = () => {
    if (token) {
      axios
        .get(BASE_URL + "/barber/getAllBarber", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          setBarbers(response?.sort((a, b) => b.barberRating - a.barberRating))
        }).catch((error) => {
          console.log("barbers")
          console.log(error)
          setBarbers(null)
        })
    }
  };


  const updateProfile = (imageData, data, setLoading) => {
    axios.post(BASE_URL + "/profile/uploadProfileImage", imageData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      updateProfileData(data, setLoading)
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    })
  }

  const updateProfileData = (data, setLoading) => {
    axios.post(BASE_URL + "/profile/updateProfile", data, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => { return response.data }).then((response) => {
      setLoading(false)
      setUser(response)
      ToastAndroid.show("Profile Information updated Successfully", ToastAndroid.CENTER);
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    })
  }


  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        doLogin,
        doLogout,
        doSignup,

        loadUser,
        loadBarbers,
        loadServices,
        updateProfile,

        services,
        setServices,

        barbers,
        setBarbers,

        user,
        setUser,

        token,
        setToken,

        serviceId,
        setServiceId,

        serviceName,
        setServiceName,

        barberId,
        setBarberId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
