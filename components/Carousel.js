import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://img.freepik.com/premium-photo/cheerful-african-american-woman-with-towels-hands-near-washing-machine-selfservice-laundry_627829-4651.jpg",
    // "https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/whirlpoolv2/en-us/marketing-content/site-assets/page-content/oc-articles/how-often-should-you-wash-your-clothes/how-often-to-wash-clothes_img2m.jpg?fmt=png-alpha&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0&scl=1&constrain=fit,1",
    "https://c8.alamy.com/zooms/9/fa9add8c6e57402c8bdac12e55ab3741/2c6aewt.jpg",
    "https://media.cnn.com/api/v1/images/stellar/prod/210915161222-laundry1.jpg?q=w_1700,h_957,x_0,y_0,c_fill",
    // "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    // "https://www.goteso.com/blog/wp-content/uploads/2019/03/Reasons-Behind-The-Failure-Of-Online-Laundry-Service-App-Like-Washio.png",
    // "https://p.kindpng.com/picc/s/360-3604920_tips-wash-clothes-less-hd-png-download.png",
    "https://media.istockphoto.com/id/1302001997/photo/african-american-man-watching-a-tutorial-for-handling-a-washing-machine.jpg?s=612x612&w=0&k=20&c=jmmPA5tigMfDoNN9flCr-s3MaB0_VyJYYl1NgRBeM90=",
    "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2018/07/GettyImages-929976910.jpg",
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
