import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DK Bukittinggi</Text>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ride')}>
        <Text style={styles.cardText}>DK-Ride — Pesan Ojek / Mobil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ride')}>
        <Text style={styles.cardText}>Pesanan Saya</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20},
  title:{fontSize:28, fontWeight:'700', marginBottom:20},
  card:{padding:16, backgroundColor:'#E6F0FF', borderRadius:10, marginBottom:12},
  cardText:{fontSize:16, color:'#064E96'}
});
