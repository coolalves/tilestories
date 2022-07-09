import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default function Profile() {


  return (
    <View  >
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' }} />


      <View style={styles.body}>

        <View style={styles.textContainer} >
          <Text style={styles.name}>User Name</Text>
          <Text style={styles.info}>Level</Text>
          <Text style={styles.description}>Description</Text>
        </View>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#151F6D",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  textContainer: {
    alignContent: "center",
    top:40
     
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: '600',
  },

  body: {
    marginTop: 40,
    alignContent: "center",
  },

  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },

});
