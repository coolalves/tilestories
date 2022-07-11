import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Image, useWindowDimensions, Dimensions, Platform } from "react-native";
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
    const [camera, setCamera] = useState(null);
    // Screen Ratio and image padding
    const [imagePadding, setImagePadding] = useState(0);
    const [ratio, setRatio] = useState('4:3');  // default is 4:3
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] = useState(false);




    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);


    if (hasCameraPermission === undefined || hasCameraPermission === null) {
        return <Text> Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text> Permissions for camera not granted. Please change this in settings.</Text>
    }

    // set the camera ratio and padding.
    // this code assumes a portrait mode screen
    const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync();

            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio;
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance;
            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // set the preview padding and preview ratio
            setImagePadding(remainder);
            setRatio(desiredRatio);
            // Set a flag so we don't do this 
            // calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };

    // the camera must be loaded in order to access the supported ratios
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    };

    let takePhoto = async () => {
        console.log("estou aqui")
        let options = {
            quality: 0.1,
            base64: true,

        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        console.log("depois do new photo")
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
        <View style={styles.container}>


            <Camera
                style={[styles.cameraPreview, { marginTop: imagePadding, marginBottom: imagePadding }]}
                onCameraReady={setCameraReady}
                ratio={ratio}
                ref={async(ref) => {
                    setCamera(ref);
                    let newPhoto=await cameraRef.current.takePictureAsync(options);
                    setPhoto(newPhoto);
                }}>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={takePhoto}>
                        <Text style={styles.buttonText}> Take Photo</Text>
                    </Pressable>
                </View>

            </Camera>





        </View>

    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        backgroundColor: "#151F6D",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    information: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center'
    },
    cameraPreview: {
        flex: 1,
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