import CameraScreen from "./src/screens/camera";
import HomeScreen from "./src/screens/home";
import CollectionList from "./src/screens/collectionList";
import LoginScreen from "./src/screens/login";
import MapScreen from "./src/screens/mapScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase_auth } from "./src/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const ProStack = createNativeStackNavigator();
  const [user, setUser] = useState(null);

  function TabNavigator() {
    return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Camera" component={CameraScreen}  />
        <Tab.Screen name="Collection" component={CollectionList}  />
      </Tab.Navigator>
    );
  }

  function StackNavigator() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }


  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      console.log("user", user.email);
      setUser(user);
    });
  }, []);

  return(
    <NavigationContainer>
      <ProStack.Navigator>
        {user ? (
          <ProStack.Screen
            name="TabNavigator"
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
