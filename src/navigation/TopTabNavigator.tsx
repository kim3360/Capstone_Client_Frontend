import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { StoplistScreen } from '../screens/StoplistScreen'
import { NoticeScreen } from '../screens/NoticeScreen'
import { HostRegisterScreen } from '../screens/HostRegisterScreen'
// import { Text, View } from 'react-native';

export type TabParamList = {
  Home: undefined
  Stoplist: undefined
  Notice: undefined
  HostRegister: undefined
}

const Tab = createMaterialTopTabNavigator()

export const TopTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Stoplist" component={StoplistScreen} />
    <Tab.Screen name="Notice" component={NoticeScreen} />
    <Tab.Screen name="HostRegister" component={HostRegisterScreen} />
  </Tab.Navigator>
)
