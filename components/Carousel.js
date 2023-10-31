import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    // "https://img.freepik.com/premium-photo/cheerful-african-american-woman-with-towels-hands-near-washing-machine-selfservice-laundry_627829-4651.jpg",
    "https://www.thelaundryvan.com/media/1291/laundromatimage_cropped.jpg",
    "https://cdn.create.vista.com/api/media/small/521108608/stock-photo-open-washing-machine-clothes-laundry-basket-green-plant-white-wall",
    "https://media.istockphoto.com/id/1318399310/photo/laundry-detergents-and-dirty-clothes.webp?b=1&s=170667a&w=0&k=20&c=Y_YqOi3SuAx35-ap2T0nVIN9D3tkyFLNhUJPzQVPwN8=",
    "https://hips.hearstapps.com/hmg-prod/images/ghk030121laundrypackage-015-1617040989.jpg?crop=0.923xw:0.692xh;0.0212xw,0.223xh&resize=768:*",
    "https://www.cleanipedia.com/images/yvwvo5xgjuhg/a300aaf8a733c2f192c651da58b8605e/6bf43db26f53e4f6433e7c05a8c3406f/aHR0cHNfX193d3cuY2xlYW5pcGVkaWEuY29tX2NvbnRlbnRfZGFtX3VuaWxldmVyX2NsZWFuaXBlZGlhX2dsb2JhbF93ZWJzaXRlX2xhdW5kcnlfb25fYV9idWRnZXQtMTM1NzM4NC5qcGc/990w-660h/image-of-clothes-hanging-on-clothing-rack-with-orange-background.jpg",
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
