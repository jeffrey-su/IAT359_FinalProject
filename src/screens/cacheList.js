import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { firebase_auth } from "../firebaseConfig";
import { useState } from "react";

export default function CacheList({ navigation }) {

  const [pagename, setpageName] = useState("StudioA");
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{alignItems: 'center', minWidth: '100%'}}>
      <Text style={[{fontSize: 30, color: 'white', padding: 30, alignSelf: 'start', fontFamily: 'CountachRegular'}]}>CACHE LIST</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cache Info", {pagename: "STUDIO B",})}>
        <Image source={require('../../assets/studioB.jpg')} style={{width: 250, height: 332.5,}}/>
        <Text style={styles.cacheDesc}>Studio B Cache - Room SRYC 3020</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cache Info", {pagename: "STUDIO A",})}>
        <Image source={require('../../assets/studioA.jpg')} style={{width: 250, height: 332.5,}}/>
        <Text style={styles.cacheDesc}>Studio A Cache - Room SRYC 3875</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cache Info", {pagename: "ROOM 3100",})}
      >
        <Image source={require('../../assets/3100.jpg')} style={{width: 250, height: 332.5,}}/>
        <Text style={styles.cacheDesc}>Mac Lab 1 Cache - Room SRYC 3100</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    maxWidth: '80%',
    minWidth: '70%',
    padding: 20,
    paddingTop: 20,
    paddingBottom: 70,
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    // alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,

  },
  cacheDesc: {  
    paddingTop: 20,
    fontFamily: 'DinRegular',
  }
});
