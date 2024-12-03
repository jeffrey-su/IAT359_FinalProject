import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { firebase_auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { and, collection, doc, getDocs, getDoc, query, setDoc, where,} from "firebase/firestore";


export default function CollectionList({ route, navigation }) {
  const [scannedItems, setScannedItems] = useState([]);
  const [studioABadge, setStudioABadge] = useState(false);
  const [studioBBadge, setStudioBBadge] = useState(false);
  const [macLabBadge, setMacLabBadge] = useState(false);
  

  const [username, setUsername] = useState(firebase_auth.currentUser.email);
  const [pfp, setPfp] = useState('../../assets/filler.png');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPfp(result.assets[0].uri);
    }
    console.log(pfp);
    getUsername();
  };

  async function getUsername() {
    const querySnapshot = await getDocs(collection(db, "PROFILES"));
    let allcomments = []; // for display in text box
    querySnapshot.forEach((doc) => {
      if (doc.id == firebase_auth.currentUser.email){
        console.log(doc.id, "=>", doc.data());
        allcomments.push(
        `${doc.data().username}`
      );
      }
      
    });
    setUsername(allcomments.join("\n"));
    
  }

  async function fetchBadgeData() {
    try {
      // Create a reference to the user's document
      const userDocRef = doc(db, "PROFILES", firebase_auth.currentUser.email);
  
      // Retrieve the document using getDoc
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const data = userDoc.data(); // Extract document data
        console.log("Fetched data:", data);
  
        // Update badge states with Firestore data
        setMacLabBadge(data.MacLab || false);
        setStudioABadge(data.Studio_A || false);
        setStudioBBadge(data.Studio_B || false);
      } else {
        console.log("Doc doesnt exist");
      }
    } catch (error) {
      console.error("Error fetching badge data:", error);
    }
  };

  async function updateBadgeData(field, value) {
    try {
      const userDocRef = doc(db, "PROFILES", firebase_auth.currentUser.email);
      await setDoc(userDocRef, { [field]: value }, { merge: true });
  
      console.log(`${field} updated to:`, value);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  }

  
  useEffect(() => {
    fetchBadgeData(); // Fetch badge data from Firestore on component load
    console.log(firebase_auth.currentUser.email)
  }, [route.params?.data]);
  
  useEffect(() => {
    if (route.params?.data) {
      const newItem = route.params.data;
  
      // Check if the new item is 'Studio A' and toggle the studioABadge boolean
      if (newItem === 'Studio A') {
        // setStudioABadge(true);
        updateBadgeData("Studio_A", true); // Save to Firestore
      }
      
      if (newItem === 'Studio B') {
        // setStudioBBadge(true);
        updateBadgeData("Studio_B", true); // Save to Firestore
      }
      
      if (newItem === 'Mac Lab') {
        // setMacLabBadge(true);
        updateBadgeData("MacLab", true); // Save to Firestore
      }
      
  
      // if (!scannedItems.includes(newItem)) {
      //   const updatedItems = [...scannedItems, newItem];
      //   setScannedItems(updatedItems);
  
      //   // Save updated items to AsyncStorage
      //   AsyncStorage.setItem('scannedItems', JSON.stringify(updatedItems))
      //     .catch((error) => console.error("Error saving scanned items:", error));
      // }
      fetchBadgeData
    }
  }, [route.params?.data]);


  return (
    <SafeAreaView style={styles.container}>

      <View backgroundColor='grey' borderRadius= {100}>
      {pfp && <Image source={{ uri: pfp }} style={{ width: 200, height: 200, borderRadius: 100, }} />}
      </View>
      <Button title="Edit Profile Picture" onPress={pickImage} />
      <Text>{username}</Text>

      <FlatList
        data={scannedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: 'green', fontSize: 20 }}>{item} - Found</Text>
          </TouchableOpacity>
        )}
      />
      <Text>Studio A Badge: {studioABadge ? 'Unlocked' : 'Locked'}</Text>
      <Image source={studioABadge ? require('../../assets/studioABadge.png') : require('../../assets/3100.jpg')} style={{width: 100, height: 100,}}/>
      <Text>Studio B Badge: {studioBBadge ? 'Unlocked' : 'Locked'}</Text>
      <Text>Mac Lab Badge: {macLabBadge ? 'Unlocked' : 'Locked'}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Camera')}
        style={[styles.resetButton, { backgroundColor: 'green' }]}
      >
        <Text style={styles.buttonText}>Back to Scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => firebase_auth.signOut()}
        style={[styles.resetButton, { backgroundColor: 'red' }]}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    maxWidth: '100%',
    minWidth: '95%',
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
  scanMoreText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90d1a9',
    height: 50,
    padding: 5,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});
