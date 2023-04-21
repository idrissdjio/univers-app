import { StyleSheet, Text, View,SafeAreaView,Pressable } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserSettings = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch(err => {
            console.log(err);
        })
    }
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Pressable style={{marginVertical:10}}>
        <Text>welcome {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser} style={{
              width: 150,
              backgroundColor: "#088F8F",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10, justifyContent: 'center'}}>
      <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>Sign Out</Text>
      </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default UserSettings