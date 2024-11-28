import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { firebase_auth } from "../firebaseConfig";

export default function CacheList({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={[{fontSize: 30, color: 'white', padding: 30, alignSelf: 'start', fontFamily: 'CountachRegular'}]}>Cache List</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}>
        <Image></Image>
        <Text>Studio B Cache</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text>Studio A Cache</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
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
