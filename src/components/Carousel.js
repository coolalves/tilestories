import * as React from "react";
import { View, Pressable, StyleSheet, Text, Image, Dimensions, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ImageGallery } from '@georstat/react-native-image-gallery';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase-config";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
var imags=[];

const slideList = Array.from({ length: 3 }).map((_, i) => {
    console.log("dddsdsdsdwwwwww",imags[i]);
    return {
        id: i,
        image: imags[i],
        title: `Tile Name ${i + 1}`,
        subtitle: `Discovered/added: Jul 2022 ${i + 1}!`,
    };
});



function Slide({ data }) {
    return (
        <View
            style={{
                height: windowHeight,
                width: windowWidth,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image
                source={{ uri: data.image }}
                style={{ width: windowWidth * 0.9, height: windowHeight * 0.9 - 100, borderRadius: 10 }}
            ></Image>
            <Text style={{ fontSize: 20, color: '#FFFBFA', fontWeight: "bold", padding: 12 }}>{data.title}</Text>
            <Text style={{ fontSize: 15, color: '#FFFBFA' }}>{data.subtitle}</Text>

        </View>
    );
}

function Carousel() {
    const [useruid, setuid] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [userazul, setUserAzul] = useState(null);

    const chamauid = async () => {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                setuid(user.uid);


            } else {
                // User is signed out
            }
        });
        await doIt();

    }

    useEffect(() => {
        (async () => {
            await chamauid();
        })();
    }, []);


    if (useruid == null) {
        console.log("loading")
        chamauid();

    }

    const doIt= async ()=>{

        await getDocs(collection(db, "users",useruid,"azulejo"))
            .then((querySnapshot) => {


                const newUserDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                setUserAzul(newUserDataArray);
            })
            .catch((err) => {

                // TODO: Handle errors
                console.error("Failed to retrieve data", err);
            });



    }



    function func2() {


        for (let i=0; i<userazul.length; i++){
            const reference = ref(storage, 'users/'+useruid+"/"+userazul[i].photo);


            getDownloadURL(reference).then((x) => {

                imags[i]={
                    id: i,
                    image: x,
                    title: `Tile Name ${i + 1}`,
                    subtitle: `Discovered/added: Jul 2022 ${i + 1}!`,
                };
                console.log("dadada",imags[i]);
            })
        }

    }

    if(userazul==null){
        doIt()
    }else{
        func2();
    }

    console.log(useruid);

    useEffect(() => {
        (async () => {
            await func2();
        })();
    }, []);




    console.log("estou aqui")
    {console.log("estou no flatlis",imags)}
    return (
        <>

            <FlatList

                data={imags}
                style={{ flex: 1, backgroundColor: "#5C75DD" }}
                renderItem={({ item }) => {
                    return <Slide data={item} />;
                }}
            >

            </FlatList>



        </>
    );
};

export default Carousel

