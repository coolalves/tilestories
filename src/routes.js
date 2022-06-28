import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from './pages/map/Map';
import Profile from "./pages/profile/Profile";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import HomeButton from "./components/HomeButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function Routes() {
    /*const [loaded] = useFonts({
        NotoSans: require('../assets/fonts/NotoSans-Bold.ttf'),
      });*/

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#151F6D',
                    borderTopColor: 'transparent',
                    height: 50
                },
                activeTintColor: 'white',
                inactiveTintColor: 'grey',
                tabStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                title: "tilestories",
                headerStyle: {
                    backgroundColor: '#151F6D',
                    borderEndColor: 'red',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    // fontFamily: 'NotoSans'
                },
            }}
        >
            <Tab.Screen name="Scoreboard" component={Scoreboard}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="medal" size={28} color="white" />
                    )
                }}
            />


            <Tab.Screen name="Home" component={Map}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (
                        <HomeButton size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen name="Account" component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="account" size={28} color="white" />
                    )
                }}
            />

        </Tab.Navigator>
    )
}