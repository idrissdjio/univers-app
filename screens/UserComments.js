import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { auth, db } from '../firebase';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function UserComments() {
  const [comment, setComment] = useState('');
  const userUid = auth.currentUser.uid;
  const navigation = useNavigation();

  const handlePostComment = async () => {
    await setDoc(
      doc(db, "Commentaires", `${userUid}`),
      {
        Message: comment
      },
      {
        merge: false,
      }
    );
    Alert.alert("Votre commentaire a bien été transmis avec succès", "Nous tenons à exprimer notre sincère gratitude pour le temps que vous avez pris afin d'évaluer cette application. Votre avis est très important pour nous et nous l'examinerons avec la plus grande attention.")
    navigation.navigate('Home')
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>uTOK</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          placeholder="Laissez un commentaire ici..."
          multiline={true}
          numberOfLines={10}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePostComment}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginLeft: 5,
    marginRight: 5,
    
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C4C4C4',
    padding: 10,
    marginBottom: 10,
    marginTop: 90,
    height: 200
  },
  input: {
    fontSize: 16,
    color: '#000000',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  button: {
    backgroundColor: '#088F8F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    // backgroundColor: '#088F8F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 60/
  },
  title: {
    color: '#088F8F',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
