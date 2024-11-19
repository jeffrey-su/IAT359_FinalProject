import * as Location from "expo-location";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    // determining current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setLocation(location);
        console.log(location);
      } else {
        setErrorMsg("Current location not obtained");
        return;
      }
    })();
  }, []);
  

  return (
    <View style={styles.container}>
        <MapView
          style={styles.map}
          showsPointsOfInterest={false}
          showsIndoors={true}

          initialRegion={{
            latitude: 49.1874929575383, 
            longitude:-122.84976272346668,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          showsMyLocationButton
          showsUserLocation
        >
        <Marker 
          coordinate={{
            latitude: 49.18726,
            longitude: -122.84870
          }}
          title={"Studio B"}
        
        />
        <Marker 
          coordinate={{
            latitude: 49.18726020272876, 
            longitude: -122.85013064932285
          }}
          title={"Studio A"}
        
        />
        <Marker 
          coordinate={{
            latitude: 49.18784777061085, 
            longitude: -122.85007754430409 
          }}
          title={"SRYC 2740"}
        
        />

        </MapView>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
