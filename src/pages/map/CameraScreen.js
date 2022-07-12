import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Image, useWindowDimensions, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'

import { shareAsync } from "expo-sharing";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { getStorage, ref, uploadBytes, } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

var idazulii;
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
const auth = getAuth();
var uid;


export default function CameraScreen(location) {

    console.log("teste", location.route.params.manitos);
    //console.log("blabla",location);
    idazulii = location.route.params.manitos;
    console.log(location);
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState()
    const navigation = useNavigation();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;

        } else {
            // User is signed out
        }
    });

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


            const refi = ref(storage, 'users/' + uid + "/" + idazulii + "." + uid + '.jpg');
            const refi2 = ref(storage, 'toApprove/' + idazulii + "." + uid + '.jpg');
            //convert image to array of bytes
            const img = await fetch(photo.uri);
            console.log("img3");

            const bytes = await img.blob();

            await uploadBytes(refi, bytes); //upload images to users
            await uploadBytes(refi2, bytes); //upload images to toApprove

        }


        let savePhoto = () => {

            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
            <SafeAreaView style={styles.cameraContainer}>
                <Image style={[styles.preview, styles.photoo]} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <View style={{ top: -170, width: Dimensions.get("window").width, height: 0, alignContent: "center" }}>
                    <Pressable style={styles.buttonContainer2} onPress={sharePhoto} >
                        <Text style={styles.buttonText}> Share</Text>
                    </ Pressable>
                </View>


                {hasMediaLibraryPermission ?
                    <View style={{ width: 100, top: -750, left: 80 }}>
                        <Pressable onPress={savePhoto} >
                            <Entypo name="save" size={28} color="white" />

                            <Text style={{ color: 'white', textAlign: "auto" }}>
                                Save
                            </Text>
                        </Pressable>

                    </View>

                    : undefined}

                <View style={{ top: -130, width: Dimensions.get("window").width, alignContent: "center" }}>
                    <Pressable style={styles.buttonContainer3} onPress={() => setPhoto(undefined)} >
                        <Text style={styles.buttonText2}> Discard</Text>
                    </Pressable>
                </View>

            </SafeAreaView>
        );
    }

    return (
        <Camera style={[styles.cameraContainer]} ref={cameraRef}>

            <View style={{ top: 80, width: 315, height: 600, alignContent: "center" }}>
                <Pressable style={styles.buttonContainer} onPress={takePhoto}>
                    <Text style={styles.buttonText}> Take Photo</Text>
                </Pressable>

            </View>

            <Pressable style={{ top: -630, left: -240, }} onPress={() => navigation.navigate('Map')}>
                <Ionicons name="return-down-back-outline" size={26} color="white" />
                <Text style={{ color: 'white', textAlign: "center" }}>
                    Exit
                </Text>
            </Pressable>


        </Camera>

    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        backgroundColor: "#151F6D",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width + 200,
        height: Dimensions.get("window").height,

    },

    buttonContainer: {
        position: "absolute",
        flex: 1,
        bottom: "10%",
        padding: 10,
        zIndex: 2,
        backgroundColor: "#5C75DD",
        borderRadius: 20,
    },
    buttonContainer2: {
        position: "absolute",
        flex: 1,
        bottom: "10%",
        padding: 10,
        zIndex: 2,
        backgroundColor: "#5C75DD",
        borderRadius: 20,
        width: "80%",
        left: "-15%"
    },
    buttonContainer3: {
        position: "absolute",
        flex: 1,
        bottom: "10%",
        padding: 10,
        zIndex: 2,
        backgroundColor: "white",
        borderRadius: 20,
        width: "80%",
        left: "-15%"
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
        textAlign: "center"
    },
    buttonText2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#111111",
        textAlign: "center"
    },
    preview: {
        backgroundColor: "#151F6D",
        alignSelf: 'stretch',
        flex: 1
    },
    photoo: {
        width: Dimensions.get("window").width + 200,
        height: Dimensions.get("window").height,
        top: 40
    }
});