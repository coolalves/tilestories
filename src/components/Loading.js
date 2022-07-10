import { React, useState } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, Image, Dimensions } from 'react-native';


const Loading = () => {

    /* setTimeout(() => {
         navigate('TabRoutes'); //this.props.navigation.navigate('Login')
     }, 5000); */
    return (
        <KeyboardAvoidingView
            style={styles.loadingContainer}
        >
            <View>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.loadingFotinha}

                ></Image>
            </View>

            <Text style={styles.loadingTextBranco}>
                Getting tiles ready!
            </Text>
            <Text style={styles.loadingTextBranco2}>
                Please wait...
            </Text>

        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3,
        backgroundColor: "#5C75DD",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    loadingFotinha: {
        marginBottom: 80,
        width: 150,
        height: 150
    },
    loadingTextBranco: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20
    },
    loadingTextBranco2: {
        color: 'white',
        fontWeight: '300',
        fontSize: 14,
        top: 5
    },


});

export default Loading;