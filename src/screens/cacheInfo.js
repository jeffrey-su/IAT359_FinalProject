import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, flex, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { firebase_auth } from "../firebaseConfig";
import { firebase_app } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import React,{ useState, useEffect } from "react";
import { and, collection, doc, getDocs, query, setDoc, where,} from "firebase/firestore";
//import "firebase/app";
//import "firebase/auth";

export default function CacheInfo({ navigation, route}) {

    const [results, setResults] = useState("");
    
    const {pagename} = route.params;
    const [inputtedComment, setInputtedComment] = useState('');
    const [theID, setTheID] = useState('26gscNQHswYio5RBu');

    const key = 'gBeh60LnsWOf8p9UdXpVLilnmHDsiBjR';
    const R3100 = 'l41JNsXAvFvoHvWJW'
    const STDA = '26gscNQHswYio5RBu'
    const STDB = 'Uul6g9WTEI40evQ2b5'

     function pickTheRoom() {

        if(pagename == 'STUDIO A'){
    
            apiCall();
        }

        if(pagename == 'STUDIO B'){
            BapiCall();
        }
         
        if(pagename == 'ROOM 3100'){
            TapiCall();
        }
        

    }
    

    
    

    const [gif, setGif] = useState({});

    const apiCall = async () => {

        const res = await fetch('https://api.giphy.com/v1/gifs/'+ STDA +'?api_key=yGovaWQWUfAiOfeas688nX4LJKRglUHC&rating=g');
    
        const json = await res.json();
    
        setGif({image_url: json.data.images.original.url});
    
      }

    const BapiCall = async () => {

        const res = await fetch('https://api.giphy.com/v1/gifs/'+ STDB +'?api_key=yGovaWQWUfAiOfeas688nX4LJKRglUHC&rating=g');
    
        const json = await res.json();
    
        setGif({image_url: json.data.images.original.url});
    
      }

      const TapiCall = async () => {

        const res = await fetch('https://api.giphy.com/v1/gifs/'+ R3100 +'?api_key=yGovaWQWUfAiOfeas688nX4LJKRglUHC&rating=g');
    
        const json = await res.json();
    
        setGif({image_url: json.data.images.original.url});
    
      }
    
      useEffect(() => {
        pickTheRoom();
        //apiCall();
      }, []);

    // function to retrieve all comments from the database
    async function getComments() {
        const querySnapshot = await getDocs(collection(db, pagename));
        let allcomments = []; // for display in text box
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          allcomments.push(
            `${doc.data().username}:\n${
              doc.data().commentcontent
            } `
          );
        });
        setResults(allcomments.join("\n\n"));
      }

      async function insertNewComment() {
        try {
            const docRef= doc(collection(db, pagename));
            setDoc(docRef, {
              commentcontent: inputtedComment,
              username: firebase_auth.currentUser.email,
            });
            console.log("Document written with ID: ", docRef.id);
            setInputtedComment("");
          } catch (e) {
            console.error("Error adding document: ", e);
          }

      }
      
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{alignItems: 'center', minWidth: '100%'}}>
      <Text style={[{fontSize: 30, color: 'white', paddingLeft: 30, alignSelf: 'start', fontFamily: 'CountachRegular'}]}>{pagename}</Text>

      <View flexDirection ='row' width ='90%'>

      
      <TouchableOpacity onPress={() => navigation.navigate("Cache")} style={styles.post}>
          <Text style={[{color:'white'}]}>Back</Text>
      </TouchableOpacity>
      <View style={styles.empty}></View>
      
      </View>

      <TouchableOpacity style={styles.button}>

        <Image source={{uri: gif.image_url}} style={{width: 250, height: 332.5,}}/>
      </TouchableOpacity>

      <View flexDirection ='row' width ='90%'>

      <View style={styles.post}>
      <TouchableOpacity onPress={insertNewComment} flex='1'>
          <Text style={[{color:'white'}]}>Post</Text>
      </TouchableOpacity>
      </View>
    
      <View style={styles.box}>
      <TextInput
        //style={styles.button}
        
        placeholder='add a comment'
        placeholderTextColor="#aaa"
        onChangeText={newText => setInputtedComment(newText)}
        defaultValue={inputtedComment}
      />
      </View>
      </View>

      <TouchableOpacity onPress={getComments} style={styles.redButton}>
          <Text style={[{color:'white'}]}>Show Comments</Text>
      </TouchableOpacity>

      <Text style={styles.button}>{results}</Text>
      </ScrollView>
      
      
    </SafeAreaView>
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
    minWidth: '90%',
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,

  },

  redButton: { 
    maxWidth: '100%',
    minWidth: '90%',
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 10,
    backgroundColor: '#A6192E',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    
  },

  box: {
    flex: 5,
    //height:50,
    width:50,
    backgroundColor: "#f2f2f2",
    color: "#fff",
    alignContent: "center",
    padding: 8,
    margin:4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },

  post: {
    flex: 1,
    //height:50,
    width:50,
    backgroundColor: "#A6192E",
    color: "#fff",
    alignContent: "center",
    padding: 8,
    margin:4,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },

  empty: {
    flex: 5,
    //height:50,
    width:50,
    
    alignContent: "center",
    padding: 8,
    margin:4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
});
