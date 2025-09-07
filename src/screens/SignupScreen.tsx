import React, { useState } from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";

import {
  handleSignup,
  handleSendAuthCode,
  handleVerifyAuthCode,
} from "../../package/shared/api/auth/Signup";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;
export const SignupScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [authRequested, setAuthRequested] = useState(false);
  const [authCode, setAuthCode] = useState("");

  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleGenderSelect = (value: string) => {
    setGender(value);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        입력한 정보가 맞다면{"\n"}아래 확인 버튼을 눌러주세요.
      </Text>

      {/* 휴대폰 번호 + 인증번호 발급 버튼 */}
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <InputField
            label="휴대폰 번호"
            placeholder="010-1111-1111"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity
          style={styles.authButton}
          onPress={() =>
            handleSendAuthCode(phoneNumber, () => setAuthRequested(true))
          }
        >
          <Text style={styles.authButtonText}>인증번호 발급</Text>
        </TouchableOpacity>
      </View>

      {authRequested && (
        <>
          <InputField
            label="인증번호"
            placeholder="123456"
            value={authCode}
            onChangeText={setAuthCode}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() =>
              handleVerifyAuthCode(phoneNumber, authCode, () => {
                // 인증 성공 후 로직 (예: 버튼 활성화 등)
              })
            }
          >
            <Text style={styles.verifyText}>인증 확인</Text>
          </TouchableOpacity>
        </>
      )}

      <InputField
        label="비밀번호"
        placeholder="비밀번호 4~10자 입력"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        label="이름"
        placeholder="홍길동"
        value={name}
        onChangeText={setName}
      />
      <InputField
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        value={nickName}
        onChangeText={setNickName}
      />

      <Text style={styles.genderLabel}>성별</Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === "남" && styles.genderSelected,
          ]}
          onPress={() => handleGenderSelect("남")}
        >
          <Text
            style={
              gender === "남" ? styles.genderTextSelected : styles.genderText
            }
          >
            남
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === "여" && styles.genderSelected,
          ]}
          onPress={() => handleGenderSelect("여")}
        >
          <Text
            style={
              gender === "여" ? styles.genderTextSelected : styles.genderText
            }
          >
            여
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <Button
          title="확인"
          color="#4B6EF6"
          onPress={() =>
            handleSignup({
              name,
              nickName,
              password,
              phoneNumber,
              gender,
            }).then((res) => {
              if (res) {
                navigation.navigate("LoginScreen");
              }
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  authButton: {
    marginLeft: 10,
    backgroundColor: "#4B6EF6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,

    justifyContent: "center",
  },
  authButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },

  genderLabel: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  genderSelected: {
    backgroundColor: "#4B6EF6",
    borderColor: "#4B6EF6",
  },
  genderText: {
    color: "#333",
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  verifyButton: {
    backgroundColor: "#4B6EF6",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  verifyText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});
