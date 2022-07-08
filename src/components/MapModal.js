import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const MapModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
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
                            <Image style={styles.tileImg} source={require('../../assets/imgs/places/station.jpg')} />
                        </View>
                        <Text style={styles.modalText}>Old train station</Text>
                        <Text style={styles.modalText2}>Already visited</Text>
                        <View style={styles.openBtnContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonOpenDetail]}

                            >
                                <Text style={styles.textStyle}>Open</Text>
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
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    modalView: {
        margin: 10,
        backgroundColor: "#5C75DD",
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
        borderRadius: 100
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#151F6D",
    },
    buttonOpenDetail:{
        backgroundColor: "#F5BB38"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        color:"white",
    },
    modalText2:{
        marginBottom: 10,
        textAlign: "center",
        fontWeight:"300",
        fontSize: 16,
        color:"white",
        
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
        top:12
    },
    closeBtnContainer: {
        top:100

    }
});

export default MapModal;