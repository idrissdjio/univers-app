import { StyleSheet, Text, View ,ScrollView,Pressable,Image} from 'react-native'
import React from 'react'

const Services = () => {

 const services = [
    {
      id: "0",
      image: "https://thumbs.dreamstime.com/z/young-african-american-woman-holding-laundry-basket-doing-ok-sign-fingers-smiling-friendly-gesturing-excellent-symbol-young-219478420.jpg",
      name: "Blanchissage",
     
    },
    {
      id: "11",
      image: "https://thumbs.dreamstime.com/z/young-black-african-american-woman-washing-her-clothes-automatic-laundry-143393929.jpg",
      name: "Lavage"
    },
    {
      id: "12",
      image: "https://thumbs.dreamstime.com/z/african-woman-doing-laundry-folding-denim-blue-jeans-isolated-white-background-chores-ironing-concept-african-woman-117632337.jpg",
      name: "Repassage",
     
    },
    {
      id: "13",
      image: "https://thumbs.dreamstime.com/z/big-washing-concept-clothing-ropes-rushes-machine-dryer-isolated-white-background-88501411.jpg",
      name: "Nettoyage",
    },
   
  ];
  return (
    <View style={{padding:10}}>
        <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Services Disponible</Text>
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