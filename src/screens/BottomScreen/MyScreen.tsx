import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { API_BASE_URL } from '../../services/hostApi';
import { RootStackParamList } from '../../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MyScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);
      } catch (error) {
        console.error('Failed to load user ID from AsyncStorage', error);
      }
    };
    getUserId();
  }, []);

  const handleWithdrawal = async () => {
    if (!userId) {
      Alert.alert("오류", "사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    Alert.alert(
      "회원 탈퇴",
      "정말로 회원 탈퇴하시겠습니까? 모든 정보가 삭제됩니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "탈퇴",
          onPress: async () => {
            try {
              const response = await axios.delete(`${API_BASE_URL}/quit/${userId}`);
              if (response.status === 204) {
                Alert.alert("성공", "회원 탈퇴 되었습니다.", [
                  { 
                    text: "확인", 
                    onPress: async () => {
                      // AsyncStorage에서 userId 및 userToken 삭제
                      await AsyncStorage.removeItem('userId');
                      await AsyncStorage.removeItem('userToken');
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }], // 로그인 화면으로 이동
                      });
                    }
                  }
                ]);
              }
            } catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.response) {
                  if (error.response.status === 401) {
                    Alert.alert("오류", "인증에 실패했습니다.");
                  } else if (error.response.status === 404) {
                    Alert.alert("오류", "회원 정보를 찾을 수 없습니다.");
                  } else {
                    Alert.alert("오류", `회원 탈퇴 중 오류가 발생했습니다: ${error.response.status}`);
                  }
                } else {
                  Alert.alert("오류", "네트워크 오류가 발생했습니다.");
                }
              } else {
                Alert.alert("오류", "알 수 없는 오류가 발생했습니다.");
              }
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>프로필 수정</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.nickname}>사용자 닉네임</Text>
          <Text style={styles.bio}>안녕하세요! 줄서기 앱을 이용하고 있습니다.</Text>
        </View>

        {/* 활동 내역 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>활동 내역</Text>
          <View style={styles.activityGrid}>
            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityNumber}>0</Text>
              <Text style={styles.activityLabel}>줄선 장소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityNumber}>0</Text>
              <Text style={styles.activityLabel}>호스트 장소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityNumber}>0</Text>
              <Text style={styles.activityLabel}>즐겨찾기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 메뉴 섹션 */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>알림 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>계정 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>앱 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>고객센터</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.withdrawalButton]} onPress={handleWithdrawal}>
            <Text style={styles.withdrawalText}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  editProfileText: {
    color: '#333',
    fontSize: 14,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  activityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  activityItem: {
    alignItems: 'center',
  },
  activityNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  activityLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuSection: {
    padding: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
  },
  withdrawalButton: {
    marginTop: 10,
    borderBottomWidth: 0,
  },
  withdrawalText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
  },
});
