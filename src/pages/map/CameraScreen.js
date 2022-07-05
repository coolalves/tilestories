import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import { StatusBar } from "expo-status-bar";
import { shareAsync } from "expo-sharing";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function CameraScreen(location) {
    console.log(location);
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);


    if (hasCameraPermission === undefined) {
        return <Text> Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text> Permissions for camera not granted. Please change this in settings.</Text>
    }

    let takePhoto = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: true
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        let sharePhoto = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
            <SafeAreaView style={styles.cameraContainer}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Pressable style={styles.buttonContainer} onPress={sharePhoto} >
                    <Text> Share</Text>
                </ Pressable>
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.cameraContainer} ref={cameraRef}>
            <Pressable style={styles.buttonContainer} onPress={takePhoto}>
                <Text style={styles.buttonText}> Take Photo</Text>
            </Pressable>
            <StatusBar style="auto" />
        </Camera>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonContainer: {
        position: "absolute",
        flex: 1,
        bottom: "10%",
        padding: 10,
        zIndex: 2,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});