import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput, Button } from 'react-native';
import React, {useState, useEffect} from 'react';

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
  };

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, inputtedEmail, inputtedPassword);
      console.log(response);
      alert("User: " + inputtedEmail + " signed in");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={[{fontSize: 35, padding: 30, color: '#fff', fontFamily: 'CountachRegular',}]}>SFU {'\n'} GEOCACHING </Text>
      
      <TextInput
        style={styles.input}
        placeholder='email'
        onChangeText={newText => setInputtedEmail(newText)}
        defaultValue={inputtedEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='password'
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
});
