import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import Constants from 'expo-constants';

export default function Tracking({ route }) {
  const { orderId } = route.params;
  const [driverLoc, setDriverLoc] = useState(null);
  useEffect(() => {
    const SOCKET_URL = Constants.manifest?.extra?.socketUrl || 'http://YOUR_BACKEND_IP:4000';
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socket.emit('joinOrderRoom', { orderId });
    socket.on('driver:location', data => {
      if(data && data.orderId === orderId) setDriverLoc(data);
    });
    socket.on('order:status:update', d => {});
    return () => {
      socket.disconnect();
    };
  }, [orderId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order: {orderId}</Text>
      {driverLoc ? (
        <View>
          <Text>Driver lat: {driverLoc.lat}</Text>
          <Text>Driver lng: {driverLoc.lng}</Text>
        </View>
      ) : (
        <Text>Menunggu driver menerima...</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container:{flex:1, padding:20},
  title:{fontWeight:'700', marginBottom:16}
});
