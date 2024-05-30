import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import BootSplash from "react-native-bootsplash";

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CricketScreen from './screens/CricketScreen';
import FootballScreen from './screens/FootballScreen';
import { Ionicons } from '@expo/vector-icons';
import Cricket_Details from './screens/Cricket_Details';
import Football_Details from './screens/FootBall_Details';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
    useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  function AllTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Cricket" component={CricketScreen} options={{
          title: 'Cricket Fixures',
          headerTitleAlign: 'center',
          tabBarLabel: 'Cricket',
          tabBarActiveBackgroundColor: 'grey',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: () => {
            return <Image source={require('./assets/cricket.png')} style={{width: 25, height: 25}}/>
          }
        }}/>
        <Tab.Screen name="Football" component={FootballScreen} options={{
          title: 'Football Fixures',
          headerTitleAlign: 'center',
          tabBarLabel: 'Football',
          tabBarActiveBackgroundColor: 'grey',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: ()=>{
            return <Image source={require('./assets/football.png')} style={{width: 25, height: 25}}/>
          }
        }}/>
      </Tab.Navigator>
    );
  }
  return (

    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="TabAll" component={AllTabs} options={{headerShown: false}}/>
        <Stack.Screen name='cricket_details' component={Cricket_Details} options={{
          title: 'Cricket Fixture Detail',
          headerTitleAlign: 'center'
        }}/>
        <Stack.Screen name='football_details' component={Football_Details} options={{
          title: 'Football Fixture Detail',
          headerTitleAlign: 'center'
        }}/>
      </Stack.Navigator>

      
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
