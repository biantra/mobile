import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideHome from '../screens/Ride/RideHome';
import RequestRide from '../screens/Ride/RequestRide';
import Tracking from '../screens/Ride/Tracking';

const Stack = createNativeStackNavigator();

export default function RideStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="RideHome" component={RideHome} options={{ title: 'DK-Ride' }} />
      <Stack.Screen name="RequestRide" component={RequestRide} options={{ title: 'Request Ride' }} />
      <Stack.Screen name="Tracking" component={Tracking} options={{ title: 'Tracking' }} />
    </Stack.Navigator>
  );
}
