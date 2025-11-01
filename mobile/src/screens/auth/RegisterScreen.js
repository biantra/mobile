import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseApp } from '../../firebase/config';

export default function RegisterScreen({ navigation }) {
  const auth = getAuth(firebaseApp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function handleRegister() {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: name });
      Alert.alert('Sukses', 'Akun berhasil dibuat');
    } catch (err) {
      Alert.alert('Gagal', err.message || 'Cek input');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar — DK Bukittinggi</Text>
      <TextInput placeholder="Nama" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize='none' />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="Daftar" onPress={handleRegister} />
    </View>
  );
}
const styles = StyleSheet.create({
  container:{flex:1,padding:20,justifyContent:'center'},
  title:{fontSize:22,fontWeight:'700',marginBottom:12},
  input:{borderWidth:1,borderColor:'#ddd',padding:12,borderRadius:8,marginBottom:10}
});
