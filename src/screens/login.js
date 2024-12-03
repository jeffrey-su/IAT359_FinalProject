import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import { db } from "../firebaseConfig";
import { and, collection, doc, getDocs, query, setDoc, where,} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebase_auth } from "../firebaseConfig";

export default function LoginScreen({ navigation }) {

  const [inputtedEmail, setInputtedEmail] = useState('');
  const [inputtedPassword, setInputtedPassword] = useState('');
  const auth = firebase_auth;

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        inputtedEmail,
        inputtedPassword
      );
      console.log(response);
      alert("Sign up success. User: " + inputtedEmail + " signed up.");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
      console.log(firebase.apps);
    }
    createAcountDetails()
  };

  async function createAcountDetails() {
    try {
        await setDoc(doc(db, "PROFILES", inputtedEmail.toLowerCase()), {
          username:inputtedEmail,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }

  }

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, inputtedEmail, inputtedPassword);
      console.log(response);
      // alert("User: " + inputtedEmail + " signed in");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      <Text style={[{fontSize: 35, padding: 30, color: '#fff', fontFamily: 'CountachRegular',}]}>SFU {'\n'}GEOCACHING </Text>
      </View>
        
      
      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor="#aaa"
        onChangeText={newText => setInputtedEmail(newText)}
        defaultValue={inputtedEmail}
        inputMode = "email"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder='Password'
        placeholderTextColor="#aaa"
        onChangeText={newText => setInputtedPassword(newText)}
        defaultValue={inputtedPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
      >
        <Text style={[{color: '#fff'}]} >Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignUp}
      >
        <Text style={[{color: '#fff'}]}>Create an account</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  logo:{
    marginTop: 30, 
    marginLeft: -30, 
    marginRight: -20, 
    width: 60, 
    height: 60,
  }
});
