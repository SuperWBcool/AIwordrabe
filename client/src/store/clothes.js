import { getClothes, clothesAnalysis, getClothesTypeByUser, getClothesById } from '@/api/clothes'  // 假设你有这些 API 方法

export default {
  namespaced: true,
  state: {
    clothesList: {},    // 用户所有衣服数据
    clothesImage: { id: '', url: '', data: '' },                    // 用户上传衣服图片信息
    clothesType: { type: '' },                                      // 用户衣服类型
    currentClohtesInf: {
      type: {
        parent: 0,
        son: 'T恤'
      },
      details: {}
    },                   // 当前选中图片信息
    isShow: false,                                                  // 控制上传图片弹窗开关
    analysisData: { describe: '' },                                 // AI分析结果
    isLoading: true,
    isAdd: false
  },
  mutations: {
    //  设置用户衣服列表
    setClothesList (state, data) {
      state.clothesList = data;
    },
    // 设置用户上传衣服时的衣服数据
    setImageUrl (state, data) {
      state.clothesImage = data
    },
    //  获取用户衣服类型
    setClothesType (state, data) {
      state.clothesType = data
    },
    // 改变当前用户选中信息
    setCurrentClohtesInf (state, data) {
      // 如果id为1则修改当前选中衣服的大类，如果为0则添加衣服具体详情信息
      for (let i in data) {
        for (let j in data[i]) {
          state.currentClohtesInf[i][j] = data[i][j];
        }
      }
    },
    setIsShow (state, data) {
      state.isShow = data
    },
    setAnalysisData (state, data) {
      if (typeof data == 'string') {
        state.analysisData.describe += data
      }
      else state.analysisData = data
    },
    setIsLoading (state, data) {
      state.isLoading = data
    },
    setSpecificationInf (state, data) {
      state.specificationInf = data
    }
  },
  actions: {
    //获取用户所有衣服数据
    async getClothes (store, data) {
      try {
        const res = await getClothes(data);
        console.log(res);
        store.commit('setClothesList', res.data);
      } catch (error) {
        console.error('获取衣物列表失败：', error)
      }
    },
    setClothesImage ({ commit }, inf) {
      commit('setImageUrl', inf)
    },
    //获取用户衣服类型
    async getClothesTypeByUser ({ commit }) {
      try {
        let res = await getClothesTypeByUser();
        console.log(res);
        commit('setClothesType', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getClothesById (store, data) {
      try {
        let res = await getClothesById(data.id);
        console.log(res);

        res.data.data = store.state.clothesList[res.data.type]['list'][data.index].data;

        store.commit('setCurrentClohtesInf', { details: res.data });
      } catch (error) {
        console.log(error);
      }
    },
    changeIsShow ({ commit }, isShow) {
      commit('setIsShow', isShow)
    },
    changeCurrentClothesInf ({ commit }, data) {
      commit('setCurrentClohtesInf', data)
    },
    //获取AI分析数据
    async getAnalysisData (store, data) {
      try {
        const res = await clothesAnalysis(data);
        console.log(res);
        if (res.data.id == store.state.clothesImage.id) {
          store.commit('setIsLoading', false);
          let a = { ...res.data.results };
          a.describe = '';
          store.commit('setAnalysisData', a);
          let index = 0;
          const interval = setInterval(() => {
            if (index < res.data.results.describe.length) {
              store.commit('setAnalysisData', res.data.results.describe[index]);
              index++;
            } else {
              clearInterval(interval); // 清除定时器
              store.state.isShow = true;
            }
          }, 50); // 每100毫秒输出一个字符
        }
      } catch (error) {
        console.error('衣服分析失败：', error)
      }
    },
  },
  getters: {
    clothesList: state => state.clothesList
  }
}