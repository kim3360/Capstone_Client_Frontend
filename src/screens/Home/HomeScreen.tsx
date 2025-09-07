// HomeScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import {
  getAllHostSessions,
  HostSession,
  API_BASE_URL,
} from "../../services/hostApi"; // API_BASE_URL 임포트

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  console.log("HomeScreen rendered"); // 컴포넌트 렌더링 확인 로그
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [hostSessions, setHostSessions] = useState<HostSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHostSessions = async () => {
      try {
        const data = await getAllHostSessions();
        setHostSessions(data);
      } catch (err) {
        setError("호스트 세션을 불러오는 데 실패했습니다.");
        console.error("Error fetching host sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostSessions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>데이터를 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />

        <View style={styles.banner}>
          <Image
            source={{
              uri: "https://www.fashionbiz.co.kr/images/etcImg/1734912608622-%E3%84%B7%E3%84%B9%E3%84%B7%E3%84%B9%E3%84%B7%E3%84%B9%E3%84%B7.jpg",
            }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* 인기 줄서기 스팟 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>트렌드 줄서기 스팟</Text>
            <TouchableOpacity>
              <Text> 전체보기 </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.horizontalScrollView}
            showsHorizontalScrollIndicator={false}
          >
            {hostSessions.map((session) => {
              let imageUrl =
                "https://www.noblesse.com/shop/data/m/editor_new/2024/10/04/4307ea0d8f60886cimage1.jpg";
              if (session.imgUrl) {
                if (session.imgUrl.startsWith("http://")) {
                  imageUrl = `https://${session.imgUrl.substring(7)}`;
                } else if (session.imgUrl.startsWith("https://")) {
                  imageUrl = session.imgUrl;
                } else {
                  imageUrl = `${API_BASE_URL}${session.imgUrl}`;
                }
              }
              return (
                <Card
                  key={session.hostId}
                  imageSource={imageUrl}
                  title={session.hostName}
                  onPress={() =>
                    navigation.navigate("StorDetailScreen", {
                      hostId: session.hostId,
                    })
                  }
                />
              );
            })}
          </ScrollView>
        </View>

        {/* 급상승 검색어 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>급상승 검색어</Text>
          </View>

          <View style={styles.rankWrapper}>
            {[
              ["동양미래대 축제부스", "롯데월드"],
              ["인천공항 대기열", "인하공전 축제부스"],
              ["헬스장 기구대기줄", "김포공항 대기열"],
              ["인천사랑병원", "동양미래대 학식"],
              ["에버랜드", "금강"],
            ].map((row, idx) => (
              <View key={idx} style={styles.rankRow}>
                <Text style={styles.rankNum}>{idx + 1}</Text>
                <Text style={styles.rankText}>{row[0]}</Text>
                <Text style={styles.rankNum}>{idx + 6}</Text>
                <Text style={styles.rankText}>{row[1]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 내 주변 줄서기 스팟 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>내 주변 줄서기 스팟</Text>
            <TouchableOpacity>
              <Text> 전체보기 </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={styles.horizontalScrollView}
            showsHorizontalScrollIndicator={false}
          >
            {hostSessions.map((session) => {
              let imageUrl =
                "https://www.noblesse.com/shop/data/m/editor_new/2024/10/04/4307ea0d8f60886cimage1.jpg"; // 기본 대체 이미지 URL
              console.log("Original session.imgUrl:", session.imgUrl); // 디버깅을 위한 로그 추가
              if (session.imgUrl) {
                if (session.imgUrl.startsWith("http://")) {
                  // http로 시작하면 https로 강제 변경
                  imageUrl = `https://${session.imgUrl.substring(7)}`;
                } else if (session.imgUrl.startsWith("https://")) {
                  imageUrl = session.imgUrl;
                } else {
                  // 상대 경로의 경우 API_BASE_URL에 직접 연결
                  imageUrl = `${API_BASE_URL}${session.imgUrl}`;
                }
              }
              console.log("Final imageUrl:", imageUrl); // 디버깅을 위한 로그 추가
              return (
                <Card
                  key={session.hostId}
                  imageSource={imageUrl}
                  title={session.hostName}
                  onPress={() =>
                    navigation.navigate("StorDetailScreen", {
                      hostId: session.hostId,
                    })
                  }
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffebee",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ef9a9a",
  },
  tabContainer: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  banner: {
    height: 200,
    marginVertical: 20,
    borderWidth: 1,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  horizontalContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  horizontalScrollView: {
    marginTop: 10,
    paddingBottom: 10,
  },
  card: {
    width: 160,
    height: 100,
    marginRight: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rankWrapper: {
    marginTop: 20,
  },
  rankRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rankNum: {
    width: 20,
    color: "#888",
  },
  rankText: {
    width: "40%",
  },
});
