import CameraScreen from "./src/screens/camera";
import HomeScreen from "./src/screens/home";
import CollectionList from "./src/screens/collectionList";
import LoginScreen from "./src/screens/login";
import MapScreen from "./src/screens/mapScreen";
import CacheList from "./src/screens/cacheList";
import CacheInfo from "./src/screens/cacheInfo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase_auth } from "./src/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const ProStack = createNativeStackNavigator();
  const [user, setUser] = useState(null);

  function TabNavigator() {
    return (
      <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false , tabBarActiveTintColor: "#A6192E", tabBarStyle: {backgroundColor:"white"}, }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => ( <Ionicons name="home" color={color} size={size} />),}}/>
        <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Map', tabBarIcon: ({ color, size }) => ( <Ionicons name="map" color={color} size={size} />),}}/>
        <Tab.Screen name="Camera" component={CameraScreen} options={{ tabBarLabel: 'Camera', tabBarIcon: ({ color, size }) => ( <Ionicons name="camera" color={color} size={size} />),}} />
        <Tab.Screen name="Caches" component={CacheStackNavigator} options={{ tabBarLabel: 'Caches', tabBarIcon: ({ color, size }) => ( <Ionicons name="menu" color={color} size={size} />),}} />
        
        <Tab.Screen name="Collection" component={CollectionList} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => ( <Ionicons name="person" color={color} size={size} />),}} />
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

  function CacheStackNavigator() {
    return (
      <Stack.Navigator initialRouteName="Cache" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cache" component={CacheList} options={{ tabBarLabel: 'Cache', tabBarIcon: ({ color, size }) => ( <Ionicons name="menu" color={color} size={size} />),}} />
        <Stack.Screen name="Cache Info" component={CacheInfo} options={{ tabBarLabel: 'Cache Info', tabBarIcon: ({ color, size }) => ( <Ionicons name="menu" color={color} size={size} />),}} />
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
