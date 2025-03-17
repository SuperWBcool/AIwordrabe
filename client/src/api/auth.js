import request from './request';
//登录接口
export const login = (userData) => {
  return request({
    url:'/auth/login',
    method: 'post',
    data: { username:userData.username,password:userData.password }
  });
};
//获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/auth/user-info',
    method: 'get'
  });
};
//用户退出
export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post'
  });
};