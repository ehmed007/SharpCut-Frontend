import { NavigationContainer } from '@react-navigation/native';

import { AppContext } from '../Context/Context';
import { useContext, useEffect, useState } from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import Spinner from 'react-native-loading-spinner-overlay';
import { Image, Text, View } from 'react-native';
import Color from '../Colors/Color';
import Base from '../Components/Base';


export default function AppNav() {

  const { token, isLoading, setIsLoading } = useContext(AppContext)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  })


  if (isLoading) {
    return (
      <Base>
        <View style={{ alignItems: "center" }} >
          <View style={{ marginTop: "6%" }}>
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
              SharpCut
            </Text>
            <Spinner visible={isLoading} />
          </View>
        </View>
      </Base>

    )
  }

  return (
    <NavigationContainer>
      {
        token === null ? <AuthStack /> : <AppStack />
      }
    </NavigationContainer>
  );
}
