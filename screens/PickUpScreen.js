import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Animated,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [selectedVIP, setSelectedVIP] = useState([]);
  const [PaymentMethod, setPaymentMethod] = useState([]);
  const [location, setLocation] = useState('');
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

  const logoURL = 'https://i.ibb.co/HVknj4X/univers-logo.jpg'
 
    date = new Date().getDate();
    month = new Date().getMonth() + 1;
    endMonth = new Date().getMonth() + 2;
    year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    currentDate = year + '-' + month + '-' + date;//format: d-m-y;
    endDate = year + '-' + endMonth + '-' + date;//format: d-m-y;



  const vip = [
    {
      id: "0",
      name: "Standard"
    },
    {
      id: "1",
      name: "VIP"
    },
    {
      id: "2",
      name: "Premium"
    }
  ]

  const payment = [
    {
      id: "0",
      name: "MTN Money"
    },
    {
      id: "1",
      name: "Orange Money"
    },
    {
      id: "2",
      name: "CASH"
    },
  ]


  const deliveryTime = [
    {
      id: "0",
      name: "Express 4h",
    },
    {
      id: "1",
      name: "Express 8h",
    },
    {
      id: "2",
      name: "Express 24h",
    },
    {
      id: "3",
      name: "2 - 3 Jours",
    },
    {
      id: "4",
      name: "4 - 5 Jours",
    },
  ];

  const times = [
    {
      id: "0",
      time: "09:00",
    },
    {
      id: "1",
      time: "11:00",
    },
    {
      id: "2",
      time: "13:00",
    },
    {
      id: "3",
      time: "15:00",
    },
    {
      id: "4",
      time: "17:00",
    },
    {
      id: "5",
      time: "19:00",
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
      if(selectedTime == "" || delivery == "" || selectedVIP == "") {
        Alert.alert(
            "Case vide or invalide",
            "Svp remplissez tous les champs",
            [
              {
                text: "annulé",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
      }
      else if(selectedTime && delivery && selectedVIP && PaymentMethod){
        updatedDate = String(selectedDate).slice(4, 16)
        navigation.replace("Cart",{
            Jour_recuperation: updatedDate,
            Heure_recuperation:selectedTime,
            Nombre_jours:delivery,
            vip: selectedVIP,
            Localisation: location,
            PaymentMethod: PaymentMethod
        })
        console.log(updatedDate)
      }
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView style={{marginBottom: 50}}>
      {showLogo && (
        <Animated.View style={[styles.logoContainer, { opacity: fadeOut }]}>
          <Image source={{ uri: logoURL }} style={styles.logo} />
        </Animated.View>
      )}
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          {/* Entrez votre addresse et Numero de Telephone exacte ici */}
        </Text>
        <TextInput
          style={{
            padding: 10,
            borderColor: "gray",
            borderWidth: 0.7,
            // paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
            minHeight: 150,
            maxHeight: 150,
          }}
          multiline={true}
          value={location}
          placeholder= "Entrer votre addresse et Numero de Telephone ici"
          onChangeText={(text) => setLocation(text)}
        />
        

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Qualite de Pressing
        </Text>

        {/* { <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {vip.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedVIP(item.name)}
              style={
                selectedVIP.includes(item.name)  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      // borderColor: "red",
                      borderWidth: 0.7,
                      backgroundColor: "#088F8F",
                      width: '30%',
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                      width: '30%',
                      // backgroundColor: "#088F8F"
                    }   
              }
            >
              <Text style={{textAlign: 'center', fontSize: 14}}>{item.name}</Text>
            </Pressable>
          ))}
          </View>
        {/* </ScrollView>} */}


        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Methode de Paiement
        </Text>

        {/* { <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {payment.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setPaymentMethod(item.name)}
              style={
                PaymentMethod.includes(item.name)  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 12,
                      // borderColor: "red",
                      borderWidth: 0.7,
                      backgroundColor: "#088F8F",
                      width: '30%',
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 12,
                      borderColor: "gray",
                      borderWidth: 0.7,
                      width: '30%',
                      // backgroundColor: "#088F8F"
                    }   
              }
            >
              <Text style={{textAlign: 'center', fontSize: 14}}>{item.name}</Text>
            </Pressable>
          ))}
          </View>
        {/* </ScrollView>} */}


        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Date de recuperation de vêtements
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date(currentDate)}
          endDate={new Date(endDate)}
          initialSelectedDate={new Date(currentDate)}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#088F8F"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Heure de recuperation
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      // borderColor: "red",
                      borderWidth: 0.7,
                      backgroundColor: "#088F8F",
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
           Date de Livraison
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <Pressable
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      // borderColor: "red",
                      backgroundColor: "#088F8F",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
              onPress={() => setDelivery(item.name)}
              key={i}
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop:"auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{}}>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "white" }}>
              {cart.length} vêtements  | {total} CFA
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "white",
                marginVertical: 6,
              }}
            >
              frais de livraison GRATUIT
            </Text>
          </View>

          <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Confirmez {">"}
            </Text>
          </Pressable>
        </Pressable>
      )}
      </SafeAreaView>

    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
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
})
