import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { getHostDetail, HostDetail, API_BASE_URL } from "../services/hostApi";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const { width, height } = Dimensions.get("window");

type StorDetailScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  "StorDetailScreen"
>["route"];

export const StorDetailScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<StorDetailScreenRouteProp>();
  const { hostId } = route.params;

  const [hostDetail, setHostDetail] = useState<HostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 지도 초기 위치 (서울 영등포구 기준)
  const initialRegion = {
    latitude: 37.5172,
    longitude: 126.9073,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    const fetchHostDetail = async () => {
      try {
        const data = await getHostDetail(hostId);
        setHostDetail(data);
        console.log("Fetched Host Detail:", data);
      } catch (err) {
        setError("호스트 상세 정보를 불러오는 데 실패했습니다.");
        console.error("Error fetching host detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (hostId) {
      fetchHostDetail();
    }
  }, [hostId]);

  const handleReserve = () => {
    Alert.alert("대기번호 발급", "대기번호를 발급받으시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "발급받기",
        onPress: () => navigation.navigate("WaitingNumScreen"),
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingText}>상세 정보를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              setError(null);
            }}
          >
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!hostDetail) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorText}>데이터를 찾을 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const carouselImages = hostDetail.imgUrl
    ? [hostDetail.imgUrl]
    : ["https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=No+Image"];

  const keywords = hostDetail.keyword
    ? hostDetail.keyword.split(", ")
    : ["편의시설", "주차장", "무선인터넷"];

  // 매장 위치 (API에서 받은 좌표 사용, 없으면 기본값)
  const storeLocation = {
    latitude: hostDetail.latitude || 37.5172,
    longitude: hostDetail.longitude || 126.9073,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 이미지 */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: hostDetail.imgUrl
                ? hostDetail.imgUrl.startsWith("http")
                  ? hostDetail.imgUrl
                  : `${API_BASE_URL}${hostDetail.imgUrl}`
                : "https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=No+Image",
            }}
            style={styles.headerImage}
            resizeMode="cover"
          />

          {/* 네비게이션 바 */}
          <View style={styles.navBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>

          {/* 이미지 인디케이터 */}
          <View style={styles.imageIndicators}>
            {carouselImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* 매장 정보 카드 */}
        <View style={styles.infoCard}>
          <Text style={styles.storeName}>{hostDetail.hostName}</Text>

          <Text style={styles.description} numberOfLines={3}>
            {hostDetail.description}
          </Text>
          <TouchableOpacity>
            <Text style={styles.moreText}>더보기</Text>
          </TouchableOpacity>

          {/* 위치 정보 */}
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>영등포역 5번 출구에서 112m</Text>
          </View>

          {/* 운영시간 */}
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}></Text>
            <Text style={styles.infoText}>
              {hostDetail.startTime} ~ {hostDetail.endTime}
            </Text>
          </View>

          {/* 주요 시설 */}
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>️</Text>
            <Text style={styles.infoText}>
              프리웨이트존, 유산소존, 스쿼트랙
            </Text>
          </View>

          <View style={styles.divider} />
        </View>

        {/* 위치 섹션 - 구글 지도 */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>위치</Text>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                ...initialRegion,
                latitude: storeLocation.latitude,
                longitude: storeLocation.longitude,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              <Marker
                coordinate={storeLocation}
                title={hostDetail.hostName}
                description={hostDetail.description}
                pinColor="red"
              />
            </MapView>
          </View>
          <View style={styles.divider} />
        </View>

        {/* 대표 키워드 섹션 */}
        <View style={styles.keywordsSection}>
          <Text style={styles.sectionTitle}>대표 키워드</Text>
          <View style={styles.keywordsContainer}>
            {keywords.map((keyword, index) => (
              <View key={index} style={styles.keywordButton}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 하단 여백 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* 고정 예약 버튼 */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Text style={styles.reserveButtonText}>대기번호 발급받기</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#fff",
  },
  loadingContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    height: height * 0.4,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  navBar: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageIndicators: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#fff",
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 20,
  },
  storeName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 4,
  },
  moreText: {
    fontSize: 14,
    color: "#4A90E2",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginTop: 16,
  },
  locationSection: {
    backgroundColor: "#fff",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  keywordsSection: {
    backgroundColor: "#fff",
    padding: 20,
  },
  keywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  keywordButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  keywordText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 100,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  reserveButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
