import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
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
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E5EA",
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "500",
      },
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "#8E8E93",
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            size={24}
            color={color}
          />
        ),
        tabBarLabel: "홈",
      }}
    />
    <Tab.Screen
      name="List"
      component={StoplistScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "menu" : "menu-outline"}
            size={24}
            color={color}
          />
        ),
        tabBarLabel: "목록",
      }}
    />
    <Tab.Screen
      name="Notice"
      component={NoticeScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "notifications" : "notifications-outline"}
            size={24}
            color={color}
          />
        ),
        tabBarLabel: "알림",
      }}
    />
    <Tab.Screen
      name="mypage"
      component={MyScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "person" : "person-outline"}
            size={24}
            color={color}
          />
        ),
        tabBarLabel: "마이페이지",
      }}
    />
  </Tab.Navigator>
);
