import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, Pressable, Dimensions
} from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebase-config";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import { SimpleLineIcons } from '@expo/vector-icons';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

var nomi;
var email;
var register;
var points;
var descobertos;

export default function Profile({ navigation: { navigate } }) {

  const [userDoc, setUserDoc] = useState(null)
  //const [useruid, setUserUid] = useState(undefined)
  const [useremail, setUserEmail] = useState(null)
  const [userazul, setUserAzul] = useState(null)

  const [useruid, setuid] = useState(null);

  const chamauid = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        setuid(user.uid);


      } else {
        // User is signed out
      }
    });
    await doIt();
    await doIT2();

  }

  console.log("uid", useruid);


  useEffect(() => {
    (async () => {
      await chamauid();
    })();
  }, []);

  const doIT2 = async ()=>{

    getDocs(collection(db, "users",useruid,"azulejo"))
        .then((querySnapshot) => {


          const newUserDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

          setUserAzul(newUserDataArray);
        })
        .catch((err) => {

          // TODO: Handle errors
          console.error("Failed to retrieve data", err);
        });

  }


const doIt = async ()=>{

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

console.log("userdoc", userDoc);




  if (userDoc == null || userazul==undefined) {
    console.log("loading")
    chamauid();
    doIT2();

  } else {
    nomi = userDoc.name;
    email = userDoc.email;
    register = userDoc.resgisterDate;
    points= userDoc.points;
    descobertos= userazul.length -1;

  }

  return (

    <View  >

      <View style={styles.header}>
        <View style={{ position: 'absolute', top:60, left:23, flexDirection: "row"}}>
          <SimpleLineIcons name="logout" size={20} color="white" />
          <Text style={{color:'white', left:12}}>
            Logout
          </Text>
        </View>
      </View>
      <View style={{ padding: 40, alignContent: "center" }}>
        <View style={{ backgroundColor: "transparent", top: 100, alignContent: "center" }}>
          <View >
            <Image style={styles.avatar} source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' }} />
            <View style={styles.textContainer}>
              <Text style={styles.myusername}>
                {nomi}
              </Text>

              <Text style={styles.since} >
                {register}
              </Text>

              <View style={{ alignContent: "center", top: 470 }}>
                <Pressable style={{ height: 40, backgroundColor: "#5C75DD", borderRadius: 20, width: 350, left: -18 }} onPress={() => navigate('Gallery')}>
                  <Text style={{ textAlign: "center", fontSize: 16, color: "white", fontWeight: "bold", top: 7 }} >
                    Discovered Tiles
                  </Text>
                </Pressable>
              </View>
              <View style={styles.aboutUser}>
                <Text style={styles.title2}>
                  Progress
                </Text>
                <Text style={styles.title3}>
                  {points} points
                </Text>
                <Text style={styles.title3}>
                  {descobertos} tiles discovered
                </Text>
                <Text style={styles.title3}>
                  2 new tiles added
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>




    </View>

  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5C75DD",
    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width,
    position: "absolute"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    top: 70,
    textAlign: "center",
    color: "white"
  },
  title2: {
    fontSize: 17,
    fontWeight: "bold",
    top: -70,
    textAlign: "center",
    color: "#111111"
  },
  title3: {
    fontSize: 15,
    fontWeight: "400",
    top: -60,
    textAlign: "center",
    color: "#111111",
    marginTop: 20
  },
  mytitle: {
    fontSize: 20,
    fontWeight: "bold",
    top: 70,
    textAlign: "center",
    color: "#111111"
  },
  userContainer: {
    backgroundColor: "transparent",
    width: Dimensions.get("window").width / 3,
    height: 200,
    borderRadius: 10
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
  since: {
    alignSelf: 'center',
    position: 'absolute',
    textAlign: "center",
    top: 130,
    fontSize: 14,
    fontWeight: "400",
    color: "#111111"
  },

  rankingContainer: {
    alignSelf: 'center',
    position: 'absolute',
    textAlign: "center",
    top: 130,
    fontSize: 14,
    fontWeight: "400",

  },

  rewardsContainer: {
    alignSelf: 'center',
    position: 'absolute',
    textAlign: "center",
    top: 400,
    fontSize: 14,
    padding: 20



  },


  ranking: {
    alignContent: "center",
    backgroundColor: '#F5BB38',
    width: 25,
    height: 25,
    borderRadius: 100,

  },
  rewards: {
    alignContent: "center",
    backgroundColor: '#F5BB38',
    width: 75,
    height: 25,
    borderRadius: 100,
    textAlign: "center", fontSize: 16, color: "white"

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
  aboutUser: {
    width: 350,
    height: 240,
    padding: 100,
    backgroundColor: '#BECDF1',
    borderRadius: 20,
    top: 150,
    left: -18
  }

});
