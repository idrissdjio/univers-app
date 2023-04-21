import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://c8.alamy.com/zooms/9/fa9add8c6e57402c8bdac12e55ab3741/2c6aewt.jpg",
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://www.goteso.com/blog/wp-content/uploads/2019/03/Reasons-Behind-The-Failure-Of-Online-Laundry-Service-App-Like-Washio.png",
    "https://p.kindpng.com/picc/s/360-3604920_tips-wash-clothes-less-hd-png-download.png",
    "https://media.istockphoto.com/id/1302001997/photo/african-american-man-watching-a-tutorial-for-handling-a-washing-machine.jpg?s=612x612&w=0&k=20&c=jmmPA5tigMfDoNN9flCr-s3MaB0_VyJYYl1NgRBeM90=",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
        autoplayInterval={2000}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
