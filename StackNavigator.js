import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PickUpScreen from './screens/PickUpScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import UserComments from './screens/UserComments';
import UserSettings from './screens/UserSettings';
import UserOrders from './screens/UserOrders';
import UserContactUs from './screens/UserContactUs';
import TabNavigator from './TabNavigator';
import GettingStarted from './screens/GettingStarted';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GettingStarted">
        <Stack.Screen name="GettingStarted" component={GettingStarted} options={{headerShown:false, gestureEnabled: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false, gestureEnabled: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={TabNavigator} options={{headerShown:false}}/>
        {/* <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false}}/> */}
        <Stack.Screen name="PickUp" component={PickUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Comments" component={UserComments} options={{headerShown:false}}/>
        <Stack.Screen name="Settings" component={UserSettings} options={{headerShown:false}}/>
        <Stack.Screen name="UserOrders" component={UserOrders} options={{headerShown:false}}/>
        <Stack.Screen name="ContactUs" component={UserContactUs} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})

// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Ionicons } from "@expo/vector-icons";

// import CartScreen from './screens/CartScreen';
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import OrderScreen from './screens/OrderScreen';
// import PickUpScreen from './screens/PickUpScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import UserCommentsScreen from './screens/UserComments';
// import UserContactUsScreen from './screens/UserContactUs';
// import UserOrdersScreen from './screens/UserOrders';
// import UserSettingsScreen from './screens/UserSettings';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();


// const HomeStack = () => (
//   <Stack.Navigator>
//         <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
//         <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
//         <Stack.Screen name="PickUp" component={PickUpScreen} options={{headerShown:false}}/>
//         <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
//         <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
//         <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
//         <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
//   </Stack.Navigator>
// );

// const UserStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="Comments" component={UserCommentsScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="Settings" component={UserSettingsScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="UserOrders" component={UserOrdersScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="ContactUs" component={UserContactUsScreen} options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

// const myTab = () => (
//   <Tab.Navigator
//   screenOptions={({ route }) => ({
//     tabBarIcon: ({ focused, color, size }) => {
//       let iconName;

//       return <Ionicons name={iconName} size={size} color={color} />;
//     },
//     tabBarActiveTintColor: '#088F8F',
//     tabBarInactiveTintColor: 'gray',
//     tabBarStyle: {
//       backgroundColor: '#f2f2f2',
//       borderTopWidth: 1,
//       borderTopColor: 'gray',
//     },
//   })}
//   >
//     <Tab.Screen name="Home" component={HomeStack} options={{ 
//         headerShown: false,
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="home" size={size} color={color} style={{position: 'absolute', top: 10}} />
//         )
//       }} />
//     <Tab.Screen name="Menu" component={UserStack} options={{ 
//         headerShown: false,
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="menu" size={size} color={color} style={{position: 'absolute', top: 10}} />
//         )
//       }} />
//   </Tab.Navigator>
// )

// const AppNavigator = () => (
//   <NavigationContainer>
//     <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;

//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: '#088F8F',
//       tabBarInactiveTintColor: 'gray',
//       tabBarStyle: {
//         backgroundColor: '#f2f2f2',
//         borderTopWidth: 1,
//         borderTopColor: 'gray',
//       },
//     })}
//     >
//       <Tab.Screen name="Home" component={HomeStack} options={{ 
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} style={{position: 'absolute', top: 10}} />
//           )
//         }} />
//       <Tab.Screen name="Menu" component={UserStack} options={{ 
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="menu" size={size} color={color} style={{position: 'absolute', top: 10}} />
//           )
//         }} />
//     </Tab.Navigator>
//   </NavigationContainer>
// );

// export default AppNavigator;

// const styles = StyleSheet.create({});
