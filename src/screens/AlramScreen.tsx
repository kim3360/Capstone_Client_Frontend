import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

type AlramScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NoticeItem {
  id: number;
  title: string;
  content: string;
  date: string;
  isImportant: boolean;
  isRead: boolean;
}

export const AlramScreen = () => {
  const navigation = useNavigation<AlramScreenNavigationProp>();
  const [notices, setNotices] = useState<NoticeItem[]>([
    {
      id: 1,
      title: "서비스 점검 안내",
      content:
        "더 나은 서비스 제공을 위해 2024년 9월 25일 02:00~04:00 서비스 점검을 진행합니다.",
      date: "2024.09.20",
      isImportant: true,
      isRead: false,
    },
    {
      id: 2,
      title: "새로운 기능 업데이트",
      content:
        "대기 알림 기능이 추가되었습니다. 이제 실시간으로 대기 상황을 확인할 수 있습니다.",
      date: "2024.09.18",
      isImportant: false,
      isRead: false,
    },
    {
      id: 3,
      title: "이용약관 개정 안내",
      content:
        "서비스 이용약관이 개정되었습니다. 자세한 내용은 앱 내 이용약관을 확인해주세요.",
      date: "2024.09.15",
      isImportant: false,
      isRead: true,
    },
    {
      id: 4,
      title: "고객센터 운영시간 변경",
      content: "고객센터 운영시간이 평일 09:00~18:00으로 변경되었습니다.",
      date: "2024.09.10",
      isImportant: false,
      isRead: true,
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // 실제로는 API 호출을 통해 최신 공지사항을 가져옵니다
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleNoticePress = (notice: NoticeItem) => {
    // 읽음 처리
    setNotices((prev) =>
      prev.map((item) =>
        item.id === notice.id ? { ...item, isRead: true } : item
      )
    );

    // 상세 화면으로 이동 (또는 모달 표시)
    Alert.alert(notice.title, notice.content, [
      { text: "확인", style: "default" },
    ]);
  };

  const unreadCount = notices.filter((notice) => !notice.isRead).length;

  const renderNoticeItem = (notice: NoticeItem) => (
    <TouchableOpacity
      key={notice.id}
      style={[styles.noticeItem, !notice.isRead && styles.unreadNotice]}
      onPress={() => handleNoticePress(notice)}
      activeOpacity={0.7}
    >
      <View style={styles.noticeHeader}>
        <View style={styles.noticeTitleContainer}>
          {notice.isImportant && (
            <View style={styles.importantBadge}>
              <Text style={styles.importantText}>중요</Text>
            </View>
          )}
          <Text
            style={[styles.noticeTitle, !notice.isRead && styles.unreadTitle]}
            numberOfLines={2}
          >
            {notice.title}
          </Text>
        </View>
        {!notice.isRead && <View style={styles.unreadDot} />}
      </View>

      <Text style={styles.noticeContent} numberOfLines={2}>
        {notice.content}
      </Text>

      <View style={styles.noticeFooter}>
        <Text style={styles.noticeDate}>{notice.date}</Text>
        <Ionicons name="chevron-forward" size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공지사항</Text>
        <View style={styles.headerRight}>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* 공지사항 목록 */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {notices.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>새로운 공지사항이 없습니다</Text>
            </View>
          ) : (
            notices.map(renderNoticeItem)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  headerRight: {
    width: 40,
    alignItems: "flex-end",
  },
  badge: {
    backgroundColor: "#ff4757",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  noticeItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotice: {
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  noticeTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  importantBadge: {
    backgroundColor: "#ff4757",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  importantText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  noticeTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    lineHeight: 22,
  },
  unreadTitle: {
    fontWeight: "600",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginTop: 6,
  },
  noticeContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  noticeFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeDate: {
    fontSize: 12,
    color: "#999",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
});
