import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Pressable, 
  Image, 
  TextInput, 
  ScrollView,
  Alert
} from 'react-native'
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react'
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
    const cart = useSelector((state) => state.cart.cart);
    const [items,setItems] = useState([]);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
    const navigation = useNavigation();
    // console.log(cart);
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("We are loading your location")
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
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
      const [filteredProducts, setFilteredProducts] = useState([]);
      const dispatch = useDispatch();
      useEffect(() => {
        if (product.length > 0) return

        const fetchProducts = async () => {
          const colRef = collection(db, "types")
          const docsSnap = await getDocs(colRef)
          docsSnap.forEach((doc => {
            items.push(doc.data())
          })) 
          items?.map((service) => dispatch(getProducts(service)))
        }
        fetchProducts();
        setFilteredProducts(
          product.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }, [product, searchQuery]);
      // console.log(product)

      const handleSearch = (text) => {
        setSearchQuery(text);
      };

        

  return (
    <>
    <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
      <View>

        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
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
        >
          <TextInput placeholder="Cherchez un service" onChangeText={handleSearch} value={searchQuery}/>
          {filteredProducts.map((item) => (
        <DressItem key={item.id} item={item} />
         ))}
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

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
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between",
            }}
          >
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
  )
}

export default HomeScreen

const styles = StyleSheet.create({})



      // const services = [
      //   {
      //     id: "0",
      //     image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      //     name: "shirt",
      //     quantity: 0,
      //     price: 10,
      //   },
      //   {
      //     id: "11",
      //     image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      //     name: "T-shirt",
      //     quantity: 0,
      //     price: 10,
      //   },
      //   {
      //     id: "12",
      //     image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      //     name: "dresses",
      //     quantity: 0,
      //     price: 10,
      //   },
      //   {
      //     id: "13",
      //     image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      //     name: "jeans",
      //     quantity: 0,
      //     price: 10,
      //   },
      //   {
      //     id: "14",
      //     image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      //     name: "Sweater",
      //     quantity: 0,
      //     price: 10,
      //   },
      //   {
      //     id: "15",
      //     image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      //     name: "shorts",
      //     quantity: 0,
      //     price: 10,
      //   },
      //   {
      //     id: "16",
      //     image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      //     name: "Sleeveless",
      //     quantity: 0,
      //     price: 10,
      //   },
      // ];