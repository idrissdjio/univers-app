// import { StyleSheet, Text, View,SafeAreaView,Pressable } from 'react-native'
// import React from 'react'
// import { auth } from '../firebase'
// import { signOut } from 'firebase/auth';
// import { useNavigation } from '@react-navigation/native';

// const ProfileScreen = () => {
//     const user = auth.currentUser;
//     const navigation = useNavigation();
//     const signOutUser = () => {
//         signOut(auth).then(() => {
//             navigation.replace("Login");
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//   return (
//     <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
//       <Pressable style={{marginVertical:10}}>
//         <Text>welcome {user.email}</Text>
//       </Pressable>

//       <Pressable onPress={signOutUser} style={{
//               width: 150,
//               backgroundColor: "#088F8F",
//               padding: 15,
//               borderRadius: 7,
//               marginTop: 50,
//               marginLeft: "auto",
//               marginRight: "auto",
//             }}>
//       <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
//       <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>Sign Out</Text>
//       </View>
//       </Pressable>
//     </SafeAreaView>
//   )
// }

// export default ProfileScreen

// const styles = StyleSheet.create({})


// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function UserProfileScreen() {
//   const navigation = useNavigation();

//   const handleSettings = () => {
//     navigation.navigate('Settings');
//   };

//   const handleOrders = () => {
//     navigation.navigate('MyOrders');
//   };

//   const handleContactUs = () => {
//     navigation.navigate('ContactUs');
//   };

//   const handleComments = () => {
//     navigation.navigate('Comments');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Univers</Text>
//       </View>
//       <View style={styles.content}>
//         <TouchableOpacity style={styles.box} onPress={handleSettings}>
//           <Text style={styles.boxText}>Paramètres</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.box} onPress={handleOrders}>
//           <Text style={styles.boxText}>Mes Commandes</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.box} onPress={handleContactUs}>
//           <Text style={styles.boxText}>Nous Contacter</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.box} onPress={handleComments}>
//           <Text style={styles.boxText}>Commentaires</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     marginTop: 60
//   },
//   header: {
//     height: 60,
//     // backgroundColor: '#088F8F',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#088F8F',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: 20,
//   },
//   box: {
//     backgroundColor: '#088F8F',
//     width: '48%',
//     height: 150,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   boxText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
// });

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function App() {

  const navigation = useNavigation();

  const handleSetting = () => {
    navigation.navigate('Settings')
  };

  const handleMyOrders = () => {
    navigation.navigate('UserOrders')
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUs')
  };

  const handleComments = () => {
    navigation.navigate('Comments')
  };

  return (
    <>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Univers</Text>
    </View>
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.box}>
          <MaterialIcons name="settings" size={40} color="#fff" onPress={handleSetting} />
          <Text style={styles.text}>Parametres</Text>
        </View>
        <View style={styles.box}>
          <MaterialIcons name="shopping-cart" size={40} color="#fff" onPress={handleMyOrders} />
          <Text style={styles.text}>Commandes</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <MaterialIcons name="mail-outline" size={40} color="#fff" onPress={handleContactUs} />
          <Text style={styles.text}>Nous Contactez</Text>
        </View>
        <View style={styles.box}>
          <MaterialIcons name="comment" size={40} color="#fff" onPress={handleComments} />
          <Text style={styles.text}>Commentaires</Text>
        </View>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    backgroundColor: '#088F8F',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    backgroundColor: '#088F8F',
    borderRadius: 10,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
  },
  text: {
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
