import React from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebase-config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";





const Login = ({ navigation: { navigate } }) => {

    const [username, setUsername] = React.useState('');
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
                    "name": username,
                    "uid": user.uid,
                    "resgisterDate": user.metadata.creationTime,
                    "points":"0"
                }

                setDoc(myDoc, docData)
                    // Handling Promises
                    .then(() => {
                        // MARK: Success
                        console.log('vai para o firebase!!');
                        navigate('TutorialOne');
                    })
                    .catch((error) => {
                        // MARK: Failure
                        alert(error.message)

                    })


            })
            .catch(error => {
                console.log(error);
                Alert.alert(("Your password must be 6 characters long!"))
            })

        //passar para a base de dados



        // MARK: Creating New Doc in Firebase
        // Before that enable Firebase in Firebase Console




    }

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

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="username"
                    autoCorrect={false}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.input}
                />
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
                    onPress={handleCreateAccount}
                    style={[styles.buttonText, styles.buttonOutlinelog]}
                >
                    <Text style={styles.textbranco}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('Login')}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text>Login</Text>
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