import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function OrderCompletedScreen() {
  const [animation] = useState(new Animated.Value(0));

  const navigation = useNavigation();
  const route = useRoute();


  const handleGoToOrders = () => {
    navigation.navigate('UserOrders', {
      Montant: route.params.total
    });
  }

  // const handleGoToHome = () => {
  //   navigation.navigate('Home');
  // }

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={styles.container}>
        <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                onPress={() => navigation.navigate("Home")}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text>Retour page d'accueil</Text>
        </View>
      <View style={styles.header}>
        {/* <Ionicons name="arrow-back" size={24} color="#fff" onPress={navigation.navigate('Home')}/> */}
        <Text style={styles.headerTitle}>Commande Réussie</Text>
        {/* <AntDesign name="home" size={24} color="#fff" onPress={handleGoToHome}/> */}
      </View>
      <Animated.View style={[styles.orderContainer, {opacity: animation}]}>
        <View style={styles.orderHeader}>
          <Ionicons name="md-checkmark-circle-outline" size={64} color="#088F8F" />
          <Text style={styles.orderHeaderText}>Merci d'utiliser Univers pour vos services de pressing.</Text>
        </View>
        <Text style={styles.orderText}>Votre commande a été reçue!</Text>
        <Text style={styles.orderNumber}>Type de Service: {route.params.vip}</Text>
        <Text style={styles.orderNumber}>Methode de Paiement: {route.params.PaymentMethod}</Text>
        <Text style={styles.orderTotal}>Montant Total: {route.params.total} CFA</Text>
        <TouchableOpacity style={styles.button} onPress={handleGoToOrders}>
          <Text style={styles.buttonText}>Aller vérifier votre commande</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0", 
    flex: 1, 
    marginTop: 40 
  },
  header: {
    backgroundColor: '#088F8F',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  orderHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  orderHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  orderText: {
    fontSize: 18,
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#088F8F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
