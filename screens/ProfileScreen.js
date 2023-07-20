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
      <Text style={styles.headerTitle}>uTOK</Text>
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
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    borderRadius: 10
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    marginTop: 30
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

