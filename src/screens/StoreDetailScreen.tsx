import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { getHostDetail, HostDetail, API_BASE_URL } from '../services/hostApi';

const { width } = Dimensions.get("window");

interface Facility {
    name: string;
}

const facilities: Facility[] = [
    { name: "주차장" },
    { name: "무선 인터넷" },
    { name: "남/녀 화장실 구분" },
    { name: "예약" }
];

type StorDetailScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'StorDetailScreen'>['route'];

export const StorDetailScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<StorDetailScreenRouteProp>();
    const { hostId } = route.params;

    const [hostDetail, setHostDetail] = useState<HostDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHostDetail = async () => {
            try {
                const data = await getHostDetail(hostId);
                setHostDetail(data);
                console.log("Fetched Host Detail:", data);
            } catch (err) {
                setError('호스트 상세 정보를 불러오는 데 실패했습니다.');
                console.error("Error fetching host detail:", err);
            } finally {
                setLoading(false);
            }
        };

        if (hostId) {
            fetchHostDetail();
        }
    }, [hostId]);

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text>상세 정보를 불러오는 중...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    if (!hostDetail) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text>데이터를 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    const carouselImages = hostDetail.imgUrl ? [hostDetail.imgUrl] : ["https://via.placeholder.com/400"];

    const dynamicFacilities = hostDetail.keyword ? hostDetail.keyword.split(', ').map(name => ({ name })) : [];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.swiperContainer}>
                <Carousel
                    loop
                    width={width}
                    height={200}
                    autoPlay={true}
                    autoPlayInterval={3000}
                    data={carouselImages}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
            </View>

            {/* 헬스장 정보 */}
            <View style={styles.card}>
                <Text style={styles.title}>{hostDetail.hostName}</Text>
                <Text style={styles.subtitle}>{hostDetail.description}</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>{`최대 인원: ${hostDetail.maxPeople}명`}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>{`운영 시간: ${hostDetail.startTime} ~ ${hostDetail.endTime}`}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>{`연락처: ${hostDetail.hostPhoneNumber}`}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>{`관리자: ${hostDetail.hostManagerName}`}</Text>
                </View>
            </View>

            {/* 편의시설 리스트 */}
            <View style={styles.facilityContainer}>
                <Text style={[styles.title, { paddingBottom: 20 }]}>편의시설</Text>
                <View style={styles.facilityRow}>
                    {dynamicFacilities.length > 0 ? (
                        dynamicFacilities.map((item, index) => (
                            <View key={index} style={styles.facilityItem}>
                                <Text style={styles.facilityText}>{item.name}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>편의시설 정보 없음</Text>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.reserveButton} onPress={() => navigation.navigate('WaitingNumScreen')}>
                <Text style={styles.reserveButtonText}>예약하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// 스타일 정의
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    swiperContainer: { height: 200 },
    swiper: { flex: 1 },
    image: { width: width, height: 200, resizeMode: "cover" },
    card: {
        padding: 16,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
    subtitle: { fontSize: 14, color: "#666", marginBottom: 10 },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    infoText: { marginLeft: 5, fontSize: 14, color: "#555" },
    facilityContainer: { justifyContent: "space-around", padding: 20 },
    facilityItem: { flexDirection: "column", alignItems: "center" },
    facilityText: { marginTop: 5, fontSize: 12 },
    facilityRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    mapContainer: {
        padding: 20,
        height: 300,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    reserveButton: {
        backgroundColor: '#4562D6',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reserveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ef9a9a',
    },
});
