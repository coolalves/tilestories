import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../firebase-config";
import {doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { Button, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { AsyncStorage } from 'react-native';

const app=initializeApp(firebaseConfig);
const db= getFirestore(app);


const Update = (value, merge) => {
    const [text, setText] = useState("")
    
    const doIT = async ()=>{

        const myDoc = doc(db, "MyCollection", "MyDocument")
        const newFields = { "bio": text };


           await updateDoc(myDoc,newFields)
            .then(() => {

                alert("Updated Successfully!")
                console.log(text);
                console.log(value);
                console.log(merge);

                setText("")

            })
            .catch((error) => {
                // MARK: Failure
                alert(error.message)
            })
    }

    return(
        <View>
            <TextInput style={{
                width: '95%',
                fontSize: 18,
                padding: 12,
                borderColor: 'gray',
                borderWidth: 0.2,
                borderRadius: 10,
                marginVertical: 20
            }} placeholder='Type Here' onChangeText={(text) => { setText(text) }} value={text}></TextInput>

            <Button title='Update Doc' onPress={doIT}></Button>

        </View>
    )
}

export default Update;