import React, { useEffect } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    console.log('스플래시 화면이 마운트되었습니다');
    
    const timer = setTimeout(() => {
      console.log('HomeScreen으로 이동을 시도합니다');
      try {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
        console.log('네비게이션 리셋이 완료되었습니다');
      } catch (error) {
        console.error('네비게이션 에러:', error);
      }
    }, 3000);
  
    return () => {
      console.log('타이머를 정리합니다');
      clearTimeout(timer);
    };
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2E63E8" barStyle="light-content" />
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <ActivityIndicator size="large" color="#2E63E8" style={{ marginTop: 20 }} animating={true} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(50),
    height: hp(20), 
    resizeMode: 'contain',
  },
});
