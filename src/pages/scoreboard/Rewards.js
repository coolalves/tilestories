import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebase-config";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();



export default function Rewards() {
    const navigation = useNavigation();
    const [userDoc, setUserDoc] = useState(null)
    //const [useruid, setUserUid] = useState(undefined)
    const [useremail, setUserEmail] = useState(null)
    const [userName, setUserName] = useState(null)
    const useruid = "4to1jIMqQAYtyBZHZFYzlF9gvIP2";
    var nomi;
    var email;
    var register;




    const buscaruid = () => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserUid(user.uid);
                console.log("useruid", useruid);

            } else {
                // User is signed out
            }
        });
    }

    //buscaruid();




    const doIT = async () => {

        // You can read what ever document by changing the collection and document path here
        const myDoc = doc(db, "users", useruid)

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

    }

    useEffect(() => {
        (() => {
            doIT()
        })();
    }, []);


    console.log("aqui", userDoc);

    if (userDoc == null) {
        console.log("loadong")
    } else {
        nomi = userDoc.name;
        email = userDoc.email;
        register = userDoc.resgisterDate;
    }




    return (
        <View style={{ backgroundColor: "#F2F2F2", height: "100%", top: -20 }} >
            <View style={styles.header}></View>

            <View>

                <Text style={styles.title}>
                    Rewards
                </Text>

                <View style={{ width: Dimensions.get("window").width - 100, height: 300, top: 100, position: "relative", alignContent: "center", left: 20 }}>
                    <Image style={{ width: 352, height: 160 }} source={require('../../../assets/imgs/prize/rewards.png')} />
                </View>

            </View>

            <View style={{ top: -40, alignContent: "center" }}>

                <Text style={styles.mytitle}>
                    Prizes
                </Text>

                <View style={{ width: Dimensions.get("window").width - 100, height: 350, top: 60, position: "relative", alignContent: "center", left: 20 }}>
                    <Image style={{ width: 350, height: 215 }} source={require('../../../assets/imgs/prize/rewards2.png')} />
                </View>

                <View style={styles.rewardsContainer}>
                    <Pressable style={styles.rewards} onPress={() => navigation.navigate('Scoreboard')}>
                        <Text style={{ textAlign: "center", fontSize: 16, color: "white", fontWeight: "bold" }} >
                            return
                        </Text>
                    </Pressable>
                </View>
            </View>



        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#5C75DD",
        height: Dimensions.get("window").height / 3 + 100,
        width: Dimensions.get("window").width,
        position: "absolute"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        top: 70,
        textAlign: "center",
        color: "white"
    },
    mytitle: {
        fontSize: 20,
        fontWeight: "bold",
        top: 70,
        padding: 40,
        textAlign: "center",
        color: "#111111"
    },
    userContainer: {
        backgroundColor: "transparent",
        width: Dimensions.get("window").width / 3,
        height: 200,
        borderRadius: 10
    },
    userContainerFirst: {
        backgroundColor: "transparent",
        width: Dimensions.get("window").width / 3,
        height: 200,
        borderRadius: 10,
        top: 23
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        marginBottom: 0,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 0
    },

    username: {

        marginBottom: 0,
        alignSelf: 'center',
        position: 'absolute',
        textAlign: "center",
        top: 70,
        fontSize: 20,
        fontWeight: "bold",
        color: "white"

    },

    points: {
        alignSelf: 'center',
        position: 'absolute',
        textAlign: "center",
        top: 100,
        fontSize: 14,
        fontWeight: "400",
        color: "white"
    },

    myusername: {

        marginBottom: 0,
        alignSelf: 'center',
        position: 'absolute',
        textAlign: "center",
        top: 70,
        fontSize: 20,
        fontWeight: "bold",
        color: "#111111"

    },

    mypoints: {
        alignSelf: 'center',
        position: 'absolute',
        textAlign: "center",
        top: 100,
        fontSize: 14,
        fontWeight: "400",
        color: "#111111"
    },

    rankingContainer: {
        alignSelf: 'center',
        position: 'absolute',
        textAlign: "center",
        top: 140,
        fontSize: 14,
        fontWeight: "400",

    },

    rewardsContainer: {
        alignSelf: 'center',
        position: 'absolute',
        textAlign: "center",
        top: 400,
        fontSize: 13,
        padding: 10,
        elevation: 2,
        borderRadius: 100,
        backgroundColor: "#151F6D"
    },


    ranking: {
        alignContent: "center",
        backgroundColor: '#F5BB38',
        width: 20,
        height: 20,
        borderRadius: 100,

    },
    rewards: {
        alignContent: "center",

        width: 75,
        height: 25,


    },


    textContainer: {
        alignContent: "center",
        textAlign: "center",
        top: 40

    },

    body: {
        marginTop: 40,
        alignContent: "center",
    },

    name: {
        fontSize: 22,
        color: "#111111",
        fontWeight: "600",
        textAlign: 'center'
    },
    info: {
        fontSize: 13,
        color: "#696969",
        marginTop: 5,
        textAlign: 'center'
    },
    description: {
        fontSize: 13,
        color: "#696969",
        marginTop: 0,
        textAlign: 'center'
    },

});
