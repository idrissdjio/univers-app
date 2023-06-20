import React from 'react';
import { StyleSheet, View, Linking, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function UserContactUs() {

  const handleCallPress = () => {
    Linking.openURL('tel:+237696348020');
  };

  return (
    <View style={styles.container}>
      <Text h1 style={styles.title}>Univers Contacts</Text>
      <TouchableOpacity style={styles.infoContainer} onPress={handleCallPress}>
        <MaterialIcons name="phone" size={32} color="#088F8F" />
        <Text style={styles.info}>+237 696348020</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <MaterialIcons name="email" size={32} color="#088F8F" />
        {/* <Text style={styles.info}>info@mycompany.com</Text> */}
        <Text style={styles.info}> universpressing-service@gmail.com</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialIcons name="location-on" size={32} color="#088F8F" />
        {/* <Text style={styles.info}>123 Main St, Anytown, USA</Text> */}
        <Text style={styles.info}>Rue kotoko en face spark security</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialIcons name="schedule" size={32} color="#088F8F" />
        <Text style={styles.info}>Lun-Sam: 9h-17h</Text>
      </View>
      <View style={styles.separator} />
      <Text h2 style={styles.subtitle}>Informations Supplementaires</Text>
      <View style={styles.infoContainer}>
        <MaterialIcons name="language" size={32} color="#088F8F" />
        <Text style={styles.info}>www.univers.com</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialIcons name="info" size={32} color="#088F8F" />
        <Text style={styles.info}>About Us</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#088F8F',
    marginBottom: 30,
    fontSize: 20,
    fontWeight: '800'
  },
  subtitle: {
    color: '#088F8F',
    marginTop: 30,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  info: {
    marginLeft: 20,
    color: '#333',
    fontSize: 18,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 30,
  },
});
