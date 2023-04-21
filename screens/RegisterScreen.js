import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordMatched = () => {
    return password === confirmPassword;
  };

  


  const register = async () => {
    if (email === "" || password === "" || phone === "" || confirmPassword == "") {
      Alert.alert(
        "Champ(s) invalide(s)",
        "S'il vous plaît remplir tous les champs",
        [
          {
            text: "Annuler",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("user credential", userCredential);

      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;
      setLoading(false);

      await setDoc(doc(db, "users", `${myUserUid}`), {
        Email: user,
        Telephone: phone,
        Nom: name,
        Ville: city
      });
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Error",
          "L'adresse email est déjà utilisée par un autre compte",
          [{ text: "OK" }],
          { cancelable: false }
        );
      } else if (error.code === "auth/weak-password") {
        Alert.alert(
          "Error",
          "Le mot de passe est trop faible. Veuillez utiliser au moins 6 caractères",
          [{ text: "OK" }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Error",
          "Erreur, veuillez ressayer",
          [{ text: "OK" }],
          { cancelable: false }
        );
        console.log("error: ", error);
      }
    }
  };
  
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
            marginTop: 70,
          }}
        >
          <Text style={{ fontSize: 20, color: "#088F8F", fontWeight: "bold" }}>
            Register
          </Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Create a new Account
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

          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View> */}

<View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="phone" size={24} color="black" />
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Phone No"
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

          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="user" size={24} color="black" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Name"
              placeholderTextColor="#808080"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="home" size={24} color="black" />
            <TextInput
              value={city}
              onChangeText={(text) => setCity(text)}
              placeholder="Ville de Residence"
              placeholderTextColor="#808080"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
                marginTop: 20,
              }}
            />
          </View>

<View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="key-outline" size={24} color="black" />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          placeholder="Mot de Passe"
          placeholderTextColor="#808080"
          style={{
            fontSize: 18,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginLeft: 13,
            width: 300,
            marginVertical: 20,
          }}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="key-outline" size={24} color="black" />
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!showPassword}
          placeholder="Confirmez Mot de Passe"
          placeholderTextColor="#808080"
          style={{
            fontSize: 18,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginLeft: 13,
            width: 300,
            marginVertical: 10,
          }}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {!isPasswordMatched() && (
        <Text style={{ color: 'red' }}>Mots de passe incompatibles</Text>
      )}
    </View>

          

          <Pressable
          onPress={register}
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
              Register
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Deja un compte? Connectez-vous
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
