import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={[{fontSize: 25, padding: 30, color: '#fff'}]}>SFU GEOCACHING</Text>
      
      <TextInput
        style={styles.input}
        placeholder='username'
      />
      <TextInput
        style={styles.input}
        placeholder='username'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text style={[{color: '#fff'}]}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Camera")}
      >
        <Text style={[{color: '#fff'}]}>Create an account</Text>
      </TouchableOpacity>
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
