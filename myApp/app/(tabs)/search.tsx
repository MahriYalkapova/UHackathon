import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Keyboard, Alert} from 'react-native';
import { useRouter } from 'expo-router';

let timeout: ReturnType<typeof setTimeout>;

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    clearTimeout(timeout);
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    timeout = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
  }, [query]);

  const fetchSuggestions = async (text: string) => {
    try {
      const res = await fetch(`https://api.datamuse.com/sug?s=${text}`);
      const data = await res.json();
      const words = data.map((item: { word: string }) => item.word);
      setSuggestions(words);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    if (query.trim()) {
      router.push({ pathname: '/explore', params: { item: query } });
    } else {
      Alert.alert('Please type or select an item.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={{ color: 'white' }}>Type a missing item</Text> */}
      <TextInput
        placeholder="Type an item..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        style={styles.input}
        returnKeyType="done"
      />

      <FlatList
        data={suggestions.slice(0, 3)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text style={styles.suggestion}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#000', 
    height: '100%' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 12,
    marginBottom: 10,
    color: '#fff', 
    backgroundColor: '#222', 
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#aaa',
    color: '#fff', 
  },
});
