import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import MainTab from './src/navigation/MainTab';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './src/firebase/config';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const auth = getAuth(firebaseApp);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return () => unsub();
  }, []);

  if (initializing) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
