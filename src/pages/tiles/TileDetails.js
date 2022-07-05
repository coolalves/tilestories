import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";


export default function TileDetails(tileName) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                    <Image style={styles.tileImg} source={require('../../../assets/imgs/places/station.jpg')} />
                    <Text style={styles.tileName}>Old train station</Text>
                    <Text style={styles.tileCaption}>Lorem Ipsum</Text>
                    <Text style={styles.tileDescription}>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Text>
                    <View style={styles.separator}></View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}> Lorem Ipsum</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    tileImg: {
        width: "100%",
        height: 180,
    },
    tileName: {
        fontSize: 28,
        color: "#010101",
        fontWeight: 'bold'
    },
    tileCaption: {
        marginTop: 10,
        fontSize: 18,
        color: "#696969",
        fontWeight: 'bold'
    },
    tileDescription: {
        textAlign: 'center',
        marginTop: 10,
        color: "#696969",
    },
    separator: {
        height: 2,
        backgroundColor: "#eeeeee",
        marginTop: 20,
        marginHorizontal: 30
    },
    buttonContainer: {
        marginHorizontal: 30
    },
    button: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#151F6D",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 12,
    }
});
