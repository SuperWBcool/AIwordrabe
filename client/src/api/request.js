import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const request = axios.create({
  // baseURL: 'http://localhost:8090', // 后端接口基础地址
  baseURL:'http://192.168.31.134:8090' 
  // timeout: 9000 // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从 localStorage 获取 API 密钥
    let authorization = localStorage.getItem('token') || '';
    config.headers['authorization'] = authorization;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    if(/\/images/.test(response.request.responseURL)){
      return {data:response.data}
    }  
    if(response.data.code) return response.data;
    ElMessage.error(response.data.msg);
    return response.data
  },
  error => {
    // 统一错误处理
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          // 未授权，清除本地存储的密钥
          localStorage.removeItem('apiKey');
          localStorage.removeItem('apiSecret');
          // 可以在这里添加重定向到登录页的逻辑
          break;
        case 403:
          console.error('账户已被禁用');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          console.error('请求失败');
      }
    }
    return Promise.reject(error);
  }
);

export default request;