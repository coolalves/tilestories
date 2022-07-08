import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Map from './pages/map/Map';
import Profile from "./pages/profile/Profile";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import HomeButton from "./components/HomeButton";
import CameraScreen from "./pages/map/CameraScreen";
import TileDetails from "./pages/tiles/TileDetails";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapModal from "./components/MapModal"
import NewAcc from "./pages/login/Newacc"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const log = false;
const account = NewAcc;
if(log!=false){
    account = Profile;
}

const StackNavigator = () => {
    if (log == false) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack.Navigator initialRouteName="Account">
                    <Stack.Screen name="Account" component={account} options={{ headerShown: false }} />
                </Stack.Navigator>
            </GestureHandlerRootView>
        );
    } else {
        return(
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack.Navigator initialRouteName="Map">
                    <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
                    <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Tile" component={TileDetails} options={{ headerShown: false }} />
                </Stack.Navigator>
            </GestureHandlerRootView>
        )
    }

};

export default function Routes() {
    /*const [loaded] = useFonts({
        NotoSans: require('../assets/fonts/NotoSans-Bold.ttf'),
      });*/

    return (
        <Tab.Navigator
            initialRouteName="Home"

            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#151F6D',
                    borderTopColor: 'transparent',
                    height: 50,
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
            <Tab.Screen name="Home" component={StackNavigator}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (
                        <HomeButton size={28} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Account" component={StackNavigator}
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
