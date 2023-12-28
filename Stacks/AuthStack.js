import { createStackNavigator } from '@react-navigation/stack';

import Color from '../Colors/Color';
import Login from '../ScreensAuth/Login';
import Signup from '../ScreensAuth/Signup';
import ForgetPassword from '../ScreensAuth/ForgetPassword';

const Stack = createStackNavigator();

export default function AuthStack() {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: Color.lightColor,
      },
      headerTitleStyle: {
        color: Color.textColor
      }
    }} >
      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='signup' component={Signup} />
      <Stack.Screen name='forgetPassword' component={ForgetPassword} />
    </Stack.Navigator>
  );
}
