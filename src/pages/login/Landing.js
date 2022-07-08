import React from 'react';
import { View, Text, Image, Touchable, StyleSheet, Dimensions } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Landing = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../../assets/fullLogoLight.png")}
                    style={styles.logoStyle}
                />
            </View>
            <View style={styles.optionsContainer}>

                <Pressable style={styles.signupPressable}>
                    <Text style={styles.pressableText}>
                        New user
                    </Text>
                </Pressable>

                <Pressable style={styles.loginPressable}>
                    <Text style={styles.pressableText}>
                        Returning user
                    </Text>
                </Pressable>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFBFA',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height + 100,

    },

    logoContainer: {
        width: 200,
        height: 200,
        display: "flex",
         
    },
    logoStyle:{
        width: "100%",
        height:"100%"
    },

    optionsContainer: {

    },

    loginPressable: {
        backgroundColor: "red"
    },

    signupPressable: {

    },

    pressableText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",

    }


})

export default Landing;