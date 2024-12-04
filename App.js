import CameraScreen from "./src/screens/camera";
import HomeScreen from "./src/screens/home";
import CollectionList from "./src/screens/collectionList";
import LoginScreen from "./src/screens/login";
import MapScreen from "./src/screens/mapScreen";
import CacheList from "./src/screens/cacheList";
import CacheInfo from "./src/screens/cacheInfo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase_auth } from "./src/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getDarkModeState() {
  //pulls dark mode value from async storage
  try {
    const value = await AsyncStorage.getItem("darkMode");
    return value !== null ? JSON.parse(value) : false;
  } catch (error) {
    console.error("Error retrieving dark mode state:", error);
    return false;
  }
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const ProStack = createNativeStackNavigator();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // use effect to update settings when loaded
    const initializeDarkMode = async () => {
      const savedDarkModeState = await getDarkModeState();
      setIsDarkMode(savedDarkModeState);
    };

    initializeDarkMode();
  }, []);

  function TabNavigator() {
    return (
      //logic for the router and adjusting styles including dark mode
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#A6192E",
          tabBarStyle: { backgroundColor: isDarkMode ? "#393939" : "#fff" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarLabel: "Camera",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Caches"
          component={CacheStackNavigator}
          options={{
            tabBarLabel: "Caches",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Collection"
          component={CollectionList}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  //stack to navigate to the login screen
  function StackNavigator() {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  //stack to navigate to cache detail view
  function CacheStackNavigator() {
    return (
      <Stack.Navigator
        initialRouteName="Cache"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Cache"
          component={CacheList}
          options={{
            tabBarLabel: "Cache",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={size} />
            ),
          }}
        />
        <Stack.Screen
          name="Cache Info"
          component={CacheInfo}
          options={{
            tabBarLabel: "Cache Info",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={size} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user);
    });
  }, []);

  const [loaded, error] = useFonts({
    CountachRegular: require("./assets/fonts/CountachRegular.otf"),
    DinRegular: require("./assets/fonts/dinpro.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <ProStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <ProStack.Screen name="SFU Geocaching" component={TabNavigator} />
        ) : (
          <ProStack.Screen name="StackNavigator" component={StackNavigator} />
        )}
      </ProStack.Navigator>
    </NavigationContainer>
  );
}
