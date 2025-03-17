import { login, logout } from '@/api/auth'  // 假设你有这些 API 方法

export default {
  namespaced: true,
  state: {
    userInf: {
      username:'test1'
    }
  },
  mutations: {
    SET_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    },
    CLEAR_USER_DATA (state) {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  },
  actions: {
    // 登录成功后调用
    async loginSuccess ({ commit }, data) {
      try {
        const res = await login({
          username: data.username,
          password: data.password
        });
        localStorage.setItem('token', res.data.token)
        commit('SET_USER_INFO', res.data.userInfo)
        return Promise.resolve(res)
      } catch (error) {
        return  Promise.reject('登录失败:', error);
      }
    },
    // 退出登录
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userInfo: state => state.userInfo
  }
}