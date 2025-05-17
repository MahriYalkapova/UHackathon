import React from 'react';
import {StyleSheet, Button, View, Text, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View>
        <Image>
        <div style={{width: 323, height: 188, left: 35, top: 391, position: 'absolute'}}>
        <img style={{width: 323, height: 188, left: 0, top: 0, position: 'absolute', borderRadius: 20}} src="https://media.istockphoto.com/id/1028497364/photo/female-hands-holding-smart-phone-displaying-photo-of-house-interior-living-room-behind.jpg?s=612x612&w=0&k=20&c=CHCJ2_Foz3qy7FarCDq9PRCjXyqbhK_rMB5a1pBpxUU=" />
        <div style={{width: 323, height: 160, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(90deg, rgba(217, 217, 217, 0) 0%, #AA4499 100%)', borderRadius: 20}} />
        <div style={{width: 323, height: 63, left: 0, top: 125, position: 'absolute', background: 'white', borderBottomRightRadius: 20, borderBottomLeftRadius: 20}} />
            </div>
        </Image>
        <Button
          title="Find a place to put my item"
          <div style={{left: 25, top: 146, position: 'absolute', color: '#5B3816', fontSize: 20, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Find a missing item</div>
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;