import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline, Overlay } from "react-native-maps";

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null); // subscription for live updates

  const [mapRegion, setMapRegion] = useState({
    latitude: 49.18668329575383,
    longitude: -122.8498497234666,
    latitudeDelta: 0.003, // controls the zoom of the overlay
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // location permissions
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const subscription = await Location.watchPositionAsync(
        // subscribbes to the location watch position
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // update every second
          distanceInterval: 0.5, // update every 0.5 meters
        },
        (currentLocation) => {
          setLocation(currentLocation.coords);
        }
      );
      setLocationSubscription(subscription);
    };

    startLocationUpdates();
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const markers = [
    {
      coordinate: {
        latitude: 49.18731813615295,
        longitude: -122.84910609248973,
      },
      title: "Studio B",
    },
    {
      coordinate: {
        latitude: 49.18768302655212,
        longitude: -122.85073148503786,
      },
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
        <Overlay
          image={require("../../assets/mapOverlayL.png")}
          bounds={[
            //overlay region bounds
            [
              mapRegion.latitude - mapRegion.latitudeDelta / 1, // southwest corner
              mapRegion.longitude - mapRegion.longitudeDelta / 1,
            ],
            [
              mapRegion.latitude + mapRegion.latitudeDelta / 1, // northeast corner
              mapRegion.longitude + mapRegion.longitudeDelta / 1,
            ],
          ]}
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => setSelectedMarker(marker.coordinate)}
          />
        ))}

        {location && selectedMarker && (
          <Polyline
            coordinates={[
              { latitude: location.latitude, longitude: location.longitude }, // user's current live location
              selectedMarker,
            ]}
            strokeColor="blue"
            strokeWidth={3}
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
