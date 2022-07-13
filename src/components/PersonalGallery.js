import * as React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { ImageGallery } from '@georstat/react-native-image-gallery';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase-config";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

var imags=[];


const images = [
    {
        id: 1,
        url: 'http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
        // any other extra info you want
    },
    {
        id: 2,
        url: 'https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg',
        // any other extra info you want
    },
    {
        id: 3,
        url: 'https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg',
        // any other extra info you want
    },

];

export const PersonalGallery = () => {

    const [useruid, setuid] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [userazul, setUserAzul] = useState(null);


    console.log("estou aqui desntrooooo");
    const [isOpen, setIsOpen] = useState(false);
    const openGallery = () => setIsOpen(true);
    const closeGallery = () => setIsOpen(false);
    const exitGallery = () => {
        closeGallery(true)



    }

    return (



        <View style={styles.openBtnContainer}>
            <Pressable
                style={[styles.button, styles.buttonOpenDetail]}
                onPress={
                    openGallery
                }
            >
                <Text style={styles.btnTextStyle}>Tiles discovered</Text>
            </Pressable>

            <ImageGallery close={closeGallery} isOpen={isOpen} images={images} >

                <View style={styles.closeBtnContainer}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => exitGallery()}
                    >
                        <Ionicons name="close-outline" size={18} color="white" />
                    </Pressable>

                    
                </View>
                <Text style={{color:"white", position:"absolute", fontSize:30, flex:1, zIndex:3}}>

                    </Text>
            </ImageGallery>


        </View>

    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,

        paddingHorizontal: 120,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        padding: 12,
        elevation: 2,
        top: 10,
        borderRadius: 100
    },

    buttonClose: {
        backgroundColor: "#151F6D",
    },
    buttonOpenDetail: {
        backgroundColor: "#5C75DD"
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    btnTextStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
    },
    modalText2: {
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "300",
        fontSize: 16,
        color: "black",

    },
    tileImgView: {
        padding: 20
    },
    tileImg: {
        width: 100,
        height: 100,
        display: "flex",
        borderRadius: 50,

    },
    openBtnContainer: {
        top: 12
    },
    closeBtnContainer: {
        top: 100

    }
})


