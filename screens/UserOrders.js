import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserOrders = () => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [deliveryDate, setDeliveryDate] = useState('');
  const [total, setTotal] = useState('')
  const [showLogo, setShowLogo] = useState(true);
  const [fadeOut] = useState(new Animated.Value(1));

  useEffect(() => {
    const hideLogo = () => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowLogo(false);
      });
    };

    const timer = setTimeout(hideLogo, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Replace 'logoURL' with the URL of your logo image
  const logoURL = 'https://i.ibb.co/HVknj4X/univers-logo.jpg';

  date = new Date().getDate();
  month = new Date().getMonth() + 1;
  // endMonth = new Date().getMonth() + 2;
  year = new Date().getFullYear();


  full_date = date + '/' + month + '/' + year

  const navigation = useNavigation();


  useEffect(() => {
    const fetchUserData = async () => {
      // Get the current user's ID
      const userUid = auth.currentUser.uid;
      // Get the user document from Firebase
      const userDocRef = doc(db, 'users', userUid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.Commandes && userData.Details_Livraison) {
          setSelectedProducts(userData.Commandes);
          setDeliveryDetails(userData.Details_Livraison);
          setDeliveryDate(userData.Jour_de_Commande)
          setTotal(userData.Somme_total)
        } else {
          console.log('User data is incomplete');
        }
      } else {
        console.log('User document does not exist');
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView>
    <ScrollView style={styles.container}>
      {/* Delivery Details */}
      <View style={styles.deliveryDetailsContainer}>
        <Text style={styles.deliveryDetailsTitle}>Coordonnées et Details</Text>
        <Text style={styles.deliveryDetailsText}>
          <Text style={styles.deliveryDetailsLabel}>Localisation: </Text>
          {deliveryDetails ? deliveryDetails.Localisation : ""}
        </Text>
        <Text style={styles.deliveryDetailsText}>
          <Text style={styles.deliveryDetailsLabel}>Nombre de Jours: </Text>
          {deliveryDetails? deliveryDetails.Nombre_jours : ""}
        </Text>
        <Text style={styles.deliveryDetailsText}>
          <Text style={styles.deliveryDetailsLabel}>Type de Service: </Text>
          {deliveryDetails? deliveryDetails.vip : ""}
        </Text>
        <Text style={styles.deliveryDetailsText}>
          <Text style={styles.deliveryDetailsLabel}>Heure de recuperation: </Text>
          {deliveryDetails? deliveryDetails.Heure_recuperation : ""}
        </Text>
        <Text style={styles.deliveryDetailsText}>
          <Text style={styles.deliveryDetailsLabel}>Jour de recuperation: </Text>
          {(deliveryDetails && deliveryDetails.Jour_recuperation!== '') ? deliveryDetails.Jour_recuperation : full_date}
        </Text>
        <Text style={styles.deliveryDetailsText}>
          <Text style={styles.deliveryDetailsLabel}>Prix Total: {total? total : 0} CFA</Text>
        </Text>
        <Text style={styles.deliveryDetailsText}>
          <Text style={styles.deliveryDetailsLabel}>Methode de Paiment: {deliveryDetails? deliveryDetails.PaymentMethod : ""}</Text>
        </Text>
      </View>
      

      <View style={styles.selectedProductsContainer}>
      {showLogo && (
        <Animated.View style={[styles.logoContainer, { opacity: fadeOut }]}>
          <Image source={{ uri: logoURL }} style={styles.logo} />
        </Animated.View>
      )}
  <Text style={styles.selectedProductsTitle}>Ma Commande</Text>
  {Object.entries(selectedProducts).length && deliveryDate ? (
    Object.entries(selectedProducts).map(([key, product]) => (
      <View style={styles.productContainer} key={key}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          {/* <Text style={styles.productName}>{product.name}</Text> */}
          <Text style={styles.productName}>{product.name.length > 9 ? product.name.substring(0, 9)+'...' : product.name}</Text>
          <View style={styles.productPrice}>
            <Text style={styles.price}>{product.price} FCFA</Text>
            <Text style={styles.price}>{product.quantity} Pcs</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{deliveryDate}</Text>
          </View>
        </View>
      </View>
    ))
  ) : (
    <View style={styles.productContainer}>
      <Text style={{ textAlign: 'center' }}>Il n'y a aucune commande enregistrée dans le système</Text>
    </View>
  )}
</View>

      
    </ScrollView>
    </SafeAreaView>
  );
};

export default UserOrders

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  deliveryDetailsContainer: {
    backgroundColor: '#088F8F',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  deliveryDetailsTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  deliveryDetailsLabel: {
    fontWeight: 'bold',
  },
  deliveryDetailsText: {
    color: '#fff',
    marginBottom: 5,
  },
  selectedProductsContainer: {
    marginBottom: 20,
  },
  selectedProductsTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    color: '#088F8F',
    marginLeft: 'auto',
  },
  date: {
    fontSize: 16,
    color: "#000000",
    marginTop: 5,
    alignContent: 'flex-start',
    // width: '30%',
    // paddingRight: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#088F8F',
    marginRight: 10,
  },
  dateContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});




