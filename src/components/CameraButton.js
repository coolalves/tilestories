import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CameraScreen from '../pages/map/CameraScreen';
const CameraButton = () => {
    return (
        <Pressable style={styles.buttonContainer}>
            <MaterialIcons name="add-a-photo" size={28} color="grey" />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        flex: 1,
        left: "2%",
        padding: 4,
        zIndex: 2,
        backgroundColor: "#fff",
        borderRadius: 6,
    }
});

export { CameraButton };