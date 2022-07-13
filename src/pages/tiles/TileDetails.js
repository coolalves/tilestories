import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebase-config";

import { initializeFirestore } from 'firebase/firestore';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export default function TileDetails(props) {
    console.log("helo", props.route.params)

    const [userDoc, setUserDoc] = useState(null)


    useEffect(() => {
        function doIT() {

            // You can read what ever document by changing the collection and document path here
            const myDoc = doc(db, "azulejo", props.route.params)

            getDoc(myDoc)
                // Handling Promises
                .then((snapshot) => {
                    // MARK: Success
                    if (snapshot.exists) {
                        setUserDoc(snapshot.data())
                    }
                    else {
                        alert("No Doc Found")
                    }
                })
                .catch((error) => {
                    // MARK: Failure
                    alert(error.message)
                })
            console.log("tem aqui a informação toda", userDoc);

        }

    });



    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                    <View style={styles.header} />
                    <Image style={styles.tileImg} source={require('../../../assets/imgs/places/station.jpg')} />






                    <View style={styles.aboutUser}>
                        <Text style={styles.tileName}>{props.route.params.title}Titulo</Text>
                        <Text style={styles.tileStatsTitle}>Difficulty</Text>
                        <Text style={styles.tileStats}>Easy</Text>
                        <Text style={styles.tileStatsTitle}>Points</Text>
                        <Text style={styles.tileStats}>10</Text>
                        <Text style={styles.tileStatsTitle}>Visits</Text>
                        <Text style={styles.tileStats}>50</Text>

                    </View>

                    <View style={{ width: Dimensions.get("window").width - 30, textAlign: "left" }}>
                        <Text style={styles.tileCaption}>Subtitulo</Text>
                    </View>

                    <View style={{ width: Dimensions.get("window").width - 30, textAlign: "left", paddingTop: 3 }}>
                        <Text style={styles.tileDescription}>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Text>
                    </View>

                    <View style={{ width: Dimensions.get("window").width - 30, textAlign: "left", paddingTop: 10, }}>
                        <Text style={styles.tileCaption}>Mais Info</Text>
                    </View>

                    <View style={{ width: Dimensions.get("window").width - 30, textAlign: "left", paddingTop: 3, height: 300 }}>
                        <Text style={styles.tileDescription}>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Text>
                    </View>


                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    tileImg: {
        width: Dimensions.get("window").width - 30,
        height: 200,
        borderRadius: 8,
        top: 20

    },
    aboutUser: {

        width: Dimensions.get("window").width - 120,
        height: 235,
        backgroundColor: '#BECDF1',
        borderRadius: 20,
        overflow: "hidden",
        alignContent: "center",
        textAlign: "center",
        top: -10

    },
    tileName: {
        fontSize: 26,
        color: "#111111",
        fontWeight: 'bold',
        padding: 10,
        paddingBottom: 10,
        textAlign: "center"
    },
    tileStatsTitle: {
        color: "#111111",
        fontWeight: 'bold',
        textAlign: "center",
        padding: 0
    },
    tileStats: {
        color: "#111111",
        fontWeight: '400',
        textAlign: "center",
        padding: 5,
    },
    tileCaption: {
        marginTop: 10,
        fontSize: 18,
        color: "#696969",
        fontWeight: 'bold'
        , top: 20,

    },
    tileDescription: {

        marginTop: 10,
        color: "#696969",
        top: 20
    },
    separator: {
        height: 2,
        backgroundColor: "#eeeeee",
        marginTop: 20,
        marginHorizontal: 30
    },
    buttonContainer: {
        marginHorizontal: 30
    },
    button: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#151F6D",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 12,
    }
});
