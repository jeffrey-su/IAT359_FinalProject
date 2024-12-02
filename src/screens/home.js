import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { firebase_auth } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../../assets/logo.png') } style={styles.logo}/>
          <Text style={[{fontSize: 35, padding: 30, color: '#fff', fontFamily: 'CountachRegular',}]}>SFU {'\n'}GEOCACHING </Text>
        </View>
        

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text>Press Here To Start Collecting</Text>
      </TouchableOpacity>

      <Button onPress={() => firebase_auth.signOut()} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  font:{
    fontFamily: 'CountachRegular'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cc0633',
  },
  button: { 
    maxWidth: '100%',
    minWidth: '80%',
    padding: 30,
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,

  },
  logo:{
    marginTop: 30, 
    marginLeft: 30, 
    marginRight: -20, 
    width: 60, 
    height: 60,
  }
});
