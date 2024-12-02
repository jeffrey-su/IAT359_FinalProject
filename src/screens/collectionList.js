import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CollectionList({ route, navigation }) {
  const [scannedItems, setScannedItems] = useState([]);

  useEffect(() => {
    const loadScannedItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('scannedItems');
        if (storedItems) {
          setScannedItems(JSON.parse(storedItems)); // Parse and set the data
        }
      } catch (error) {
        console.error("Error loading scanned items:", error);
      }
    };

    loadScannedItems();
  }, []);

  useEffect(() => {
    if (route.params?.data) {
      const newItem = route.params.data;

      if (!scannedItems.includes(newItem)) {
        const updatedItems = [...scannedItems, newItem];
        setScannedItems(updatedItems);

        // Save updated items to AsyncStorage
        AsyncStorage.setItem('scannedItems', JSON.stringify(updatedItems))
          .catch(error => console.error("Error saving scanned items:", error));
      }
    }
  }, [route.params?.data]);

  const resetScans = async () => {
    try {
      await AsyncStorage.removeItem('scannedItems'); // Clear storage
      setScannedItems([]); // Clear local state
    } catch (error) {
      console.error("Error resetting scanned items:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={scannedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: 'green', fontSize: 20 }}>{item} - Found</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Camera')}
        style={[styles.resetButton, { backgroundColor: 'green' }]}
      >
        <Text style={styles.buttonText}>Back to Scanner</Text>
      </TouchableOpacity>

      {/* New Clear Data Button */}
      <TouchableOpacity onPress={resetScans} style={[styles.resetButton, { backgroundColor: 'red' }]}>
        <Text style={styles.buttonText}>Clear All Data</Text>
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
