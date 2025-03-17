import request from './request';
import clotthesStore from '../store/clothes.js';
import userStore from '../store/user.js';
//上传图片
export const sendImage = (formData,data) => {
  return request({
    url: 'clothes/upload',
    method: 'post',
    params: data,
    data: formData
  });
};
//获取用户衣服信息
export const getClothes = (data) => {
  return request({
    url: 'clothes/getClothes',
    params:data,
    method: 'get'
  });
};
//获取用户衣服图片
export const getClothesImage= (imgUrl,id) => {
  return request({
    url: `clothes/images/${userStore.state.userInf.username}/data/${imgUrl}`,
    method: 'get',
    params:{
      id
    },
    responseType:'blob'
  });
};
//获取用户衣服数据
export const getClothesTypeByUser = () => {
  return request({
    url: 'clothes/getClothesTypeByUser',
    method: 'get',
  });
};

//获取用户衣服数据
export const getClothesById = (id) => {
  return request({
    url: 'clothes/getClothesById',
    method: 'get',
    params:{
      id
    }
  });
};
// 获取衣服AI分析数据
export const clothesAnalysis = (formData) => {
  return request({
    url: 'clothes/AIanalysis',
    method: 'post',
    params: {
      id: clotthesStore.state.clothesImage.id // 将 id 参数放入 params 中
    },
    data: formData
  });
};
// 更新衣服信息
export const updateClothes = (data) => {
  return request({
    url: 'clothes/updateClothesInf',
    method: 'post',
    data: data
  });
};