import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Pressable, Image } from "react-native";
import { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { mapStyle } from "./mapStyle.js";
import { MaterialIcons } from '@expo/vector-icons';
import { getDistance, getPreciseDistance } from 'geolib';

//import { CameraButton } from '../../components/CameraButton';

export default function Map({ navigation: { navigate } }) {

    const mapRef = React.createRef();
    const [location, setLocation] = useState({
        latitude: 40.64422,
        longitude: -8.64071,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [tileName, setTileName] = useState("");

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

    const CameraButton = () => {
        return (
            <Pressable
                onPress={() =>
                    passLocationToCamera()
                }
                style={buttonstyles.buttonContainer}
            >
                <MaterialIcons name="add-a-photo" size={28} color="grey" />
            </Pressable >
        );
    };

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

    const tileDetail = () => {
        setTileName("Old train station");
        navigate('Tile', { tileName });
    };

    //let userLatitude = userLocation.coords.latitude;
    //let userLongitude = userLocation.coords.longitude;
    //console.log(userLatitude + userLongitude + "deu")

    return (
        <View style={styles.container}>
            <CameraButton />
            <MapView
                ref={mapRef}
                style={styles.map}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: 40.64422,
                    longitude: -8.64071,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
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
                    title="Old Train Station Facade"
                    description="test description"
                    image={require("../../../assets/imgs/tileicon.png")}
                >
                    <Callout tooltip onPress={() =>
                        tileDetail()
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

                <Marker
                    coordinate={{
                        latitude: 40.64114,
                        longitude: -8.65403,
                    }}
                    title="Central Channel Mural"
                    description="test description"
                    image={require("../../../assets/imgs/newtileicon.png")}
                >
                    <Callout tooltip onPress={() =>
                        tileDetail()
                    }>
                        <View >
                            <View style={callouts.bubble}>
                                <Text style={callouts.title}>Central channel mural</Text>
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
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151F6D",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 100,
    },
});

const buttonstyles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        flex: 1,
        left: "2%",
        padding: 4,
        zIndex: 2,
        backgroundColor: "#fff",
        borderRadius: 6,
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