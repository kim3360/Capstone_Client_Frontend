import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

// 임시 공지사항 데이터
const notices = [
  {
    id: 1,
    title: '서비스 이용 안내',
    content: '줄서기 앱 서비스 이용 방법에 대한 안내입니다.',
    date: '2024.03.15',
    isImportant: true,
  },
  {
    id: 2,
    title: '시스템 점검 안내',
    content: '3월 20일 새벽 2시 ~ 4시까지 시스템 점검이 진행됩니다.',
    date: '2024.03.14',
    isImportant: true,
  },
  {
    id: 3,
    title: '앱 업데이트 안내',
    content: '새로운 기능이 추가되었습니다. 자세한 내용은 공지사항을 확인해주세요.',
    date: '2024.03.10',
    isImportant: false,
  },
  {
    id: 4,
    title: '이용약관 개정 안내',
    content: '이용약관이 개정되었습니다. 자세한 내용은 공지사항을 확인해주세요.',
    date: '2024.03.05',
    isImportant: false,
  },
];

export const NoticeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
       
          
          {notices.map((notice) => (
            <TouchableOpacity 
              key={notice.id} 
              style={[
                styles.noticeItem,
                notice.isImportant && styles.importantNotice
              ]}
            >
              <View style={styles.noticeHeader}>
                <View style={styles.titleContainer}>
                  {notice.isImportant && (
                    <View style={styles.importantBadge}>
                      <Text style={styles.importantText}>중요</Text>
                    </View>
                  )}
                  <Text style={styles.noticeTitle}>{notice.title}</Text>
                </View>
                <Text style={styles.noticeDate}>{notice.date}</Text>
              </View>
              <Text style={styles.noticeContent} numberOfLines={2}>
                {notice.content}
              </Text>
            </TouchableOpacity>
          ))}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noticeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  importantNotice: {
    backgroundColor: '#fff8f8',
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  importantBadge: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  importantText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  noticeDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  noticeContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 