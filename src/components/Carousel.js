import * as React from "react";
import { View, Pressable, StyleSheet, Text, Image, Dimensions, FlatList } from "react-native";
import { useState } from "react";
import { ImageGallery } from '@georstat/react-native-image-gallery';
import { Ionicons } from '@expo/vector-icons';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const slideList = Array.from({ length: 30 }).map((_, i) => {
    return {
        id: i,
        image: `https://picsum.photos/1440/2842?random=${i}`,
        title: `This is the title! ${i + 1}`,
        subtitle: `This is the subtitle ${i + 1}!`,
    };
});



function Slide({ data }) {
    return (
        <View
            style={{
                height: windowHeight,
                width: windowWidth,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image
                source={{ uri: data.image }}
                style={{ width: windowWidth * 0.9, height: windowHeight * 0.9 }}
            ></Image>
            <Text style={{ fontSize: 24 }}>{data.title}</Text>
            <Text style={{ fontSize: 18 }}>{data.subtitle}</Text>
        </View>
    );
}

function Carousel() {
    return (
        <FlatList
            data={slideList}
            style={{ flex: 1, backgroundColor:"#5C75DD" }}
            renderItem={({ item }) => {
                return <Slide data={item} />;
            }}
        />
    );
};

export default Carousel

