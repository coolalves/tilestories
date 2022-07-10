import React, { useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebase-config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { AuthContext } from '../../context';
import { auth } from "firebase/compat";



const Login = ({ navigation: { navigate } }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    var user;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Account Createddd!!');
                user = userCredential.user;

                const myDoc = doc(db, "users", user.uid)

                // Your Document Goes Here
                const docData = {
                    "email": user.email,
                    "name": "nomealia",
                    "uid": user.uid,
                    "resgisterDate": user.metadata.creationTime
                }

                setDoc(myDoc, docData)
                    // Handling Promises
                    .then(() => {
                        // MARK: Success
                        console.log('vai para o firebase!!');
                    })
                    .catch((error) => {
                        // MARK: Failure
                        alert(error.message)
                    })

                useEffect(() => {
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            console.log('User email: ', user.email);
                        }
                    });
                })


            })
            .catch(error => {
                console.log(error);
            })

        //passar para a base de dados



        // MARK: Creating New Doc in Firebase
        // Before that enable Firebase in Firebase Console




    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Signed In!');
                const user = userCredential.user;
                console.log(user);
                navigate('TabRoutes')

            })
            .catch(error => {
                console.log(error);
            })
    }




    return (
        <KeyboardAvoidingView
            style={styles.container}
        >


            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    autoCorrect={false}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    autoCorrect={false}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignIn}
                    style={[styles.buttonText, styles.buttonOutlinelog]}
                >
                    <Text style={styles.textbranco}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleCreateAccount}
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
        borderRadius: 20,
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



    },
    buttonText: {
        backgroundColor: '#5C75DD',
        width: '100%',
        padding: 15,
        borderRadius: 20,
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

export default Login;