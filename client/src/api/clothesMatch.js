import request from './request';
import userStore from '../store/user.js';
//上传用户衣服搭配信息
export const sendClothesMatch = (formData) => {
  return request({
    url: 'match/addMatch',
    method: 'post',
    data: formData
  });
};

//获取用户衣服搭配数据
export const getClothesMatch = () => {
  return request({
    url: 'match/getClothesMatch',
    method: 'post'
  });
};

export const getClothesMatchImage = (imgUrl, id) => {
  return request({
    url: `match/images/${userStore.state.userInf.username}/data/${imgUrl}`,
    method: 'get',
    params: {
      id
    },
    responseType: 'blob'
  });
};

export const getClothesMatchType = () => {
  return request({
    url: 'match/getType',
    method: 'get'
  });
};

//获取用户衣服信息