// HomeScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';

import { Header } from '../components/Header';
import { CardTwo } from '../components/CardTwo';
import { SafeAreaView } from 'react-native-safe-area-context';


export const StoplistScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.horizontalContainer}>
          <CardTwo
            imageSource={{ uri: 'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2021/10/%EC%8B%A0%EC%84%B8%EA%B3%84%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%82%A0_%EB%B3%B8%EB%AC%B81.png' }}
            title="동양미래대 학식"
            waitingCount={7}
            estimatedTime="예상시간 35 ~ 55분"
            onPress={() => console.log('CardTwo clicked!')}
          />
          <CardTwo
            imageSource={{ uri: 'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2021/10/%EC%8B%A0%EC%84%B8%EA%B3%84%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%82%A0_%EB%B3%B8%EB%AC%B81.png' }}
            title="동양미래대 학식"
            waitingCount={7}
            estimatedTime="예상시간 35 ~ 55분"
            onPress={() => console.log('CardTwo clicked!')}
          />

          <CardTwo
            imageSource={{ uri: 'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2021/10/%EC%8B%A0%EC%84%B8%EA%B3%84%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%82%A0_%EB%B3%B8%EB%AC%B81.png' }}
            title="동양미래대 학식"
            waitingCount={7}
            estimatedTime="예상시간 35 ~ 55분"
            onPress={() => console.log('CardTwo clicked!')}
          />

          <CardTwo
            imageSource={{ uri: 'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2021/10/%EC%8B%A0%EC%84%B8%EA%B3%84%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%82%A0_%EB%B3%B8%EB%AC%B81.png' }}
            title="동양미래대 학식"
            waitingCount={7}
            estimatedTime="예상시간 35 ~ 55분"
            onPress={() => console.log('CardTwo clicked!')}
          />
        </View>
      </View>
    </SafeAreaView>
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
  header: {},
  banner: { height: 200, marginVertical: 20, borderColor: '#000', borderRadius: 10, borderWidth: 1, },
  bannerImage: { width: '100%', height: '100%', borderRadius: 10 },
  section: { padding: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  horizontalContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  card: {
    width: 160, height: 100, marginRight: 12,
    backgroundColor: '#f2f2f2', borderRadius: 10,
    justifyContent: 'center', alignItems: 'center'
  },
  rankWrapper: { marginTop: 20 },
  rankRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  rankNum: { width: 20, color: '#888' },
  rankText: { width: '40%' },
});

