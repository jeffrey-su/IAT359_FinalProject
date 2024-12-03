import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, Switch, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { firebase_auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { and, collection, doc, getDocs, query, setDoc, getDoc, where,} from "firebase/firestore";

async function saveDarkModeState(value) {
  try {
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
  } catch (error) {
    console.error('Error saving dark mode state:', error);
  }
}

async function getDarkModeState() {
  try {
    const value = await AsyncStorage.getItem('darkMode');
    return value !== null ? JSON.parse(value) : false; 
  } catch (error) {
    console.error('Error retrieving dark mode state:', error);
    return false; 
  }
}

export default function CollectionList({ route, navigation }) {
  const [studioABadge, setStudioABadge] = useState(false);
  const [studioBBadge, setStudioBBadge] = useState(false);
  const [macLabBadge, setMacLabBadge] = useState(false);
  
  const [username, setUsername] = useState(firebase_auth.currentUser.email);
  const [pfp, setPfp] = useState('../../assets/filler.png');
  const [isDarkMode, setIsDarkMode] = useState(false); 

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
      const userDocRef = doc(db, "PROFILES", firebase_auth.currentUser.email);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const data = userDoc.data(); 
        console.log("Fetched data:", data);
  
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
    const initializeDarkMode = async () => {
      const savedDarkModeState = await getDarkModeState();
      setIsDarkMode(savedDarkModeState);
    };
    fetchBadgeData();
    initializeDarkMode();
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    saveDarkModeState(newDarkModeState);
  };


  useEffect(() => {
    if (route.params?.data) {
      const newItem = route.params.data;

      if (newItem === 'Studio A') {
        updateBadgeData("Studio_A", true);
      }else if (newItem === 'Studio B') {
        updateBadgeData("Studio_B", true); 
      }else if (newItem === 'Mac Lab') {
        updateBadgeData("MacLab", true); 
    }
    }
    fetchBadgeData
  }, [route.params?.data]);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#393939" : "#fff" }]}>

      <TouchableOpacity
        onPress={pickImage}
        style={[{marginVertical: 10}]}
        >
      
        <View backgroundColor='grey' borderRadius= {100}>
        {pfp && <Image source={{ uri: pfp }} style={{ width: 200, height: 200, borderRadius: 100, }} />}
        </View>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', alignContent: 'center'}}>
        <TextInput
          placeholder='name'
          placeholderTextColor="#aaa"
          onChangeText={newText => setUsername(newText)}
          defaultValue={username}
          style={styles.nameInput}
        />
        <TouchableOpacity
          onPress={changeUsername}
          style={[styles.badgeTextBackground, {padding: 30, alignSelf: 'center'}]}>
          <Text style={styles.badgeText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <SafeAreaView style={{alignItems: 'center', backgroundColor: '#cc0633', marginTop: 30, borderRadius: 10}}>
        <SafeAreaView style={{flexDirection: 'row', marginTop: '10%'}}>
          <Image source={studioABadge ? require('../../assets/studioABadge.png') : require('../../assets/studioABadgeLocked.png')} style={{width: 100, height: 90,}}/>
          <Image source={studioBBadge ? require('../../assets/studioBBadge.png') : require('../../assets/studioBBadgeLocked.png')} style={{width: 110, height: 100,}}/>
          <Image source={macLabBadge ? require('../../assets/macLabBadge.png') : require('../../assets/macLabBadgeLocked.png')} style={{width: 100, height: 100,}}/>
        </SafeAreaView>

        <SafeAreaView style={{flexDirection: 'row', marginTop: '10'}}>
          <Text style={[styles.badgeText, {paddingBottom: 30}]}>Studio A Badge</Text>
          <Text style={[styles.badgeText, {paddingBottom: 30}]}>Studio B Badge</Text>
          <Text style={[styles.badgeText, {paddingBottom: 30}]}>Mac Lab Badge</Text>
        </SafeAreaView>
      </SafeAreaView>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: isDarkMode ? "#fff" : "#000", marginRight: 10 }}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      <TouchableOpacity
        onPress={() => firebase_auth.signOut()}
        style={[styles.button, {position: 'absolute', bottom: '0'}]}>
        <Text style={{fontFamily: 'CountachRegular', color: '#fff', fontSize: '24'}}>Sign Out</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  button: {
    maxWidth: '80%',
    minWidth: '90%',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#cc0633',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  badgeText:{
    paddingHorizontal: 15,
    fontFamily: 'DinRegular',
    color: '#fff'
  },
  profileEditBackground:{
    backgroundColor: '#cc0633', 
    paddingVertical: 3,
    paddingHorizontal: 3,
    marginHorizontal: 5, 
    borderRadius: 6
  },
  badgeTextBackground:{
    backgroundColor: '#cc0633', 
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 6
  },
  nameInput:{
    fontSize: 20, 
    justifySelf: 'center', 
    backgroundColor: '#f2f2f2', 
    paddingHorizontal: 40, 
    padding: 5,
    color: '#000', 
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    marginRight: 10, 
  }
});
