import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from './pages/map/Map';
import Profile from "./pages/profile/Profile";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import HomeButton from "./components/HomeButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#151F6D',
                    borderTopColor: 'transparent'
                },
                // activeTintColor: ''
                // inactiveTintColor: ''
                tabStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                title: "tilestories",
                headerStyle: {
                    backgroundColor: '#151F6D',
                },
                headerTintColor: 'white'
            }}
        >
            <Tab.Screen name="Scoreboard" component={Scoreboard}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="medal" size={24} color="white" />
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
                        <MaterialCommunityIcons name="account" size={24} color="white" />
                    )
                }}
            />

        </Tab.Navigator>
    )
}