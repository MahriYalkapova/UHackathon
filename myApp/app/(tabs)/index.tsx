import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useRouter } from 'expo-router';


// Temporary placeholder components
const AppHeader = () => <View style={{ flex: 1 }} />;

const RegisterButton = () => (
  <Button title="Register" onPress={() => console.log('Register pressed')} />
);
const FindButton = () => {
  const router = useRouter();
  return <Button title="Find" onPress={() => router.push('/find')} />;
};

const PlaceButton = () => {
  const router = useRouter();
  return <Button title="Place" onPress={() => router.push('/place')} />;
};

export default function HomeScreen() {
      const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <AppHeader />
        <ThemedText type="title">Good morning Joe!</ThemedText>
        {/* Replace with account name later */}
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <RegisterButton />
        <FindButton />
        <PlaceButton />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, 
  },
  stepContainer: {
    marginTop: 16,
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
