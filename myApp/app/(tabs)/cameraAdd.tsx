import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import * as FileSystem from 'expo-file-system';

export default function AddItemScreen() {
  const facing: CameraType = 'back';
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const cameraRef = useRef<any>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      console.log('Photo captured at:', photo.uri);
    }
  };

  const uploadImage = async () => {
    if (!photoUri) return;
    setUploading(true);
    const filename = photoUri.split('/').pop();
    const fileType = filename?.split('.').pop();

    const formData = new FormData();
    formData.append('image', {
      uri: photoUri,
      name: filename,
      type: `image/${fileType}`,
    } as any);

    try {
      const res = await fetch('http://<YOUR-IP>:5000/detect', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const json = await res.json();
      setResult(json);
      Alert.alert('Detection complete!', `Objects: ${json.objects.length}, Empty zones: ${json.empty_zones.length}`);
    } catch (err) {
      console.error(err);
      Alert.alert('Upload failed', 'Could not connect to backend.');
    } finally {
      setUploading(false);
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Allow camera access to capture items.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button title="Retake" onPress={() => setPhotoUri(null)} />
            <Button title="Detect" onPress={uploadImage} disabled={uploading} />
          </View>
          {result && (
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>Detected:</Text>
              <Text>Objects: {result.objects?.length}</Text>
              <Text>Empty Zones: {result.empty_zones?.length}</Text>
            </View>
          )}
        </View>
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.text}>📸</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  preview: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
    marginBottom: 20,
  },
});
