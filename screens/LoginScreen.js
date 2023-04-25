import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

 const login = () => {
    if(!email || !password) {
      Alert.alert(
        "Champs vides ou invalides",
        "Veuillez remplir tous les champs",
        [
          {
            text: "Annuler",
            onPress: () => console.log("Annuler Pressé"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressé") }
        ],
        { cancelable: false }
      );
    } else {
      const auth = getAuth();
      setLoading(true);
      signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
          console.log("user credential",userCredential);
          const user = userCredential.user;
          console.log("user details",user)
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.code === 'auth/user-not-found') { 
            Alert.alert(
              "Erreur d'authentification",
              "Le compte associé à cet email n'a pas été trouvé. Veuillez vérifier votre email et votre mot de passe, et réessayer.",
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressé"),
                  style: "cancel"
                }
              ],
              { cancelable: false }
            );
          } else if (error.code === 'auth/wrong-password') {
            Alert.alert(
              "Erreur d'authentification",
              "Le mot de passe est incorrect. Veuillez vérifier votre email et votre mot de passe, et réessayer.",
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressé"),
                  style: "cancel"
                }
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Erreur d'authentification",
              "Probleme d'authentification",
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressé"),
                  style: "cancel"
                }
              ],
              { cancelable: false }
            );
          }
        });
    }
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      {loading ? (
        <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
          <Text style={{marginRight:10}}>Loading</Text>
          <ActivityIndicator size="large" color={"red"}/>
        </View>
      ) : (
        <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#088F8F", fontWeight: "bold" }}>
            Login
          </Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Se connecter dans son account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#808080"
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Mot de Passe"
              placeholderTextColor="#808080"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>


          <Pressable
          onPress={login}
            style={{
              width: 200,
              backgroundColor: "#088F8F",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Se connecter
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
            <View style={{flexDirection: "row", justifyContent: 'space-evenly',alignItems: 'center',}}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Pas de compte? 
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "#088F8F",
                fontWeight: "500",
              }}
            >
              Creér un compte ici
            </Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});