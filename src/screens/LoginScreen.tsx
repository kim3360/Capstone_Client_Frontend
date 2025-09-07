import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { handleLogin } from "../../package/shared/api/auth/Login";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const KAKAO_AUTH_URL =
    "https://kauth.kakao.com/oauth/authorize" +
    "?client_id=YOUR_REST_API_KEY" +
    "&redirect_uri=https://example.com/oauth" +
    "&response_type=code";

  const handleKakaoLogin = async () => {
    await WebBrowser.openBrowserAsync(KAKAO_AUTH_URL);
  };

  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/\D/g, ""); // 숫자만 추출
    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11
    )}`;
  };

  const onPressLogin = async () => {
    try {
      const response = await handleLogin({ username, password });
      if (response && response.token) {
        await AsyncStorage.setItem("userToken", response.token);
        if (response.userId) {
          await AsyncStorage.setItem("userId", response.userId);
          console.log("User ID saved:", response.userId);
        }
        console.log("User token saved:", response.token);
        navigation.navigate("MainTabs");
      } else {
        console.log("Login failed or no token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>
          <Text style={{ fontWeight: "bold" }}>Wait:</Text>It
        </Text>
        <Text style={styles.tagline}>기다리는 즐거움</Text>
      </View>

      <TextInput
        placeholder="전화번호"
        value={username}
        onChangeText={(text) => setUsername(formatPhoneNumber(text))}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={onPressLogin}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("SignupScreen")}
      >
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Text style={styles.kakaoText}>카카오 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: { fontSize: 28, marginBottom: 4 },
  tagline: { fontSize: 12, color: "#333", marginBottom: 30 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: "#3B66F6",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: { color: "#fff", fontWeight: "bold" },
  signupButton: {
    backgroundColor: "#E0E7FF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  signupText: { color: "#3B66F6" },
  kakaoButton: {
    backgroundColor: "#FEE500",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  kakaoText: { color: "#000", fontWeight: "bold" },
});
