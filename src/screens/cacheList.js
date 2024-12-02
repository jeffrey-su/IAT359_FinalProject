import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { firebase_auth } from "../firebaseConfig";
import { useState } from "react";

export default function CacheList({ navigation }) {

  const [pagename, setpageName] = useState("StudioA");
  
  return (
    <View style={styles.container}>
      <Text style={[{fontSize: 30, color: 'white', padding: 30, alignSelf: 'start', fontFamily: 'CountachRegular'}]}>Cache List</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cache Info", {pagename: "STUDIO B",})}>
        <Image></Image>
        <Text>Studio B Cache</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cache Info", {pagename: "STUDIO A",})}
      >
        <Text>Studio A Cache</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cache Info", {pagename: "ROOM 2740",})}
      >
        <Text>SRYC 2740 Cache</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cc0633',
  },

  button: { 
    maxWidth: '100%',
    minWidth: '90%',
    padding: 30,
    paddingTop: 70,
    paddingBottom: 70,
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,

  },
});
