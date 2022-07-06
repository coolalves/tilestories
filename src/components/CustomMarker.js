import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Marker, Callout } from "react-native-maps";
import CameraButton from "./CameraButton";

//import { useState, useEffect } from "react";


const CustomMarker = (props) => {


    return (
        <Marker
            coordinate={props.coords}
            title="Central Channel Mural"
            description="test description"
            image={require("../../assets/imgs/newtileicon.png")}
        >
            <Callout   onPress={() =>
                props.tileDistance(props.coords)
            }>
                <Text >Unknown Tile</Text>
            </Callout>
        </Marker>)

}
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
export default CustomMarker