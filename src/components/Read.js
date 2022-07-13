import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../firebase-config";
import {doc, setDoc, getDoc} from "firebase/firestore";
import { Button, Text, View } from 'react-native';
import { useState } from 'react';
import {initializeFirestore} from 'firebase/firestore';


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


    function func2(imag) {


        const reference = ref(storage, 'toApprove/'+imag);
        console.log("apanha aqui2", imag);

        getDownloadURL(reference).then((x) => {
            setUrll(x);
        })

    }

    return(
        <View>
            <Button title='Read Doc' onPress={doIT}></Button>
            {
                userDoc != null &&
                <Text>Descrição: {userDoc.description}


                </Text>



            }

        </View>
    )
}

export default Read;