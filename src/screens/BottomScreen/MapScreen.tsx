import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.content}>
        <Text style={styles.title}>프로필</Text>
        {/* 프로필 화면 컨텐츠를 여기에 추가 */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
