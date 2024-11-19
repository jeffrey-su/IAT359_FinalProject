import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native';

export default function CollectionList({ route, navigation }) {
  const [scannedItems, setScannedItems] = useState([]); // use effect arrays to hold qr items

  useEffect(() => {
    if (route.params?.data) { // Only process if data exists
      const newItem = route.params.data;

      if (!scannedItems.includes(newItem)) { // add the new item to scannedItems if it doesnt already exist
        const updatedItems = [...scannedItems, newItem]; // keeping the old values so it doesnt override
        setScannedItems(updatedItems); // sets the main array to the new values
      }
    };
  }, [route.params?.data]); // updates if theres something new in the array

  const resetScans = () => {
    setScannedItems([]); // clear items array
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={scannedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.button}>
            <Text style={{ color:'green' , fontSize: 20 }}>{item} - Scanned</Text>
          </TouchableOpacity>
        )}
      />
    
      <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={[styles.resetButton, {backgroundColor: 'green'}]}>
        <Text style={styles.buttonText}>Back to Scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetScans} style={styles.resetButton}>
        <Text style={styles.buttonText}>Reset Scans</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#90d1a9",
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
