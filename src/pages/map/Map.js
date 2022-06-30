import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { mapStyle } from "./mapStyle.js";
import { CameraButton } from '../../components/CameraButton';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

    const mapRef = React.createRef();
    const [location, setLocation] = useState({
        latitude: 40.64422,
        longitude: -8.64071,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });
    const [errorMsg, setErrorMsg] = useState(null);

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
                    title="Azulejos da Antiga Estação"
                    description="test description"
                    image={require("../../../assets/imgs/tileicon.png")}
                >
                    <Callout>
                        <Text>I'm Here! </Text>
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
