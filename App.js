import { React, useMemo, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Map from './src/pages/map/Map';
import Profile from "./src/pages/profile/Profile";
import Scoreboard from "./src/pages/scoreboard/Scoreboard";
import HomeButton from "./src/components/HomeButton";
import CameraScreen from "./src/pages/map/CameraScreen";
import TileDetails from "./src/pages/tiles/TileDetails";
import Newacc from "./src/pages/login/Newacc";
import Login from "./src/pages/login/Login";
import Landing from "./src/pages/login/Landing";
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PageOne from "./src/pages/tutorial/PageOne";
import PageTwo from "./src/pages/tutorial/PageTwo";
import PageThree from "./src/pages/tutorial/PageThree";
import PageFour from "./src/pages/tutorial/PageFour";
import Carousel from "./src/components/Carousel";

//import MapModal from "./components/MapModal"
//import { AuthContext } from "./context";

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
      <AuthStack.Navigator initialRouteName="LandingPage">
        <AuthStack.Screen name="LandingPage" component={Landing} options={{ headerShown: false }} />
        <AuthStack.Screen name="Signup" component={Newacc} options={{ headerShown: false }} />
        <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <AuthStack.Screen name="TutorialOne" component={PageOne} options={{ headerShown: false }} />
        <AuthStack.Screen name="TutorialTwo" component={PageTwo} options={{ headerShown: false }} />
        <AuthStack.Screen name="TutorialThree" component={PageThree} options={{ headerShown: false }} />
        <AuthStack.Screen name="TutorialFour" component={PageFour} options={{ headerShown: false }} />
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

const ProfileStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MapStack.Navigator initialRouteName="Profile">
        <Tab.Screen name="Account" component={Profile} options={{ headerShown: false }} />
        <Tab.Screen name="Gallery" component={Carousel} options={{ headerShown: false }} />
      </MapStack.Navigator>
    </GestureHandlerRootView>
  );
};

function TabRoutes() {
  /*const [loaded] = useFonts({
      NotoSans: require('../assets/fonts/NotoSans-Bold.ttf'),
    });*/

  let selectedIconColor = "#5C75DD";
  let iconColor = "#FFFBFA";

  return (

    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{

        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          position: "absolute",
          padding: 6,
          fontWeight: "600",
          fontSize: 11,

        },
        tabBarIconStyle: {
          padding: 7
        },
        tabBarStyle: {
          backgroundColor: '#151F6D',
          borderTopColor: 'transparent',
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: "absolute",
        },


        tabStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
        title: "tilestories",
        headerStyle: {
          backgroundColor: '#5C75DD',

        },
        headerTintColor: '#FFFBFA',
        headerTitleStyle: {
          fontWeight: 'bold',
          // fontFamily: 'NotoSans'
        },
      }}
    >
      <Tab.Screen name="Scoreboard" component={Scoreboard}
        options={{
          tabBarLabel: 'Scoreboard', tabBarActiveTintColor: '#F5BB38',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="medal" size={28} tab color="#FFFBFA" />
          )
        }}
      />
      <Tab.Screen name="Home" component={MapStackNavigator}
        options={{
          tabBarLabel: 'Map', tabBarActiveTintColor: '#F5BB38',
          tabBarIcon: ({ size, color }) => (
            <HomeButton size={28} color={color} />
          )
        }}
      />
      <Tab.Screen name="Profile" component={ProfileStack}
        options={{
          tabBarLabel: 'Profile', tabBarActiveTintColor: '#F5BB38',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={28} color="#FFFBFA" />
          )
        }}
      />

    </Tab.Navigator>

  )
}

const AppStack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppStack.Navigator>

          <AppStack.Screen name="AuthStack" component={AuthStackNavigator} options={{ headerShown: false }} />
          <AppStack.Screen name="TabRoutes" component={TabRoutes} options={{ headerShown: false }} />


        </AppStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}