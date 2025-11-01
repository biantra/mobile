import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import PhoneAuthScreen from '../screens/auth/PhoneAuthScreen';

const Stack = createNativeStackNavigator();
export default function AuthStack(){
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
      <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} options={{ title: 'OTP (Phone)' , headerShown:false}}/>
    </Stack.Navigator>
  );
}
