// import * as Location from "expo-location";
// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// import MapView, { Marker } from "react-native-maps";

// export default function MapScreen({ navigation }) {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [searchLocation, setSearchLocation] = useState(null);

//   useEffect(() => {
//     // determining current location
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       if (location) {
//         setLocation(location);
//         console.log(location);
//       } else {
//         setErrorMsg("Current location not obtained");
//         return;
//       }
//     })();
//   }, []);
  

//   return (
//     <View style={styles.container}>
//         <MapView
//           style={styles.map}
//           showsPointsOfInterest={false}
//           showsIndoors={true}

//           initialRegion={{
//             latitude: 49.1874929575383, 
//             longitude:-122.84976272346668,
//             latitudeDelta: 0.003,
//             longitudeDelta: 0.003,
//           }}
//           showsMyLocationButton
//           showsUserLocation
//         >
//         <Marker 
//           coordinate={{
//             latitude: 49.18731813615295, 
//             longitude: -122.84910609248973
//           }}
//           title={"Studio B"}
        
//         />
//         <Marker 
//           coordinate={{
//             latitude: 49.18757302655212, 
//             longitude: -122.84973148503786
//           }}
//           title={"Studio A"}
        
//         />
//         <Marker 
//           coordinate={{
//             latitude: 49.187074477539625, 
//             longitude: -122.8490
//           }}
//           title={"SRYC 3310"}
        
//         />
//         </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#cc0633',
//   },
//   button: { 
//     maxWidth: '100%',
//     minWidth: '80%',
//     padding: 30,
//     marginVertical: 10,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 8,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     elevation: 3,

//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline, Overlay } from "react-native-maps";

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null); // User's live location
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null); // Selected marker
  const [locationSubscription, setLocationSubscription] = useState(null); // Subscription for live updates

  const [mapRegion, setMapRegion] = useState({
    latitude: 49.18668329575383,
    longitude: -122.8498497234666,
    latitudeDelta: 0.003, // Larger delta to fit the screen
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    // Request location permission and start watching the user's location
    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Start watching the user's location
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every second
          distanceInterval: 0.5, // Update every 1 meter
        },
        (currentLocation) => {
          setLocation(currentLocation.coords);
        }
      );

      setLocationSubscription(subscription);
    };

    startLocationUpdates();

    // Cleanup the location subscription on unmount
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const markers = [
    {
      coordinate: { latitude: 49.18731813615295, longitude: -122.84910609248973 },
      title: "Studio B",
    },
    {
      coordinate: { latitude: 49.18768302655212, longitude: -122.85073148503786 },
      title: "Studio A",
    },
    {
      coordinate: { latitude: 49.186874477539625, longitude: -122.8490560924 },
      title: "SRYC 3100",
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsPointsOfInterest={false}
        showsIndoors={true}
        initialRegion={{
          latitude: 49.1868929575383,
          longitude: -122.84986272346668,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        showsMyLocationButton
        showsUserLocation
      >
        {/* Image Overlay */}
        <Overlay
          image={require("../../assets/mapOverlayL.png")} // Replace with your image file path
          bounds={[
            [
              mapRegion.latitude - mapRegion.latitudeDelta / 1, // Southwest corner
              mapRegion.longitude - mapRegion.longitudeDelta / 1,
            ],
            [
              mapRegion.latitude + mapRegion.latitudeDelta / 1, // Northeast corner
              mapRegion.longitude + mapRegion.longitudeDelta / 1,
            ],
          ]}
        />

        {/* Interactive Markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => setSelectedMarker(marker.coordinate)}
          />
        ))}

        {/* Draw a live-updating line if both user location and a marker are selected */}
        {location && selectedMarker && (
          <Polyline
            coordinates={[
              { latitude: location.latitude, longitude: location.longitude }, // User's current live location
              selectedMarker, // Selected marker's location
            ]}
            strokeColor="blue" // Line color
            strokeWidth={3} // Line thickness
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cc0633",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
