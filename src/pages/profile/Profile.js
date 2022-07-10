import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../../firebase-config";
import {doc, getDoc, getFirestore} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();



export default function Profile() {

  const [userDoc, setUserDoc] = useState(null)
  //const [useruid, setUserUid] = useState(undefined)
  const [useremail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  const useruid="4to1jIMqQAYtyBZHZFYzlF9gvIP2";
  var nomi;
  var email;
  var register;




  const buscaruid =()=> {

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




  const doIT = async ()=>{

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
    ( () => {
      doIT()
    })();
  }, []);


  console.log("aqui",userDoc);

  if (userDoc==null){
    console.log("loadong")
  }else{
    nomi=userDoc.name;
    email=userDoc.email;
    register=userDoc.resgisterDate;
  }




  return (
    <View  >
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' }} />


      <View style={styles.body}>

        <View style={styles.textContainer} >
          <Text style={styles.name}>{nomi}</Text>
          <Text style={styles.info}>Level</Text>
          <Text style={styles.description}>Description</Text>
        </View>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#151F6D",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  textContainer: {
    alignContent: "center",
    top:40
     
  },

  body: {
    marginTop: 40,
    alignContent: "center",
  },

  name: {
    fontSize: 22,
    color: "#000",
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
