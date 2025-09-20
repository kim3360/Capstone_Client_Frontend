import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SplashScreen"
>;

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const handleStartPress = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Image
        source={require("../../assets/splash.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.logoText}>HIY</Text>

        <Text style={styles.mainText}>대기 없이, 스마트 하게!</Text>

        <Text style={styles.subText}>앱에서 대기번호 발급, 도착 알림까지!</Text>
      </View>

      {/* 시작하기 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    top: 0,
    left: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(10),
  },
  logoText: {
    fontSize: wp(15),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: hp(3),
    letterSpacing: 2,
  },
  mainText: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: hp(2),
    lineHeight: wp(7),
  },
  subText: {
    fontSize: wp(4),
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.9,
    lineHeight: wp(5),
  },
  buttonContainer: {
    paddingHorizontal: wp(10),
    paddingBottom: hp(8),
  },
  startButton: {
    backgroundColor: "#8B4513",
    paddingVertical: hp(2),
    paddingHorizontal: wp(20),
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: wp(4.5),
    fontWeight: "600",
  },
});
