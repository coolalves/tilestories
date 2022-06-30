import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeButton({ size, color }) {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/imgs/tilebutton.png')} size={size} color={color} />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32
    }
})