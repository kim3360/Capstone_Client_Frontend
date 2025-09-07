import axios from 'axios';


const showAlert = (title, message) => {
  if (typeof window !== 'undefined' && typeof window.alert === 'function') {
    window.alert(`${title}\n${message}`);
  } else {
    const { Alert } = require('react-native');
    Alert.alert(title, message);
  }
};

/**
 * @typedef {Object} LoginResponse
 * @property {string} token - The access token.
 * @property {string} name - The user's name.
 * @property {string} userId - The user's ID.
 */

/**
 * Handles user login.
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.username - The username.
 * @param {string} credentials.password - The password.
 * @returns {Promise<LoginResponse|null>} A promise that resolves with the login response data on success, or null on failure.
 */
export const handleLogin = async ({ username, password }) => {
  try {
    const response = await axios.post('http://134.185.99.89:8080/login', {
      username,
      password,
    }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Type': 'mobile',
        },
      });

    console.log('응답 상태 코드:', response.status);

    if (response.status === 200) {
      const { name, user_id } = response.data;
      const authToken = response.headers.authorization;
      let token = null;
      if (authToken && authToken.startsWith('Bearer ')) {
        token = authToken.substring(7);
      }

      showAlert('로그인 성공', `${name}님`);
      return { name, token, userId: user_id };
    } else {
      showAlert('로그인 실패', `응답 코드: ${response.status}`);
      return null;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        showAlert('입력 오류', '입력값을 다시 확인해주세요.');
      } else if (status === 401) {
        showAlert('인증 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        showAlert('오류 발생', '다시 시도해주세요.');
      }
    } else {
      showAlert('서버 연결 실패', '네트워크를 확인해주세요.');
    }
    throw error;
  }
};
