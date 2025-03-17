import { getClothesMatchType,getClothesMatch } from '@/api/clothesMatch'  // 假设你有这些 API 方法

export default {
  namespaced: true,
  state: {
    imgLevelInf: {
      canvasInf: {
        width: 300,
        height: 400
      },
      imgPostion: []
    },
    i2: [],
    type: {               //衣服搭配使用类型
      isAdd: false,
      list: ''
    },        
    clothesMatchList:[],   //用户衣服搭配列表
    currentType:'全部'
  },
  mutations: {
    setImgLevelInf (state, data) {
      state.imgLevelInf.imgPostion.push(data);
      state.i2.push(data.id);
    },
    setType (state, data) {
      state.type.isAdd = true;
      state.type.list = data;
    },
    setClothesMatchList (state, data) {
      state.clothesMatchList = data
    },
    setCurrentType(state,data){
      state.currentType = data;
    }
  },
  actions: {
    //获取用户所有衣服数据
    addImgLevelInf ({ commit }, data) {
      commit('setImgLevelInf', data);
    },
    //获取衣服搭配适用的场景
    async getType ({ commit }) {
      try {
        let res = await getClothesMatchType();
        console.log(res);
        if(res.code) commit('setType', res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getClothesMatch ({ commit }) {
      try {
        let res = await getClothesMatch();
        console.log(res);
        commit('setClothesMatchList', res.data);
      } catch (err) {
        console.log(err);
      }
    },
    changeCurrentType({ commit },data){
      commit('setCurrentType', data);
    }
  },
}