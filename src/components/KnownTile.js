import * as React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../firebase-config";
import {getFirestore} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL, listAll, list, deleteObject } from 'firebase/storage';
var name;
var img;

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);




const KnownTile = (props) => {

    const [url, setUrl] = useState(null)


name=props.name;
img=props.img;

    const func = async (foto) => {


        const reference = ref(storage, 'official/'+foto);

        await getDownloadURL(reference).then((x) => {
            setUrl(x);
        })


    }

    useEffect(() => {
       func(img);
    }, []);




    const [modalVisible, setModalVisible] = useState(false);


        const navigation = useNavigation();


        console.log("props", props.id)

        function navigateAndHide() {

            console.log("olah o props", props.id);
            navigation.navigate('Tile', props.id, props.coord);
            setModalVisible(false);
        }



    return (
        <SafeAreaView>
            <View style={styles.centeredView}>
                <Modal id={props.id}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.tileImgView}>
                                <Image style={styles.tileImg} source={{uri:url}} />
                            </View>
                            <Text style={styles.modalText}>{name}</Text>
                            <Text style={styles.modalText2}>Already visited</Text>
                            <View style={styles.openBtnContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonOpenDetail]}
                                    onPress={() =>  navigateAndHide()}
                                >
                                    <Text style={styles.btnTextStyle}>See details</Text>
                                </Pressable>

                            </View>

                            <View style={styles.closeBtnContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Ionicons name="close-outline" size={18} color="white" />
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </Modal>

            </View>
            <Marker
                coordinate={props.coords}

                image={require("../../assets/imgs/tileicon.png")}
                onPress={() => setModalVisible(true)}
            >

            </Marker>
        </SafeAreaView>
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
        borderRadius: 20,
        padding: 12,
        elevation: 2,
        top: 10,

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
});

const callouts = StyleSheet.create({
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: 'transparent',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
    },
    image: {
        width: "100%",
        height: 80,

    },
});

export default KnownTile;