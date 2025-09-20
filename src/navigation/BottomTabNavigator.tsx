import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { NoticeScreen } from "../screens/NoticeScreen";
import { StoplistScreen } from "../screens/StoplistScreen";
import { MyScreen } from "../screens/BottomScreen/MyScreen";

export type TabParamList = {
  Home: undefined;
  List: undefined;
  Notice: undefined;
  HostRegister: undefined;
  mypage: undefined;
};

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="List" component={StoplistScreen} />
    {/* <Tab.Screen name="Map" component={MapScreen} /> */}
    <Tab.Screen name="Notice" component={NoticeScreen} />
    <Tab.Screen name="mypage" component={MyScreen} />
  </Tab.Navigator>
);
