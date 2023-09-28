import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert } from 'react-native';
import { auth, db } from '../firebase'; // Import the deleteUser function from Firebase
import { doc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserSettings = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const signOutUser = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => {
            signOut(auth)
              .then(() => {
                Alert.alert('Success', 'You have successfully signed out.');
                navigation.replace('Login');
              })
              .catch(err => {
                console.log(err);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deleteUserAccount = async () => {
    Alert.alert(
      'Confirm Account Deletion',
      'Are you sure you want to delete your account? Deleting will account will result in losing all your data related to the app.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete Account',
          onPress: async () => {
            try {
              // Delete user data from 'users' collection
              const userDocRef = doc(db, 'users', user.uid);
              await deleteDoc(userDocRef);
  
              // Delete the user account
              await user.delete();
  
              Alert.alert('Success', 'Your account and data have been deleted.');
              navigation.replace('Login');
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'An error occurred while deleting your account.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome {user.email}</Text>
        <Text style={styles.startupName}>uTOK</Text>
      </View>

      <Pressable onPress={signOutUser} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>

      <Pressable onPress={deleteUserAccount} style={styles.deleteUserButton}>
        <Text style={styles.deleteUserText}>Delete Account</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    marginVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
  },
  startupName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  signOutButton: {
    width: 150,
    backgroundColor: '#088F8F',
    padding: 15,
    borderRadius: 7,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  deleteUserButton: {
    width: 200,
    backgroundColor: 'red', // Change the button color
    padding: 15,
    borderRadius: 7,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteUserText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default UserSettings;
