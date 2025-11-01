import React from 'react';
import { View, Text, Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase/config';

export default function Profile(){
  const auth = getAuth(firebaseApp);
  return (
    <View style={{padding:20}}>
      <Text style={{fontSize:18,fontWeight:'700',marginBottom:12}}>Profile</Text>
      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}
