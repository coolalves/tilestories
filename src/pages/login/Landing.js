import React from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebase-config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { AuthContext } from '../../context';

const Landing = ({ navigation: { navigate } }) => {





    return (
        <KeyboardAvoidingView
            style={styles.container}
        >

            <View>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.fotinha}

                ></Image>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigate('Login')}
                    style={[styles.buttonText, styles.buttonOutlinelog]}
                >
                    <Text style={styles.textbranco}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigate('Signup')}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>




        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,

    },

    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },

    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#5C75DD',
        borderWidth: 2,
    },

    buttonOutlinelog: {
        backgroundColor: '#5C75DD',
        marginTop: 5,
        marginBottom: 8,
        borderColor: '#5C75DD',
        borderWidth: 2,

    },
    buttonText: {
        backgroundColor: '#5C75DD',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    fotinha: {
        marginBottom: 80,
    },
    textbranco: {
        color: 'white',
        fontWeight: '500'
    },


});

export default Landing;