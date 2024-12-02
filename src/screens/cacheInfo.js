import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { firebase_auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { useState } from "react";
import { and, collection, doc, getDocs, query, setDoc, where,} from "firebase/firestore";

export default function CacheInfo({ navigation, route}) {

    const [results, setResults] = useState("");
    const {pagename} = route.params;
    const [inputtedComment, setInputtedComment] = useState('');

    // function to retrieve all comments from the database
    async function getComments() {
        const querySnapshot = await getDocs(collection(db, pagename));
        let allcomments = []; // for display in text box
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          allcomments.push(
            `${doc.data().username}: ${
              doc.data().commentcontent
            } `
          );
        });
        setResults(allcomments.join("\n"));
      }

    
      
  return (
    <View style={styles.container}>
      <Text style={[{fontSize: 30, color: 'white', padding: 30, alignSelf: 'start', fontFamily: 'CountachRegular'}]}>{pagename}</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate("Cache")} style={styles.redButton}>
          <Text style={[{color:'white'}]}>Cache List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image></Image>
        <Text>Cache Info</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.button}
        placeholder='add a comment'
        placeholderTextColor="#aaa"
        onChangeText={newText => setInputtedComment(newText)}
        defaultValue={inputtedComment}
      />

      <TouchableOpacity onPress={getComments} style={styles.redButton}>
          <Text style={[{color:'white'}]}>Show Comments</Text>
      </TouchableOpacity>

      <Text style={styles.button}>{results}</Text>

      

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
});
