import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RideHome({ navigation }){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DK-Ride</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('RequestRide')}>
        <Text style={styles.btnText}>Minta Penjemputan</Text>
      </TouchableOpacity>
      <Text style={{marginTop:20}}>Atau lihat pesanan aktif di tab Profile.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{flex:1, padding:20},
  title:{fontSize:22, fontWeight:'700', marginBottom:20},
  btn:{backgroundColor:'#3B82F6', padding:14, borderRadius:8},
  btnText:{color:'#fff', textAlign:'center', fontWeight:'600'}
});
