/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Home from './src/pages/home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CameraView from './src/pages/camera';
import {CameraDevice} from 'react-native-vision-camera';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import ScrapBook from './src/pages/scrapbook';
import Login from './src/pages/login';

export type RootStackParamList = {
  HomeCamera: undefined;
  Camera: {device: CameraDevice};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, animation: "shift"}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Scrap Book" component={ScrapBook} />
    </Tab.Navigator>
  );
}

const AuthRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeCamera" component={HomeTabs} />
      <Stack.Screen name="Camera" component={CameraView} />
    </Stack.Navigator>
  );
};

const NoAuthRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};


function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
        <NavigationContainer>
          <NoAuthRoutes />
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
