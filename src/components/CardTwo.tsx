import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface CardTwoProps {
  imageSource: any; // 이미지 소스 (require() 또는 { uri: '...' })
  title: string;
  waitingCount: number; // 대기 인원 수
  estimatedTime: string; // 예상 시간 텍스트
  onPress?: () => void; // 카드 클릭 시 실행될 함수 (선택 사항)
}

export const CardTwo: React.FC<CardTwoProps> = ({
  imageSource,
  title,
  waitingCount,
  estimatedTime,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.8}>
      <Image source={imageSource} style={styles.cardImage} />
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>대기 {waitingCount}명</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.estimatedTime}>{estimatedTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 180, // 이미지에 맞게 조절
    height: 150,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 12,
    overflow: 'hidden', // 이미지가 둥근 모서리에 맞게 잘리도록
  },
  cardImage: {
    width: '100%',
    height: 100, // 이미지 높이 조절
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#2E63E8', // 파란색 배경
    borderRadius: 4, 
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  textContainer: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  estimatedTime: {
    fontSize: 10,
    color: '#007AFF', // 파란색 텍스트
  },
}); 