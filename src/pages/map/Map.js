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
import { doc, setDoc, getDoc, collection, getDocs, query } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Button } from "react-native-web";

import Loading from "../../components/Loading"

//import { CameraButton } from '../../components/CameraButton';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
var loca = [];
var idazul = [];




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
    const [azulcollection, setAzulcollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uid, setuid] = useState(null);

    const chamauid = async () => {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                setuid(user.uid);
                pullinfo2(user.uid);

            } else {
                // User is signed out
            }
        });

    }



    const pullinfo2 = async (uid) => {
        console.log("meu dasdadasd", uid);
        const myazulejo = query(collection(db, "users", "1zKntAPZNhS1pHGRbZyGRJ78AlM2", "azulejo"))

        //const workQ = query(collection(db, `users/${elem.id}/workInfo`))
        const azuliiii = await getDocs(myazulejo)
        const workInfo = azuliiii.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }))
        setAzulcollection(workInfo);


        console.log("estes são os meus azulejosssss", azulcollection[0]);
        const descobertos = azulcollection.length;
        if (descobertos > 0) {
            for (let i = 0; i < descobertos; i++) {
                idazul[i] = azulcollection[i].id;
            }
            console.log("id's dos azulejos", idazul);
            //geodescoberto(idazul);
        }



    }




    const pullinfo = async () => {

        await getDocs(collection(db, "azulejo"))
            .then((querySnapshot) => {


                const newUserDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                setUserDataArray(newUserDataArray);
            })
            .catch((err) => {

                // TODO: Handle errors
                console.error("Failed to retrieve data", err);
            });




    }




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
            chamauid();
            await pullinfo();
        })();
    }, []);




    const AddTile = () => {
        return (<Pressable
            onPress={() =>
                passLocationToUnknownCamera()
            }
            style={buttonstyles.buttonContainer}
        >
            <Image source={require('../../../assets/imgs/addtile.png')} style={{ width: 40, height: 40 }} />
            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 12, color: "#5C75DD", paddingTop: 5 }}>
                add tile
            </Text>
        </Pressable >)
    }

    const farFromTile = () => {
        Alert.alert("You're too far", "Get closer to the tile so you can take a picture of it!", [
            { text: "Got it!", /*onPress: () => console.log("got it!") */ }
        ])
    }

    const passLocationToUnknownCamera = async (manitos) => {
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
        navigate('Camera', { location, manitos });
    } //vai buscar a ultima localização conhecida do utilizador para passar via props para o componente da camara e posteriormente abre a camera

    const passLocationToCamera = async (manitos) => {
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
        navigate('KnownCamera', { location, manitos });
    } //vai buscar a ultima localização conhecida do utilizador para passar via props para o componente da camara e posteriormente abre a camera

    //console.log(location)

    const tileDistance = async (coordinates, manitos) => {
        console.log("cords la dentro", coordinates);
        let location = await Location.getLastKnownPositionAsync();
        console.log("localização", location);
        setLocation(location);
        console.log("localizaçãomaxima", location.coords.latitude);

        let distance = getPreciseDistance(
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: coordinates.latitude, longitude: coordinates.longitude }
        );


        console.log("mono", distance);
        setDistanceToTile(distance)
        if (distance < 50) {
            passLocationToCamera(manitos)
        } else {
            farFromTile()
        }

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

    let markerTitle = "Old train station";





    if (userDataArray.length == 0) {
        console.log("loading...");
    } else {

        let newarray = [];
        idazul.map(elem => newarray.push(parseInt(elem)))
        for (let i = 0; i < userDataArray.length; i++) {

            if (newarray.includes(i)) {
                console.log("estou aqusi", userDataArray[i].geo.latitude)
                loca[i] = <KnownTile key={i} id={userDataArray[i].id} coords={{ latitude: userDataArray[i].geo.latitude, longitude: userDataArray[i].geo.longitude }}></KnownTile>
            } else {
                loca[i] = <UnknownTile key={i} id={userDataArray[i].id} tileDistance={tileDistance} coords={{ latitude: userDataArray[i].geo.latitude, longitude: userDataArray[i].geo.longitude }} />
            }
        }
    }

    setTimeout(() => {
        setLoading(false) //this.props.navigation.navigate('Login')
    }, 5500);

    if (loading != false) {
        return (
            <Loading />
        )
    } else {
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

                    {/*<KnownTile />*/}
                    {/*<CustomMarker tileDistance={tileDistance} coords={{ latitude: 40.64114, longitude: -8.65403 }} />*/}
                    {/*<CustomMarker tileDistance={tileDistance} coords={{ latitude: 40.63843, longitude: -8.65129 }} />*/}
                    {/*<CustomMarker tileDistance={tileDistance} coords={{ geoo }} />*/}
                    {/*markerjsx*/}

                    {loca}


                </MapView>


            </View>
        );

    }


}
/* <CustomMarker tileDistance={tileDistance} coords={{ latitude: 40.64082, longitude: -8.65375 }} */ //este ta fora por ser demasiado proximo de um deles (faz confusão), mas eventualmente será reposto
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151F6D",
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height

    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
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

