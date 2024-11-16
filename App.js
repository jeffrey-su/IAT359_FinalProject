import CameraScreen from "./src/screens/camera";
import HomeScreen from "./src/screens/home";
import CollectionList from "./src/screens/collectionList";
import LoginScreen from "./src/screens/login";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




export default function App() {
  const Tab = createBottomTabNavigator();
  
  return(
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Camera" component={CameraScreen}  />
        <Tab.Screen name="Collection" component={CollectionList}  />
      </Tab.Navigator>
     
    </NavigationContainer>
  );
}
