import { React, useMemo, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Map from './pages/map/Map';
import Profile from "./pages/profile/Profile";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import HomeButton from "./components/HomeButton";
import CameraScreen from "./pages/map/CameraScreen";
import TileDetails from "./pages/tiles/TileDetails";
import Newacc from "./pages/login/Newacc";
import Login from "./pages/login/Login";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapModal from "./components/MapModal"
import { AuthContext } from "./context";

/*
const [isLoading, setIsLoading] = useState(true);
const [userToken, setUserToken] = useState(null);
*/

const MapStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

/*
const authContext = useMemo(() => {
    return {
        signIn: () => {
            setIsLoading(false);
            setUserToken("abc");
        },
        signUp: () => {
            setIsLoading(false);
            setUserToken("abc");
        },
        signOut: () => {
            setIsLoading(false);
            setUserToken(null);
        }
    }
}, [])*/

const AuthStackNavigator = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthStack.Navigator initialRouteName="Signup">
                <AuthStack.Screen name="Signup" component={Newacc} options={{ headerShown: false }} />
                <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </AuthStack.Navigator>
        </GestureHandlerRootView>
    );
};

const MapStackNavigator = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MapStack.Navigator initialRouteName="Map">
                <MapStack.Screen name="Map" component={Map} options={{ headerShown: false }} />
                <MapStack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
                <MapStack.Screen name="Tile" component={TileDetails} options={{ headerShown: false }} />
            </MapStack.Navigator>
        </GestureHandlerRootView>
    );
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
                <Tab.Screen name="Home" component={MapStackNavigator}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ size, color }) => (
                            <HomeButton size={28} color={color} />
                        )
                    }}
                />
                <Tab.Screen name="Account" component={CameraScreen}
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
