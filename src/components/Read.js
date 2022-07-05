import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../firebase-config";
import {doc, setDoc, getDoc} from "firebase/firestore";
import { Button, Text, View } from 'react-native';
import { useState } from 'react';

const app=initializeApp(firebaseConfig);
const db= getFirestore(app);


const Read = () => {
    const [userDoc, setUserDoc] = useState(null)

    function doIT(){

        // You can read what ever document by changing the collection and document path here
        const myDoc = doc(db, "azulejo", "uid")

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

    return(
        <View>
            <Button title='Read Doc' onPress={doIT}></Button>
            {
                userDoc != null &&
                <Text>Descrição: {userDoc.description} <br></br>
                    Dificultdade: {userDoc.difficulty}

                </Text>



            }

        </View>
    )
}

export default Read;