import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5} from '@expo/vector-icons'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen'

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#088F8F',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#f2f2f2',
            borderTopWidth: 1,
            borderTopColor: 'gray',
          },
        })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} style={{position: 'absolute', top: 10}} />
              )
            }} />
          <Tab.Screen name="Menu" component={ProfileScreen} options={{ 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="menu" size={size} color={color} style={{position: 'absolute', top: 10}} />
              )
            }} />
        </Tab.Navigator>
      )
}

const styles = StyleSheet.create({})