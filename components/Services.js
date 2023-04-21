import { StyleSheet, Text, View ,ScrollView,Pressable,Image} from 'react-native'
import React from 'react'

const Services = () => {

 const services = [
    {
      id: "0",
      image: "https://p.kindpng.com/picc/s/741-7411541_washing-machine-png-download-washing-machine-transparent-png.png",
      name: "Blanchissage",
     
    },
    {
      id: "11",
      image: "https://p.kindpng.com/picc/s/208-2086777_washing-machine-with-clothes-png-transparent-png.png",
      name: "Lavage"
    },
    {
      id: "12",
      image: "https://p.kindpng.com/picc/s/233-2337782_iron-png-transparent-png.png",
      name: "Repassage",
     
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Nettoyage",
    },
   
  ];
  return (
    <View style={{padding:10}}>
        <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Services Available</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((service,index) => (
                <Pressable style={{margin:10,backgroundColor:"#088F8F",padding:12,borderRadius:7}} key={index}>
                    <Image source={{uri:service.image}} style={{width:80,height:80, alignSelf: 'center'}}/>

                    <Text style={{textAlign:"center",marginTop:10, color: "white", fontWeight:"800"}}>{service.name}</Text>
                </Pressable>
            ))}
        </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})