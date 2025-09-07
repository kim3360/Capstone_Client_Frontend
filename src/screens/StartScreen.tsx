import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const StartScreen: React.FC = () => {
    return (
        <View style={styles.container}>
           
            <Image source={require('../../assets/Logo.png')} style={styles.logo} />

            <Text style={styles.slogan}>기다리는 즐거움</Text>

            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.qrButton}>
                    <Text style={styles.qrText}>QR코드로 </Text>
                    <Text style={styles.qrText}>줄서기</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinText}>회원가입</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.infoText}>이미 계정이 있다면?</Text>

            <TouchableOpacity style={styles.checkButton}>
                <Text style={styles.checkText}>내 대기열 확인</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: wp(50),
        height: hp(20),
        marginBottom: 12,
        resizeMode: 'contain',
    },
    slogan: {
        fontSize: 14,
        color: '#666',
        marginBottom: 40,
    },
    buttonGroup: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    qrButton: {
        flex: 1,
        backgroundColor: '#eee',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    qrText: {
        color: '#333',
        textAlign: 'center',
        fontSize: 14,
    },
    joinButton: {
        flex: 1,
        backgroundColor: '#4B6EF6',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    joinText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },
    infoText: {
        marginTop: 10,
        fontSize: 12,
        color: '#777',
    },
    checkButton: {
        marginTop: 16,
        backgroundColor: '#4B6EF6',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 24,
    },
    checkText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
