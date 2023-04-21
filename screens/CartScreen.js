import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";


const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  let total = 0
  if (route.params.vip == 'Standard') {
    total = cart
      .map((item) => item.quantity * item.price)
      .reduce((curr, prev) => curr + prev, 0);
  } else if (route.params.vip == 'VIP') {
    total = cart
      .map((item) => item.quantity * item.price * 1.3)
      .reduce((curr, prev) => curr + prev, 0);
  } else {
    total = cart
      .map((item) => item.quantity * item.price * 1.5)
      .reduce((curr, prev) => curr + prev, 0);
  }

  const navigation = useNavigation();
  const userUid = auth.currentUser.uid;
  console.log(auth.currentUser)
  const dispatch = useDispatch();
  const placeOrder = async () => {
    navigation.navigate("Order", {
      total: total,
      vip: route.params.vip
    });
    dispatch(cleanCart());


    date = new Date().getDate();
    month = new Date().getMonth() + 1;
    // endMonth = new Date().getMonth() + 2;
    year = new Date().getFullYear();

    full_date = date + '/' + month + '/' + year


    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        Commandes: { ...cart },
        Details_Livraison: route.params,
        Jour_de_Commande: full_date,
        Somme_total: total,
        
      },
      {
        mergeFields: ['Commandes', 'Details_Livraison', 'Jour_de_Commande', 'Somme_total'],
        merge: false,
      }
    );

      await setDoc(
      doc(db, "Commandes", `${userUid}`),
      {
        Nouvelle_Commande: { ...cart },
        Details_Livraison: route.params,
        Jour_de_Commande: full_date
      },
      {
        merge: true,
      }
    );
    
  };

  currentDate = String(date + '-' + month + '-' + year);

  const handleGoToHome = () => {
    navigation.navigate('Home');
  }

  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Aucun vêtement sélectionné</Text>
            <TouchableOpacity
                  style={{
                    backgroundColor: "#088F8F",
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 50,
                    alignSelf: "center"
                  }}
                  onPress={handleGoToHome}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "600",
                      textAlign: "center"
                    }}
                  >
                    Aller à l'écran d'accueil
                  </Text>
          </TouchableOpacity>
          </View>
          
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text>Panier</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 12,
                  }}
                  key={index}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                    {item.name}
                  </Text>

                  {/* - + button */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQty(item)); // product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#088F8F",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQty(item)); //product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {item.price * item.quantity} CFA
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Facturation
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Prix Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                     {total} CFA
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Frais de Livraison
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    0 CFA
                  </Text>
                </View>

                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View> */}

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Qualite de Service
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.vip}
                  </Text>
                </View>
                

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Jour de recuperation
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                  {route.params.Jour_recuperation ? route.params.Jour_recuperation : currentDate}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Nombre de Jours
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.Nombre_jours}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Heure de recuperation
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.Heure_recuperation}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {total} CFA
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "white" }}>
              {cart.length} vêtements | {total} CFA
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

          <Pressable onPress={placeOrder}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Finalisez {">"}
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
