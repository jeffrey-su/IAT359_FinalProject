import CameraScreen from "./src/screens/camera";
import HomeScreen from "./src/screens/home";
import CollectionList from "./src/screens/collectionList";
import LoginScreen from "./src/screens/login";
import MapScreen from "./src/screens/mapScreen";
import CacheList from "./src/screens/cacheList";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase_auth } from "./src/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const ProStack = createNativeStackNavigator();
  const [user, setUser] = useState(null);

  function TabNavigator() {
    return (
      <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Camera" component={CameraScreen}  />
        <Tab.Screen name="Cache" component={CacheList}  />
        <Tab.Screen name="Collection" component={CollectionList}  />
      </Tab.Navigator>
    );
  }

  function StackNavigator() {
    return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }


  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      // console.log("user", user.email);
      setUser(user);
    });
  }, []);

  const [loaded, error] = useFonts({
    'CountachRegular': require('./assets/fonts/CountachRegular.otf'),
    'DinRegular': require('./assets/fonts/dinpro.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return(
    <NavigationContainer>
      <ProStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <ProStack.Screen
            name="SFU Geocaching"
            component={TabNavigator}
            
          />
        ) : (
          <ProStack.Screen
            name="StackNavigator"
            component={StackNavigator}
            
          />
        )}
      </ProStack.Navigator>
     
    </NavigationContainer>
  );
}
