import { React } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, Image, Dimensions } from 'react-native';


const Congratulations = ({ navigation: { navigate } }) => {

    setTimeout(() => {
        navigate('Map'); //this.props.navigation.navigate('Login')
    }, 5000);

    return (
        <KeyboardAvoidingView
            style={styles.loadingContainer}
        >
            <View>
                <Image
                    source={require('../../../assets/imgs/prize/congratulations.png')}
                    style={styles.loadingFotinha}
                ></Image>
            </View>



        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3,
        backgroundColor: "#BECDF1",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    loadingFotinha: {
        marginBottom: 80,
        width: 500,
        height: 500
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

export default Congratulations;