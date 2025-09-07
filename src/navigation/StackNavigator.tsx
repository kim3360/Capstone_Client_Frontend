import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from "../screens/SplashScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { StorDetailScreen } from "../screens/StoreDetailScreen";
import { WaitingNumScreen } from "../screens/WaitingList/WaitingNumScreen";

export type RootStackParamList = {
  SplashScreen: undefined;
  MainTabs: undefined;
  StorDetailScreen: { hostId: number };
  LoginScreen: undefined;
  SignupScreen: undefined;
  WaitingNumScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
          // 토큰 유효성 검사 (예: API 호출하여 토큰 유효성 확인)
          // 지금은 토큰이 존재하면 로그인된 것으로 간주
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error("Failed to load user token from AsyncStorage", e);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? "MainTabs" : "LoginScreen"}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="StorDetailScreen" component={StorDetailScreen} />
      <Stack.Screen name="WaitingNumScreen" component={WaitingNumScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
