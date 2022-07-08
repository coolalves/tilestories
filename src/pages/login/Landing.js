import React from 'react';
import { View, Text, Image, Touchable, StyleSheet } from 'react-native';

const Landing = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },logoContainer:{
        height:50,
        width:50,
       
    },

})