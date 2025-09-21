import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { API_BASE_URL } from "../../services/hostApi";
import { RootStackParamList } from "../../navigation/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export const MyScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId);
      } catch (error) {
        console.error("Failed to load user ID from AsyncStorage", error);
      }
    };
    getUserId();
  }, []);

  const handleWithdrawal = async () => {
    if (!userId) {
      Alert.alert(
        "오류",
        "사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요."
      );
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
              const response = await axios.delete(
                `${API_BASE_URL}/quit/${userId}`
              );
              if (response.status === 204) {
                Alert.alert("성공", "회원 탈퇴 되었습니다.", [
                  {
                    text: "확인",
                    onPress: async () => {
                      await AsyncStorage.removeItem("userId");
                      await AsyncStorage.removeItem("userToken");
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "LoginScreen" }],
                      });
                    },
                  },
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
                    Alert.alert(
                      "오류",
                      `회원 탈퇴 중 오류가 발생했습니다: ${error.response.status}`
                    );
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

  const handleLogout = async () => {
    Alert.alert("로그아웃", "정말로 로그아웃하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "로그아웃",
        onPress: async () => {
          await AsyncStorage.removeItem("userId");
          await AsyncStorage.removeItem("userToken");
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  const menuItems = [
    { icon: "notifications-outline", title: "알림 설정", onPress: () => {} },
    { icon: "person-outline", title: "계정 설정", onPress: () => {} },
    { icon: "settings-outline", title: "앱 설정", onPress: () => {} },
    { icon: "help-circle-outline", title: "고객센터", onPress: () => {} },
    { icon: "document-text-outline", title: "이용약관", onPress: () => {} },
    {
      icon: "shield-checkmark-outline",
      title: "개인정보처리방침",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>마이페이지</Text>
        </View>

        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/120" }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editProfileButton}>
              <Icon name="camera" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.nickname}>사용자 닉네임</Text>
          <Text style={styles.bio}>
            안녕하세요! 줄서기 앱을 이용하고 있습니다.
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>

        {/* 활동 내역 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>활동 내역</Text>
          <View style={styles.activityGrid}>
            <TouchableOpacity style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Icon name="location-outline" size={24} color="#007AFF" />
              </View>
              <Text style={styles.activityNumber}>0</Text>
              <Text style={styles.activityLabel}>줄선 장소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Icon name="storefront-outline" size={24} color="#34C759" />
              </View>
              <Text style={styles.activityNumber}>0</Text>
              <Text style={styles.activityLabel}>호스트 장소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Icon name="heart-outline" size={24} color="#FF3B30" />
              </View>
              <Text style={styles.activityNumber}>0</Text>
              <Text style={styles.activityLabel}>즐겨찾기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 메뉴 섹션 */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name={item.icon} size={20} color="#666" />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 로그아웃/탈퇴 섹션 */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.withdrawalButton}
            onPress={handleWithdrawal}
          >
            <Icon name="trash-outline" size={20} color="#FF3B30" />
            <Text style={styles.withdrawalText}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>

        {/* 하단 여백 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  profileSection: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 12,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#E5E5EA",
  },
  editProfileButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E5EA",
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 20,
  },
  activityGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  activityItem: {
    alignItems: "center",
    flex: 1,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  activityNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  menuSection: {
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#1C1C1E",
  },
  actionSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#FFE5E5",
  },
  logoutText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "600",
    marginLeft: 8,
  },
  withdrawalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#FFE5E5",
  },
  withdrawalText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "600",
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});
