import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseApp } from '../../firebase/config';

export default function PhoneAuthScreen() {
  const auth = getAuth(firebaseApp);
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState('');

  async function sendVerification() {
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier.current);
      setVerificationId(confirmation.verificationId || confirmation._verificationId);
      Alert.alert('OTP dikirim', 'Cek SMS (atau gunakan nomor test di Firebase Console)');
    } catch (err) {
      Alert.alert('Gagal kirim OTP', err.message || String(err));
    }
  }

  async function confirmCode() {
    try {
      if (!verificationId) return Alert.alert('Belum kirim OTP');
      const cred = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, cred);
    } catch (err) {
      Alert.alert('Verifikasi gagal', err.message || String(err));
    }
  }

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseApp.options}
      />
      <Text style={styles.title}>Login dengan Nomor HP</Text>
      <TextInput placeholder="+62xxxxxxxxxx" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
      <Button title="Kirim OTP" onPress={sendVerification} />
      <Text style={{marginTop:12}}>Masukkan kode OTP:</Text>
      <TextInput placeholder="123456" value={code} onChangeText={setCode} style={styles.input} keyboardType="numeric" />
      <Button title="Verifikasi & Masuk" onPress={confirmCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,justifyContent:'center'},
  title:{fontSize:20,fontWeight:'700',marginBottom:12},
  input:{borderWidth:1,borderColor:'#ddd',padding:12,borderRadius:8,marginBottom:10}
});
