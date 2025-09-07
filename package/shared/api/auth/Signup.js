// Signup.js
import axios from 'axios';

const showAlert = (title, message) => {
  if (typeof window !== 'undefined' && typeof window.alert === 'function') {
    window.alert(`${title}\n${message}`);
  } else {
    const { Alert } = require('react-native');
    Alert.alert(title, message);
  }
};

// ✅ 휴대폰 번호 하이픈 제거용
export const formatPhoneNumber = (value) => {
  const onlyNums = value.replace(/\D/g, '');
  if (onlyNums.length < 4) return onlyNums;
  if (onlyNums.length < 8) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
};

// ✅ 인증번호 발급
export const handleSendAuthCode = async (phoneNumber, onSuccessCallback) => {
  try {
    const response = await axios.post(
      'http://134.185.99.89:8080/sms/send',
      {
        phoneNum: phoneNumber.replace(/-/g, ''),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      showAlert('인증번호 전송', '문자를 전송했습니다.');
      onSuccessCallback?.(); // 성공 콜백 실행
    } else {
      showAlert('실패', '인증번호 전송에 실패했습니다.');
    }
  } catch (error) {
    showAlert('오류', '서버 오류 또는 네트워크 문제입니다.');
    console.error(error);
  }
};

export const handleVerifyAuthCode = async (phoneNumber, certificationCode, onSuccess) => {
  try {
    const response = await axios.post(
      'http://134.185.99.89:8080/sms/verify',
      {
        phoneNum: phoneNumber.replace(/-/g, ''),
        certificationCode: certificationCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 || response.status === 201)  {
      showAlert('인증 성공', response.data.message || '인증에 성공했습니다.');
      onSuccess?.(); // 인증 성공 후 콜백 실행
    }else {
      showAlert('인증 실패', `응답 코드: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      showAlert('인증 실패', '인증번호가 일치하지 않습니다.');
    } else {
      showAlert('오류', '서버 연결에 실패했습니다.');
    }
  }
};



export const handleSignup = async ({
  name,
  nickName,
  password,
  phoneNumber,
  gender,
}) => {
  try {
    const response = await axios.post('http://134.185.99.89:8080/join', {
      name,
      nickName,
      password,
      phoneNumber,
      gender: gender === '남' ? 'MALE' : 'FEMALE',
    });

    if (response.status >= 200 && response.status < 300) {
      showAlert('회원가입 성공', `${name}님`);
      return response; 
    } else {
      showAlert('회원가입 실패', `응답 코드: ${response.status}`);
      return null;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        showAlert('입력 오류', '입력값을 다시 확인해주세요.');
      } else if (status === 409) {
        showAlert('중복된 아이디', '이미 존재하는 닉네임입니다.');
      } else {
        showAlert('오류 발생', '다시 시도해주세요.');
      }

    } else {
      showAlert('서버 연결 실패', '네트워크를 확인해주세요.');
    }
    return null;
  }
};
