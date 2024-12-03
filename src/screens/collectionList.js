import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, Button, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { firebase_auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { and, collection, doc, getDocs, query, setDoc, getDoc, where,} from "firebase/firestore";


export default function CollectionList({ route, navigation }) {
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
    
  };

  async function changeUsername() {
    const cityRef = doc(db, 'PROFILES', firebase_auth.currentUser.email);
    setDoc(cityRef, { username: username }, { merge: true });
    
  };

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
    fetchBadgeData();
    console.log(firebase_auth.currentUser.email);
  }, [route.params?.data]);

  useEffect(() => {
    if (route.params?.data) {
      const newItem = route.params.data;

      if (newItem === 'Studio A') {
        // setStudioABadge(true);
        updateBadgeData("Studio_A", true); // Save to Firestore
      }else if (newItem === 'Studio B') {
        // setStudioBBadge(true);
        updateBadgeData("Studio_B", true); // Save to Firestore
      }else if (newItem === 'Mac Lab') {
        // setMacLabBadge(true);
        updateBadgeData("MacLab", true); 
    }
      fetchBadgeData
    }
  }, [route.params?.data]);


  return (
    <SafeAreaView style={styles.container}>

      <View backgroundColor='grey' borderRadius= {100}>
      {pfp && <Image source={{ uri: pfp }} style={{ width: 200, height: 200, borderRadius: 100, }} />}
      </View>
      <Button title="Edit Profile Picture" onPress={pickImage} />
      <TextInput
        //style={styles.button}
        
        placeholder='add a comment'
        placeholderTextColor="#aaa"
        onChangeText={newText => setUsername(newText)}
        defaultValue={username}
      />
      <Button title="Save Changes" onPress={changeUsername}/>

      <SafeAreaView style={{flexDirection: 'row', marginTop: '10%'}}>
        {/* <Text>Studio A Badge: {studioABadge ? 'Unlocked' : 'Locked'}</Text> */}
        <Image source={studioABadge ? require('../../assets/studioABadge.png') : require('../../assets/studioABadgeLocked.png')} style={{width: 100, height: 90,}}/>
        {/* <Text>Studio B Badge: {studioBBadge ? 'Unlocked' : 'Locked'}</Text> */}
        <Image source={studioBBadge ? require('../../assets/studioBBadge.png') : require('../../assets/studioBBadgeLocked.png')} style={{width: 110, height: 100,}}/>
        {/* <Text>Mac Lab Badge: {macLabBadge ? 'Unlocked' : 'Locked'}</Text> */}
        <Image source={macLabBadge ? require('../../assets/macLabBadge.png') : require('../../assets/macLabBadgeLocked.png')} style={{width: 100, height: 100,}}/>
      </SafeAreaView>
      <SafeAreaView style={{flexDirection: 'row', marginTop: '10%'}}>
        <Text style={styles.badgeText}>Studio A Badge</Text>
        {/* <Image source={studioABadge ? require('../../assets/studioABadge.png') : require('../../assets/studioABadgeLocked.png')} style={{width: 100, height: 90,}}/> */}
        <Text style={styles.badgeText}>Studio B Badge</Text>
        {/* <Image source={studioABadge ? require('../../assets/studioBBadge.png') : require('../../assets/studioBBadgeLocked.png')} style={{width: 110, height: 100,}}/> */}
        <Text style={styles.badgeText}>Mac Lab Badge</Text>
        {/* <Image source={studioABadge ? require('../../assets/macLabBadge.png') : require('../../assets/macLabBadgeLocked.png')} style={{width: 100, height: 100,}}/> */}
      </SafeAreaView>

      <FlatList
      />

      
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
  badgeText:{
    paddingHorizontal: 15,
    fontFamily: 'DinRegular',
  },
});
