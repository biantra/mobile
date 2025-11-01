import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

export default function RequestRide({ navigation }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  async function handleRequest() {
    if(!pickup || !dropoff) return Alert.alert('Input required', 'Isi lokasi penjemputan dan tujuan.');
    try {
      const payload = {
        userId: 'user_demo_1',
        service: 'ride',
        pickup_address: pickup,
        dropoff_address: dropoff,
        price: 12000
      };
      const API_BASE = Constants.manifest?.extra?.apiBase || 'http://YOUR_BACKEND_IP:4000';
      const res = await axios.post(`${API_BASE}/orders`, payload);
      if(res.data && res.data.orderId){
        navigation.replace('Tracking', { orderId: res.data.orderId });
      } else {
        Alert.alert('Gagal', 'Tidak dapat membuat order.');
      }
    } catch (err) {
      Alert.alert('Error', 'Gagal koneksi ke server.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minta Penjemputan</Text>
      <TextInput placeholder="Alamat penjemputan" style={styles.input} value={pickup} onChangeText={setPickup}/>
      <TextInput placeholder="Alamat tujuan" style={styles.input} value={dropoff} onChangeText={setDropoff}/>
      <TouchableOpacity style={styles.btn} onPress={handleRequest}>
        <Text style={styles.btnText}>Konfirmasi & Cari Driver</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{flex:1, padding:20},
  title:{fontSize:20, fontWeight:'700', marginBottom:12},
  input:{borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:8, marginBottom:10},
  btn:{backgroundColor:'#0B5ED7', padding:14, borderRadius:8},
  btnText:{color:'#fff', textAlign:'center', fontWeight:'700'}
});
