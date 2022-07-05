import React from 'react';
import {View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {initializeApp} from "firebase/app";
import firebaseConfig from "../firebase-config";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";


const Login =()=>{

    const [email, setEmail]= React.useState('');
    const [password, setPassword]= React.useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                console.log('Account Createdddd!!');
                const user = userCredential.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                console.log('dSigned In!');
                const user = userCredential.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
    }




    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <TextInput
                    placeholder="Email"
                    autoCorrect={false}
                    onChangeText={(text)=>setEmail(text)}
                />
                <TextInput
                    placeholder="Password"
                    autoCorrect={false}
                    onChangeText={(text)=>setPassword(text)}
                />

                <TouchableOpacity onPress={handleSignIn}>
                    <Text>LogIn we good?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCreateAccount}>
                    <Text>Create Account</Text>
                </TouchableOpacity>




            </View>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login;