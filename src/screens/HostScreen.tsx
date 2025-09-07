import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/StackNavigator'

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>

export const HostScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>()

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.logo}>
          <Text style={{ fontWeight: 'bold' }}>호스트 이름</Text>
        </Text>
        <TextInput></TextInput>
        <Text style={styles.tagline}>최대인원</Text>
        <TextInput></TextInput>
        <Text>대표자 이름</Text>
      </SafeAreaView>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
  logo: { fontSize: 28, marginBottom: 4 },
  tagline: { fontSize: 12, color: '#333', marginBottom: 30 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#3B66F6',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: { color: '#fff', fontWeight: 'bold' },
  signupButton: {
    backgroundColor: '#E0E7FF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: { color: '#3B66F6' },
  kakaoButton: {
    backgroundColor: '#FEE500',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  kakaoText: { color: '#000', fontWeight: 'bold' },
})
