import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Rest of your imports...
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from 'react'
import * as Location from "expo-location"
import {MaterialIcons} from '@expo/vector-icons'
import Carousel from "../components/Carousel"
import Services from '../components/Services';
import { useNavigation } from "@react-navigation/native";
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const HomeScreen = () => {
  // Rest of your code...
  const cart = useSelector((state) => state.cart.cart);
    const [items,setItems] = useState([]);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
    const navigation = useNavigation();
    // console.log(cart);
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("We are loading your location")
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
    const [showLogo, setShowLogo] = useState(true);
    const [fadeOut] = useState(new Animated.Value(1));

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
          Alert.alert(
            "Services de localisation non activés",
            "Svp activez les services de localisation",
            [
              {
                text: "annulé",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        } else {
          setlocationServicesEnabled(enabled);
        }
      };

      const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission refusée",
            "Svp permettez a l'application d'utiliser les services de localisation",
            [
              {
                text: "annulé",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        } else {
          setlocationServicesEnabled(true);
          const {coords} = await Location.getCurrentPositionAsync();
          if (coords) {
            const {latitude, longitude} = coords;
            let response = await Location.reverseGeocodeAsync({
              latitude,
              longitude
            });
            if (response.length > 0) {
              let address = `${response[0].name} ${response[0].city}`
              setdisplayCurrentAddress(address)
            }
          }
        }
      };
      

      const product = useSelector((state) => state.product.product);
      const [searchQuery, setSearchQuery] = useState('');
      const [filteredProducts, setFilteredProducts] = useState(null);
      const dispatch = useDispatch();

      const textInputRef = useRef(null)


      const filterProducts = () => {
        if (searchQuery === '') {
          setFilteredProducts(null)
        } else {
          const regex = new RegExp(searchQuery, 'i');
          const filtered = product.filter((item) => {
            if (item && item.name) {
              return regex.test(item.name);
            }
            return false; // Exclude invalid items without the 'name' property
          });
          setFilteredProducts(filtered);
        }
      };
      
      

      useEffect(() => {
        if (product.length > 0) return;

        const fetchProducts = async () => {
          const colRef = collection(db, "types")
          const docsSnap = await getDocs(colRef)
          docsSnap.forEach((doc) => {
            items.push(doc.data());
          });
          items?.map((service) => dispatch(getProducts(service)));
        }
        fetchProducts();
        // setFilteredProducts(
        //   product.filter((item, index) =>
        //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
        //   )
        // );
      }, [product]);
      // console.log(product)

      useEffect(() => {
        filterProducts();
      }, [searchQuery]);

      const handleSearch = (text) => {
        setSearchQuery(text);
      };

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



  return (
    <>
      <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1 }}>
        {showLogo && (
          <Animated.View
            style={[
              styles.logoContainer,
              { opacity: fadeOut, marginBottom: windowHeight * 0.05 },
            ]}
          >
            <Image source={require('../assets/logo2.jpeg')} style={styles.logo} />
          </Animated.View>
        )}
        <View>
          {/* Rest of your code... */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: windowHeight * 0.02,
            }}
          >
            {/* Rest of your code... */}
            <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>



            <Pressable
              style={{
                marginLeft: "auto",
                marginRight: windowHeight * 0.01,
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: windowWidth * 0.1,
                  height: windowWidth * 0.1,
                  borderRadius: windowWidth * 0.05,
                }}
                source={require('../assets/logo2.jpeg')}
              />
              {/* Rest of your code... */}
              <Text style={{color: '#088F8F', fontStyle: 'italic', fontWeight:"600"}}>uTOK</Text>
            </Pressable>
          </View>

          {/* Rest of your code... */}
                  {/* Search Bar */}
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
          onPress= {() => {
            textInputRef.current.focus()
          }}
        >
          <TextInput ref={textInputRef} placeholder="Cherchez un service" value={searchQuery} onChangeText={setSearchQuery} onEndEditing={filterProducts}/>
          <Feather name="search" size={24} color="#C0C0C0" />
          </TouchableOpacity>
         {filteredProducts?.map((item, index) => (
          <DressItem item={item} key={index}/>
        ))}

        {/* Image Carousel */}
        <Carousel />

        {/* Services */}
        <Services />


        {/* Render all the Products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}

      </View>
    </ScrollView>




          {total === 0 ? (
            null
          ) : (
            <Pressable
              style={{
                backgroundColor: "#088F8F",
                padding: windowHeight * 0.02,
                marginBottom: windowHeight * 0.05,
                margin: windowHeight * 0.02,
                borderRadius: windowHeight * 0.01,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Rest of your code... */}
              <View>
              <Text style={{fontSize:15,fontWeight:"400",color:"white"}}>{cart.length} vêtements | {total} CFA</Text>
              <Text style={{fontSize:17,fontWeight:"500",color:"white",marginVertical:6}}>frais de livraison GRATUIT</Text>
            </View>
    
            <Pressable onPress={() => navigation.navigate("PickUp")}>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Continuez {">"}</Text>
            </Pressable>


            </Pressable>
          )}
      
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    resizeMode: "contain",
  },
});

