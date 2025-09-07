import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { NoticeScreen } from '../screens/NoticeScreen'
// import { HostRegisterScreen } from '../screens/HostRegisterScreen';
// import { MapScreen } from '../screens/BottomScreen/MapScreen';
import { StoplistScreen } from '../screens/StoplistScreen'
import { MyScreen } from '../screens/BottomScreen/MyScreen'

export type TabParamList = {
  Home: undefined
  List: undefined
  // Map : undefined;
  Notice: undefined
  HostRegister: undefined

  마이페이지: undefined
}

const Tab = createBottomTabNavigator()

export const BottomTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="List" component={StoplistScreen} />
    {/* <Tab.Screen name="Map" component={MapScreen} /> */}
    <Tab.Screen name="Notice" component={NoticeScreen} />
    <Tab.Screen name="마이 페이지" component={MyScreen} />
    {/* <Tab.Screen name="HostRegister" component={HostRegisterScreen} /> */}
  </Tab.Navigator>
)
