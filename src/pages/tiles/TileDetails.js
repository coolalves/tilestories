import React from "react";
import { Text, View, StyleSheet, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";


export default function TileDetails(tileName) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                    <Image style={styles.tileImg} source={require('../../../assets/imgs/places/station.jpg')} />
                    <Text style={styles.tileName}>Old train station</Text>
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
        width: 300,
        height: 200,
    },
    tileName: {
        fontSize: 28,
        color: "#696969",
        fontWeight: 'bold'
    }
});
