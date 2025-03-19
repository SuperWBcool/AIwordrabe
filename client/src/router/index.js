import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '../store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  try {
    if(to.fullPath == '/login'){
      next();
    }
    // 在路由跳转前如果数据没有添加则发送请求
    if (!store.state.clothes.isAdd) {
      // 获取用户衣物数据
      await store.dispatch('clothes/getClothes', { start: true });
      // await store.dispatch('clothes/getClothesTypeByUser');
      // 获取用户衣物搭配数据
      await store.dispatch('match/getClothesMatch');

      store.state.clothes.isAdd = true;
    }
    next();
  } catch (err) {
    // console.log('路由跳转失败', err);
    next();
  }
});

export default router