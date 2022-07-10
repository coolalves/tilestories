import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Pressable, Image, Alert } from "react-native";
import { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { mapStyle } from "./mapStyle.js";
import { MaterialIcons } from '@expo/vector-icons';
import { getDistance, getPreciseDistance } from 'geolib';
import CustomMarker from "../../components/CustomMarker.js";
//import MapModal from "../../components/MapModal.js";
import KnownTile from "../../components/KnownTile.js";
import UnknownTile from "../../components/UnknownTile.js";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "../../../firebase-config";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Button } from "react-native-web";

//import { CameraButton } from '../../components/CameraButton';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
var loca = [];

export default function Map({ navigation: { navigate } }) {

    const mapRef = React.createRef();
    const [location, setLocation] = useState({
        latitude: 40.64422,
        longitude: -8.64071,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [tileName, setTileName] = useState(null);
    const [tileLocation, setTileLocation] = useState({
        latitude: 40.64114,
        longitude: -8.65403,
    });
    const [distanceToTile, setDistanceToTile] = useState(null);
    const [tileDoc, setTileDoc] = useState({});
    const [geoo, setGeoo] = useState(undefined);
    const [userDataArray, setUserDataArray] = useState([]);


    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;

            console.log("user uid:", uid);
            // ...
        } else {
            // User is signed out
            // ...
        }
    });


    const myDoc = collection(db, "azulejo")

    function pullinfo() {
        getDocs(collection(db, "azulejo"))
            .then((querySnapshot) => {


                const newUserDataArray = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));

                setUserDataArray(newUserDataArray);
            })
            .catch((err) => {

                // TODO: Handle errors
                console.error("Failed to retrieve data", err);
            });




    }




    //console.log(tileDoc.geo);

    /* const getUserLocation = async () =>{
         let { status } = await Location.requestForegroundPermissionsAsync();
             if (status !== 'granted') {
                 setErrorMsg('Permission to access location was denied');
                 return;
             }
             let location = await Location.getCurrentPositionAsync({
                 accuracy: Location.Accuracy.Balanced,
                 enableHighAccuracy: true,
                 timeInterval: 5
             });
     } */

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                enableHighAccuracy: true,
                timeInterval: 5
            });

            setLocation(location);



        })();
    }, []);

    useEffect(() => {
        (async () => {
            await pullinfo();
        })();
    }, []);




    /*  const CameraButton = () => {
         if (distanceToTile > 50 || distanceToTile == null) {
             return (<Pressable
                 onPress={() =>
                     farFromTile() //o utilizador está a mais de 50m do azulejo por isso não pode tentar fotografar
                 }
                 style={buttonstyles.buttonContainer}
             >
                 <MaterialIcons name="add-a-photo" size={28} color="#d1d1d1" />
             </Pressable >
             )
         } else return (<Pressable
             onPress={() =>
                 passLocationToCamera()
             }
             style={buttonstyles.buttonContainer}
         >
             <MaterialIcons name="add-a-photo" size={28} color="grey" />
         </Pressable >)

     };*/

    const AddTile = () => {
        return (<Pressable
            onPress={() =>
                passLocationToCamera()
            }
            style={buttonstyles.buttonContainer}
        >
            <Image source={require('../../../assets/imgs/addtile.png')} style={{ width: 40, height: 40 }} />
            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 12, color: "white", paddingTop: 5 }}>
                add tile
            </Text>
        </Pressable >)
    }

    const farFromTile = () => {
        Alert.alert("You're too far", "Get closer to the tile so you can take a picture of it!", [
            { text: "Got it!", /*onPress: () => console.log("got it!") */ }
        ])
    }

    const passLocationToCamera = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        try {
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            } else {
                let location = await Location.getLastKnownPositionAsync();
                setLocation(location);
            }
        } catch (error) {
            console.log(error);
        }
        //console.log(location);
        navigate('Camera', { location });
    } //vai buscar a ultima localização conhecida do utilizador para passar via props para o componente da camara e posteriormente abre a camera

    //console.log(location)

    const tileDistance = async (coordinates) => {
        let location = await Location.getLastKnownPositionAsync();
        setLocation(location);
        let distance = getPreciseDistance(
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: coordinates.latitude, longitude: coordinates.longitude }
        );

        // let distanceInKM = (distance / 1000 + "km")
        console.log(distance)
        setDistanceToTile(distance)

    }

    const userLocationParam = {
        latitude: 40.64422,
        longitude: -8.64071,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    }

    const goToCurrentPosition = () => {
        mapRef.current.animateToRegion(userLocationParam, 2000);
        //<Button onPress={goToCurrentPosition} title="current position" /> botao de ir para localizaçao
    };

    const tileDetail = (title) => {
        setTileName("Old train station");
        navigate('Tile', { title });
    };

    //let userLatitude = userLocation.coords.latitude;
    //let userLongitude = userLocation.coords.longitude;
    //console.log(userLatitude + userLongitude + "deu")
    let markerTitle = "Old train station";


    /* let markerjsx
     if (geoo === undefined){
         console.log("loading out....")
     }else{
         console.log("geos",geoo.latitude)
         console.log("geo2",geoo.longitude)
         markerjsx=<CustomMarker tileDistance={tileDistance} coords={{ latitude: geoo.latitude, longitude: geoo.longitude }} />
     }*/

    /* if (geoo===undefined){
         console.log("its loading");
     }else{
         for (let i=1; i<=numeroazul; i++){

             var sti=toString(i);

             locaa[i]=geoo.sti.geo.latitude
             locao[i]=geoo.sti.geo.longitude
         }
         console.log("esta é a loca", locaa);
     }*/

    if (userDataArray.length == 0) {
        console.log("loading...");
    } else {
        for (let i = 0; i < userDataArray.length; i++) {
            console.log("A ver vamos ", i);
            loca[i] = <UnknownTile key={i} tileDistance={tileDistance} coords={{ latitude: userDataArray[i].geo.latitude, longitude: userDataArray[i].geo.longitude }} />
        }


    }
    return (
        <View style={styles.container}>
            <AddTile />
            <MapView
                ref={mapRef}
                style={styles.map}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: 40.64422,
                    longitude: -8.64071,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={true}
                showsBuildings={true}
                showsIndoorLevelPicker={true}
            >
                <Marker
                    coordinate={{
                        latitude: 40.64422,
                        longitude: -8.64071,
                    }}
                    title={markerTitle}
                    description="test description"
                    image={require("../../../assets/imgs/tileicon.png")}
                >
                    <Callout tooltip onPress={(e) =>
                        tileDetail(markerTitle)

                    }>
                        <View >
                            <View style={callouts.bubble}>
                                <Text style={callouts.title}>Old train station</Text>
                                {/* <Text>A short description</Text> */}
                                <Image
                                    style={callouts.image}
                                    source={require('../../../assets/imgs/places/station.jpg')}
                                />
                            </View>
                            <View style={callouts.arrowBorder} />
                            <View style={callouts.arrow} />
                        </View>
                    </Callout>
                </Marker>
                <KnownTile />

                {/*<CustomMarker tileDistance={tileDistance} coords={{ latitude: 40.64114, longitude: -8.65403 }} />*/}
                {/*<CustomMarker tileDistance={tileDistance} coords={{ latitude: 40.63843, longitude: -8.65129 }} />*/}
                {/*<CustomMarker tileDistance={tileDistance} coords={{ geoo }} />*/}
                {/*markerjsx*/}
                <KnownTile />
                {loca}


            </MapView>


        </View>
    );
}
/* <CustomMarker tileDistance={tileDistance} coords={{ latitude: 40.64082, longitude: -8.65375 }} */ //este ta fora por ser demasiado proximo de um deles (faz confusão), mas eventualmente será reposto
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151F6D",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 50,
        top: 20
    },
});

const buttonstyles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        flex: 1,
        left: "2%",
        padding: 4,
        zIndex: 2,
        backgroundColor: "transparent",
        borderRadius: 60,
    }
});

const callouts = StyleSheet.create({
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: 'transparent',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
    },
    image: {
        width: "100%",
        height: 80,

    },
});