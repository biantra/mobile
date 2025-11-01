import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../../firebase/config';

export default function LoginScreen({ navigation }) {
  const auth = getAuth(firebaseApp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      Alert.alert('Login gagal', err.message || 'Periksa kredensial');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masuk — DK Bukittinggi</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize='none' />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="Masuk" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{marginTop:12}}>
        <Text>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PhoneAuth')} style={{marginTop:8}}>
        <Text>Login dengan OTP (Nomor HP)</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{flex:1,padding:20,justifyContent:'center'},
  title:{fontSize:22,fontWeight:'700',marginBottom:12},
  input:{borderWidth:1,borderColor:'#ddd',padding:12,borderRadius:8,marginBottom:10}
});
