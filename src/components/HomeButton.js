import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeButton({ size, color }) {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} size={size} color={color} style={{width:60, height:60}} />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        borderRadius: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        top:-5
    }
})