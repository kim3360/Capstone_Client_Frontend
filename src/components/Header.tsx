// HomeScreen.tsx
import React from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity
} from 'react-native';
import { useNavigation, NavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '../navigation/StackNavigator';
import { TabParamList } from '../navigation/TopTabNavigator';

type CombinedNavigationProp = NativeStackNavigationProp<RootStackParamList> & MaterialTopTabNavigationProp<TabParamList>;

export const Header: React.FC = () => {
    const navigation = useNavigation<CombinedNavigationProp>();
    const [activeTab, setActiveTab] = React.useState('홈');

    React.useEffect(() => {
        // 부모 탭 네비게이터를 가져옵니다.
        const parentNavigation = navigation.getParent<MaterialTopTabNavigationProp<TabParamList>>();

        // parentNavigation이 존재하는 경우에만 리스너를 추가합니다.
        if (parentNavigation) {
            console.log('Parent navigation found:', parentNavigation);
            const unsubscribe = parentNavigation.addListener('state', () => {
                // 부모 네비게이터의 현재 상태를 가져옵니다.
                // NavigationState를 사용하여 타입을 명확히 합니다.
                const parentState: NavigationState | undefined = parentNavigation.getState();
                console.log('Parent navigation state changed:', parentState);

                if (parentState && parentState.type === 'tab' && parentState.routes[parentState.index]) {
                    const currentRouteName = parentState.routes[parentState.index].name;
                    console.log('Current route name:', currentRouteName);

                    // 이제 currentRouteName은 TabParamList의 키로 올바르게 추론됩니다.
                    switch (currentRouteName) {
                        case 'Home':
                            setActiveTab('홈');
                           
                            break;
                        case 'Stoplist':
                            setActiveTab('대기 목록');
                            
                            break;
                        case 'Notice':
                            setActiveTab('공지사항');
                           
                            break;
                        case 'HostRegister':
                            setActiveTab('호스트 등록');
                           
                            break;
                    }
                }
            });

            return unsubscribe; // 리스너 정리
        }
    }, [navigation]); // navigation 객체가 변경될 때 리스너를 다시 등록합니다.

    const handleTabPress = (tabName: string) => {
        switch (tabName) {
            case '홈':
                navigation.navigate('Home');
                break;
            case '대기 목록':
                navigation.navigate('Stoplist');
                break;
            case '공지사항':
                navigation.navigate('Notice');
                break;
            case '호스트 등록':
                navigation.navigate('HostRegister');
                break;
        }
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.headerLogo}>
                    <Text style={styles.logoText}>Wait:It</Text>
                </View>
                <View style={styles.searchBar}>
                    <TextInput style={styles.input} placeholder="검색어를 입력하세요" />
                </View>
            </View>

            {/* 탭 메뉴 */}
            <View style={styles.tabMenu}>
                {['홈', '대기 목록', '공지사항', '호스트 등록'].map((tab, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => handleTabPress(tab)}
                        style={styles.tabContainer}
                    >
                        <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
                            {tab}
                        </Text>
                        {activeTab === tab && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerLogo: {
        flexShrink: 0,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF'
    },
    searchBar: {
        flex: 1,
    },
    input: {
        height: 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    tabMenu: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 16,
        justifyContent: 'space-around'
    },
    tabContainer: {
        alignItems: 'center',
    },
    tab: {
        color: '#999',
        paddingVertical: 4,
    },
    activeTab: {
        color: '#007AFF',
        fontWeight: 'bold'
    },
    tabIndicator: {
        position: 'absolute',
        bottom: -4,
        width: '100%',
        height: 2,
        backgroundColor: '#007AFF',
        borderRadius: 1,
    },
});

