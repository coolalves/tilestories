import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {Button} from "react-native";
import firebaseConfig from "../firebase-config";
import {doc, setDoc} from "firebase/firestore";

const app=initializeApp(firebaseConfig);
const db= getFirestore(app);

const Create = () => {
    function doIT(){
    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    const myDoc = doc(db, "MyCollection", "MyDocument")

    // Your Document Goes Here
    const docData = {
        "name": "teste2",
        "bio": "so a carregar"
    }

    setDoc(myDoc, docData)
        // Handling Promises
        .then(() => {
            // MARK: Success
            alert("Document Created!")
        })
        .catch((error) => {
            // MARK: Failure
            alert(error.message)
        })
    }

    return(
        <Button title='Create it!' onPress={doIT}></Button>
    )
}

export default Create;