import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { firebase_auth } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../../assets/logo.png') } style={styles.logo}/>
          <Text style={[{fontSize: 43, padding: 30, color: '#fff', fontFamily: 'CountachRegular',}]}>SFU {'\n'}GEOCACHING </Text>
        </View>
        
        <Text style={{fontFamily: 'DinRegular', color: '#fff', maxWidth: '66%', fontSize: 17}}>Geocaching is a real-world puzzle solving game where players 
          explore urban or natural areas in search of small 'caches' or artifacts with the help of an app or compass. {'\n\n'}
          SFU Geocaching focuses on the Surrey Campus of Simon Fraser University, as you explore the campus using the map, path your way around using 
          the markers as a guide to find a cache and add it to your collection.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Map")}
      >
        <Text style={{fontFamily: 'CountachRegular', color: '#cc0633', fontSize: '24'}}>Tap to Begin</Text>
      </TouchableOpacity>

      
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
    marginTop: 30,
    maxWidth: '65%',
    minWidth: '65%',
    padding: 20,
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
    width: 73, 
    height: 73,
  }
});
