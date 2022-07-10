import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Image, useWindowDimensions, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import { StatusBar } from "expo-status-bar";
import { shareAsync } from "expo-sharing";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { getStorage, ref, uploadBytes, } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";




const firebaseConfig = {
    apiKey: "AIzaSyAeTmpYBFU9qhsqX0mIU_gg9lKBKJ9TBu0",
    authDomain: "tilestories-64fbb.firebaseapp.com",
    projectId: "tilestories-64fbb",
    storageBucket: "tilestories-64fbb.appspot.com",
    messagingSenderId: "905474695050",
    appId: "1:905474695050:web:bab623a9e3c2a84bfd7273",
    measurementId: "G-3K5HHWFT9Z"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default function CameraScreen(location) {
    console.log(location);
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState()


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
            quality: 0.1,
            base64: true,

        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        let sharePhoto = async () => {

            const storage = getStorage(); //the storage itself
            const refi = ref(storage, 'monalisa/image3.jpg'); //how the image will be addressed inside the storage
            //convert image to array of bytes
            const img = await fetch(photo.uri);
            console.log("img3");

            const bytes = await img.blob();

            uploadBytes(refi, bytes); //upload images

        }


        let savePhoto = () => {

            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
            <SafeAreaView style={styles.cameraContainer}>
                <Image style={[styles.preview, styles.photoo]} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Pressable style={styles.buttonContainer} onPress={sharePhoto} >
                    <Text> Share</Text>
                </ Pressable>
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        );
    }

    return (
        <Camera style={[styles.cameraContainer]} ref={cameraRef}>

            <View style={styles.buttonContainer}>
                <Pressable   onPress={takePhoto} />
                <Text style={styles.buttonText}> Take Photo</Text>
            </View>


        </Camera>

    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        backgroundColor: "#151F6D",
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
        backgroundColor: "#151F6D",
        alignSelf: 'stretch',
        flex: 1
    },
    photoo: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        top: 20
    }
});