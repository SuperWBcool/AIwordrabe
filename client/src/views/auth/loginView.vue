<template>
  <div class="login-container">
    <div class="login-box">
      <h2>胡的衣橱</h2>
      <div class="form-group">
        <input type="text" v-model="username" placeholder="用户名" />
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="密码" />
      </div>
      <button class="login-btn" :disabled="loading" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
  name: 'Login',
  data () {
    return {
      username: 'test1',
      password: 'sk-20250214',
      loading: false
    }
  },
  methods: {
    async handleLogin () {

      // 添加基本验证
      if (!this.username || !this.password) {
        alert('请输入用户名和密码');
        return;
      }
      //将按钮设置成加载状态
      this.loading = true;

      try {
        //发送登录请求
        let res = await this.$store.dispatch('user/loginSuccess', {
          username: this.username,
          password: this.password
        })
        console.log(res);

        if (res.code) {
          this.$router.push('/home/index');
        }
        else ElNotification({
          message: res.message,
        })
      } catch (error) {
        console.error('登录失败:', error);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #45a049;
}
</style>