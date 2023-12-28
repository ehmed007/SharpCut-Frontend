import AppDashboard from '../Screens/AppDashboard';
import { createStackNavigator } from '@react-navigation/stack';

import ListBarbers from '../Screens/ListBarbers';
import Appointment from '../Screens/Appointment';
import Color from '../Colors/Color';
import ListServices from '../Screens/ListServices';

const Stack = createStackNavigator();

export default function AppStack() {

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
      <Stack.Screen name='Dashboard' component={AppDashboard} />
      <Stack.Screen name='Choose Barber' component={ListBarbers} />
      <Stack.Screen name='Choose Service' component={ListServices} />
      <Stack.Screen name='Appointment' component={Appointment} />
    </Stack.Navigator>
  );
}
